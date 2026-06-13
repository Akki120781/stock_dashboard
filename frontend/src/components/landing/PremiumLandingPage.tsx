"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return { ref, onMouseMove };
}
import type { Transition, Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BellRing,
  Brain,
  Check,
  ChevronDown,
  Clock3,
  DollarSign,
  Eye,
  Gauge,
  Github,
  HelpCircle,
  LineChart,
  Linkedin,
  LockKeyhole,
  Mail,
  Menu,
  PieChart,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Twitter,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import HoverGradientNavBar from "@/components/ui/hover-gradient-nav-bar";
import AnimatedCharactersAuth from "@/components/ui/animated-characters-auth";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import { BullLogo } from "@/components/ui/bull-logo";
import { BrandScroller } from "@/components/ui/brand-scoller";
import FooterTapedComponent from "@/components/ui/footer-taped-design";

const navItems = [
  { label: "Markets", href: "#markets" },
  { label: "Watchlist", href: "#watchlist" },
  { label: "Analytics", href: "#analytics" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#why" },
];

const trustIndicators = [
  { value: "50K+", label: "Active Investors" },
  { value: "$2B+", label: "Assets Tracked" },
  { value: "99.9%", label: "Uptime" },
  { value: "Live", label: "Real-Time Market Data" },
];

const marketCards = [
  {
    name: "S&P 500",
    symbol: "SPX",
    value: 6248.32,
    suffix: "",
    change: "+0.84%",
    Icon: LineChart,
    tone: "cyan",
  },
  {
    name: "NASDAQ",
    symbol: "IXIC",
    value: 20186.71,
    suffix: "",
    change: "+1.12%",
    Icon: BarChart3,
    tone: "violet",
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    value: 104820,
    suffix: "",
    change: "+2.35%",
    Icon: DollarSign,
    tone: "amber",
  },
];

const movers = [
  { symbol: "NVDA", name: "NVIDIA", value: "+6.42%" },
  { symbol: "COIN", name: "Coinbase", value: "+4.18%" },
  { symbol: "TSLA", name: "Tesla", value: "+3.74%" },
  { symbol: "ARM", name: "Arm Holdings", value: "+2.96%" },
];

const features: Array<{
  title: string;
  copy: string;
  Icon: LucideIcon;
  className?: string;
}> = [
  {
    title: "Real-Time Tracking",
    copy: "Tick-level market streams, live quotes, and session-aware pricing in one polished workspace.",
    Icon: Activity,
    className: "md:col-span-2",
  },
  {
    title: "Portfolio Analytics",
    copy: "Understand allocation, contribution, drawdowns, and realized performance without spreadsheet drift.",
    Icon: PieChart,
  },
  {
    title: "AI Insights",
    copy: "Surface unusual volume, momentum breaks, sentiment shifts, and analyst-grade context.",
    Icon: Brain,
  },
  {
    title: "Watchlists",
    copy: "Organize themes, compare opportunities, and pin alerts to the names you care about.",
    Icon: Eye,
    className: "md:col-span-2",
  },
  {
    title: "Risk Analysis",
    copy: "Stress test exposure across sectors, volatility regimes, and correlation clusters.",
    Icon: ShieldCheck,
  },
  {
    title: "Smart Alerts",
    copy: "Trigger precise notifications for price, volume, sentiment, earnings, and risk events.",
    Icon: BellRing,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$19",
    copy: "For individual investors building better market habits.",
    features: ["15 tracked assets", "Daily market brief", "Core watchlists", "Email alerts"],
  },
  {
    name: "Pro",
    price: "$59",
    copy: "For active investors who need faster signals and deeper context.",
    features: ["Unlimited watchlists", "AI insight feed", "Portfolio risk engine", "Priority data refresh"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    copy: "For teams operating shared research and portfolio workflows.",
    features: ["Team workspaces", "Custom data sources", "SSO and audit logs", "Dedicated support"],
  },
];

const faqs = [
  {
    question: "Is the market data real time?",
    answer:
      "The product experience is designed around real-time streams, with graceful fallbacks for delayed exchanges and custom institutional feeds.",
  },
  {
    question: "Can I connect my brokerage or portfolio data?",
    answer:
      "Yes. The platform supports portfolio imports, connected account workflows, and manual positions for investors who prefer a private setup.",
  },
  {
    question: "Does the AI place trades for me?",
    answer:
      "No. The AI layer explains signals, risks, and opportunities so investors can make better decisions without delegating execution.",
  },
  {
    question: "What makes the Pro plan different?",
    answer:
      "Pro unlocks unlimited watchlists, the AI insight feed, faster alerting, portfolio risk analysis, and deeper analytics history.",
  },
];

const testimonials = [
  {
    quote:
      "BullTrade gives our research meetings a shared source of truth. It feels fast, calm, and unusually clear.",
    name: "Maya Chen",
    role: "Partner, Northline Capital",
  },
  {
    quote:
      "The watchlists and risk views replaced four tabs I used to keep open all day. That alone changed my workflow.",
    name: "Evan Brooks",
    role: "Active Investor",
  },
  {
    quote:
      "It has the polish of a consumer app with the density we expect from institutional tooling.",
    name: "Ari Patel",
    role: "Portfolio Strategist",
  },
];

const chartCandles = [
  { open: 184, high: 190, low: 181, close: 188 },
  { open: 188, high: 193, low: 186, close: 191 },
  { open: 191, high: 194, low: 187, close: 189 },
  { open: 189, high: 197, low: 188, close: 195 },
  { open: 195, high: 199, low: 191, close: 193 },
  { open: 193, high: 202, low: 192, close: 200 },
  { open: 200, high: 204, low: 197, close: 198 },
  { open: 198, high: 207, low: 196, close: 205 },
  { open: 205, high: 211, low: 203, close: 209 },
  { open: 209, high: 214, low: 205, close: 207 },
  { open: 207, high: 216, low: 206, close: 214 },
  { open: 214, high: 219, low: 211, close: 217 },
];

function useLiveNumber(base: number, variance: number, cadence = 2400) {
  const [value, setValue] = useState(base);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setValue(base + (Math.random() - 0.42) * variance);
    }, cadence);

    return () => window.clearInterval(timer);
  }, [base, variance, cadence]);

  return value;
}

