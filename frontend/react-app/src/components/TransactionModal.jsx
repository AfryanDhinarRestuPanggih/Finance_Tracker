import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';

const TransactionModal = ({ isOpen, onClose, transaction }) => {
    const { addTransaction, updateTransaction } = useTransactions();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(transaction || {
        date: new Date().toISOString().split('T')[0],
        category: '',
        type: 'expense',
        amount: '',
        note: ''
    });

    // Reset form when transaction prop changes
    useEffect(() => {
        if (transaction) {
            setFormData({
                ...transaction,
                date: transaction.date.split('T')[0] // Format date for input
            });
        } else {
            setFormData({
                date: new Date().toISOString().split('T')[0],
                category: '',
                type: 'expense',
                amount: '',
                note: ''
            });
        }
    }, [transaction]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (transaction) {
                await updateTransaction(transaction.id, formData);
            } else {
                await addTransaction(formData);
            }
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="glass w-full max-w-lg rounded-2xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border flex justify-between items-center bg-slate-800/50">
                    <h3 className="text-xl font-bold text-white">
                        {transaction ? 'Edit Transaksi' : 'Tambah Transaksi'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Tanggal</label>
                            <input
                                type="date"
                                required
                                className="w-full bg-slate-900 border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary text-white"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Jenis</label>
                            <select
                                className="w-full bg-slate-900 border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary text-white"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="income">Pemasukan</option>
                                <option value="expense">Pengeluaran</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Kategori</label>
                        <input
                            type="text"
                            required
                            placeholder="Contoh: Makanan, Gaji, Transportasi"
                            className="w-full bg-slate-900 border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary text-white"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Nominal</label>
                        <div className="relative">
                            <span className="absolute left-4 top-2.5 text-slate-400 font-medium">Rp</span>
                            <input
                                type="number"
                                required
                                placeholder="0"
                                className="w-full bg-slate-900 border border-border rounded-xl pl-12 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-primary text-white"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Catatan (Opsional)</label>
                        <textarea
                            rows="3"
                            placeholder="Tambahkan detail..."
                            className="w-full bg-slate-900 border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary text-white resize-none"
                            value={formData.note}
                            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        />
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-border text-slate-300 font-medium hover:bg-slate-800 transition-all"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : 'Simpan Transaksi'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionModal;
