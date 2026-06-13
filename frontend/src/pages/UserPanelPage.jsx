"use client";

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TransactionTable from '../components/trading/TransactionTable';
import { History, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

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
        return <div className="h-[70vh] flex items-center justify-center text-slate-400">Loading history...</div>;
    }

    return (
        <div className="w-full relative z-10 animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold font-display bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-3">
                        <History className="h-8 w-8 text-indigo-400" />
                        Transaction History
                    </h1>
                    <p className="mt-2 text-sm text-slate-400 font-medium">
                        View your past orders, allocations, and approval status.
                    </p>
                </div>
                <Link href="/dashboard" className="hidden sm:flex items-center text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                    <LayoutDashboard className="h-4.5 w-4.5 mr-2" /> Command Center
                </Link>
            </div>

            {error ? (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl text-sm font-semibold">{error}</div>
            ) : (
                <TransactionTable transactions={transactions} isAdmin={false} />
            )}
        </div>
    );
};

export default UserPanelPage;
