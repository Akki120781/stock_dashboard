import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TransactionTable from '../components/trading/TransactionTable';
import { History, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserPanelPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get('/transactions');
                setTransactions(response.data);
            } catch (err) {
                setError('Failed to load transaction history.');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-gray-100">Loading history...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                            <History className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                            Transaction History
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            View your past orders and their status.
                        </p>
                    </div>
                    <Link to="/dashboard" className="hidden sm:flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                        <LayoutDashboard className="h-4 w-4 mr-1" /> Go to Dashboard
                    </Link>
                </div>

                {error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl">{error}</div>
                ) : (
                    <TransactionTable transactions={transactions} isAdmin={false} />
                )}
            </div>
        </div>
    );
};

export default UserPanelPage;