function scrollToHash(hash: string) {
  const node = document.querySelector(hash);
  node?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="size-5">
      <path
        fill="#FFC107"
        d="M43.61 20.08H42V20H24v8h11.3C33.65 32.66 29.22 36 24 36c-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.05 6.05 29.27 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.34-.14-2.63-.39-3.92Z"
      />
      <path
        fill="#FF3D00"
        d="m6.31 14.69 6.57 4.82C14.66 15.11 18.96 12 24 12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.05 6.05 29.27 4 24 4 16.32 4 9.66 8.34 6.31 14.69Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.17 0 9.86-1.98 13.41-5.19l-6.19-5.24C29.15 35.15 26.66 36 24 36c-5.2 0-9.62-3.32-11.28-7.94l-6.52 5.02C9.51 39.56 16.23 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.61 20.08H42V20H24v8h11.3a12.04 12.04 0 0 1-4.08 5.57l6.19 5.24C36.97 39.21 44 34 44 24c0-1.34-.14-2.63-.39-3.92Z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.36 6.84 9.72.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.38-3.37-1.38-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.98c.85 0 1.71.12 2.51.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.38-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.08 10.08 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z"
      />
    </svg>
  );
}

function AuthModal({
  isOpen,
  initialMode = "login",
  onClose,
}: {
  isOpen: boolean;
  initialMode: "login" | "signup";
  onClose: () => void;
}) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            className="glass-surface relative w-full max-w-4xl rounded-2xl overflow-hidden text-white"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <AnimatedCharactersAuth isModal={true} mode={initialMode} onClose={onClose} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Navbar({ onAuth }: { onAuth: (mode: "login" | "signup") => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    scrollToHash(href);
  };

  const menuItems = [
    { icon: <LineChart className="size-4" />, label: "Markets", href: "#markets", gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)", iconColor: "group-hover:text-orange-500" },
    { icon: <Eye className="size-4" />, label: "Watchlist", href: "#watchlist", gradient: "radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(126,34,206,0.06) 50%, rgba(88,28,135,0) 100%)", iconColor: "group-hover:text-purple-500" },
    { icon: <BarChart3 className="size-4" />, label: "Analytics", href: "#analytics", gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)", iconColor: "group-hover:text-green-500" },
    { icon: <DollarSign className="size-4" />, label: "Pricing", href: "#pricing", gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)", iconColor: "group-hover:text-blue-500" },
    { icon: <HelpCircle className="size-4" />, label: "About", href: "#why", gradient: "radial-gradient(circle, rgba(20,184,166,0.15) 0%, rgba(13,148,136,0.06) 50%, rgba(15,118,110,0) 100%)", iconColor: "group-hover:text-teal-500" },
  ];

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
      scale: 1.8,
      transition: {
        opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        scale: { duration: 0.4, type: "spring", stiffness: 300, damping: 25 },
      },
    },
  };

  const sharedTransition = {
    type: "spring" as const,
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
        <button
          className="flex items-center gap-3 text-left"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          type="button"
        >
          <span className="flex size-10 items-center justify-center rounded-lg border border-red-500/20 bg-red-950/40 text-red-500">
            <BullLogo className="size-5" />
          </span>
          <span className="text-base font-semibold tracking-tight text-white">BullTrade</span>
        </button>

        <ul className="hidden items-center gap-1.5 lg:flex relative z-10">
          {menuItems.map((item) => (
            <motion.li key={item.label} className="relative" initial="initial" whileHover="hover">
              <motion.div
                className="block rounded-xl overflow-visible group relative"
                style={{ perspective: "600px" }}
                whileHover="hover"
                initial="initial"
              >
                {/* Per-item glow */}
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none rounded-xl"
                  variants={glowVariants}
                  style={{
                    background: item.gradient,
                    opacity: 0,
                  }}
                />
                {/* Front-facing */}
                <motion.button
                  onClick={() => handleNav(item.href)}
                  className="flex items-center gap-2 px-3.5 py-2 relative z-10 bg-transparent text-slate-300 group-hover:text-white transition-colors rounded-xl text-sm font-medium cursor-pointer"
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
                  <span>{item.label}</span>
                </motion.button>
                {/* Back-facing */}
                <motion.button
                  onClick={() => handleNav(item.href)}
                  className="flex items-center gap-2 px-3.5 py-2 absolute inset-0 z-10 bg-transparent text-slate-300 group-hover:text-white transition-colors rounded-xl text-sm font-medium cursor-pointer"
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
                  <span>{item.label}</span>
                </motion.button>
              </motion.div>
            </motion.li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" onClick={() => onAuth("login")}>
            Login
          </Button>
          <Button onClick={() => onAuth("signup")}>
            Get Started
            <ArrowRight />
          </Button>
        </div>

        <button
          aria-label="Open navigation"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/8 text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="glass-surface mx-auto mt-2 max-w-7xl rounded-lg p-3 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  className="rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-200 hover:bg-white/8 flex items-center gap-2"
                  onClick={() => handleNav(item.href)}
                  type="button"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button variant="secondary" onClick={() => onAuth("login")}>
                Login
              </Button>
              <Button onClick={() => onAuth("signup")}>Get Started</Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}

function HeroSky() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const nebulaY = useTransform(scrollYProgress, [0, 0.28], [0, -46]);
  const cloudsY = useTransform(scrollYProgress, [0, 0.28], [0, 180]);

  const loopTransition: Transition = reduceMotion
    ? {}
    : {
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.img
        src="/hero-assets/sky-base.webp"
        alt=""
        className="absolute inset-0 size-full object-cover opacity-95"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -8], y: [0, 5], scale: [1.03, 1.045] }
        }
        transition={{ ...loopTransition, duration: 64 }}
      />
      <motion.img
        src="/hero-assets/star-field.webp"
        alt=""
        className="absolute left-[6%] top-[-6%] h-[64%] w-[82%] object-cover opacity-35 mix-blend-screen"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -15], y: [0, 8], opacity: [0.28, 0.42] }
        }
        transition={{ ...loopTransition, duration: 76 }}
      />
      <motion.img
        src="/hero-assets/haze-ribbon.webp"
        alt=""
        className="absolute inset-0 size-full object-cover opacity-45 mix-blend-screen"
        style={{ y: nebulaY }}
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 8], opacity: [0.2, 0.42], scale: [1.01, 1.035] }
        }
        transition={{ ...loopTransition, duration: 34 }}
      />
      <motion.img
        src="/hero-assets/nebula-ribbon.webp"
        alt=""
        className="absolute inset-0 size-full object-cover opacity-65 mix-blend-screen"
        style={{ y: nebulaY }}
        animate={
          reduceMotion
            ? undefined
            : { x: [-10, 9], opacity: [0.42, 0.72], scale: [1, 1.028] }
        }
        transition={{ ...loopTransition, duration: 42 }}
      />
      <motion.img
        src="/hero-assets/cloud-upper.webp"
        alt=""
        className="absolute right-[-4%] top-[-2%] w-[64rem] max-w-none opacity-50"
        style={{ y: cloudsY }}
        animate={reduceMotion ? undefined : { x: [0, -45], opacity: [0.36, 0.56] }}
        transition={{ ...loopTransition, duration: 15 }}
      />
      <motion.img
        src="/hero-assets/cloud-left.webp"
        alt=""
        className="absolute bottom-[2%] left-[-5%] w-[43rem] max-w-[58vw] opacity-80"
        style={{ y: cloudsY }}
        animate={reduceMotion ? undefined : { x: [0, 50], y: [0, -6] }}
        transition={{ ...loopTransition, duration: 10 }}
      />
      <motion.img
        src="/hero-assets/cloud-right.webp"
        alt=""
        className="absolute bottom-[6%] right-[-8%] w-[62rem] max-w-[70vw] opacity-78"
        style={{ y: cloudsY }}
        animate={reduceMotion ? undefined : { x: [0, -55], y: [0, 8] }}
        transition={{ ...loopTransition, duration: 11 }}
      />
      <motion.img
        src="/hero-assets/cloud-bottom.webp"
        alt=""
        className="absolute inset-x-[-6%] bottom-[-11%] w-[112%] max-w-none opacity-72"
        style={{ y: cloudsY }}
        animate={reduceMotion ? undefined : { x: [-30, 25], opacity: [0.62, 0.82] }}
        transition={{ ...loopTransition, duration: 9 }}
      />
      <motion.img
        src="/hero-assets/atmospheric-haze.webp"
        alt=""
        className="absolute inset-x-0 bottom-[-10%] h-[58%] w-full object-cover opacity-32"
        animate={reduceMotion ? undefined : { opacity: [0.22, 0.4], y: [0, -10] }}
        transition={{ ...loopTransition, duration: 38 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(103,232,249,0.13),transparent_34%),linear-gradient(180deg,rgba(5,8,18,0.2)_0%,rgba(5,8,18,0.1)_52%,rgba(5,8,18,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,18,0.72),transparent_24%,transparent_74%,rgba(5,8,18,0.68))]" />
    </div>
  );
}

