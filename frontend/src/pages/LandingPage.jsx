import React from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, BarChart3, ShieldCheck, Zap, ArrowRight, Activity, DollarSign, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleViewDemoClick = (e) => {
    e.preventDefault();
    const showcase = document.getElementById("showcase-section");
    if (showcase) {
      showcase.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <div className="w-full min-h-screen bg-[#020617] text-white selection:bg-indigo-500 selection:text-white font-sans relative overflow-hidden">
      
      {/* 1. HERO VIDEO BACKGROUND & OVERLAY */}
      <div className="absolute inset-0 w-full h-[100vh] z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dfonotyfb/video/upload/v1775585556/dds3_1_rqhg7x.mp4"
            type="video/mp4"
          />
        </video>
        {/* Soft cinematic vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-black/40 to-[#020617] z-1"></div>
      </div>

      {/* 2. HERO CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-[calc(100vh-4rem)] pt-20 pb-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 md:space-y-8 animate-fade-in">
          
          {/* Glassmorphic Announcement Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wide text-indigo-400 backdrop-blur-md shadow-2xl animate-pulse-slow">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            🚀 Real-Time Market Intelligence Platform
          </div>

          {/* Headline */}
          <h1 className="text-foreground text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-tight">
            Build wealth with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-brand-400">
              data-driven investing
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-slate-300 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
            Monitor stocks, market sentiment, and portfolio performance through a single intelligent dashboard designed for modern investors.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full max-w-md">
            <Button 
              size="lg"
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-6 rounded-full font-bold text-lg shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
            >
              Get Started
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={handleViewDemoClick}
              className="w-full sm:w-auto border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 text-white px-10 py-6 rounded-full font-bold text-lg backdrop-blur-md shadow-md transition-all duration-300 hover:scale-[1.03] cursor-pointer"
            >
              View Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 pt-16 w-full max-w-3xl border-t border-white/5 text-slate-400 font-medium">
            <div className="text-center">
              <div className="font-extrabold text-white text-2xl md:text-4xl tracking-tight mb-1">50K+</div>
              <div className="text-xs md:text-sm">Active Users</div>
            </div>
            <div className="w-px h-12 bg-white/5 mx-auto"></div>
            <div className="text-center">
              <div className="font-extrabold text-white text-2xl md:text-4xl tracking-tight mb-1">$2B+</div>
              <div className="text-xs md:text-sm">Assets Tracked</div>
            </div>
            <div className="w-px h-12 bg-white/5 mx-auto"></div>
            <div className="text-center">
              <div className="font-extrabold text-white text-2xl md:text-4xl tracking-tight mb-1">99.9%</div>
              <div className="text-xs md:text-sm">API Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SHOWCASE SECTION */}
      <section id="showcase-section" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Institutional power, <br />
            <span className="text-indigo-400">retail simplicity.</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Say goodbye to clunky broker screens. BullTrade delivers real-time market streams, portfolio analytics, and approvals in a clean, modern workspace.
          </p>
        </div>

        {/* Dashboard Mockup Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart Mockup */}
          <div className="lg:col-span-2 glass-panel border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full filter blur-[60px] pointer-events-none"></div>
            
            {/* Mock Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-2 rounded-xl">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AAPL: Apple Inc.</h3>
                  <p className="text-xs text-slate-500">NasdaqGS • Real-Time Price Feed</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black">$189.84</p>
                <p className="text-xs font-bold text-emerald-400 flex items-center justify-end gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +2.48% Today
                </p>
              </div>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="w-full h-64 relative flex items-end">
              <svg className="w-full h-full" viewBox="0 0 500 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Grid Lines */}
                <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="60" x2="500" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                {/* Fill Area Gradient */}
                <path
                  d="M0,140 L50,110 L100,120 L150,90 L200,95 L250,70 L300,80 L350,50 L400,60 L450,20 L500,45 L500,150 L0,150 Z"
                  fill="url(#areaGrad)"
                  opacity="0.1"
                />

                {/* Stroke path */}
                <path
                  d="M0,140 L50,110 L100,120 L150,90 L200,95 L250,70 L300,80 L350,50 L400,60 L450,20 L500,45"
                  stroke="url(#strokeGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="600"
                  strokeDashoffset="600"
                  className="animate-draw-chart"
                />

                <defs>
                  <linearGradient id="strokeGrad" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Live stats footer */}
            <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t border-white/5 text-center text-xs">
              <div>
                <p className="text-slate-500 font-semibold mb-1">Open</p>
                <p className="font-bold text-white">$186.20</p>
              </div>
              <div>
                <p className="text-slate-500 font-semibold mb-1">High</p>
                <p className="font-bold text-white">$190.58</p>
              </div>
              <div>
                <p className="text-slate-500 font-semibold mb-1">Low</p>
                <p className="font-bold text-white">$185.12</p>
              </div>
              <div>
                <p className="text-slate-500 font-semibold mb-1">Volume</p>
                <p className="font-bold text-white">52.4M</p>
              </div>
            </div>

          </div>

          {/* Sidebar Tools Showcase */}
          <div className="flex flex-col gap-6">
            
            {/* Live Watchlist Showcase */}
            <div className="glass-panel border border-white/10 rounded-3xl p-6 shadow-2xl flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-brand-500 rounded-full"></span>
                  Dynamic Watchlist
                </h4>
                
                {/* Mock Watchlist rows */}
                <div className="flex flex-col gap-3">
                  {[
                    { symbol: "TSLA", price: "$179.24", change: "+1.82%", plus: true },
                    { symbol: "MSFT", price: "$415.50", change: "-0.45%", plus: false },
                    { symbol: "NVDA", price: "$875.12", change: "+4.12%", plus: true }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm uppercase">{item.symbol}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-sm block">{item.price}</span>
                        <span className={`text-xs font-semibold ${item.plus ? 'text-emerald-400' : 'text-red-400'}`}>
                          {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <p className="text-xs text-slate-500 text-center font-medium">Add stocks in 1-click to track from anywhere.</p>
              </div>
            </div>

            {/* Quick Stats Showcase */}
            <div className="glass-panel border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                  Secured & Approved
                </h4>
                <div className="flex items-start gap-4 p-3 rounded-2xl bg-[#0d5e3a]/10 border border-emerald-500/20">
                  <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs text-emerald-400">SEC COMPLIANCE READY</h5>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      All order transactions require approval workflows ensuring compliant capital allocation limits.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button 
                  onClick={() => navigate('/signup')}
                  className="w-full bg-white text-slate-900 hover:bg-slate-100 rounded-2xl py-6 font-bold cursor-pointer transition flex items-center justify-center gap-2 group"
                >
                  Create Watchlist <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* 4. DETAILS FEATURES */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex flex-col items-center text-center p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Real-Time Streams</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Experience zero latency quotes. Monitor tick changes, daily limits, and moving trends in a split second.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Advanced Analytics</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Gain clarity on price directions, highs, lows, and moving averages through custom interactive charting models.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Compliance & Logs</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Track purchase transaction histories and administrative approval actions inside a secure ledger database.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
