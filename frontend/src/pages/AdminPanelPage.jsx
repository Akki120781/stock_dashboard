"use client";

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
            setTransactions((prev) =>
                prev.map((tx) => (tx._id === id ? { ...tx, status } : tx))
            );
        } catch (err) {
            console.error('Failed to update status', err);
            alert('Failed to update status');
        }
    };

    if (loading) {
        return <div className="h-[70vh] flex items-center justify-center text-slate-400">Verifying Admin Access...</div>;
    }

    if (error) {
        return (
            <div className="h-[70vh] flex items-center justify-center text-center">
                <p className="text-rose-400 font-semibold text-lg max-w-md">{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full relative z-10 animate-fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold font-display bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent flex items-center gap-3">
                    <ShieldCheck className="h-8 w-8 text-amber-400" />
                    Admin Control Panel
                </h1>
                <p className="mt-2 text-sm text-slate-400 font-medium">
                    Manage system users and approve or reject client trading operations.
                </p>
            </header>

            {/* Tabs */}
            <div className="flex border-b border-white/10 mb-8 max-w-sm">
                <button
                    onClick={() => setActiveTab('transactions')}
                    className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                        activeTab === 'transactions'
                            ? 'border-indigo-400 text-indigo-400'
                            : 'border-transparent text-slate-500 hover:text-slate-350'
                    }`}
                >
                    Pending Trades
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                        activeTab === 'users'
                            ? 'border-indigo-400 text-indigo-400'
                            : 'border-transparent text-slate-500 hover:text-slate-350'
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
                <div className="glass-surface rounded-2xl border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-white/10">
                            <thead className="bg-[#0a0f1d]/85">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">User ID / Created</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Username</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Role Authority</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.map((u) => (
                                    <tr key={u._id} className="hover:bg-white/[0.03] transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            <span className="block font-mono text-xs text-slate-500 mb-0.5">{u._id}</span>
                                            <span>{new Date(u.createdAt).toLocaleDateString()}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                                            {u.username}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            {u.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2.5 py-0.5 inline-flex text-xs font-bold rounded-full border ${
                                                u.role === 'admin' 
                                                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                                                    : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                            }`}>
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
    );
};

export default AdminPanelPage;
