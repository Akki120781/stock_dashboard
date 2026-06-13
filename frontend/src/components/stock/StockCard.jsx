"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import { TrendingUp, TrendingDown, BookmarkPlus, BookmarkMinus } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const StockCard = ({ stockData, isWatchlisted, onWatchlistChange }) => {
    const { user, fetchWatchlist } = useContext(AuthContext);

    if (!stockData) return null;

    const { symbol, currentPrice, high, low, previousClose, percentageChange, change } = stockData;
    const isPositive = change >= 0;

    const handleWatchlistToggle = async (e) => {
        e.preventDefault(); // Prevent navigating if wrapped in a link
        try {
            if (isWatchlisted) {
                await api.delete(`/watchlist/${symbol}`);
            } else {
                await api.post('/watchlist', { symbol });
            }
            await fetchWatchlist();
            if (onWatchlistChange) onWatchlistChange();
        } catch (err) {
            console.error('Error updating watchlist', err);
        }
    };

    if (stockData.error) {
        return (
            <div className="glass-surface rounded-2xl p-6 relative z-10 border border-amber-500/20">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl font-extrabold font-display text-white">
                            {symbol}
                        </h3>
                        <p className="text-xs font-bold text-amber-400 mt-1.5 uppercase tracking-wider">Rate Limit Hit</p>
                    </div>
                    <button
                        onClick={handleWatchlistToggle}
                        className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-indigo-400 transition-colors z-10 cursor-pointer"
                        title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
                    >
                        {isWatchlisted ? (
                            <BookmarkMinus className="h-5 w-5 text-indigo-400" />
                        ) : (
                            <BookmarkPlus className="h-5 w-5" />
                        )}
                    </button>
                </div>
                <div className="mt-5 p-4 rounded-xl bg-amber-500/5 border border-amber-500/15">
                    <p className="text-xs text-amber-300 font-medium leading-relaxed">
                        Alpha Vantage restricts data fetches to 5/minute. Please wait 60 seconds.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <Link href={`/stock/${symbol}`} className="block group h-full">
            <div className="h-full glass-surface rounded-2xl p-6 transition-all duration-300 relative z-10 hover:border-cyan-500/30">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl font-extrabold font-display text-white group-hover:text-cyan-400 transition-colors tracking-tight uppercase">
                            {symbol}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Ticker</p>
                    </div>
                    <button
                        onClick={handleWatchlistToggle}
                        className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-indigo-400 transition-colors z-20 cursor-pointer"
                        title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
                    >
                        {isWatchlisted ? (
                            <BookmarkMinus className="h-5 w-5 text-indigo-400" />
                        ) : (
                            <BookmarkPlus className="h-5 w-5" />
                        )}
                    </button>
                </div>

                <div className="flex items-end gap-3 mb-6">
                    <span className="text-3xl font-black font-display text-white tracking-tight">
                        ${currentPrice?.toFixed(2)}
                    </span>
                    <div className={`flex items-center gap-1 font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isPositive ? <TrendingUp className="h-4.5 w-4.5" /> : <TrendingDown className="h-4.5 w-4.5" />}
                        <span className="text-base">{Math.abs(change)?.toFixed(2)}</span>
                        <span className="text-xs bg-white/5 border border-white/15 px-2 py-0.5 rounded-md ml-1">
                            ({percentageChange?.toFixed(2)}%)
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4 mt-2">
                    <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">High</p>
                        <p className="font-bold text-slate-200 mt-1 text-sm">${high?.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Low</p>
                        <p className="font-bold text-slate-200 mt-1 text-sm">${low?.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Prev Close</p>
                        <p className="font-bold text-slate-200 mt-1 text-sm">${previousClose?.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default StockCard;
