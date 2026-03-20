import React, { useState, useEffect, useContext } from 'react';
import { Search, Loader2 } from 'lucide-react';
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
        // Initial fetch of watchlist counts
        fetchWatchlist();
    }, []);

    useEffect(() => {
        // Fetch detailed data for each symbol in user's watchlist
        const loadWatchlistData = async () => {
            if (user?.watchlist?.length > 0) {
                try {
                    const validStocks = [];
                    for (const symbol of user.watchlist) {
                        try {
                            const res = await api.get(`/stocks/quote/${symbol}`);
                            if (res.data) validStocks.push(res.data);
                            // 500ms delay to prevent tripping Alpha Vantage rate limits
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
        <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-brand-300 dark:bg-brand-900/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
            <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-indigo-300 dark:bg-indigo-900/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[45rem] h-[45rem] bg-purple-300 dark:bg-purple-900/50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10 animate-fade-in">
                <header className="mb-10 text-center sm:text-left">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600 dark:from-brand-400 dark:to-indigo-400 mb-2">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-base text-slate-600 dark:text-slate-400 font-medium">
                        Search stocks and monitor your watchlist in real-time.
                    </p>
                </header>

                {/* Search Section */}
                <section className="mb-12">
                    <div className="max-w-xl mx-auto sm:mx-0 glass-panel p-2 rounded-2xl shadow-lg">
                        <form onSubmit={handleSearch} className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Search symbol (e.g., AAPL, TSLA)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                                className="w-full pl-5 pr-14 py-4 rounded-xl border-none bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-0 transition-all font-semibold text-lg uppercase placeholder-slate-400"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="absolute right-2 p-3 bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white rounded-xl transition-all shadow-md disabled:opacity-50 transform hover:scale-105 active:scale-95"
                            >
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5 font-bold" />}
                            </button>
                        </form>
                    </div>
                    {error && <p className="mt-3 text-sm text-red-500 font-medium pl-4 animate-slide-up">{error}</p>}

                    {/* Search Result */}
                    {searchedStock && (
                        <div className="mt-10 animate-slide-up">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center">
                                <span className="w-2 h-8 bg-brand-500 rounded-full mr-3"></span>
                                Search Result
                            </h2>
                            <div className="max-w-md">
                                <div className="glass-panel rounded-2xl p-1 transition-transform hover:-translate-y-1 duration-300">
                                    <StockCard
                                        stockData={searchedStock}
                                        isWatchlisted={isSymbolWatchlisted(searchedStock.symbol)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* Watchlist Section */}
                <section className="mt-16">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800/50">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center">
                            <span className="w-2 h-8 bg-indigo-500 rounded-full mr-3"></span>
                            Your Watchlist
                        </h2>
                        <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                            {user?.watchlist?.length || 0} Saved
                        </span>
                    </div>

                    {watchlistStocks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {watchlistStocks.map((stock, idx) => (
                                <div key={stock.symbol} className="glass-panel rounded-2xl p-1 transition-all hover:shadow-xl hover:-translate-y-1 duration-300 animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                    <StockCard
                                        stockData={stock}
                                        isWatchlisted={true}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="glass-panel rounded-3xl p-16 text-center shadow-lg mt-8 animate-fade-in flex flex-col items-center justify-center">
                            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
                                <Search className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 tracking-tight">Your watchlist is pristine</h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-lg leading-relaxed">
                                Search for your favorite stocks above and click the bookmark icon to save them here for quick access.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default DashboardPage;
