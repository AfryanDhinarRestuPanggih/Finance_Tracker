const db = require('../config/db');
const ExcelJS = require('exceljs');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

exports.exportExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const [rows] = await db.execute(
            'SELECT date, category, type, amount, note FROM transactions WHERE user_id = ? ORDER BY date DESC',
            [userId]
        );

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Transactions');

        worksheet.columns = [
            { header: 'Tanggal', key: 'date', width: 15 },
            { header: 'Kategori', key: 'category', width: 20 },
            { header: 'Jenis', key: 'type', width: 15 },
            { header: 'Nominal', key: 'amount', width: 15 },
            { header: 'Catatan', key: 'note', width: 30 }
        ];

        rows.forEach(row => {
            worksheet.addRow({
                ...row,
                date: row.date.toISOString().split('T')[0]
            });
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'laporan_keuangan.xlsx'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.exportPDF = async (req, res) => {
    const userId = req.user.id;

    try {
        const [rows] = await db.execute(
            'SELECT date, category, type, amount, note FROM transactions WHERE user_id = ? ORDER BY date DESC',
            [userId]
        );

        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.text('Laporan Transaksi Keuangan', 14, 20);
        doc.setFontSize(11);
        doc.setTextColor(100);

        const tableColumn = ["Tanggal", "Kategori", "Jenis", "Nominal", "Catatan"];
        const tableRows = rows.map(row => [
            row.date instanceof Date ? row.date.toISOString().split('T')[0] : row.date,
            row.category,
            row.type === 'income' ? 'Pemasukan' : 'Pengeluaran',
            `Rp ${Number(row.amount).toLocaleString('id-ID')}`,
            row.note || '-'
        ]);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            theme: 'striped',
            headStyles: { fillColor: [99, 102, 241] }, // Primary color #6366f1
        });

        const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=laporan_keuangan.pdf');
        res.setHeader('Content-Length', pdfBuffer.length);
        res.send(pdfBuffer);
    } catch (err) {
        console.error('PDF Export Error:', err);
        res.status(500).json({ message: 'Gagal membuat laporan PDF' });
    }
};