function Hero({ onAuth }: { onAuth: (mode: "login" | "signup") => void }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pb-8 pt-24 lg:pt-28">
      <HeroSky />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">

        <motion.h1
          className="text-balance max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block">Track Markets.</span>
          <span className="block text-cyan-100">Analyze Trends.</span>
          <span className="block bg-gradient-to-r from-white via-amber-100 to-cyan-100 bg-clip-text text-transparent">
            Invest Smarter.
          </span>
        </motion.h1>

        <motion.p
          className="mt-5 max-w-3xl text-balance text-base leading-7 text-slate-300 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          Monitor stocks, market sentiment, portfolio performance, and investment
          opportunities through one intelligent analytics platform.
        </motion.p>

        <motion.div
          className="mt-7 flex w-full max-w-sm flex-col justify-center gap-3 sm:max-w-none sm:flex-row"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button size="lg" onClick={() => onAuth("signup")}>
            Get Started
            <ArrowRight />
          </Button>
          <Button size="lg" variant="secondary" onClick={() => scrollToHash("#analytics")}>
            <Play />
            Watch Demo
          </Button>
        </motion.div>

        <motion.div
          className="mt-8 grid w-full max-w-5xl grid-cols-2 gap-2 sm:grid-cols-4"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {trustIndicators.map((item) => (
            <div
              className="glass-surface rounded-lg px-3 py-3 text-left sm:px-4"
              key={item.label}
            >
              <div className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {item.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Brand Scroller */}
        <motion.div
          className="mt-14 w-full max-w-5xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-5 text-center">
            Powering decisions at leading financial institutions
          </p>
          <BrandScroller />
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
        {eyebrow}
      </div>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">{copy}</p>
    </Reveal>
  );
}

function MarketCard({
  item,
  index,
}: {
  item: (typeof marketCards)[number];
  index: number;
}) {
  const liveValue = useLiveNumber(item.value, item.value * 0.0025, 2200 + index * 260);
  const { ref, onMouseMove } = useSpotlight();
  const toneClass = {
    cyan: "text-cyan-200 bg-cyan-200/10 border-cyan-200/20",
    violet: "text-violet-200 bg-violet-300/10 border-violet-300/20",
    amber: "text-amber-200 bg-amber-200/10 border-amber-200/20",
  }[item.tone];

  const glowGradient = {
    cyan: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 50%, transparent 100%)",
    violet: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.02) 50%, transparent 100%)",
    amber: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.02) 50%, transparent 100%)",
  }[item.tone];

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      className="glass-surface relative overflow-hidden rounded-lg p-5 group"
      whileHover={{ y: -6, borderColor: "rgba(103,232,249,0.32)" }}
      transition={{ duration: 0.22 }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit] z-0"
        style={{ background: glowGradient }}
      />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">{item.name}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {item.symbol}
          </p>
        </div>
        <div className={cn("flex size-10 items-center justify-center rounded-lg border", toneClass)}>
          <item.Icon className="size-5" />
        </div>
      </div>
      <div className="relative z-10 mt-7 flex items-end justify-between gap-3">
        <div className="text-3xl font-semibold tracking-tight text-white">
          {item.symbol === "BTC" ? "$" : ""}
          {liveValue.toLocaleString("en-US", {
            maximumFractionDigits: item.symbol === "BTC" ? 0 : 2,
            minimumFractionDigits: item.symbol === "BTC" ? 0 : 2,
          })}
        </div>
        <div className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 text-sm font-semibold text-emerald-200">
          {item.change}
        </div>
      </div>
    </motion.div>
  );
}

