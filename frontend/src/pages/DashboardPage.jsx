"use client";

/* eslint-disable react/prop-types */

import { useContext, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BellRing,
  Brain,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Gauge,
  Layers,
  LineChart,
  Loader2,
  PieChart,
  Search,
  ShieldCheck,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";

import StockCard from "../components/stock/StockCard";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { cn } from "@/lib/utils";

const indices = [
  { name: "S&P 500", value: "6,248.32", change: "+0.84%", up: true },
  { name: "NASDAQ", value: "20,186.71", change: "+1.12%", up: true },
  { name: "Dow Jones", value: "44,942.18", change: "+0.45%", up: true },
  { name: "Russell 2000", value: "2,214.50", change: "-0.18%", up: false },
];

const movers = [
  { symbol: "NVDA", name: "NVIDIA", price: "$151.90", change: "+6.42%", up: true },
  { symbol: "AMD", name: "Advanced Micro", price: "$158.42", change: "+4.81%", up: true },
  { symbol: "TSLA", name: "Tesla", price: "$198.40", change: "+3.74%", up: true },
  { symbol: "BABA", name: "Alibaba", price: "$72.10", change: "-4.28%", up: false },
];

const sectors = [
  { name: "AI Infra", value: 92, tone: "bg-cyan-300" },
  { name: "Semis", value: 86, tone: "bg-emerald-300" },
  { name: "Cloud", value: 74, tone: "bg-sky-300" },
  { name: "Energy", value: 58, tone: "bg-amber-300" },
  { name: "Banks", value: 42, tone: "bg-rose-300" },
];

const events = [
  { title: "Fed Rate Decision", time: "Tomorrow, 2:00 PM", impact: "High" },
  { title: "US CPI YoY", time: "Jun 15, 8:30 AM", impact: "High" },
  { title: "NVDA Earnings", time: "Jun 18, After Close", impact: "Medium" },
];

const briefing = [
  "NVDA volume is 3.2x above its 30-day average with strong continuation breadth.",
  "AAPL is approaching resistance near $218. Watch for volume confirmation.",
  "Portfolio beta remains below market despite technology concentration.",
];

const fallbackWatchlist = [
  { symbol: "AAPL", currentPrice: 214.72, change: 2.54, percentageChange: 1.2 },
  { symbol: "MSFT", currentPrice: 486.1, change: 3.08, percentageChange: 0.64 },
  { symbol: "NVDA", currentPrice: 151.9, change: 5.52, percentageChange: 3.76 },
  { symbol: "AMZN", currentPrice: 185.42, change: -0.59, percentageChange: -0.32 },
];

function formatPrice(value) {
  if (typeof value !== "number") return "--";
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
}

function Reveal({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function DashboardCard({ children, className }) {
  return (
    <motion.div
      className={cn("premium-dashboard-card glass-surface rounded-lg p-5", className)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value, detail, tone = "cyan", delay = 0 }) {
  const tones = {
    cyan: "border-cyan-200/20 bg-cyan-200/10 text-cyan-100",
    emerald: "border-emerald-200/20 bg-emerald-200/10 text-emerald-100",
    amber: "border-amber-200/20 bg-amber-200/10 text-amber-100",
    rose: "border-rose-200/20 bg-rose-200/10 text-rose-100",
  };

  return (
    <Reveal delay={delay}>
      <DashboardCard className="min-h-36">
        <div className="flex items-start justify-between gap-4">
          <div className={cn("flex size-11 items-center justify-center rounded-lg border", tones[tone])}>
            <Icon className="size-5" />
          </div>
          <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-semibold text-slate-400">
            Live
          </span>
        </div>
        <p className="mt-6 text-sm font-medium text-slate-400">{label}</p>
        <div className="mt-1 text-3xl font-semibold tracking-tight text-white">{value}</div>
        <p className="mt-2 text-sm text-slate-500">{detail}</p>
      </DashboardCard>
    </Reveal>
  );
}

function PortfolioChart() {
  return (
    <svg viewBox="0 0 760 280" className="h-full min-h-72 w-full">
      <defs>
        <linearGradient id="portfolioStroke" x1="0" x2="1" y1="0" y2="0">
          <stop stopColor="#67e8f9" />
          <stop offset="0.54" stopColor="#a7f3d0" />
          <stop offset="1" stopColor="#fde68a" />
        </linearGradient>
        <linearGradient id="portfolioFill" x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#67e8f9" stopOpacity="0.28" />
          <stop offset="1" stopColor="#67e8f9" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[44, 96, 148, 200, 252].map((y) => (
        <line key={y} x1="0" x2="760" y1={y} y2={y} stroke="rgba(255,255,255,0.07)" />
      ))}
      <motion.path
        d="M0 248 C70 228 96 242 146 208 C210 166 258 188 316 142 C388 84 438 124 498 90 C572 48 632 72 760 34 L760 280 L0 280 Z"
        fill="url(#portfolioFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.25 }}
      />
      <motion.path
        d="M0 248 C70 228 96 242 146 208 C210 166 258 188 316 142 C388 84 438 124 498 90 C572 48 632 72 760 34"
        fill="none"
        stroke="url(#portfolioStroke)"
        strokeLinecap="round"
        strokeWidth="4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.35, delay: 0.18, ease: "easeOut" }}
      />
      {[
        [146, 208],
        [316, 142],
        [498, 90],
        [760, 34],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#050812" stroke="#67e8f9" strokeWidth="3" />
      ))}
    </svg>
  );
}

function MiniSparkline({ up = true }) {
  const path = up
    ? "M0 34 L18 28 L38 31 L58 18 L82 23 L112 8"
    : "M0 12 L18 18 L38 15 L58 25 L82 22 L112 34";

  return (
    <svg viewBox="0 0 112 42" className="h-10 w-28">
      <path
        d={path}
        fill="none"
        stroke={up ? "#6ee7b7" : "#fda4af"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  );
}

export default function DashboardPage() {
  const { user, fetchWatchlist } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedStock, setSearchedStock] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [watchlistStocks, setWatchlistStocks] = useState([]);

  const watchlistSymbols = useMemo(() => user?.watchlist || [], [user?.watchlist]);

  useEffect(() => {
    fetchWatchlist?.();
    // AuthContext recreates this helper when user state changes, so this is an intentional mount-only refresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadQuotes() {
      if (!watchlistSymbols.length) {
        setWatchlistStocks(fallbackWatchlist);
        return;
      }

      const symbols = watchlistSymbols.slice(0, 6);
      const results = [];

      for (const symbol of symbols) {
        try {
          const response = await api.get(`/stocks/quote/${symbol}`);
          if (response.data) results.push(response.data);
        } catch {
          results.push({ symbol, error: true });
        }
      }

      if (mounted) setWatchlistStocks(results.length ? results : fallbackWatchlist);
    }

    loadQuotes();

    return () => {
      mounted = false;
    };
  }, [watchlistSymbols]);

  const handleStockSearch = async (event) => {
    event.preventDefault();
    const symbol = searchQuery.trim().toUpperCase();
    if (!symbol) return;

    setSearchLoading(true);
    setSearchError("");
    setSearchedStock(null);

    try {
      const response = await api.get(`/stocks/quote/${symbol}`);
      setSearchedStock(response.data);
    } catch {
      setSearchError("That symbol could not be loaded right now. Try AAPL, MSFT, NVDA, or TSLA.");
    } finally {
      setSearchLoading(false);
    }
  };

  const displayWatchlist = watchlistStocks.length ? watchlistStocks : fallbackWatchlist;

  return (
    <div className="mx-auto flex w-full max-w-[1560px] flex-col gap-5 pb-8">
      <Reveal>
        <section className="premium-dashboard-hero relative overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.105),rgba(255,255,255,0.035))] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-6">
          <div className="absolute right-[-12rem] top-[-18rem] size-[34rem] rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="absolute bottom-[-18rem] left-[18%] size-[30rem] rounded-full bg-amber-200/10 blur-3xl" />

          <div className="relative grid gap-6 lg:grid-cols-[1fr_27rem] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Welcome back{user?.username ? `, ${user.username}` : ""}. Your market is organized.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Track portfolio momentum, watchlist pressure, market breadth, and actionable signals from one calm workspace.
              </p>
            </div>

            <form onSubmit={handleStockSearch} className="relative">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Research a symbol
              </label>
              <div className="flex gap-2 rounded-lg border border-white/10 bg-slate-950/50 p-2">
                <div className="flex min-w-0 flex-1 items-center gap-2 px-2">
                  <Search className="size-4 shrink-0 text-slate-500" />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="AAPL, NVDA, MSFT..."
                    className="min-w-0 flex-1 bg-transparent text-sm font-semibold uppercase text-white outline-none placeholder:normal-case placeholder:text-slate-600"
                  />
                </div>
                <button
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:opacity-60"
                  disabled={searchLoading}
                  type="submit"
                >
                  {searchLoading ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
                  Search
                </button>
              </div>
              {searchError ? (
                <div className="mt-3 flex items-center gap-2 text-sm text-rose-300">
                  <AlertCircle className="size-4" />
                  {searchError}
                </div>
              ) : null}
            </form>
          </div>
        </section>
      </Reveal>

      {searchedStock ? (
        <Reveal>
          <DashboardCard className="border-cyan-200/24">
            <div className="mb-4 flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">Active research</p>
                <h2 className="mt-1 text-xl font-semibold text-white">{searchedStock.symbol}</h2>
              </div>
              <button
                className="self-start rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white sm:self-auto"
                onClick={() => setSearchedStock(null)}
                type="button"
              >
                Close Panel
              </button>
            </div>
            <div className="max-w-md">
              <StockCard
                stockData={searchedStock}
                isWatchlisted={watchlistSymbols.includes(searchedStock.symbol)}
              />
            </div>
          </DashboardCard>
        </Reveal>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Wallet}
          label="Portfolio Value"
          value="$428,940"
          detail="+$12,420 this month"
          tone="cyan"
        />
        <StatCard
          icon={TrendingUp}
          label="Daily P&L"
          value="+$8,216"
          detail="+1.94% versus open"
          tone="emerald"
          delay={0.05}
        />
        <StatCard
          icon={BellRing}
          label="Signal Alerts"
          value="18"
          detail="5 high priority"
          tone="amber"
          delay={0.1}
        />
        <StatCard
          icon={ShieldCheck}
          label="Risk Level"
          value="Moderate"
          detail="Beta 0.94, drawdown -6.1%"
          tone="rose"
          delay={0.15}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.55fr_0.95fr]">
        <Reveal delay={0.05}>
          <DashboardCard className="min-h-[30rem]">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Portfolio Analytics
                </p>
                <div className="mt-2 flex flex-wrap items-end gap-3">
                  <h2 className="text-3xl font-semibold tracking-tight text-white">$428,940.18</h2>
                  <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 text-sm font-semibold text-emerald-200">
                    <ArrowUpRight className="size-4" />
                    18.4% YTD
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {["1D", "1M", "YTD"].map((range, index) => (
                  <button
                    className={cn(
                      "rounded-lg border px-3 py-2 font-semibold",
                      index === 2
                        ? "border-cyan-200/30 bg-cyan-200/12 text-cyan-100"
                        : "border-white/10 bg-white/5 text-slate-400",
                    )}
                    key={range}
                    type="button"
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <PortfolioChart />
          </DashboardCard>
        </Reveal>

        <Reveal delay={0.1}>
          <DashboardCard className="min-h-[30rem]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  AI Signal Brief
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">Actionable insights</h2>
              </div>
              <div className="flex size-11 items-center justify-center rounded-lg border border-cyan-200/20 bg-cyan-200/10 text-cyan-100">
                <Brain className="size-5" />
              </div>
            </div>

            <div className="space-y-3">
              {briefing.map((item, index) => (
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4" key={item}>
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
                    <Zap className="size-3.5" />
                    Signal {index + 1}
                  </div>
                  <p className="text-sm leading-6 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </DashboardCard>
        </Reveal>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.95fr_1fr_1fr_0.9fr]">
        <Reveal>
          <DashboardCard>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Market Pulse</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Major indices</h2>
              </div>
              <BarChart3 className="size-5 text-cyan-100" />
            </div>
            <div className="space-y-2">
              {indices.map((index) => (
                <div
                  className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-3"
                  key={index.name}
                >
                  <div>
                    <div className="font-semibold text-white">{index.name}</div>
                    <div className="text-xs text-slate-500">{index.value}</div>
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-semibold",
                      index.up
                        ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200"
                        : "border-rose-300/20 bg-rose-300/10 text-rose-200",
                    )}
                  >
                    {index.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                    {index.change}
                  </span>
                </div>
              ))}
            </div>
          </DashboardCard>
        </Reveal>

        <Reveal>
          <DashboardCard>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Watchlist</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Tracked positions</h2>
              </div>
              <LineChart className="size-5 text-cyan-100" />
            </div>
            <div className="space-y-2">
              {displayWatchlist.map((stock) => {
                const up = (stock.change ?? 0) >= 0;

                return (
                  <div
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-3"
                    key={stock.symbol}
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-white">{stock.symbol}</div>
                      <div className="text-xs text-slate-500">Live quote</div>
                    </div>
                    <div className="hidden sm:block">
                      <MiniSparkline up={up} />
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-slate-200">
                        {stock.error ? "--" : formatPrice(stock.currentPrice)}
                      </div>
                      <div className={cn("text-xs font-semibold", up ? "text-emerald-300" : "text-rose-300")}>
                        {stock.error ? "Rate limit" : `${stock.percentageChange?.toFixed?.(2) ?? "0.00"}%`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </DashboardCard>
        </Reveal>

        <Reveal delay={0.05}>
          <DashboardCard>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Market Movers</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Session pressure</h2>
              </div>
              <Activity className="size-5 text-amber-100" />
            </div>
            <div className="space-y-2">
              {movers.map((stock) => (
                <div
                  className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-3"
                  key={stock.symbol}
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-white">{stock.symbol}</div>
                    <div className="truncate text-xs text-slate-500">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-200">{stock.price}</div>
                    <div className={cn("flex items-center gap-1 text-xs font-semibold", stock.up ? "text-emerald-300" : "text-rose-300")}>
                      {stock.up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                      {stock.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </Reveal>

        <Reveal delay={0.1}>
          <DashboardCard>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Market Sentiment</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Greed index</h2>
              </div>
              <Gauge className="size-5 text-emerald-100" />
            </div>
            <div className="flex items-center gap-5">
              <div className="grid size-28 shrink-0 place-items-center rounded-full bg-[conic-gradient(#67e8f9_0_72%,rgba(255,255,255,0.08)_72%_100%)]">
                <div className="grid size-20 place-items-center rounded-full bg-[#080b13] text-2xl font-semibold text-cyan-100">
                  72
                </div>
              </div>
              <div>
                <p className="font-semibold text-white">Constructive</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Breadth is improving with volume concentrated in AI infrastructure and semiconductors.
                </p>
              </div>
            </div>
          </DashboardCard>
        </Reveal>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Reveal>
          <DashboardCard>
            <div className="mb-5 flex items-center gap-3">
              <PieChart className="size-5 text-cyan-100" />
              <h2 className="text-xl font-semibold text-white">Sector Flow</h2>
            </div>
            <div className="space-y-4">
              {sectors.map((sector) => (
                <div key={sector.name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-300">{sector.name}</span>
                    <span className="text-slate-500">{sector.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      className={cn("h-full rounded-full", sector.tone)}
                      initial={{ width: 0 }}
                      animate={{ width: `${sector.value}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </Reveal>

        <Reveal delay={0.05}>
          <DashboardCard>
            <div className="mb-5 flex items-center gap-3">
              <CalendarClock className="size-5 text-amber-100" />
              <h2 className="text-xl font-semibold text-white">Upcoming Catalysts</h2>
            </div>
            <div className="space-y-3">
              {events.map((event) => (
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4" key={event.title}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-white">{event.title}</div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                        <Clock3 className="size-3" />
                        {event.time}
                      </div>
                    </div>
                    <span className="rounded-lg border border-amber-200/20 bg-amber-200/10 px-2 py-1 text-xs font-semibold text-amber-100">
                      {event.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </Reveal>

        <Reveal delay={0.1}>
          <DashboardCard>
            <div className="mb-5 flex items-center gap-3">
              <Layers className="size-5 text-emerald-100" />
              <h2 className="text-xl font-semibold text-white">Risk Stack</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Beta", "0.94", "Below market"],
                ["Sharpe", "1.82", "Healthy"],
                ["Max DD", "-6.1%", "Contained"],
                ["Cash", "12.4%", "Ready"],
              ].map(([label, value, detail]) => (
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4" key={label}>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</div>
                  <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
                  <div className="mt-1 text-xs text-slate-500">{detail}</div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </Reveal>
      </section>

      <Reveal>
        <DashboardCard>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Activity</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Recent portfolio events</h2>
            </div>
            <Target className="size-5 text-cyan-100" />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { icon: CheckCircle2, title: "Rebalance completed", copy: "Trimmed concentration in mega-cap tech by 2.8%." },
              { icon: ArrowUpRight, title: "Breakout alert", copy: "NVDA cleared momentum threshold on elevated volume." },
              { icon: ArrowDownRight, title: "Risk warning", copy: "Energy allocation slipped below target after sector rotation." },
            ].map((item) => (
              <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4" key={item.title}>
                <item.icon className="size-5 text-cyan-100" />
                <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.copy}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </Reveal>
    </div>
  );
}
