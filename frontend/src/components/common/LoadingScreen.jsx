import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

const loadingMessages = [
  "Connecting to secure data streams...",
  "Waking up the backend database...",
  "Fetching live stock analytics...",
  "Running portfolio trend updates...",
  "Initializing premium dashboard..."
];

const LoadingScreen = ({ fadeOut = false, inline = false }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  if (inline) {
    return (
      <div className="w-full min-h-[400px] py-16 flex flex-col items-center justify-center text-slate-800 dark:text-white transition-colors duration-300">
        {/* Glass Logo Container */}
        <div className="w-16 h-16 bg-indigo-500/5 dark:bg-brand-500/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center shadow-md backdrop-blur-md mb-6 animate-pulse-slow">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-400 dark:from-brand-500 dark:to-brand-400 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <TrendingUp className="text-white w-5 h-5 animate-bounce" />
          </div>
        </div>

        {/* Self-drawing SVG line chart */}
        <div className="w-48 h-16 flex items-center justify-center mb-4 text-indigo-600 dark:text-brand-400">
          <svg className="w-full h-full" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5,25 Q20,8 35,20 T70,5 T95,12"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="150"
              strokeDashoffset="150"
              className="animate-draw-chart"
            />
            <circle cx="95" cy="12" r="2" fill="currentColor" className="animate-ping" />
          </svg>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 font-bold tracking-wide animate-pulse">
          Fetching market data streams...
        </p>
      </div>
    );
  }

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] text-white overflow-hidden transition-opacity duration-500 ease-in-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient background glows */}
      <div className="absolute top-[-20%] left-[-15%] w-[60rem] h-[60rem] bg-indigo-600/15 rounded-full mix-blend-screen filter blur-[120px] animate-blob z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-15%] w-[50rem] h-[50rem] bg-brand-500/15 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000 z-0 pointer-events-none"></div>

      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU5LjUgMGguNXY2MGgtLjVWME0wIDU5LjVoNjB2LjVIMFY1OS41eiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAxNSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-60 z-0 pointer-events-none"></div>

      {/* Loader Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Glass Logo Container */}
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-brand-500/10 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md mb-6 animate-pulse-slow">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-brand-400 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <TrendingUp className="text-white w-6 h-6 animate-bounce" />
          </div>
        </div>

        {/* Branding */}
        <h1 className="text-3xl font-black tracking-tight mb-2">
          Trade<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-brand-400">Dash</span>
        </h1>
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-8">
          Next-Gen Market Platform
        </p>

        {/* Self-drawing SVG line chart */}
        <div className="w-64 h-20 flex items-center justify-center mb-6">
          <svg className="w-full h-full" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Soft grid background */}
            <line x1="0" y1="5" x2="100" y2="5" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="0" y1="15" x2="100" y2="15" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="1 1" />

            {/* Glowing line path */}
            <path
              d="M5,25 Q20,8 35,20 T70,5 T95,12"
              stroke="url(#loaderChartGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="150"
              strokeDashoffset="150"
              className="animate-draw-chart"
            />

            {/* Glowing endpoint indicator */}
            <circle cx="95" cy="12" r="2" fill="#14b8a6" className="animate-ping" />

            <defs>
              <linearGradient id="loaderChartGradient" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Dynamic loading messages */}
        <div className="h-6">
          <p className="text-sm text-slate-400 font-medium tracking-wide transition-all duration-300 animate-slide-up">
            {loadingMessages[messageIndex]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
