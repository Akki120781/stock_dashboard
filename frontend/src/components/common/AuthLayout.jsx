import React from 'react';
import { TrendingUp, BarChart3, Activity } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen flex bg-slate-50 dark:bg-[#000000] selection:bg-brand-500 selection:text-white">
            {/* Left Side - Animated Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 border-r border-slate-800">
                {/* Dynamic Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-[#040b16] to-[#020617]"></div>
                    <div className="absolute -top-[20%] -left-[10%] w-[50rem] h-[50rem] bg-brand-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob z-0"></div>
                    <div className="absolute top-[40%] -right-[20%] w-[40rem] h-[40rem] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 z-0"></div>
                </div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU5LjUgMGguNXY2MGgtLjVWME0wIDU5LjVoNjB2LjVIMFY1OS41eiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-50 z-0"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between p-16 w-full h-full">
                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                                <TrendingUp className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-black text-white tracking-tight">TradeDash</span>
                        </div>
                        
                        <h1 className="text-5xl font-bold text-white leading-tight mb-6">
                            Master the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">Markets</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-md">
                            Advanced charting, real-time data, and intelligent insights to help you make the best trading decisions.
                        </p>
                    </div>

                    {/* Decorative App Mockup / Charts */}
                    <div className="relative mt-12 w-full max-w-lg">
                        <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <p className="text-slate-400 text-sm font-medium">Portfolio Value</p>
                                    <p className="text-white text-3xl font-bold mt-1">$124,562.00</p>
                                </div>
                                <div className="bg-brand-500/20 text-brand-400 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4" /> +14.2%
                                </div>
                            </div>
                            
                            {/* Fake Chart Bars representing Stock Growth */}
                            <div className="flex items-end gap-2 h-32 w-full mt-4">
                                {[35, 45, 30, 60, 50, 80, 65, 90, 75, 100].map((h, i) => (
                                    <div key={i} className="flex-1 bg-slate-800 rounded-t-sm relative group-hover:bg-slate-700 transition-colors duration-300">
                                        <div 
                                            className="absolute bottom-0 w-full bg-gradient-to-t from-brand-600 to-brand-400 rounded-t-sm transition-all duration-1000 ease-out"
                                            style={{ height: `${h}%`, opacity: 0.8 }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Floating elements */}
                        <div className="absolute -right-6 -top-6 glass-panel p-4 rounded-2xl border border-white/10 shadow-2xl animate-slide-up animation-delay-2000">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-500/20 p-2 rounded-lg">
                                    <Activity className="text-green-400 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">AAPL</p>
                                    <p className="text-sm font-bold text-white">+2.4%</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -left-8 top-1/2 glass-panel p-4 rounded-xl border border-white/10 shadow-2xl animate-fade-in animation-delay-4000">
                             <div className="flex items-center gap-3">
                                <div className="bg-indigo-500/20 p-2 rounded-lg">
                                    <BarChart3 className="text-indigo-400 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">TSLA</p>
                                    <p className="text-sm font-bold text-white">-1.2%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative">
                {/* Mobile Header (Only visible on small screens) */}
                <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-indigo-600 rounded-lg flex items-center justify-center">
                        <TrendingUp className="text-white w-4 h-4" />
                    </div>
                    <span className="text-xl font-bold dark:text-white text-slate-900">TradeDash</span>
                </div>

                {/* Form Container */}
                <div className="w-full max-w-md animate-fade-in">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
