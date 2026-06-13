import React from 'react';
import { Check, X, Clock } from 'lucide-react';

const TransactionTable = ({ transactions, isAdmin, onStatusUpdate }) => {
    if (!transactions || transactions.length === 0) {
        return (
            <div className="text-center py-12 text-slate-400 font-medium">
                No transaction history found.
            </div>
        );
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Check className="h-3 w-3" /> Approved
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <X className="h-3 w-3" /> Rejected
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Clock className="h-3 w-3" /> Pending
                    </span>
                );
        }
    };

    return (
        <div className="overflow-x-auto glass-surface rounded-2xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-[#0a0f1d]/85">
                    <tr>
                        {isAdmin && (
                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Investor / Email
                            </th>
                        )}
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Symbol
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Operation
                        </th>
                        <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Est. Total
                        </th>
                        <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Status
                        </th>
                        {isAdmin && (
                            <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {transactions.map((tx) => (
                        <tr key={tx._id} className="hover:bg-white/[0.03] transition-colors duration-200">
                            {isAdmin && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                                    {tx.userId?.username || 'Unknown'}
                                    <div className="text-xs text-slate-500 font-medium mt-0.5">{tx.userId?.email}</div>
                                </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                {new Date(tx.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white uppercase tracking-tight">
                                {tx.stockSymbol}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-bold rounded-full border ${
                                    tx.type === 'buy' 
                                        ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' 
                                        : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                }`}>
                                    {tx.type.toUpperCase()}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 text-right font-semibold">
                                {tx.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 text-right font-semibold">
                                ${tx.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white text-right font-display">
                                ${(tx.quantity * tx.price).toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {getStatusBadge(tx.status)}
                            </td>
                            {isAdmin && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
                                    {tx.status === 'pending' && (
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => onStatusUpdate(tx._id, 'approved')}
                                                className="text-emerald-400 hover:text-white transition-colors bg-emerald-500/10 hover:bg-emerald-500/30 p-1.5 rounded-lg border border-emerald-500/25 cursor-pointer"
                                                title="Approve"
                                            >
                                                <Check className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => onStatusUpdate(tx._id, 'rejected')}
                                                className="text-rose-400 hover:text-white transition-colors bg-rose-500/10 hover:bg-rose-500/30 p-1.5 rounded-lg border border-rose-500/25 cursor-pointer"
                                                title="Reject"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