function MarketOverview() {
  const moversSpotlight = useSpotlight();
  
  return (
    <section id="markets" className="relative bg-[#070a12] px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Market Overview"
          title="Live market context, distilled for action."
          copy="A fast glance at major indices, crypto momentum, and the session's strongest movers."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {marketCards.map((item, index) => (
            <Reveal key={item.symbol} delay={index * 0.08}>
              <MarketCard item={item} index={index} />
            </Reveal>
          ))}

          <Reveal delay={0.24}>
            <motion.div
              ref={moversSpotlight.ref}
              onMouseMove={moversSpotlight.onMouseMove}
              className="glass-surface relative overflow-hidden rounded-lg p-5 group"
              whileHover={{ y: -6, borderColor: "rgba(251,191,36,0.32)" }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit] z-0"
                style={{
                  background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.02) 50%, transparent 100%)",
                }}
              />
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Top Movers</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Session leaders
                  </p>
                </div>
                <Sparkles className="size-5 text-amber-200" />
              </div>
              <div className="relative z-10 mt-5 space-y-3">
                {movers.map((mover) => (
                  <div className="flex items-center justify-between gap-3" key={mover.symbol}>
                    <div>
                      <div className="text-sm font-semibold text-white">{mover.symbol}</div>
                      <div className="text-xs text-slate-500">{mover.name}</div>
                    </div>
                    <div className="text-sm font-semibold text-emerald-200">{mover.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const { ref, onMouseMove } = useSpotlight();
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      className="group glass-surface relative overflow-hidden flex h-full min-h-56 flex-col justify-between rounded-lg p-6"
      whileHover={{ y: -7 }}
      transition={{ duration: 0.22 }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit] z-0"
        style={{
          background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(99, 102, 241, 0.08) 0%, rgba(59, 130, 246, 0.04) 50%, transparent 100%)",
        }}
      />
      <div className="relative z-10 flex items-start justify-between gap-5">
        <div className="flex size-11 items-center justify-center rounded-lg border border-cyan-200/18 bg-cyan-200/10 text-cyan-100 transition group-hover:border-cyan-100/38 group-hover:bg-cyan-200/16">
          <feature.Icon className="size-5" />
        </div>
        <ArrowRight className="size-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-200" />
      </div>
      <div className="relative z-10">
        <h3 className="mt-10 text-xl font-semibold tracking-tight text-white">
          {feature.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">{feature.copy}</p>
      </div>
    </motion.div>
  );
}

function FeaturesBento() {
  return (
    <section id="watchlist" className="relative px-4 pb-24 pt-10 sm:px-6 sm:pt-14 lg:px-8">
      <div className="absolute inset-0 fine-grid opacity-25" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Features"
          title="Everything an investor expects, without the clutter."
          copy="Dense where it matters, calm everywhere else. BullTrade turns market noise into a workflow."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title} className={feature.className} delay={index * 0.05}>
              <BentoCard feature={feature} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CandlestickChart() {
  const min = Math.min(...chartCandles.map((item) => item.low)) - 2;
  const max = Math.max(...chartCandles.map((item) => item.high)) + 2;
  const width = 640;
  const height = 245;
  const left = 34;
  const right = 24;
  const top = 18;
  const bottom = 32;
  const innerWidth = width - left - right;
  const innerHeight = height - top - bottom;

  const y = (value: number) => top + ((max - value) / (max - min)) * innerHeight;
  const step = innerWidth / (chartCandles.length - 1);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full overflow-visible">
      <defs>
        <linearGradient id="volumeFill" x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#67e8f9" stopOpacity="0.22" />
          <stop offset="1" stopColor="#67e8f9" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((line) => (
        <line
          key={line}
          x1={left}
          x2={width - right}
          y1={top + (innerHeight / 3) * line}
          y2={top + (innerHeight / 3) * line}
          stroke="rgba(255,255,255,0.07)"
        />
      ))}
      <motion.path
        d="M34 216 C140 198 204 224 292 168 S462 120 616 62 L616 232 L34 232 Z"
        fill="url(#volumeFill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      {chartCandles.map((candle, index) => {
        const x = left + step * index;
        const isUp = candle.close >= candle.open;
        const openY = y(candle.open);
        const closeY = y(candle.close);
        const highY = y(candle.high);
        const lowY = y(candle.low);
        const color = isUp ? "#67e8f9" : "#fb7185";

        return (
          <motion.g
            key={`${candle.open}-${index}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.42, delay: index * 0.045 }}
          >
            <line x1={x} x2={x} y1={highY} y2={lowY} stroke={color} strokeWidth="2" />
            <rect
              x={x - 8}
              y={Math.min(openY, closeY)}
              width="16"
              height={Math.max(Math.abs(openY - closeY), 5)}
              rx="2"
              fill={color}
              opacity={isUp ? 0.95 : 0.78}
            />
          </motion.g>
        );
      })}
      <motion.path
        d="M34 184 C128 176 188 194 246 145 C320 82 384 142 456 98 C514 62 558 78 616 44"
        fill="none"
        stroke="#fde68a"
        strokeLinecap="round"
        strokeWidth="2.2"
        strokeDasharray="8 10"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </svg>
  );
}

function PortfolioGrowth() {
  return (
    <svg viewBox="0 0 320 150" className="h-36 w-full">
      <defs>
        <linearGradient id="growthFill" x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#a7f3d0" stopOpacity="0.32" />
          <stop offset="1" stopColor="#a7f3d0" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[24, 66, 108].map((y) => (
        <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" />
      ))}
      <motion.path
        d="M0 130 L36 118 L74 122 L112 86 L150 94 L190 62 L228 72 L268 38 L320 28 L320 150 L0 150 Z"
        fill="url(#growthFill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      />
      <motion.path
        d="M0 130 L36 118 L74 122 L112 86 L150 94 L190 62 L228 72 L268 38 L320 28"
        fill="none"
        stroke="#a7f3d0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.35, ease: "easeOut" }}
      />
    </svg>
  );
}

function AnalyticsShowcase() {
  const watchlist = [
    { symbol: "AAPL", price: "$214.72", change: "+1.28%" },
    { symbol: "MSFT", price: "$486.10", change: "+0.64%" },
    { symbol: "AMZN", price: "$185.42", change: "-0.32%", down: true },
    { symbol: "NVDA", price: "$151.90", change: "+3.76%" },
  ];

  const mainSpotlight = useSpotlight();
  const chartSpotlight = useSpotlight();
  const portfolioSpotlight = useSpotlight();
  const watchlistSpotlight = useSpotlight();
  const sentimentSpotlight = useSpotlight();
  const metricsSpotlight = useSpotlight();

  return (
    <section id="analytics" className="relative bg-[#08090d] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Analytics Showcase"
          title="A dashboard built for decisions, not decoration."
          copy="Candles, performance, sentiment, watchlists, and metrics share the same live analytical surface."
        />

        <Reveal>
          <div
            ref={mainSpotlight.ref}
            onMouseMove={mainSpotlight.onMouseMove}
            className="glass-surface overflow-hidden rounded-lg relative group"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit] z-0"
              style={{
                background: "radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(99, 102, 241, 0.04) 0%, rgba(59, 130, 246, 0.02) 50%, transparent 100%)",
              }}
            />
            <div className="relative z-10 flex flex-col gap-3 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg border border-cyan-200/20 bg-cyan-200/10 text-cyan-100">
                  <Activity className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">AAPL Market Intelligence</h3>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    Real-time quote stream
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                {["1D", "1W", "1M", "YTD"].map((range, index) => (
                  <span
                    className={cn(
                      "rounded-lg border px-3 py-2",
                      index === 0
                        ? "border-cyan-200/30 bg-cyan-200/12 text-cyan-100"
                        : "border-white/10 bg-white/5 text-slate-400",
                    )}
                    key={range}
                  >
                    {range}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 grid gap-0 lg:grid-cols-[1.5fr_0.95fr]">
              <div
                ref={chartSpotlight.ref}
                onMouseMove={chartSpotlight.onMouseMove}
                className="border-b border-white/10 p-4 sm:p-6 lg:border-b-0 lg:border-r relative overflow-hidden group"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                  style={{
                    background: "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(59, 130, 246, 0.05) 0%, rgba(99, 102, 241, 0.02) 50%, transparent 100%)",
                  }}
                />
                <div className="relative z-10 mb-5 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Apple Inc.</p>
                    <div className="mt-1 flex items-baseline gap-3">
                      <span className="text-4xl font-semibold tracking-tight text-white">$214.72</span>
                      <span className="text-sm font-semibold text-emerald-200">+2.41%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-right text-xs">
                    {[
                      ["Open", "$209.44"],
                      ["High", "$219.12"],
                      ["Volume", "62.8M"],
                    ].map(([label, value]) => (
                      <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2" key={label}>
                        <p className="text-slate-500">{label}</p>
                        <p className="mt-1 font-semibold text-slate-200">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 h-72">
                  <CandlestickChart />
                </div>
              </div>

              <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-1">
                <div
                  ref={portfolioSpotlight.ref}
                  onMouseMove={portfolioSpotlight.onMouseMove}
                  className="border-b border-white/10 p-5 sm:border-r lg:border-r-0 relative overflow-hidden group"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                    style={{
                      background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(59, 130, 246, 0.06) 0%, rgba(99, 102, 241, 0.02) 50%, transparent 100%)",
                    }}
                  />
                  <div className="relative z-10 mb-3 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white">Portfolio Growth</h4>
                    <span className="text-xs font-semibold text-emerald-200">+18.4%</span>
                  </div>
                  <div className="relative z-10">
                    <PortfolioGrowth />
                  </div>
                </div>

                <div
                  ref={watchlistSpotlight.ref}
                  onMouseMove={watchlistSpotlight.onMouseMove}
                  className="border-b border-white/10 p-5 relative overflow-hidden group"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                    style={{
                      background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(99, 102, 241, 0.06) 0%, rgba(139, 92, 246, 0.02) 50%, transparent 100%)",
                    }}
                  />
                  <div className="relative z-10 mb-4 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white">Watchlist</h4>
                    <Search className="size-4 text-slate-500" />
                  </div>
                  <div className="relative z-10 space-y-2">
                    {watchlist.map((row) => (
                      <div
                        className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.035] px-3 py-2"
                        key={row.symbol}
                      >
                        <span className="text-sm font-semibold text-white">{row.symbol}</span>
                        <span className="text-sm text-slate-300">{row.price}</span>
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            row.down ? "text-rose-300" : "text-emerald-200",
                          )}
                        >
                          {row.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-0">
                  <div
                    ref={sentimentSpotlight.ref}
                    onMouseMove={sentimentSpotlight.onMouseMove}
                    className="border-r border-white/10 p-5 relative overflow-hidden group"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                      style={{
                        background: "radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(59, 130, 246, 0.06) 0%, rgba(99, 102, 241, 0.02) 50%, transparent 100%)",
                      }}
                    />
                    <div className="relative z-10">
                      <h4 className="text-sm font-semibold text-white">Market Sentiment</h4>
                      <div className="mt-5 flex items-center gap-4">
                        <div className="grid size-20 place-items-center rounded-full bg-[conic-gradient(#67e8f9_0_72%,rgba(255,255,255,0.08)_72%_100%)]">
                          <div className="grid size-14 place-items-center rounded-full bg-[#090d16] text-lg font-semibold text-cyan-100">
                            72
                          </div>
                        </div>
                        <p className="text-sm leading-6 text-slate-400">Constructive breadth with improving volume.</p>
                      </div>
                    </div>
                  </div>
                  <div
                    ref={metricsSpotlight.ref}
                    onMouseMove={metricsSpotlight.onMouseMove}
                    className="p-5 relative overflow-hidden group"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                      style={{
                        background: "radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.06) 0%, rgba(99, 102, 241, 0.02) 50%, transparent 100%)",
                      }}
                    />
                    <div className="relative z-10">
                      <h4 className="text-sm font-semibold text-white">Performance Metrics</h4>
                      <div className="mt-5 space-y-3">
                        {[
                          ["Sharpe", "1.82"],
                          ["Beta", "0.94"],
                          ["Max DD", "-6.1%"],
                        ].map(([label, value]) => (
                          <div className="flex justify-between text-sm" key={label}>
                            <span className="text-slate-500">{label}</span>
                            <span className="font-semibold text-white">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhyChooseUsCard({
  item,
}: {
  item: {
    title: string;
    copy: string;
    Icon: LucideIcon;
  };
}) {
  const { ref, onMouseMove } = useSpotlight();
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className="glass-surface relative overflow-hidden h-full rounded-lg p-6 group"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit] z-0"
        style={{
          background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.04) 50%, transparent 100%)",
        }}
      />
      <div className="relative z-10 flex size-11 items-center justify-center rounded-lg border border-amber-200/20 bg-amber-200/10 text-amber-100">
        <item.Icon className="size-5" />
      </div>
      <h3 className="relative z-10 mt-8 text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
      <p className="relative z-10 mt-3 text-sm leading-6 text-slate-400">{item.copy}</p>
    </div>
  );
}

function WhyInvestorsChooseUs() {
  const items = [
    {
      title: "Speed",
      copy: "Streaming architecture keeps quotes, alerts, and dashboards moving as markets change.",
      Icon: Zap,
    },
    {
      title: "Accuracy",
      copy: "Clean data handling and source-aware displays make every number easier to trust.",
      Icon: Target,
    },
    {
      title: "Actionable Insights",
      copy: "Signals are ranked, explained, and connected to portfolio impact.",
      Icon: Gauge,
    },
  ];

  return (
    <section id="why" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why Investors Choose Us"
          title="A calmer command center for high-stakes markets."
          copy="Every interaction is tuned for investors who need clarity under pressure."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <WhyChooseUsCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % testimonials.length);
    }, 4400);

    return () => window.clearInterval(timer);
  }, []);

  const visible = useMemo(
    () => [0, 1, 2].map((offset) => testimonials[(active + offset) % testimonials.length]),
    [active],
  );

  return (
    <section className="bg-[#070a12] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by investors who live inside market data."
          copy="A premium workflow earns its keep when markets become loud."
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid gap-4 md:grid-cols-3"
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -22 }}
            transition={{ duration: 0.36, ease: "easeOut" }}
          >
            {visible.map((item) => (
              <div className="glass-surface rounded-lg p-6" key={item.name}>
                <div className="mb-7 flex gap-1 text-amber-200">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Sparkles className="size-4" key={star} />
                  ))}
                </div>
                <p className="text-lg leading-8 text-slate-200">“{item.quote}”</p>
                <div className="mt-8 border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.role}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Pricing({ onAuth }: { onAuth: (mode: "login" | "signup") => void }) {
  return (
    <section id="pricing" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Pricing"
          title="Choose the intelligence layer your strategy deserves."
          copy="Start small, grow into deeper analytics, and bring teams in when the workflow matures."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.07}>
              <motion.div
                className={cn(
                  "glass-surface relative h-full rounded-lg p-6",
                  plan.highlighted && "border-cyan-200/45 bg-cyan-200/[0.08]",
                )}
                whileHover={{ y: -7 }}
              >
                {plan.highlighted ? (
                  <div className="mb-5 inline-flex rounded-lg border border-cyan-200/25 bg-cyan-200/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
                    Most Popular
                  </div>
                ) : null}
                <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">{plan.copy}</p>
                <div className="mt-8 flex items-end gap-2">
                  <span className="text-5xl font-semibold tracking-tight text-white">{plan.price}</span>
                  {plan.price.startsWith("$") ? (
                    <span className="pb-2 text-sm text-slate-500">/mo</span>
                  ) : null}
                </div>
                <div className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <div className="flex items-center gap-3 text-sm text-slate-300" key={feature}>
                      <Check className="size-4 text-emerald-200" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Button
                  className="mt-8 w-full"
                  variant={plan.highlighted ? "default" : "secondary"}
                  onClick={() => onAuth("signup")}
                >
                  {plan.highlighted ? "Start Pro" : "Get Started"}
                </Button>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#070a12] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Clear answers before you connect your capital."
          copy="The platform is designed to feel powerful, but never mysterious."
        />
        <div className="space-y-3">
          {faqs.map((item, index) => {
            const active = open === index;

            return (
              <div className="glass-surface overflow-hidden rounded-lg" key={item.question}>
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(active ? -1 : index)}
                  type="button"
                >
                  <span className="font-semibold text-white">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-slate-400 transition",
                      active && "rotate-180 text-cyan-100",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {active ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      <p className="px-5 pb-5 text-sm leading-6 text-slate-400">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function PremiumLandingPage({
  defaultAuthOpen = false,
  defaultAuthMode = "login",
}: {
  defaultAuthOpen?: boolean;
  defaultAuthMode?: "login" | "signup";
} = {}) {
  const [authOpen, setAuthOpen] = useState(defaultAuthOpen);
  const [authMode, setAuthMode] = useState<"login" | "signup">(defaultAuthMode);

  const handleAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-[#050812] text-white isolate">
      {/* Scrollable content wrapper */}
      <div className="relative z-10 bg-[#050812] overflow-x-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] pb-12">
        <Navbar onAuth={handleAuth} />
        
        <FlowArt aria-label="BullTrade Presentation">
          <FlowSection aria-label="Hero">
            <Hero onAuth={handleAuth} />
          </FlowSection>
          
          <FlowSection aria-label="Markets">
            <MarketOverview />
          </FlowSection>
          
          <FlowSection aria-label="Features">
            <FeaturesBento />
          </FlowSection>
          
          <FlowSection aria-label="Analytics">
            <AnalyticsShowcase />
          </FlowSection>
          
          <FlowSection aria-label="About">
            <WhyInvestorsChooseUs />
          </FlowSection>
          
          <FlowSection aria-label="Testimonials">
            <Testimonials />
          </FlowSection>
          
          <FlowSection aria-label="Pricing">
            <Pricing onAuth={handleAuth} />
          </FlowSection>
        </FlowArt>

        <FAQ />
      </div>

      {/* Sticky Reveal Footer */}
      <div className="sticky bottom-0 -z-10 w-full bg-[#050812]">
        <FooterTapedComponent />
      </div>

      <AuthModal isOpen={authOpen} initialMode={authMode} onClose={() => setAuthOpen(false)} />
    </main>
  );
}
