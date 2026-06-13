"use client";

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Loader2, 
  Sparkles, 
  Pin, 
  EyeOff, 
  RotateCcw, 
  Save, 
  Award, 
  Bookmark, 
  Activity, 
  Newspaper, 
  BarChart3, 
  Layers, 
  Cpu, 
  Zap, 
  Compass, 
  BookmarkMinus, 
  BookmarkPlus,
  Play,
  Check
} from 'lucide-react';
import api from '../services/api';
import StockCard from '../components/stock/StockCard';
import { AuthContext } from '../context/AuthContext';

// Default widgets layout configuration prioritized according to the new hierarchy
const DEFAULT_WIDGETS = [
  { id: 'market-overview', title: 'Market Indices', w: 'lg:col-span-2', isPinned: false, isHidden: false },
  { id: 'ai-insights', title: 'AI Analyst Intelligence', w: 'lg:col-span-1', isPinned: false, isHidden: false },
  { id: 'portfolio-pnl', title: 'Portfolio P&L Overview', w: 'lg:col-span-1', isPinned: false, isHidden: false },
  { id: 'watchlist-feed', title: 'Watchlist Stream', w: 'lg:col-span-1', isPinned: false, isHidden: false },
  { id: 'top-movers', title: 'Top Market Movers', w: 'lg:col-span-1', isPinned: false, isHidden: false },
  { id: 'news-timeline', title: 'Live Briefings & News', w: 'lg:col-span-1', isPinned: false, isHidden: false },
  { id: 'market-heatmap', title: 'Sector Heatmap & Flow', w: 'lg:col-span-2', isPinned: false, isHidden: false },
  { id: 'discovery-hub', title: 'Discovery Signals', w: 'lg:col-span-1', isPinned: false, isHidden: false },
  { id: 'investor-activity', title: 'Investor Feed Alerts', w: 'lg:col-span-1', isPinned: false, isHidden: false },
  { id: 'technical-signals', title: 'Technical Signals', w: 'lg:col-span-1', isPinned: false, isHidden: false },
  { id: 'achievements-card', title: 'Investor Insights & Streaks', w: 'lg:col-span-1', isPinned: false, isHidden: false }
];

