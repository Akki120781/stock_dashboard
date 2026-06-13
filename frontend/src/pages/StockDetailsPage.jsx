"use client";

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import ChartComponent from '../components/stock/ChartComponent';
import { ArrowLeft, Send, BarChart2 } from 'lucide-react';
import LoadingScreen from '../components/common/LoadingScreen';

const StockDetailsPage = () => {
    const { symbol } = useParams();
    const router = useRouter();
    const { user } = useContext(AuthContext);

    const [quote, setQuote] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [tradeType, setTradeType] = useState('buy');
    const [quantity, setQuantity] = useState(1);
    const [tradeLoading, setTradeLoading] = useState(false);
    const [tradeMessage, setTradeMessage] = useState(null);

    useEffect(() => {
        const fetchStockData = async () => {
            setLoading(true);
            try {
                const quoteRes = await api.get(`/stocks/quote/${symbol}`);
                setQuote(quoteRes.data);

                await new Promise(resolve => setTimeout(resolve, 500));

                try {
                    const historyRes = await api.get(`/stocks/history/${symbol}`);
                    setHistory(historyRes.data);
                } catch (historyErr) {
                    console.error('History API rate limited, skipping chart.', historyErr);
                    setHistory([]);
                }
            } catch (err) {
                setError('Error loading stock data. Verify the symbol or check if API rate limits (25/day) are exceeded.');
            } finally {
                setLoading(false);
            }
        };

        if (symbol) fetchStockData();
    }, [symbol]);

    const handleTradeSubmit = async (e) => {
        e.preventDefault();
        if (!quote) return;

        setTradeLoading(true);
        setTradeMessage(null);
        try {
            await api.post('/transactions', {
                stockSymbol: symbol,
                type: tradeType,
                quantity: Number(quantity),
                price: quote.currentPrice
            });
            setTradeMessage({ type: 'success', text: 'Transaction registered successfully. Pending approval.' });
            setQuantity(1);
        } catch (err) {
            setTradeMessage({ type: 'error', text: err.response?.data?.message || 'Transaction failed.' });
        } finally {
            setTradeLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="h-[70vh] flex items-center justify-center">
                <LoadingScreen inline={true} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-[70vh] flex flex-col items-center justify-center text-center">
                <p className="text-rose-400 font-semibold text-lg max-w-md">{error}</p>
                <button
                    onClick={() => router.back()}
                    className="mt-6 flex items-center text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                    <ArrowLeft className="h-4 w-4 mr-1.5" /> Go back
                </button>
            </div>
        );
    }

    return (
        <div className="w-full relative z-10 animate-fade-in">
            {/* Back Trigger */}
            <button
                onClick={() => router.back()}
                className="flex items-center text-sm font-bold text-slate-400 hover:text-white mb-8 transition-colors cursor-pointer"
            >
                <ArrowLeft className="h-4.5 w-4.5 mr-2" /> Back to command
            </button>

            {/* Premium Header Details card */}
            <div className="glass-surface rounded-3xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-48 bg-gradient-to-l from-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center">
                        <BarChart2 className="h-7 w-7 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold font-display text-white uppercase tracking-tight">
                            {symbol}
                        </h1>
                        <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Real-time Stock Intel</p>
                    </div>
                </div>
                
                <div className="text-center md:text-right">
                    <span className="text-5xl font-black font-display text-white block tracking-tight">
                        ${quote?.currentPrice?.toFixed(2)}
                    </span>
                    <span className={`text-lg font-bold inline-flex items-center gap-1 mt-1.5 ${quote?.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {quote?.change >= 0 ? '+' : ''}{quote?.change?.toFixed(2)} ({quote?.percentageChange?.toFixed(2)}%)
                    </span>
                </div>
            </div>

            {/* Bento details grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Columns - Chart & Statistics */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Performance Chart card */}
                    <div className="p-0.5 rounded-3xl overflow-hidden">
                        <ChartComponent data={history} symbol={symbol} />
                    </div>

                    {/* Stock stats card */}
                    <div className="glass-surface rounded-3xl p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                        <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">High Today</p>
                            <p className="text-xl font-bold text-white font-display">${quote?.high?.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Low Today</p>
                            <p className="text-xl font-bold text-white font-display">${quote?.low?.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Prev Close</p>
                            <p className="text-xl font-bold text-white font-display">${quote?.previousClose?.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Volatility Status</p>
                            <p className="text-xl font-bold text-emerald-400">Stable</p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Execution Trade Panel */}
                <div className="lg:col-span-1">
                    <div className="glass-surface rounded-3xl p-6 sm:p-8 sticky top-24 relative overflow-hidden">
                        <h3 className="text-xl font-bold font-display text-white mb-6 flex items-center">
                            <span className="w-1.5 h-6 bg-cyan-400 rounded-full mr-2"></span>
                            Execute Trade
                        </h3>

                        {tradeMessage && (
                            <div className={`p-4 rounded-2xl text-xs mb-6 font-semibold text-center border ${
                                tradeMessage.type === 'success' 
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            }`}>
                                {tradeMessage.text}
                            </div>
                        )}

                        <form onSubmit={handleTradeSubmit} className="space-y-6">
                            
                            {/* Order Type selector */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Order Type</label>
                                <div className="grid grid-cols-2 gap-3 p-1 bg-[#090d16]/80 border border-white/15 rounded-2xl">
                                    <button
                                        type="button"
                                        onClick={() => setTradeType('buy')}
                                        className={`py-2.5 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                                            tradeType === 'buy' 
                                                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10' 
                                                : 'text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        Buy
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTradeType('sell')}
                                        className={`py-2.5 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                                            tradeType === 'sell' 
                                                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/10' 
                                                : 'text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        Sell
                                    </button>
                                </div>
                            </div>

                            {/* Shares Input */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Quantity (Shares)</label>
                                <input
                                    type="number"
                                    min="1"
                                    required
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#090d16]/80 border border-white/15 rounded-2xl text-white font-bold text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all shadow-inner"
                                />
                            </div>

                            {/* Estimation Summary */}
                            <div className="pt-5 border-t border-white/10">
                                <div className="flex justify-between items-center text-base font-bold text-slate-400 mb-6">
                                    <span>Est. Cost</span>
                                    <span className="text-xl text-white font-display font-black">
                                        ${(quantity * (quote?.currentPrice || 0)).toFixed(2)}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={tradeLoading}
                                    className={`w-full flex justify-center items-center py-4 px-4 rounded-2xl text-white font-extrabold text-sm uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] ${
                                        tradeType === 'buy' 
                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/15' 
                                            : 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 shadow-lg shadow-rose-500/15'
                                    }`}
                                >
                                    {tradeLoading ? 'Processing...' : (
                                        <>
                                            <Send className="h-4 w-4 mr-2" />
                                            Submit {tradeType} order
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockDetailsPage;
