const db = require('../config/db');

exports.getTransactions = async (req, res) => {
    const userId = req.user.id;
    const { month, type, search } = req.query;

    try {
        let query = 'SELECT * FROM transactions WHERE user_id = ?';
        let params = [userId];

        if (month) {
            query += ' AND MONTH(date) = ?';
            params.push(month);
        }

        if (type) {
            query += ' AND type = ?';
            params.push(type);
        }

        if (search) {
            query += ' AND (category LIKE ? OR note LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY date DESC';

        const [rows] = await db.execute(query, params);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addTransaction = async (req, res) => {
    const userId = req.user.id;
    const { date, category, type, amount, note } = req.body;

    try {
        await db.execute(
            'INSERT INTO transactions (user_id, date, category, type, amount, note) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, date, category, type, amount, note]
        );
        res.status(201).json({ message: 'Transaction added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateTransaction = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { date, category, type, amount, note } = req.body;

    try {
        const [result] = await db.execute(
            'UPDATE transactions SET date = ?, category = ?, type = ?, amount = ?, note = ? WHERE id = ? AND user_id = ?',
            [date, category, type, amount, note, id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Transaction not found or unauthorized' });
        }

        res.json({ message: 'Transaction updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteTransaction = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const [result] = await db.execute(
            'DELETE FROM transactions WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Transaction not found or unauthorized' });
        }

        res.json({ message: 'Transaction deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getStats = async (req, res) => {
    const userId = req.user.id;

    try {
        // Total Pemasukan
        const [[{ totalIncome }]] = await db.execute(
            "SELECT SUM(amount) as totalIncome FROM transactions WHERE user_id = ? AND type = 'income'",
            [userId]
        );

        // Total Pengeluaran
        const [[{ totalExpense }]] = await db.execute(
            "SELECT SUM(amount) as totalExpense FROM transactions WHERE user_id = ? AND type = 'expense'",
            [userId]
        );

        // Pengeluaran per Kategori (untuk Chart.js)
        const [expensesByCategory] = await db.execute(
            "SELECT category, SUM(amount) as total FROM transactions WHERE user_id = ? AND type = 'expense' GROUP BY category",
            [userId]
        );

        // Saldo (Balance)
        const balance = (totalIncome || 0) - (totalExpense || 0);

        res.json({
            totalIncome: totalIncome || 0,
            totalExpense: totalExpense || 0,
            balance: balance,
            expensesByCategory: expensesByCategory
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
