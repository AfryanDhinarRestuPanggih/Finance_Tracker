import { useState, useEffect } from 'react';
import { useTransactions } from '../context/TransactionContext';
import {
    Plus,
    Search,
    Filter,
    Trash2,
    Edit,
    Loader2,
    TrendingUp,
    TrendingDown,
    Calendar,
    AlertCircle
} from 'lucide-react';
import TransactionModal from '../components/TransactionModal';
import { format, isValid } from 'date-fns';
import { id } from 'date-fns/locale';

const Transactions = () => {
    const { transactions, loading, fetchTransactions, deleteTransaction } = useTransactions();
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [monthFilter, setMonthFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const openEditModal = (transaction) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const closeScaleModal = () => {
        setIsModalOpen(false);
        setEditingTransaction(null);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchTransactions({ search: searchTerm, type: typeFilter, month: monthFilter });
    };

    const safeFormatDate = (dateStr) => {
        try {
            const date = new Date(dateStr);
            if (!isValid(date)) return 'Tanggal tidak valid';
            return format(date, 'dd MMM yyyy', { locale: id });
        } catch (e) {
            return 'Tanggal tidak valid';
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Daftar Transaksi</h1>
                    <p className="text-slate-400">Kelola catatan keuangan Anda secara detail</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20"
                >
                    <Plus size={20} />
                    Tambah Transaksi
                </button>
            </header>

            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-800/30 p-4 rounded-2xl border border-border">
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Cari kategori atau catatan..."
                        className="w-full bg-slate-900 border border-border rounded-xl pl-10 pr-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
                    <select
                        className="w-full bg-slate-900 border border-border rounded-xl pl-10 pr-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-primary appearance-none"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="">Semua Jenis</option>
                        <option value="income">Pemasukan</option>
                        <option value="expense">Pengeluaran</option>
                    </select>
                </div>
                <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
                    <select
                        className="w-full bg-slate-900 border border-border rounded-xl pl-10 pr-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-primary appearance-none"
                        value={monthFilter}
                        onChange={(e) => setMonthFilter(e.target.value)}
                    >
                        <option value="">Semua Bulan</option>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {new Date(2024, i).toLocaleString('id-ID', { month: 'long' })}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl py-2.5 transition-all"
                >
                    Filter Data
                </button>
            </form>

            <div className="glass rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/50 text-slate-400 text-sm font-medium border-b border-border">
                                <th className="hidden">Id</th>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Jenis</th>
                                <th className="px-6 py-4">Nominal</th>
                                <th className="px-6 py-4">Catatan</th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                                    </td>
                                </tr>
                            ) : transactions.length > 0 ? (
                                transactions.map((t) => (
                                    <tr key={t.id} className="hover:bg-slate-800/30 transition-all text-slate-300">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {safeFormatDate(t.date)}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-white">{t.category}</td>
                                        <td className="px-6 py-4">
                                            <span className={`flex items-center gap-1.5 text-xs font-bold uppercase ${t.type === 'income' ? 'text-green-500' : 'text-red-500'
                                                }`}>
                                                {t.type === 'income' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                                {t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-white">
                                            Rp {Number(t.amount).toLocaleString('id-ID', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-sm max-w-[200px] truncate">{t.note}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => openEditModal(t)}
                                                    className="p-2 text-slate-400 hover:text-primary transition-all"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => deleteTransaction(t.id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500 italic">
                                        Tidak ada transaksi ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <TransactionModal
                isOpen={isModalOpen}
                onClose={closeScaleModal}
                transaction={editingTransaction}
            />
        </div>
    );
};

export default Transactions;
