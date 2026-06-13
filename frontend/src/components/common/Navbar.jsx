"use client";

import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  LogOut, 
  LayoutDashboard, 
  User as UserIcon, 
  Shield, 
  Bookmark, 
  Clock3, 
  Menu, 
  X 
} from 'lucide-react';
import { BullLogo } from '../ui/bull-logo';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { user, logout, watchlistCount } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const menuItems = [
    { 
      icon: <LayoutDashboard className="size-4" />, 
      label: "Dashboard", 
      href: "/dashboard", 
      gradient: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(8,145,178,0.06) 50%, rgba(21,128,61,0) 100%)", 
      iconColor: "group-hover:text-cyan-400" 
    },
    { 
      icon: <Clock3 className="size-4" />, 
      label: "History", 
      href: "/user", 
      gradient: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(2,132,199,0.06) 50%, rgba(194,65,12,0) 100%)", 
      iconColor: "group-hover:text-sky-400" 
    },
    ...(user?.role === 'admin' ? [{ 
      icon: <Shield className="size-4" />, 
      label: "Admin", 
      href: "/admin", 
      gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)", 
      iconColor: "group-hover:text-orange-500" 
    }] : [])
  ];

  const itemVariants = {
    initial: { rotateX: 0, opacity: 1 },
    hover: { rotateX: -90, opacity: 0 },
  };

  const backVariants = {
    initial: { rotateX: 90, opacity: 0 },
    hover: { rotateX: 0, opacity: 1 },
  };

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: {
      opacity: 1,
      scale: 1.8,
      transition: {
        opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        scale: { duration: 0.4, type: "spring", stiffness: 300, damping: 25 },
      },
    },
  };

  const sharedTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    duration: 0.4,
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between rounded-lg px-3 transition duration-300 sm:px-5",
          scrolled
            ? "glass-surface bg-slate-950/62"
            : "border border-white/8 bg-white/[0.035] backdrop-blur-sm",
        )}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-left"
        >
          <span className="flex size-10 items-center justify-center rounded-lg border border-red-500/20 bg-red-950/40 text-red-500">
            <BullLogo className="size-5" />
          </span>
          <span className="text-base font-semibold tracking-tight text-white">BullTrade</span>
        </Link>

        {/* 3D Nav Items */}
        <ul className="hidden items-center gap-1.5 lg:flex relative z-10">
          {menuItems.map((item) => (
            <motion.li key={item.label} className="relative" initial="initial" whileHover="hover">
              <motion.div
                className="block rounded-xl overflow-visible group relative"
                style={{ perspective: "600px" }}
                whileHover="hover"
                initial="initial"
              >
                {/* Glow Background */}
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none rounded-xl"
                  variants={glowVariants}
                  style={{
                    background: item.gradient,
                    opacity: 0,
                  }}
                />
                
                {/* Front */}
                <motion.div
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center bottom"
                  }}
                  variants={itemVariants}
                  transition={sharedTransition}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-3.5 py-2 relative z-10 bg-transparent text-slate-300 group-hover:text-white transition-colors rounded-xl text-sm font-medium cursor-pointer"
                  >
                    <span className={cn("transition-colors duration-300", item.iconColor)}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </motion.div>

                {/* Back */}
                <motion.div
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center top",
                    transform: "rotateX(90deg)"
                  }}
                  className="absolute inset-0"
                  variants={backVariants}
                  transition={sharedTransition}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-3.5 py-2 relative z-10 bg-transparent text-slate-300 group-hover:text-white transition-colors rounded-xl text-sm font-medium cursor-pointer"
                  >
                    <span className={cn("transition-colors duration-300", item.iconColor)}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.li>
          ))}
        </ul>

        {/* Right Side Controls */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-800/50 hover:text-white transition cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
          </button>

          {/* User Watchlist count badge */}
          {user && (
            <div className="flex items-center gap-1.5 font-semibold text-slate-400 text-xs">
              <Bookmark className="size-4 text-cyan-400" />
              <span>Watchlist ({watchlistCount})</span>
            </div>
          )}

          {/* User Username display */}
          {user && (
            <span className="flex items-center gap-1.5 font-medium bg-slate-900/60 border border-white/10 px-3 py-1.5 rounded-xl text-slate-200 text-xs">
              <UserIcon className="size-3.5 text-cyan-400" />
              <span>{user.username}</span>
            </span>
          )}

          {/* Logout Trigger */}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-950/40 border border-red-500/20 text-red-500 hover:bg-red-900/30 px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-lg shadow-red-500/5 hover:scale-[1.02] active:scale-[0.98]"
            >
              <LogOut className="size-3.5" />
              <span>Logout</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl text-sm font-bold text-slate-300 hover:text-white transition cursor-pointer inline-flex items-center justify-center"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-cyan-600/10 transition cursor-pointer hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          aria-label="Open navigation"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/8 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="glass-surface mx-auto mt-2 max-w-7xl rounded-lg p-3 lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-200 hover:bg-white/8 flex items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
            
            {user ? (
              <div className="mt-3 border-t border-white/10 pt-3 flex flex-col gap-2">
                <div className="flex justify-between items-center px-3 text-xs text-slate-400">
                  <span>Logged in as {user.username}</span>
                  <span>Watchlist: {watchlistCount}</span>
                </div>
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="w-full bg-red-950/40 border border-red-500/20 text-red-500 hover:bg-red-900/30 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-bold text-slate-300 hover:text-white transition cursor-pointer inline-flex items-center justify-center border border-white/10"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-cyan-600/10 transition cursor-pointer inline-flex items-center justify-center"
                >
                  Get Started
                </Link>
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
