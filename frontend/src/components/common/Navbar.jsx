"use client";

import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { Sun, Moon, LogOut, LayoutDashboard, User as UserIcon, Shield, Bookmark } from 'lucide-react';
import { BullLogo } from '../ui/bull-logo';

const Navbar = () => {
    const { user, logout, watchlistCount } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const router = useRouter();
    const pathname = usePathname();

    const [isScrolled, setIsScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const isLandingPage = pathname === '/';

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
            handleScroll();
        } else {
            setIsScrolled(true);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLandingPage]);

    const handleLogout = () => {
        logout();
        router.push('/');
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

    // Premium dark glass styling for navbar
    const navbarBgClass = isLandingPage
        ? (isScrolled 
            ? 'glass-surface bg-[#050812]/80 backdrop-blur-md shadow-lg py-3 mx-4 my-3 rounded-2xl max-w-7xl lg:mx-auto border border-white/10' 
            : 'bg-transparent border-b border-transparent py-5')
        : 'glass-surface bg-[#050812]/80 backdrop-blur-md shadow-lg py-3 mx-4 my-3 rounded-2xl max-w-7xl lg:mx-auto border border-white/10';

    return (
        <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-300 w-full px-4">
            <div className={`transition-all duration-300 ${navbarBgClass}`}>
                <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
                    
                    {/* Logo Branding */}
                    <div className="flex items-center">
                        <Link 
                            href="/" 
                            className="flex items-center gap-2.5 text-xl font-black text-indigo-400 dark:text-brand-400 tracking-tight"
                        >
                            <div className="w-8 h-8 bg-red-950/40 border border-red-500/20 rounded-lg flex items-center justify-center shadow-md">
                                <BullLogo className="h-5.5 w-5.5" />
                            </div>
                            <span className="text-white">
                                BullTrade
                            </span>
                        </Link>
                    </div>

                    {/* Middle Tab Items (Only visible to guests on Landing page) */}
                    {!user && isLandingPage && (
                        <div className="hidden lg:block relative">
                            <div className="relative flex bg-slate-950/40 border border-white/5 p-1 rounded-full backdrop-blur-xl">
                                <div 
                                    className="absolute top-1 bottom-1 bg-brand-500/10 border border-brand-500/20 rounded-full transition-all duration-300 ease-out"
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
                                            activeTab === idx ? 'text-brand-400' : 'text-slate-400 hover:text-white'
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
                            className="p-2 rounded-full text-slate-400 hover:bg-slate-800/50 hover:text-white transition cursor-pointer"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                        {user ? (
                            <>
                                {/* Logged In Navigation */}
                                <div className="hidden md:flex items-center text-sm text-slate-300 gap-5 mr-2">
                                    <span className="flex items-center gap-1.5 font-medium bg-slate-900/60 border border-white/10 px-3.5 py-1 rounded-full text-slate-200">
                                        <UserIcon className="h-4 w-4 text-brand-400" /> {user.username}
                                    </span>

                                    {user.role === 'admin' && (
                                        <Link href="/admin" className="flex items-center gap-1.5 font-semibold text-amber-400 bg-amber-950/20 border border-amber-500/20 px-3 py-1 rounded-full hover:bg-amber-900/30 transition">
                                            <Shield className="h-4 w-4" /> Admin
                                        </Link>
                                    )}

                                    <Link href="/dashboard" className={`flex items-center gap-1 font-semibold transition ${pathname === '/dashboard' ? 'text-brand-400' : 'text-slate-400 hover:text-white'}`}>
                                        Dashboard
                                    </Link>

                                    <Link href="/user" className={`flex items-center gap-1 font-semibold transition ${pathname === '/user' ? 'text-brand-400' : 'text-slate-400 hover:text-white'}`}>
                                        History
                                    </Link>

                                    <div className="flex items-center gap-1.5 font-semibold text-slate-400">
                                        <Bookmark className="h-4 w-4 text-brand-400" /> Watchlist ({watchlistCount})
                                    </div>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-red-650 hover:bg-red-650/80 text-white px-4 py-2 rounded-xl text-sm font-bold transition cursor-pointer shadow-lg shadow-red-600/10 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 rounded-xl text-sm font-bold text-slate-300 hover:text-white transition cursor-pointer inline-flex items-center justify-center"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
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
