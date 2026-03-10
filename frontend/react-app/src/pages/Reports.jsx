import { FileText, Download, PieChart, Table, Loader2 } from 'lucide-react';
import api from '../api/axios';
import { useState } from 'react';

const Reports = () => {
    const [downloading, setDownloading] = useState({ pdf: false, excel: false });

    const downloadReport = async (format) => {
        setDownloading({ ...downloading, [format]: true });
        try {
            const response = await api.get(`/reports/${format}`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `laporan_keuangan.${format === 'excel' ? 'xlsx' : 'pdf'}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Download failed', err);
            alert('Gagal mendownload laporan');
        } finally {
            setDownloading({ ...downloading, [format]: false });
        }
    };

    const reportTypes = [
        {
            id: 'pdf',
            title: 'Laporan PDF',
            desc: 'Cocok untuk presentasi atau dibagikan sebagai dokumen resmi.',
            icon: FileText,
            color: 'text-red-500',
            bgColor: 'bg-red-500/10'
        },
        {
            id: 'excel',
            title: 'Laporan Excel',
            desc: 'Cocok untuk analisis data lebih lanjut di aplikasi spreadsheet.',
            icon: Table,
            color: 'text-green-500',
            bgColor: 'bg-green-500/10'
        }
    ];

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white">Laporan Keuangan</h1>
                <p className="text-slate-400">Export data keuangan Anda ke berbagai format</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reportTypes.map((report) => (
                    <div key={report.id} className="glass p-8 rounded-3xl border border-border space-y-6 flex flex-col">
                        <div className="flex items-start justify-between">
                            <div className={`${report.bgColor} ${report.color} p-4 rounded-2xl`}>
                                <report.icon size={32} />
                            </div>
                            <div className="bg-slate-700/50 p-2 rounded-lg">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{report.id}</span>
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-2">{report.title}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {report.desc}
                            </p>
                        </div>

                        <button
                            onClick={() => downloadReport(report.id)}
                            disabled={downloading[report.id]}
                            className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-primary transition-all text-white font-bold py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {downloading[report.id] ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                                    Download Sekarang
                                </>
                            )}
                        </button>
                    </div>
                ))}
            </div>

            <div className="glass p-8 rounded-3xl border border-border mt-8 flex flex-col md:flex-row items-center gap-8">
                <div className="bg-primary/10 text-primary p-6 rounded-3xl">
                    <PieChart size={48} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">Butuh laporan kustom?</h3>
                    <p className="text-slate-400">
                        Fitur filter pada halaman transaksi dapat membantu Anda melihat data spesifik sebelum mendownload dokumen lengkap.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Reports;
