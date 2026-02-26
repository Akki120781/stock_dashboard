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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 text-center sm:text-left">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Search stocks and monitor your watchlist.
                    </p>
                </header>

                {/* Search Section */}
                <section className="mb-12">
                    <div className="max-w-xl mx-auto sm:mx-0">
                        <form onSubmit={handleSearch} className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Search symbol (e.g., AAPL, TSLA)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                                className="w-full pl-4 pr-12 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium text-lg uppercase"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Search className="h-6 w-6" />}
                            </button>
                        </form>
                        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400 pl-2">{error}</p>}
                    </div>

                    {/* Search Result */}
                    {searchedStock && (
                        <div className="mt-8">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Search Result</h2>
                            <div className="max-w-md">
                                <StockCard
                                    stockData={searchedStock}
                                    isWatchlisted={isSymbolWatchlisted(searchedStock.symbol)}
                                />
                            </div>
                        </div>
                    )}
                </section>

                {/* Watchlist Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Your Watchlist
                        </h2>
                        <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            {user?.watchlist?.length || 0} Saved
                        </span>
                    </div>

                    {watchlistStocks.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {watchlistStocks.map((stock) => (
                                <StockCard
                                    key={stock.symbol}
                                    stockData={stock}
                                    isWatchlisted={true}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-700 shadow-sm mt-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Your watchlist is empty</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
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