export default function DashboardPage() {
  const { user, fetchWatchlist } = useContext(AuthContext);
  const [widgets, setWidgets] = useState(DEFAULT_WIDGETS);
  
  // Customization & state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedStock, setSearchedStock] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [watchlistStocks, setWatchlistStocks] = useState([]);
  
  // Gamification & insights
  const [insightScore, setInsightScore] = useState(120);
  const [streak, setStreak] = useState(3);
  const [scannedSignal, setScannedSignal] = useState(null);
  const [scanLoading, setScanLoading] = useState(false);
  const [savedLayoutMsg, setSavedLayoutMsg] = useState(false);
  
  // Tabs and toggles
  const [moversTab, setMoversTab] = useState('gainers');
  const [pnlRange, setPnlRange] = useState('1D');

  // Load layout and state from localStorage
  useEffect(() => {
    fetchWatchlist();
    
    const savedWidgets = localStorage.getItem('bulltrade_widgets_layout');
    if (savedWidgets) {
      try {
        setWidgets(JSON.parse(savedWidgets));
      } catch (e) {
        console.error("Error loading widgets layout", e);
      }
    }

    const savedScore = localStorage.getItem('bulltrade_insight_score');
    if (savedScore) {
      setInsightScore(Number(savedScore));
    }
    
    const savedStreak = localStorage.getItem('bulltrade_user_streak');
    if (savedStreak) {
      setStreak(Number(savedStreak));
    }
  }, []);

  // Watchlist detailed quote loader
  useEffect(() => {
    const loadWatchlistQuotes = async () => {
      if (user?.watchlist?.length > 0) {
        try {
          const details = [];
          for (const symbol of user.watchlist) {
            try {
              const res = await api.get(`/stocks/quote/${symbol}`);
              if (res.data) details.push(res.data);
              await new Promise(resolve => setTimeout(resolve, 300)); // Rate limit buffer
            } catch (err) {
              details.push({ symbol, error: true });
            }
          }
          setWatchlistStocks(details);
        } catch (err) {
          console.error("Failed to load watchlist quotes", err);
        }
      } else {
        setWatchlistStocks([]);
      }
    };
    loadWatchlistQuotes();
  }, [user?.watchlist]);

  // Handle stock searches
  const handleStockSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearchLoading(true);
    setSearchError(null);
    try {
      const response = await api.get(`/stocks/quote/${searchQuery}`);
      setSearchedStock(response.data);
      incrementScore(15);
    } catch (err) {
      setSearchError('Symbol not found or API limits exceeded.');
      setSearchedStock(null);
    } finally {
      setSearchLoading(false);
    }
  };

  // Reorder, pin, hide functions
  const moveWidget = (index, direction) => {
    const newWidgets = [...widgets];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newWidgets.length) return;
    
    // Swap
    const temp = newWidgets[index];
    newWidgets[index] = newWidgets[targetIndex];
    newWidgets[targetIndex] = temp;
    setWidgets(newWidgets);
  };

  const togglePin = (id) => {
    setWidgets(prev => {
      const updated = prev.map(w => w.id === id ? { ...w, isPinned: !w.isPinned } : w);
      // Sort pinned to top
      const pinned = updated.filter(w => w.isPinned);
      const unpinned = updated.filter(w => !w.isPinned);
      return [...pinned, ...unpinned];
    });
    incrementScore(5);
  };

  const hideWidget = (id) => {
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, isHidden: true } : w));
  };

  const restoreWidget = (id) => {
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, isHidden: false } : w));
    incrementScore(5);
  };

  const saveLayout = () => {
    localStorage.setItem('bulltrade_widgets_layout', JSON.stringify(widgets));
    setSavedLayoutMsg(true);
    setTimeout(() => setSavedLayoutMsg(false), 2500);
    incrementScore(10);
  };

  const resetLayout = () => {
    setWidgets(DEFAULT_WIDGETS);
    localStorage.removeItem('bulltrade_widgets_layout');
  };

  const incrementScore = (amount) => {
    setInsightScore(prev => {
      const next = prev + amount;
      localStorage.setItem('bulltrade_insight_score', String(next));
      return next;
    });
  };

  // Gamified market scanner trigger
  const runTechnicalScan = () => {
    setScanLoading(true);
    setTimeout(() => {
      const signals = [
        "RSI Golden Cross: AMD exhibits strong momentum above SMA 50.",
        "MACD Bullish Crossover identified on NVDA hourly chart.",
        "Golden Cross Alert: TSLA's 50-day EMA crossed above the 200-day EMA.",
        "Volume Breakout: MSFT volume surged 2.4x standard morning deviations.",
        "Support Bounce: AAPL bounced cleanly off historical support at $180."
      ];
      const randomSignal = signals[Math.floor(Math.random() * signals.length)];
      setScannedSignal(randomSignal);
      setScanLoading(false);
      incrementScore(25);
    }, 1200);
  };

  // Sparkline generator helper (reduced height to 26px for denser display)
  const drawSparkline = (points, color = '#22c55e') => {
    const width = 120;
    const height = 26;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const step = width / (points.length - 1);
    
    const coords = points.map((p, i) => {
      const x = i * step;
      const y = height - ((p - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={coords}
        />
      </svg>
    );
  };

  // Computed achievements
  const watchlistAchievement = user?.watchlist?.length > 0;
  const layoutSavedAchievement = localStorage.getItem('bulltrade_widgets_layout') !== null;
  const expertAchievement = insightScore >= 200;

  // Filter hidden widgets list
  const hiddenWidgets = widgets.filter(w => w.isHidden);

  return (
    <div className="w-full relative z-10 font-sans">
      
      {/* Top Controller Toolbar - Tightened padding and margin. Slogans completely removed. */}
      <header className="mb-3 flex flex-row justify-end items-center gap-3 border-b border-white/5 pb-2">
        
        {hiddenWidgets.length > 0 && (
          <div className="relative group">
            <button className="bg-slate-900 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-800 transition cursor-pointer flex items-center gap-1.5 text-slate-300">
              Add Widgets ({hiddenWidgets.length})
            </button>
            <div className="absolute right-0 top-full mt-1.5 w-48 bg-slate-950 border border-white/10 rounded-lg shadow-2xl p-1.5 hidden group-hover:block z-30">
              {hiddenWidgets.map(w => (
                <button
                  key={w.id}
                  onClick={() => restoreWidget(w.id)}
                  className="w-full text-left px-2 py-1.5 hover:bg-white/5 rounded-md text-xs font-bold transition text-slate-400 hover:text-white"
                >
                  + {w.title}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <button
          onClick={resetLayout}
          className="bg-slate-900 border border-white/10 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          title="Reset Widgets Layout"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        
        <button
          onClick={saveLayout}
          className="bg-cyan-700 hover:bg-cyan-600 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-950/20"
        >
          <Save className="h-3.5 w-3.5" /> Save Layout
        </button>

        {savedLayoutMsg && (
          <span className="text-xs text-emerald-400 font-bold animate-fade-in flex items-center gap-1">
            <Check className="h-3.5 w-3.5" /> Layout Saved!
          </span>
        )}
      </header>

      {/* Grid container with compressed gap (gap-3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
        
        {/* Dynamic Search result banner outside modular config */}
        {searchedStock && (
          <div className="lg:col-span-3 glass-surface rounded-xl p-4 relative overflow-hidden animate-slide-up border border-cyan-400/20">
            <div className="flex justify-between items-center mb-2.5 border-b border-white/10 pb-1.5">
              <h3 className="text-xs font-bold font-sans text-white flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                Active Stock Research: {searchedStock.symbol}
              </h3>
              <button 
                onClick={() => setSearchedStock(null)}
                className="text-xs text-slate-500 hover:text-white transition cursor-pointer"
              >
                Close Panel
              </button>
            </div>
            <div className="max-w-md">
              <StockCard stockData={searchedStock} isWatchlisted={user?.watchlist?.includes(searchedStock.symbol)} />
            </div>
          </div>
        )}

        {/* Map Widgets with rounded-xl and p-3 for high visual density */}
        {widgets.map((widget, idx) => {
          if (widget.isHidden) return null;

          return (
            <div 
              key={widget.id} 
              className={`glass-surface rounded-xl p-3 relative overflow-hidden group transition-all duration-350 hover:border-white/15 ${widget.w} ${widget.isPinned ? 'ring-1 ring-cyan-500/20' : ''}`}
            >
              
              {/* Widget Action Header - tighter spacing and small text */}
              <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-1">
                <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans flex items-center gap-1.5">
                  <span className="w-0.5 h-3 bg-cyan-500 rounded-full" />
                  {widget.title}
                </h2>
                
                <div className="flex items-center gap-1.5 opacity-35 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => togglePin(widget.id)}
                    className={`p-0.5 hover:bg-white/10 rounded transition cursor-pointer ${widget.isPinned ? 'text-cyan-400' : 'text-slate-500'}`}
                    title="Pin Widget"
                  >
                    <Pin className="h-3 w-3" />
                  </button>
                  <button 
                    onClick={() => moveWidget(idx, -1)}
                    className="p-0.5 text-slate-500 hover:text-white hover:bg-white/10 rounded transition cursor-pointer text-[10px]"
                    title="Move Up/Left"
                  >
                    ◀
                  </button>
                  <button 
                    onClick={() => moveWidget(idx, 1)}
                    className="p-0.5 text-slate-500 hover:text-white hover:bg-white/10 rounded transition cursor-pointer text-[10px]"
                    title="Move Down/Right"
                  >
                    ▶
                  </button>
                  <button 
                    onClick={() => hideWidget(widget.id)}
                    className="p-0.5 text-slate-500 hover:text-rose-400 hover:bg-white/10 rounded transition cursor-pointer"
                    title="Hide Widget"
                  >
                    <EyeOff className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Widget Content Router */}
              <div className="text-xs">
                
                {/* 1. Market Overview */}
                {widget.id === 'market-overview' && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {[
                      { name: 'S&P 500', value: '5,431.22', chg: '+0.84%', trend: [5380, 5395, 5410, 5402, 5431], color: '#22c55e' },
                      { name: 'NASDAQ', value: '17,885.30', chg: '+1.12%', trend: [17650, 17720, 17690, 17810, 17885], color: '#22c55e' },
                      { name: 'Dow Jones', value: '39,122.18', chg: '+0.45%', trend: [38950, 39020, 39010, 39080, 39122], color: '#22c55e' },
                      { name: 'Russell 2000', value: '2,014.50', chg: '-0.18%', trend: [2035, 2028, 2031, 2011, 2014], color: '#f43f5e' }
                    ].map(idx => (
                      <div key={idx.name} className="bg-slate-950/45 border border-white/5 rounded-lg p-2">
                        <div className="flex justify-between items-start">
                          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{idx.name}</span>
                          <span className={`text-[10px] font-bold ${idx.chg.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{idx.chg}</span>
                        </div>
                        <p className="text-base font-bold font-sans text-white mt-0.5 tracking-tight">{idx.value}</p>
                        <div className="mt-1.5 flex justify-center">{drawSparkline(idx.trend, idx.color)}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. AI Insights */}
                {widget.id === 'ai-insights' && (
                  <div className="space-y-1.5">
                    {[
                      { icon: <Cpu className="h-3.5 w-3.5 text-cyan-400" />, text: "NVIDIA volume is 3.2x above its 30-day average. Extreme buy momentum detected." },
                      { icon: <Zap className="h-3.5 w-3.5 text-amber-400" />, text: "Apple (AAPL) is approaching a key resistance level at $218. Watch for breakout signal." },
                      { icon: <Activity className="h-3.5 w-3.5 text-slate-400" />, text: "Tesla (TSLA) social discussion sentiment has increased 18% following regulatory nods." }
                    ].map((ins, i) => (
                      <div key={i} className="flex gap-2 bg-white/[0.02] border border-white/5 rounded-lg p-2.5">
                        <div className="mt-0.5 shrink-0">{ins.icon}</div>
                        <p className="text-xs text-slate-300 leading-normal">{ins.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. Top Movers */}
                {widget.id === 'top-movers' && (
                  <div>
                    <div className="grid grid-cols-3 gap-1.5 p-0.5 bg-[#090d16]/80 border border-white/10 rounded-lg mb-2 text-center">
                      {['gainers', 'losers', 'active'].map(t => (
                        <button
                          key={t}
                          onClick={() => setMoversTab(t)}
                          className={`py-0.5 text-[9px] font-bold uppercase tracking-wider rounded transition cursor-pointer ${moversTab === t ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-white'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-1">
                      {{
                        gainers: [
                          { sym: 'AMD', price: '$158.42', chg: '+7.42%', up: true },
                          { sym: 'NVDA', price: '$151.90', chg: '+6.42%', up: true },
                          { sym: 'ARM', price: '$124.18', chg: '+4.12%', up: true }
                        ],
                        losers: [
                          { sym: 'BABA', price: '$72.10', chg: '-4.28%', up: false },
                          { sym: 'NFLX', price: '$482.40', chg: '-3.15%', up: false },
                          { sym: 'NIO', price: '$4.12', chg: '-2.96%', up: false }
                        ],
                        active: [
                          { sym: 'TSLA', price: '$198.40', chg: '+3.74%', up: true },
                          { sym: 'AAPL', price: '$214.72', chg: '+1.28%', up: true },
                          { sym: 'AMZN', price: '$185.42', chg: '-0.32%', up: false }
                        ]
                      }[moversTab].map(stock => (
                        <div key={stock.sym} className="flex justify-between items-center bg-white/[0.01] border border-white/5 rounded-lg px-2.5 py-1 transition hover:bg-white/[0.03]">
                          <span className="font-extrabold text-white text-[11px]">{stock.sym}</span>
                          <div className="text-right flex items-center gap-2.5">
                            <span className="font-bold text-slate-300 text-[10px]">{stock.price}</span>
                            <span className={`text-[10px] font-bold ${stock.up ? 'text-emerald-400' : 'text-rose-400'}`}>{stock.chg}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Watchlist */}
                {widget.id === 'watchlist-feed' && (
                  <div>
                    {watchlistStocks.length > 0 ? (
                      <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
                        {watchlistStocks.map(stock => {
                          if (stock.error) {
                            return (
                              <div key={stock.symbol} className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded-lg px-2.5 py-1">
                                <span className="font-bold text-slate-500 uppercase">{stock.symbol}</span>
                                <span className="text-[10px] text-amber-500 font-bold">Stale</span>
                              </div>
                            );
                          }
                          return (
                            <Link href={`/stock/${stock.symbol}`} key={stock.symbol} className="flex justify-between items-center bg-white/[0.01] border border-white/5 hover:border-cyan-500/25 rounded-lg px-2.5 py-1.5 transition group/item">
                              <div>
                                <span className="font-extrabold text-white group-hover/item:text-cyan-400 transition-colors uppercase text-[11px]">{stock.symbol}</span>
                                <p className="text-[8px] text-slate-500 font-bold uppercase mt-0.5">Ticker</p>
                              </div>
                              <div className="text-right flex items-center gap-2.5">
                                <span className="font-bold text-slate-200 text-xs">${stock.currentPrice?.toFixed(2)}</span>
                                <span className={`text-xs font-bold ${stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                  {stock.change >= 0 ? '+' : ''}{stock.percentageChange?.toFixed(1)}%
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-4 text-center text-xs text-slate-500 font-medium">
                        Search stocks in terminal header and bookmark them to populate this stream.
                      </div>
                    )}
                  </div>
                )}

                {/* 5. Portfolio P&L */}
                {widget.id === 'portfolio-pnl' && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Net Holdings Value</span>
                        <h4 className="text-lg font-bold text-white mt-0.5">$24,820.00</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold text-emerald-400 block">+1.98% today</span>
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-0.5 block">+$480.20</span>
                      </div>
                    </div>

                    <div className="flex gap-1 justify-end p-0.5 bg-[#090d16]/80 border border-white/10 rounded mb-2 text-center max-w-[120px] ml-auto">
                      {['1D', '1W', '1M'].map(range => (
                        <button
                          key={range}
                          onClick={() => setPnlRange(range)}
                          className={`flex-1 py-0.5 text-[8px] font-bold uppercase rounded transition cursor-pointer ${pnlRange === range ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'}`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>

                    <div className="h-16 flex items-end justify-center">
                      {pnlRange === '1D' && drawSparkline([24340, 24410, 24390, 24520, 24820], '#22c55e')}
                      {pnlRange === '1W' && drawSparkline([23540, 23780, 24100, 23920, 24820], '#22c55e')}
                      {pnlRange === '1M' && drawSparkline([21890, 22430, 23110, 22910, 24820], '#22c55e')}
                    </div>
                  </div>
                )}

                {/* 6. Market News Feed (timeline) - Enhanced, Scrollable, source/date, and impact tags */}
                {widget.id === 'news-timeline' && (
                  <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                    {[
                      { headline: "Fed maintains interest rates; Powell hints at September policy evaluation.", date: "10m ago", src: "Bloomberg", impact: "HIGH", color: "text-rose-400 border-rose-500/20 bg-rose-500/5" },
                      { headline: "NVIDIA shares surge 6.4% on high supply orders for AI Blackwell chips.", date: "40m ago", src: "Reuters", impact: "HIGH", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" },
                      { headline: "Tech stocks lead rally as NASDAQ climbs 1.1% on strong volume metrics.", date: "1h ago", src: "Refinitiv", impact: "MED", color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5" },
                      { headline: "Apple (AAPL) analyst upgrade: target raised to $230 at Morgan Stanley.", date: "2h ago", src: "Bloomberg", impact: "MED", color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5" },
                      { headline: "Watchlist Alert: AMD breaches $160 resistance on heavy call options volume.", date: "3h ago", src: "BullTrade", impact: "HIGH", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" },
                      { headline: "Treasury yields slide to 4.21% following weaker inflation indices.", date: "4h ago", src: "Reuters", impact: "LOW", color: "text-slate-400 border-slate-500/20 bg-slate-500/5" }
                    ].map((news, idx) => (
                      <div key={idx} className="space-y-1 bg-white/[0.01] border border-white/5 rounded-lg p-2.5 flex flex-col hover:bg-white/[0.02]">
                        <div className="flex justify-between items-center text-[8px] font-bold text-slate-500 uppercase">
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-400">{news.src}</span>
                            <span>•</span>
                            <span>{news.date}</span>
                          </div>
                          <span className={`px-1.5 py-0.2 rounded border text-[7px] ${news.color}`}>
                            {news.impact} IMPACT
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-200 leading-snug hover:text-cyan-400 transition-colors cursor-pointer">{news.headline}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 7. Market Heatmap */}
                {widget.id === 'market-heatmap' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Sector Performance */}
                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Sector performance</span>
                      {[
                        { name: 'Technology', value: '+2.42%', up: true },
                        { name: 'Financials', value: '+0.84%', up: true },
                        { name: 'Healthcare', value: '+0.12%', up: true },
                        { name: 'Energy', value: '-1.45%', up: false }
                      ].map(sec => (
                        <div key={sec.name} className="flex justify-between items-center bg-[#090d16]/30 border border-white/5 rounded-lg px-2.5 py-1">
                          <span className="text-[11px] font-bold text-slate-300">{sec.name}</span>
                          <span className={`text-[11px] font-bold ${sec.up ? 'text-emerald-400' : 'text-rose-400'}`}>{sec.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Capital Flow */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Net Capital Flow</span>
                      {[
                        { name: 'Tech Inflows', percent: 84, color: 'bg-emerald-500' },
                        { name: 'Financials Inflows', percent: 52, color: 'bg-emerald-500' },
                        { name: 'Energy Outflows', percent: 74, color: 'bg-rose-500' }
                      ].map(flow => (
                        <div key={flow.name} className="space-y-0.5">
                          <div className="flex justify-between text-[9px] font-bold text-slate-400">
                            <span>{flow.name}</span>
                            <span>{flow.percent}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-900 border border-white/5 rounded-full overflow-hidden">
                            <div className={`h-full ${flow.color} rounded-full`} style={{ width: `${flow.percent}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Market Sentiment dial */}
                    <div className="flex flex-col items-center justify-center p-2 bg-white/[0.01] border border-white/5 rounded-xl text-center">
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1.5 block">Overall Sentiment</span>
                      <div className="grid size-16 place-items-center rounded-full bg-[conic-gradient(#06b6d4_0_72%,rgba(255,255,255,0.08)_72%_100%)]">
                        <div className="grid size-12 place-items-center rounded-full bg-[#090d16] text-xs font-bold text-cyan-400">
                          72%
                        </div>
                      </div>
                      <span className="text-[9px] text-emerald-400 font-bold mt-1 uppercase tracking-wide">Highly Bullish Dial</span>
                    </div>
                  </div>
                )}

                {/* 8. Discovery Hub */}
                {widget.id === 'discovery-hub' && (
                  <div className="space-y-1.5">
                    {[
                      { badge: "52W Breakout", details: "Amazon (AMZN) breached $188, hitting historical records.", c: "text-amber-400 border-amber-500/25 bg-amber-500/5" },
                      { badge: "Analyst Upgrade", details: "Microsoft (MSFT) rated Strong Buy by Goldman Sachs.", c: "text-cyan-400 border-cyan-500/25 bg-cyan-500/5" },
                      { badge: "Unusual Volume", details: "NVIDIA (NVDA) morning volume spikes 3.2x average.", c: "text-cyan-400 border-cyan-500/25 bg-cyan-500/5" }
                    ].map((disc, idx) => (
                      <div key={idx} className="bg-white/[0.01] border border-white/5 rounded-lg p-2.5 space-y-0.5">
                        <span className={`inline-flex px-1.5 py-0.2 rounded-full text-[8px] font-bold border ${disc.c}`}>
                          {disc.badge}
                        </span>
                        <p className="text-xs text-slate-300 font-semibold leading-normal">{disc.details}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 9. Investor Activity Feed */}
                {widget.id === 'investor-activity' && (
                  <div className="space-y-1.5">
                    {[
                      "3 stocks in your watchlist (NVDA, TSLA, AMD) moved more than 5% today.",
                      "Your portfolio outperformed the S&P 500 this month by 4.2%.",
                      "2 companies you follow (AAPL, MSFT) report earnings this week."
                    ].map((feed, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-xs text-slate-300 bg-white/[0.01] border border-white/5 rounded-lg p-2 leading-normal">
                        <Activity className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feed}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* 10. Technical Signals */}
                {widget.id === 'technical-signals' && (
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-3 gap-1 text-center text-[9px] font-bold">
                      <div className="bg-[#090d16] border border-white/10 p-1.5 rounded-lg">
                        <p className="text-slate-500 mb-0.5">RSI (14)</p>
                        <p className="text-white font-extrabold text-[9px]">62 // Neutral</p>
                      </div>
                      <div className="bg-[#090d16] border border-white/10 p-1.5 rounded-lg">
                        <p className="text-slate-500 mb-0.5">MACD</p>
                        <p className="text-emerald-400 font-extrabold text-[9px]">Bullish Cross</p>
                      </div>
                      <div className="bg-[#090d16] border border-white/10 p-1.5 rounded-lg">
                        <p className="text-slate-500 mb-0.5">EMA 50/200</p>
                        <p className="text-emerald-400 font-extrabold text-[9px]">Golden Cross</p>
                      </div>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-2.5 rounded-xl relative overflow-hidden">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Pattern Scanner</span>
                        <button
                          onClick={runTechnicalScan}
                          disabled={scanLoading}
                          className="bg-cyan-700 hover:bg-cyan-600 text-white px-2 py-0.5 rounded text-[8px] font-bold cursor-pointer disabled:opacity-50"
                        >
                          {scanLoading ? 'Scanning...' : 'Run Scan'}
                        </button>
                      </div>

                      {scannedSignal ? (
                        <p className="text-[10px] text-slate-200 font-semibold leading-normal animate-fade-in">
                          {scannedSignal}
                        </p>
                      ) : (
                        <p className="text-[10px] text-slate-500 leading-normal">
                          Run technical scanner for S&P 500 signals.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* 11. Achievements & Streaks */}
                {widget.id === 'achievements-card' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-[#090d16] border border-white/10 rounded-xl p-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-amber-500/10 border border-amber-500/20 rounded flex items-center justify-center text-amber-400 animate-pulse">
                          <Award className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block">Streak</span>
                          <span className="text-xs font-bold text-white font-sans mt-0.5 block">{streak} Days</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block">Score</span>
                        <span className="text-sm font-bold text-cyan-400 font-sans mt-0.5 block">{insightScore} PTS</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Achievements</span>
                      {[
                        { title: 'First Watchlist', desc: 'Add 1 stock to watchlist.', met: watchlistAchievement },
                        { title: 'Layout Architect', desc: 'Save custom widget configuration.', met: layoutSavedAchievement },
                        { title: 'Expert Analyst', desc: 'Reach 200 insight score points.', met: expertAchievement }
                      ].map(ach => (
                        <div key={ach.title} className="flex justify-between items-center bg-white/[0.01] border border-white/5 rounded-lg px-2.5 py-1">
                          <div>
                            <span className="text-xs font-bold text-slate-200 block">{ach.title}</span>
                            <span className="text-[8px] text-slate-500 font-semibold block">{ach.desc}</span>
                          </div>
                          <span className={`text-[8px] font-bold uppercase tracking-wider ${ach.met ? 'text-emerald-400' : 'text-slate-600'}`}>
                            {ach.met ? 'Unlocked' : 'Locked'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}
