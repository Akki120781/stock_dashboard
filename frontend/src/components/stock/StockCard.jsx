import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-orange-200 dark:border-orange-800 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {symbol}
                        </h3>
                        <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mt-1">API Rate Limit Hit</p>
                    </div>
                    <button
                        onClick={handleWatchlistToggle}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-indigo-500 transition-colors z-10"
                        title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
                    >
                        {isWatchlisted ? (
                            <BookmarkMinus className="h-6 w-6 text-indigo-500" />
                        ) : (
                            <BookmarkPlus className="h-6 w-6" />
                        )}
                    </button>
                </div>
                <div className="mt-6 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/50">
                    <p className="text-sm text-orange-800 dark:text-orange-300 font-medium">
                        Alpha Vantage restricts data fetches to 5/minute.
                    </p>
                    <p className="text-sm text-orange-700 dark:text-orange-400 mt-1">
                        Please wait 60 seconds for data to load.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <Link to={`/stock/${symbol}`} className="block block group">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {symbol}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Current Price</p>
                    </div>
                    <button
                        onClick={handleWatchlistToggle}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-indigo-500 transition-colors z-10"
                        title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
                    >
                        {isWatchlisted ? (
                            <BookmarkMinus className="h-6 w-6 text-indigo-500" />
                        ) : (
                            <BookmarkPlus className="h-6 w-6" />
                        )}
                    </button>
                </div>

                <div className="flex items-end gap-3 mb-6">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                        ${currentPrice?.toFixed(2)}
                    </span>
                    <div className={`flex items-center gap-1 font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                        <span className="text-lg">{Math.abs(change)?.toFixed(2)}</span>
                        <span className="text-sm">({percentageChange?.toFixed(2)}%)</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">High</p>
                        <p className="font-semibold text-gray-900 dark:text-white mt-1">${high?.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Low</p>
                        <p className="font-semibold text-gray-900 dark:text-white mt-1">${low?.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Prev Close</p>
                        <p className="font-semibold text-gray-900 dark:text-white mt-1">${previousClose?.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default StockCard;
