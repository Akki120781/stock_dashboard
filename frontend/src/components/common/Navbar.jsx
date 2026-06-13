"use client";

import React, { useContext, useState, useEffect } from 'react';
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
  X 
} from 'lucide-react';
import { BullLogo } from '../ui/bull-logo';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const MotionLink = motion(Link);

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
          "flex h-14 max-w-none w-full items-center justify-between rounded-lg px-3 transition duration-300 sm:px-4",
          scrolled
            ? "glass-surface bg-slate-950/62"
            : "border border-white/8 bg-white/[0.035] backdrop-blur-sm",
        )}
      >
        {/* Brand Logo - compact layout */}
        <Link
          href="/"
          className="flex items-center gap-2 text-left"
        >
          <span className="flex size-8.5 items-center justify-center rounded-lg border border-red-500/20 bg-red-950/40 text-red-500">
            <BullLogo className="size-4.5" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-white">BullTrade</span>
        </Link>

        {/* 3D Nav Items with small spacing and text-xs */}
        <ul className="hidden items-center gap-1 lg:flex relative z-10">
          {menuItems.map((item) => (
            <motion.li key={item.label} className="relative" initial="initial" whileHover="hover">
              <motion.div
                className="block rounded-lg overflow-visible group relative"
                style={{ perspective: "600px" }}
                whileHover="hover"
                initial="initial"
              >
                {/* Glow Background */}
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none rounded-lg"
                  variants={glowVariants}
                  style={{
                    background: item.gradient,
                    opacity: 0,
                  }}
                />
                
                {/* Front */}
                <MotionLink
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 relative z-10 bg-transparent text-slate-300 group-hover:text-white transition-colors rounded-lg text-[11px] font-medium cursor-pointer"
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center bottom"
                  }}
                >
                  <span className={cn("transition-colors duration-300", item.iconColor)}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </MotionLink>

                {/* Back */}
                <MotionLink
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 absolute inset-0 z-10 bg-transparent text-slate-300 group-hover:text-white transition-colors rounded-lg text-[11px] font-medium cursor-pointer"
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center top",
                    transform: "rotateX(90deg)"
                  }}
                >
                  <span className={cn("transition-colors duration-300", item.iconColor)}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </MotionLink>
              </motion.div>
            </motion.li>
          ))}
        </ul>

        {/* Right Side Controls - compact spacing */}
        <div className="hidden items-center gap-3 md:flex">
          
          {/* User Watchlist count badge */}
          {user && (
            <div className="flex items-center gap-1 font-semibold text-slate-400 text-[10px]">
              <Bookmark className="size-3.5 text-cyan-400" />
              <span>Watchlist ({watchlistCount})</span>
            </div>
          )}

          {/* User Username display */}
          {user && (
            <span className="flex items-center gap-1 font-medium bg-slate-900/60 border border-white/10 px-2.5 py-1 rounded-lg text-slate-200 text-[10px]">
              <UserIcon className="size-3 text-cyan-400" />
              <span>{user.username}</span>
            </span>
          )}

          {/* Logout Trigger */}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-950/40 border border-red-500/20 text-red-500 hover:bg-red-900/30 px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer shadow-md shadow-red-500/5 hover:scale-[1.02] active:scale-[0.98]"
            >
              <LogOut className="size-3" />
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
          className="inline-flex size-8.5 items-center justify-center rounded-lg border border-white/10 bg-white/8 text-white lg:hidden"
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
            className="glass-surface mx-auto mt-2 max-w-7xl rounded-lg p-2.5 lg:hidden"
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
                  className="rounded-lg px-2.5 py-2 text-left text-xs font-medium text-slate-200 hover:bg-white/8 flex items-center gap-1.5"
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
