import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [stats, setStats] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        expensesByCategory: []
    });
    const [loading, setLoading] = useState(false);

    const fetchTransactions = async (params = {}) => {
        if (!user) return;
        setLoading(true);
        try {
            const { data } = await api.get('/transactions', { params });
            setTransactions(data);
        } catch (err) {
            console.error('Fetch transactions failed', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        if (!user) return;
        try {
            const { data } = await api.get('/transactions/stats');
            setStats(data);
        } catch (err) {
            console.error('Fetch stats failed', err);
        }
    };

    const addTransaction = async (formData) => {
        await api.post('/transactions', formData);
        fetchTransactions();
        fetchStats();
    };

    const deleteTransaction = async (id) => {
        await api.delete(`/transactions/${id}`);
        fetchTransactions();
        fetchStats();
    };

    useEffect(() => {
        if (user) {
            fetchTransactions();
            fetchStats();
        }
    }, [user]);

    const updateTransaction = async (id, formData) => {
        await api.put(`/transactions/${id}`, formData);
        fetchTransactions();
        fetchStats();
    };

    return (
        <TransactionContext.Provider value={{
            transactions,
            stats,
            loading,
            fetchTransactions,
            fetchStats,
            addTransaction,
            updateTransaction,
            deleteTransaction
        }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactions = () => useContext(TransactionContext);
