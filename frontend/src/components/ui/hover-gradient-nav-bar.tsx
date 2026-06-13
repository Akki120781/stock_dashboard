'use client'
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Home, User, BarChart3, HelpCircle, TrendingUp, Activity, DollarSign } from 'lucide-react';

// --- HoverGradientNavBar Component ---

interface HoverGradientMenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  gradient: string;
  iconColor: string;
  action: "home" | "scroll" | "auth" | "scroll-why";
}

interface HoverGradientNavBarProps {
  onAuth?: () => void;
}

const menuItems: HoverGradientMenuItem[] = [
  { icon: <Home className="h-4 w-4 md:h-5 md:w-5" />, label: "Home", href: "#", gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)", iconColor: "group-hover:text-blue-500 dark:group-hover:text-blue-400", action: "home" },
  { icon: <TrendingUp className="h-4 w-4 md:h-5 md:w-5" />, label: "Markets", href: "#markets", gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)", iconColor: "group-hover:text-orange-500 dark:group-hover:text-orange-400", action: "scroll" },
  { icon: <Activity className="h-4 w-4 md:h-5 md:w-5" />, label: "Features", href: "#watchlist", gradient: "radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(126,34,206,0.06) 50%, rgba(88,28,135,0) 100%)", iconColor: "group-hover:text-purple-500 dark:group-hover:text-purple-400", action: "scroll" },
  { icon: <BarChart3 className="h-4 w-4 md:h-5 md:w-5" />, label: "Analytics", href: "#analytics", gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)", iconColor: "group-hover:text-green-500 dark:group-hover:text-green-400", action: "scroll" },
  { icon: <DollarSign className="h-4 w-4 md:h-5 md:w-5" />, label: "Pricing", href: "#pricing", gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)", iconColor: "group-hover:text-blue-500 dark:group-hover:text-blue-400", action: "scroll" },
  { icon: <HelpCircle className="h-4 w-4 md:h-5 md:w-5" />, label: "Why Us", href: "#why", gradient: "radial-gradient(circle, rgba(20,184,166,0.15) 0%, rgba(13,148,136,0.06) 50%, rgba(15,118,110,0) 100%)", iconColor: "group-hover:text-teal-500 dark:group-hover:text-teal-400", action: "scroll-why" },
  { icon: <User className="h-4 w-4 md:h-5 md:w-5" />, label: "Access", href: "#", gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)", iconColor: "group-hover:text-red-500 dark:group-hover:text-red-400", action: "auth" },
];

// Animation variants
const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

function HoverGradientNavBar({ onAuth }: HoverGradientNavBarProps): React.JSX.Element {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: HoverGradientMenuItem) => {
    e.preventDefault();
    if (item.action === "auth") {
      onAuth?.();
    } else if (item.action === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (item.action === "scroll") {
      const node = document.querySelector(item.href);
      node?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (item.action === "scroll-why") {
      const node = document.querySelector("#why");
      node?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed bottom-3 left-0 w-full md:bottom-6 md:left-1/2 md:-translate-x-1/2 z-[80] px-4 md:px-0">
      <motion.nav
        className="w-full md:w-fit mx-auto px-2 md:px-4 py-2 md:py-2.5 rounded-2xl md:rounded-3xl 
        bg-slate-950/40 backdrop-blur-xl 
        border border-white/10 
        shadow-2xl relative"
        initial="initial"
        whileHover="hover"
      >
        <ul className="flex items-center justify-around md:justify-center gap-1 md:gap-3 relative z-10">
          {menuItems.map((item: HoverGradientMenuItem) => (
            <motion.li key={item.label} className="relative flex-1 md:flex-none">
              <motion.div
                className="block rounded-xl md:rounded-2xl overflow-visible group relative"
                style={{ perspective: "600px" }}
                whileHover="hover"
                initial="initial"
              >
                {/* Per-item glow */}
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none rounded-xl md:rounded-2xl"
                  variants={glowVariants}
                  style={{
                    background: item.gradient,
                    opacity: 0,
                  }}
                />
                {/* Front-facing */}
                <motion.a
                  href={item.href}
                  onClick={(e) => handleClick(e, item)}
                  className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 
                  px-2 py-1.5 md:px-4 md:py-2 relative z-10 
                  bg-transparent text-slate-300 
                  group-hover:text-white 
                  transition-colors rounded-xl md:rounded-2xl text-[10px] md:text-sm"
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center bottom"
                  }}
                >
                  <span className={`transition-colors duration-300 ${item.iconColor}`}>
                    {item.icon}
                  </span>
                  <span className="hidden md:inline font-medium">{item.label}</span>
                </motion.a>
                {/* Back-facing */}
                <motion.a
                  href={item.href}
                  onClick={(e) => handleClick(e, item)}
                  className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 
                  px-2 py-1.5 md:px-4 md:py-2 absolute inset-0 z-10 
                  bg-transparent text-slate-300 
                  group-hover:text-white 
                  transition-colors rounded-xl md:rounded-2xl text-[10px] md:text-sm"
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center top",
                    transform: "rotateX(90deg)"
                  }}
                >
                  <span className={`transition-colors duration-300 ${item.iconColor}`}>
                    {item.icon}
                  </span>
                  <span className="hidden md:inline font-medium">{item.label}</span>
                </motion.a>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </div>
  );
}

export default HoverGradientNavBar;
