import { useTransactions } from '../context/TransactionContext';
import StatsCard from '../components/StatsCard';
import { Wallet, TrendingUp, TrendingDown, CreditCard, Loader2 } from 'lucide-react';
import { ArcElement, Chart as ChartJS, Legend, Tooltip, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
    const { stats, loading } = useTransactions();

    if (loading && !stats.totalIncome) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    const pieData = {
        labels: stats.expensesByCategory.map(item => item.category),
        datasets: [{
            data: stats.expensesByCategory.map(item => item.total),
            backgroundColor: [
                '#6366f1', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'
            ],
            borderWidth: 0,
        }]
    };

    const barData = {
        labels: ['Pemasukan', 'Pengeluaran'],
        datasets: [{
            label: 'Total',
            data: [stats.totalIncome, stats.totalExpense],
            backgroundColor: ['#10b981', '#ef4444'],
            borderRadius: 8,
        }]
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400">Ringkasan kondisi keuangan Anda</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total Saldo" amount={stats.balance} type="balance" icon={Wallet} />
                <StatsCard title="Pemasukan" amount={stats.totalIncome} type="income" icon={TrendingUp} />
                <StatsCard title="Pengeluaran" amount={stats.totalExpense} type="expense" icon={TrendingDown} />
                <StatsCard title="Transaksi" amount={0} type="count" icon={CreditCard} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div className="glass p-8 rounded-2xl border border-border">
                    <h3 className="text-xl font-bold text-white mb-6">Pengeluaran per Kategori</h3>
                    <div className="h-[300px] flex items-center justify-center">
                        {stats.expensesByCategory.length > 0 ? (
                            <Pie data={pieData} options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => {
                                                const label = context.label || '';
                                                const value = context.parsed || 0;
                                                return `${label}: ${new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR'
                                                }).format(value)}`;
                                            }
                                        }
                                    }
                                }
                            }} />
                        ) : (
                            <p className="text-slate-500 italic">Belum ada data pengeluaran</p>
                        )}
                    </div>
                </div>

                <div className="glass p-8 rounded-2xl border border-border">
                    <h3 className="text-xl font-bold text-white mb-6">Pemasukan vs Pengeluaran</h3>
                    <div className="h-[300px]">
                        <Bar data={barData} options={{
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        label: (context) => {
                                            const value = context.parsed.y || 0;
                                            return `${context.dataset.label}: ${new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR'
                                            }).format(value)}`;
                                        }
                                    }
                                }
                            }
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
