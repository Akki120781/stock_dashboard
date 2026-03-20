import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LogIn, Loader2, Info } from 'lucide-react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showWakeupMessage, setShowWakeupMessage] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (loading) {
            timer = setTimeout(() => {
                setShowWakeupMessage(true);
            }, 3000); // Show wakeup message after 3 seconds
        } else {
            setShowWakeupMessage(false);
        }
        return () => clearTimeout(timer);
    }, [loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login. Check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full relative z-10 glass-panel p-8 sm:p-10 rounded-3xl animate-fade-in shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.7)]">
                <div>
                    <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-2xl bg-brand-100 dark:bg-brand-900 mb-6 shadow-inner">
                        <LogIn className="h-7 w-7 text-brand-600 dark:text-brand-400" />
                    </div>
                    <h2 className="text-center text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                        Welcome back
                    </h2>
                    <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-8 font-medium">
                        Sign in to your account
                    </p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50/80 dark:bg-red-900/40 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm border border-red-200 dark:border-red-800/50 animate-slide-up backdrop-blur-sm">
                        {error}
                    </div>
                )}
                
                {showWakeupMessage && (
                    <div className="mb-6 bg-blue-50/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 p-4 rounded-xl text-sm border border-blue-200 dark:border-blue-800/50 flex items-start space-x-3 animate-slide-up backdrop-blur-sm">
                        <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold mb-1">Connecting to server...</p>
                            <p className="text-xs opacity-90 leading-relaxed">Please wait up to 50 seconds as our backend server wakes up from sleep.</p>
                        </div>
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Email</label>
                            <input
                                type="email"
                                required
                                disabled={loading}
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-300 dark:border-slate-600/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-all shadow-sm"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Password</label>
                            <input
                                type="password"
                                required
                                disabled={loading}
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-300 dark:border-slate-600/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-all shadow-sm"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center items-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                                        <LogIn className="h-5 w-5 text-brand-200 group-hover:text-white transition-colors" />
                                    </span>
                                    Sign in
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-bold text-brand-600 dark:text-brand-400 hover:text-brand-500 transition-colors">
                        Sign up here
                    </Link>
                </div>
            </div>
    );
};

export default LoginForm;
