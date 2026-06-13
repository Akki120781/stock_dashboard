"use client";

import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';
import { 
  LogOut, 
  LayoutDashboard, 
  User as UserIcon, 
  Shield, 
  Bookmark, 
  Clock3, 
  Menu, 
  TrendingUp,
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { user, logout, watchlistCount } = useContext(AuthContext);
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
      icon: <LayoutDashboard className="size-3.5" />, 
      label: "Dashboard", 
      href: "/dashboard", 
      gradient: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(8,145,178,0.06) 50%, rgba(21,128,61,0) 100%)", 
      iconColor: "group-hover:text-cyan-400" 
    },
    { 
      icon: <Clock3 className="size-3.5" />, 
      label: "History", 
      href: "/user", 
      gradient: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(2,132,199,0.06) 50%, rgba(194,65,12,0) 100%)", 
      iconColor: "group-hover:text-sky-400" 
    },
    ...(user?.role === 'admin' ? [{ 
      icon: <Shield className="size-3.5" />, 
      label: "Admin", 
      href: "/admin", 
      gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)", 
      iconColor: "group-hover:text-orange-500" 
    }] : [])
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <div
        className={cn(
          "mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center rounded-lg px-3 transition duration-300 sm:px-5",
          scrolled
            ? "glass-surface bg-slate-950/64"
            : "border border-white/10 bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl",
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-3 text-left"
        >
          <span className="flex size-10 items-center justify-center rounded-lg border border-cyan-200/20 bg-cyan-200/10 text-cyan-200 shadow-[0_0_30px_rgba(103,232,249,0.12)]">
            <TrendingUp className="size-5" />
          </span>
          <span className="text-base font-semibold tracking-tight text-white">BullTrade</span>
        </Link>

        <ul className="relative z-10 hidden items-center justify-center gap-1 rounded-lg border border-white/10 bg-slate-950/30 p-1 backdrop-blur-xl lg:flex">
          {menuItems.map((item) => (
            <motion.li key={item.label} className="relative">
              {pathname === item.href && (
                <motion.span
                  layoutId="authenticated-nav-active"
                  className="absolute inset-0 rounded-lg border border-cyan-200/20 bg-cyan-200/10 shadow-[0_0_30px_rgba(103,232,249,0.12)]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <Link
                href={item.href}
                className={cn(
                  "relative z-10 flex w-32 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition",
                  pathname === item.href
                    ? "text-cyan-100"
                    : "text-slate-400 hover:bg-white/6 hover:text-white",
                )}
              >
                <span className={cn("transition-colors duration-300", item.iconColor)}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="hidden items-center justify-end gap-2 md:flex">
          {user && (
            <div className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.045] px-3 text-xs font-semibold text-slate-300">
              <Bookmark className="size-4 text-cyan-300" />
              <span>Watchlist ({watchlistCount})</span>
            </div>
          )}

          {user && (
            <span className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.045] px-3 text-xs font-semibold text-slate-200">
              <UserIcon className="size-4 text-cyan-300" />
              <span>{user.username}</span>
            </span>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="flex h-10 items-center gap-2 rounded-lg border border-rose-300/20 bg-rose-300/10 px-3 text-xs font-bold text-rose-200 shadow-md shadow-rose-500/5 transition hover:bg-rose-300/16"
            >
              <LogOut className="size-4" />
              <span>Logout</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-300 hover:text-white transition cursor-pointer inline-flex items-center justify-center"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold shadow-sm shadow-cyan-600/10 transition cursor-pointer hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          aria-label="Open navigation"
          className="justify-self-end inline-flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/8 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
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
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-3 text-left text-sm font-semibold hover:bg-white/8",
                    pathname === item.href ? "bg-cyan-200/10 text-cyan-100" : "text-slate-200",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
            
            {user ? (
              <div className="mt-2.5 border-t border-white/10 pt-2.5 flex flex-col gap-1.5">
                <div className="flex justify-between items-center px-2 text-[10px] text-slate-400">
                  <span>Logged in as {user.username}</span>
                  <span>Watchlist: {watchlistCount}</span>
                </div>
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="w-full bg-red-950/40 border border-red-500/20 text-red-500 hover:bg-red-900/30 py-2 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1.5"
                >
                  <LogOut className="size-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-2.5 grid grid-cols-2 gap-1.5">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer inline-flex items-center justify-center border border-white/10"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md shadow-cyan-600/10 transition cursor-pointer inline-flex items-center justify-center"
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
