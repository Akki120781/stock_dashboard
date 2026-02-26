import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { Sun, Moon, LogOut, LayoutDashboard, User as UserIcon, Shield, Bookmark } from 'lucide-react';

const Navbar = () => {
    const { user, logout, watchlistCount } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to={user ? '/dashboard' : '/login'} className="flex items-center gap-2 text-xl font-bold text-indigo-600 dark:text-indigo-400">
                            <LayoutDashboard className="h-6 w-6" />
                            Stockify
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                        {user ? (
                            <>
                                <div className="hidden md:flex items-center text-sm text-gray-700 dark:text-gray-300 gap-4 mr-4">
                                    <span className="flex items-center gap-1 font-medium bg-indigo-50 dark:bg-gray-700 px-3 py-1 rounded-full">
                                        <UserIcon className="h-4 w-4" /> {user.username}
                                    </span>

                                    {user.role === 'admin' && (
                                        <Link to="/admin" className="flex items-center gap-1 font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-amber-100 dark:hover:bg-gray-600 transition">
                                            <Shield className="h-4 w-4" /> Admin Panel
                                        </Link>
                                    )}

                                    <Link to="/dashboard" className="flex items-center gap-1 font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                                        Dashboard
                                    </Link>

                                    <Link to="/user" className="flex items-center gap-1 font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                                        History
                                    </Link>

                                    <div className="flex items-center gap-1 font-medium text-gray-600 dark:text-gray-300">
                                        <Bookmark className="h-4 w-4" /> Watchlist ({watchlistCount})
                                    </div>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <div className="flex space-x-2">
                                <Link
                                    to="/login"
                                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium font-semibold"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
