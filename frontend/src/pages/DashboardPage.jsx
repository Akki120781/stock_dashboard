"use client";

import React, { useState, useEffect, useContext } from 'react';
import { Search, Loader2, Sparkles, TrendingUp } from 'lucide-react';
import api from '../services/api';
import StockCard from '../components/stock/StockCard';
import { AuthContext } from '../context/AuthContext';

const DashboardPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedStock, setSearchedStock] = useState(null);
    const [watchlistStocks, setWatchlistStocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user, fetchWatchlist } = useContext(AuthContext);

    useEffect(() => {
        fetchWatchlist();
    }, []);

    useEffect(() => {
        const loadWatchlistData = async () => {
            if (user?.watchlist?.length > 0) {
                try {
                    const validStocks = [];
                    for (const symbol of user.watchlist) {
                        try {
                            const res = await api.get(`/stocks/quote/${symbol}`);
                            if (res.data) validStocks.push(res.data);
                            await new Promise(resolve => setTimeout(resolve, 500));
                        } catch (err) {
                            console.error(`Failed to load ${symbol}`, err);
                            validStocks.push({ symbol: symbol, error: true });
                        }
                    }
                    setWatchlistStocks(validStocks);
                } catch (err) {
                    console.error("Failed to load watchlist details", err);
                }
            } else {
                setWatchlistStocks([]);
            }
        };

        loadWatchlistData();
    }, [user?.watchlist]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/stocks/quote/${searchQuery}`);
            setSearchedStock(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Stock not found');
            setSearchedStock(null);
        } finally {
            setLoading(false);
        }
    };

    const isSymbolWatchlisted = (symbol) => {
        return user?.watchlist?.includes(symbol.toUpperCase());
    };

    return (
        <div className="w-full relative z-10">
            <header className="mb-10 text-left">
                <h1 className="text-4xl font-extrabold font-display bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                    Market command center
                </h1>
                <p className="text-sm text-slate-400 font-medium">
                    Search global stocks, view indicators, and monitor watchlists in real-time.
                </p>
            </header>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Left Bento Column - Search & Active Search Result */}
                <div className="lg:col-span-1 space-y-6">
                    
                    {/* Search Panel */}
                    <div className="glass-surface rounded-3xl p-6 relative overflow-hidden group">
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all duration-500" />
                        
                        <h2 className="text-lg font-bold font-display text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-cyan-400 rounded-full"></span>
                            Search Asset
                        </h2>
                        
                        <form onSubmit={handleSearch} className="relative flex items-center bg-[#090d16]/80 border border-white/10 rounded-2xl p-1.5 focus-within:border-cyan-400/50 focus-within:ring-1 focus-within:ring-cyan-500/20 transition-all duration-300">
                            <input
                                type="text"
                                placeholder="e.g. AAPL, TSLA, MSFT"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                                className="w-full pl-4 pr-12 py-3 rounded-xl border-none bg-transparent text-white focus:outline-none focus:ring-0 font-bold uppercase placeholder-slate-500"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="absolute right-2.5 p-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white rounded-xl transition-all shadow-lg shadow-cyan-500/10 cursor-pointer disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4 font-bold" />}
                            </button>
                        </form>
                        
                        {error && <p className="mt-3 text-xs text-rose-400 font-semibold pl-1">{error}</p>}
                        
                        <p className="mt-4 text-[11px] text-slate-500 leading-normal">
                            Note: We query real-time market data indexes. Free API slots may occasionally yield rate limit alerts.
                        </p>
                    </div>

                    {/* Search Result Bento Block */}
                    {searchedStock && (
                        <div className="glass-surface rounded-3xl p-6 relative overflow-hidden animate-slide-up">
                            <h2 className="text-lg font-bold font-display text-white mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-brand-500 rounded-full"></span>
                                Search Result
                            </h2>
                            <div className="p-1">
                                <StockCard
                                    stockData={searchedStock}
                                    isWatchlisted={isSymbolWatchlisted(searchedStock.symbol)}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Bento Column - Watchlist Grid */}
                <div className="lg:col-span-2">
                    <div className="glass-surface rounded-3xl p-6 sm:p-8 relative overflow-hidden h-full">
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                            <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-indigo-400 rounded-full"></span>
                                Watchlist Feed
                            </h2>
                            <span className="bg-indigo-950/60 border border-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                {user?.watchlist?.length || 0} Symbols
                            </span>
                        </div>

                        {watchlistStocks.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {watchlistStocks.map((stock) => (
                                    <div key={stock.symbol} className="transition-all duration-300 hover:-translate-y-0.5">
                                        <StockCard
                                            stockData={stock}
                                            isWatchlisted={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center flex flex-col items-center justify-center">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
                                    <Sparkles className="w-8 h-8 text-indigo-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Your watchlist is empty</h3>
                                <p className="text-slate-400 max-w-sm mx-auto text-sm leading-relaxed">
                                    Search for symbols in the left panel and click the bookmark icon to save them to your command dashboard.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;
