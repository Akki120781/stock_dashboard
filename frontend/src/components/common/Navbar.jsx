import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { Sun, Moon, LogOut, LayoutDashboard, User as UserIcon, Shield, Bookmark, Activity } from 'lucide-react';
import { BullLogo } from '../ui/bull-logo';

const Navbar = ({ openAuth }) => {
    const { user, logout, watchlistCount } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [isScrolled, setIsScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const isLandingPage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        if (isLandingPage) {
            window.addEventListener('scroll', handleScroll);
            // check initial scroll
            handleScroll();
        } else {
            setIsScrolled(true);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLandingPage]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const tabs = [
        { id: 'markets', label: 'Markets' },
        { id: 'watchlist', label: 'Watchlist' },
        { id: 'analytics', label: 'Analytics' },
        { id: 'pricing', label: 'Pricing' },
        { id: 'about', label: 'About' }
    ];

    const handleTabClick = (idx) => {
        setActiveTab(idx);
        const showcase = document.getElementById("showcase-section");
        if (showcase) {
            showcase.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Style classes based on scroll state
    const navbarBgClass = isLandingPage
        ? (isScrolled 
            ? 'bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md shadow-lg border-b border-slate-200/40 dark:border-slate-800/40 py-3 mx-4 my-3 rounded-2xl max-w-7xl lg:mx-auto' 
            : 'bg-transparent border-b border-transparent py-5')
        : 'bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md shadow-lg border-b border-slate-200/40 dark:border-slate-800/40 py-3 mx-4 my-3 rounded-2xl max-w-7xl lg:mx-auto';

    return (
        <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 w-full`}>
            <div className={`transition-all duration-300 ${navbarBgClass}`}>
                <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
                    
                    {/* Logo Branding */}
                    <div className="flex items-center">
                        <Link 
                            to="/" 
                            className="flex items-center gap-2 text-xl font-black text-indigo-600 dark:text-brand-400 tracking-tight"
                        >
                            <div className="w-8 h-8 bg-red-950/40 border border-red-500/20 rounded-lg flex items-center justify-center shadow-md">
                                <BullLogo className="h-5.5 w-5.5" />
                            </div>
                            <span className={isLandingPage && !isScrolled ? 'text-white' : 'text-slate-900 dark:text-white'}>
                                BullTrade
                            </span>
                        </Link>
                    </div>

                    {/* Middle Tab Items (Only visible to guests on Landing page) */}
                    {!user && isLandingPage && (
                        <div className="hidden lg:block relative">
                            <div className="relative flex bg-slate-950/40 border border-white/5 p-1 rounded-full backdrop-blur-xl">
                                {/* Sliding pill */}
                                <div 
                                    className="absolute top-1 bottom-1 bg-indigo-600/10 border border-indigo-500/20 dark:bg-brand-500/10 dark:border-brand-500/20 rounded-full transition-all duration-300 ease-out"
                                    style={{ 
                                        width: '86px', 
                                        transform: `translateX(${activeTab * 86}px)` 
                                    }}
                                />
                                {tabs.map((tab, idx) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabClick(idx)}
                                        className={`relative z-10 py-1 text-[11px] font-extrabold uppercase tracking-widest transition-colors duration-300 cursor-pointer ${
                                            activeTab === idx ? 'text-indigo-400 dark:text-brand-400' : 'text-slate-400 hover:text-white'
                                        }`}
                                        style={{ width: '86px' }}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Right Side Navigation Actions */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100/50 dark:text-gray-400 dark:hover:bg-slate-800/50 transition cursor-pointer"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                        {user ? (
                            <>
                                {/* Logged In Navigation */}
                                <div className="hidden md:flex items-center text-sm text-gray-700 dark:text-gray-300 gap-4 mr-2">
                                    <span className="flex items-center gap-1 font-medium bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                        <UserIcon className="h-4 w-4" /> {user.username}
                                    </span>

                                    {user.role === 'admin' && (
                                        <Link to="/admin" className="flex items-center gap-1 font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border border-amber-500/10 px-3 py-1 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30 transition">
                                            <Shield className="h-4 w-4" /> Admin Panel
                                        </Link>
                                    )}

                                    <Link to="/dashboard" className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-brand-400 transition">
                                        Dashboard
                                    </Link>

                                    <Link to="/user" className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-brand-400 transition">
                                        History
                                    </Link>

                                    <div className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300">
                                        <Bookmark className="h-4 w-4" /> Watchlist ({watchlistCount})
                                    </div>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link
                                    to="/login"
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition cursor-pointer inline-flex items-center justify-center ${
                                        isLandingPage && !isScrolled
                                            ? 'text-white hover:text-indigo-400'
                                            : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-brand-400'
                                    }`}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-brand-500 dark:hover:bg-brand-600 dark:text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-indigo-600/10 dark:shadow-brand-500/10 transition cursor-pointer hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center"
                                >
                                    Get Started
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
