import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TransactionTable from '../components/trading/TransactionTable';
import { ShieldCheck, Users } from 'lucide-react';

const AdminPanelPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('transactions');

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const [txRes, usersRes] = await Promise.all([
                    api.get('/transactions/admin'),
                    api.get('/auth/users'),
                ]);
                setTransactions(txRes.data);
                setUsers(usersRes.data);
            } catch (err) {
                setError('Failed to load admin data. Verify your permissions.');
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.put(`/transactions/${id}/status`, { status });
            // Update local state to reflect change instantly
            setTransactions((prev) =>
                prev.map((tx) => (tx._id === id ? { ...tx, status } : tx))
            );
        } catch (err) {
            console.error('Failed to update status', err);
            alert('Failed to update status');
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-gray-100">Verifying Admin Access...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500 dark:bg-gray-900">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                        <ShieldCheck className="h-8 w-8 text-amber-500" />
                        Administrator Control Panel
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Manage users and approve or reject trading operations.
                    </p>
                </header>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8 max-w-sm">
                    <button
                        onClick={() => setActiveTab('transactions')}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'transactions'
                                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            }`}
                    >
                        Pending Operations
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'users'
                                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            }`}
                    >
                        <span className="flex items-center justify-center gap-2">
                            <Users className="h-4 w-4" /> Users Directory
                        </span>
                    </button>
                </div>

                {/* Transactions Tab */}
                {activeTab === 'transactions' && (
                    <div>
                        <TransactionTable
                            transactions={transactions}
                            isAdmin={true}
                            onStatusUpdate={handleStatusUpdate}
                        />
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID / Date Joined</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Username</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email Address</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {users.map((u) => (
                                        <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                <span className="block font-mono text-xs">{u._id}</span>
                                                <span>{new Date(u.createdAt).toLocaleDateString()}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                                                {u.username}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {u.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${u.role === 'admin' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                                    {u.role.toUpperCase()}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanelPage;
