import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import ChartComponent from '../components/stock/ChartComponent';
import { ArrowLeft, Send } from 'lucide-react';

const StockDetailsPage = () => {
    const { symbol } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [quote, setQuote] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Trading form state
    const [tradeType, setTradeType] = useState('buy');
    const [quantity, setQuantity] = useState(1);
    const [tradeLoading, setTradeLoading] = useState(false);
    const [tradeMessage, setTradeMessage] = useState(null);

    useEffect(() => {
        const fetchStockData = async () => {
            setLoading(true);
            try {
                // Fetch sequentially to prevent Alpha Vantage 5-requests/minute limit trip
                const quoteRes = await api.get(`/stocks/quote/${symbol}`);
                setQuote(quoteRes.data);

                // Delay 500ms
                await new Promise(resolve => setTimeout(resolve, 500));

                try {
                    const historyRes = await api.get(`/stocks/history/${symbol}`);
                    setHistory(historyRes.data);
                } catch (historyErr) {
                    console.error('History API rate limited, skipping chart.', historyErr);
                    setHistory([]);
                }
            } catch (err) {
                setError('Error loading stock data. Please verify the symbol or check if API rate limits (25/day) are exceeded.');
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
        return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-gray-100">Loading comprehensive data...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500 dark:bg-gray-900">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back
                </button>

                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight">
                            {symbol}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">Real-time Stock Information</p>
                    </div>
                    <div className="text-right">
                        <span className="text-5xl font-black text-gray-900 dark:text-white block">
                            ${quote?.currentPrice?.toFixed(2)}
                        </span>
                        <span className={`text-xl font-bold ${quote?.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {quote?.change >= 0 ? '+' : ''}{quote?.change?.toFixed(2)} ({quote?.percentageChange?.toFixed(2)}%)
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <ChartComponent data={history} symbol={symbol} />

                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 grid grid-cols-2 sm:grid-cols-4 gap-6">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">High Today</p>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">${quote?.high?.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Low Today</p>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">${quote?.low?.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Prev Close</p>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">${quote?.previousClose?.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Market Volatility</p>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">Active</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Execute Trade</h3>

                            {tradeMessage && (
                                <div className={`p-4 rounded-xl text-sm mb-6 font-medium ${tradeMessage.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                    {tradeMessage.text}
                                </div>
                            )}

                            <form onSubmit={handleTradeSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Order Type</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setTradeType('buy')}
                                            className={`py-3 px-4 rounded-xl font-bold text-sm transition-colors ${tradeType === 'buy' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                                        >
                                            Buy
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setTradeType('sell')}
                                            className={`py-3 px-4 rounded-xl font-bold text-sm transition-colors ${tradeType === 'sell' ? 'bg-red-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                                        >
                                            Sell
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Shares</label>
                                    <input
                                        type="number"
                                        min="1"
                                        required
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex justify-between items-center text-lg font-bold text-gray-900 dark:text-white mb-6">
                                        <span>Estimated Total</span>
                                        <span>${(quantity * (quote?.currentPrice || 0)).toFixed(2)}</span>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={tradeLoading}
                                        className={`w-full flex justify-center items-center py-4 px-4 rounded-xl text-white font-bold text-lg transition-all ${tradeType === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} disabled:opacity-50`}
                                    >
                                        {tradeLoading ? 'Processing...' : (
                                            <>
                                                <Send className="h-5 w-5 mr-2" />
                                                Place {tradeType.toUpperCase()} Order
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockDetailsPage;
