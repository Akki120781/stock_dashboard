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
            <div className="bg-orange-50/80 dark:bg-orange-900/40 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-orange-200 dark:border-orange-800 relative z-10 transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                            {symbol}
                        </h3>
                        <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mt-1">API Rate Limit Hit</p>
                    </div>
                    <button
                        onClick={handleWatchlistToggle}
                        className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-slate-700/50 text-slate-400 hover:text-indigo-500 transition-colors z-10 backdrop-blur-md"
                        title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
                    >
                        {isWatchlisted ? (
                            <BookmarkMinus className="h-6 w-6 text-indigo-500 drop-shadow-sm" />
                        ) : (
                            <BookmarkPlus className="h-6 w-6 relative z-10" />
                        )}
                    </button>
                </div>
                <div className="mt-6 p-4 rounded-xl bg-orange-100/50 dark:bg-orange-900/50 border border-orange-200/50 dark:border-orange-800/50">
                    <p className="text-sm text-orange-800 dark:text-orange-300 font-medium">
                        Alpha Vantage restricts data fetches to 5/minute.
                    </p>
                    <p className="text-sm text-orange-700 dark:text-orange-400 mt-1 font-semibold">
                        Please wait 60 seconds for data to load.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <Link to={`/stock/${symbol}`} className="block group h-full">
            <div className="h-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-white/40 dark:border-slate-700/50 transition-all duration-300 relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors tracking-tight">
                            {symbol}
                        </h3>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Current Price</p>
                    </div>
                    <button
                        onClick={handleWatchlistToggle}
                        className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-slate-700/50 text-slate-400 hover:text-indigo-500 transition-colors z-10 backdrop-blur-md"
                        title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
                    >
                        {isWatchlisted ? (
                            <BookmarkMinus className="h-6 w-6 text-indigo-500 drop-shadow-sm" />
                        ) : (
                            <BookmarkPlus className="h-6 w-6" />
                        )}
                    </button>
                </div>

                <div className="flex items-end gap-3 mb-6">
                    <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        ${currentPrice?.toFixed(2)}
                    </span>
                    <div className={`flex items-center gap-1 font-bold ${isPositive ? 'text-emerald-500 drop-shadow-sm' : 'text-rose-500 drop-shadow-sm'}`}>
                        {isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                        <span className="text-lg">{Math.abs(change)?.toFixed(2)}</span>
                        <span className="text-sm bg-white/50 dark:bg-slate-900/50 px-1.5 py-0.5 rounded-md ml-1">({percentageChange?.toFixed(2)}%)</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-slate-200/50 dark:border-slate-700/50 pt-5 mt-2">
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">High</p>
                        <p className="font-bold text-slate-900 dark:text-white mt-1.5">${high?.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Low</p>
                        <p className="font-bold text-slate-900 dark:text-white mt-1.5">${low?.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Prev Close</p>
                        <p className="font-bold text-slate-900 dark:text-white mt-1.5">${previousClose?.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default StockCard;
