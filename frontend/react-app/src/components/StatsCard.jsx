import { TrendingUp, TrendingDown, CreditCard, Wallet } from 'lucide-react';

const StatsCard = ({ title, amount, type, icon: Icon }) => {
    const isIncome = type === 'income';
    const isExpense = type === 'expense';
    const isBalance = type === 'balance';

    return (
        <div className="glass p-6 rounded-2xl border border-border flex items-center gap-4">
            <div className={`p-4 rounded-xl ${isIncome ? 'bg-green-500/10 text-green-500' :
                isExpense ? 'bg-red-500/10 text-red-500' :
                    'bg-primary/10 text-primary'
                }`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-slate-400 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-white mt-1">
                    Rp {Number(amount).toLocaleString('id-ID', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                </h3>
            </div>
        </div>
    );
};

export default StatsCard;
