import React, { useState, useEffect, useContext, useRef } from 'react';
import { X, Mail, Lock, User, Loader2, TrendingUp } from 'lucide-react';
import { BullLogo } from '../ui/bull-logo';
import { AuthContext } from '../../context/AuthContext';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { login, signup } = useContext(AuthContext);
  const modalRef = useRef(null);

  // Sync mode with prop change
  useEffect(() => {
    setMode(initialMode);
    setShowEmailForm(false);
    setError(null);
  }, [initialMode, isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(username, email, password);
      }
      onClose(); // Close on success
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-md bg-[#0b0f19]/90 border border-slate-800/80 rounded-3xl p-8 shadow-[0_0_50px_rgba(99,102,241,0.15)] text-white backdrop-blur-2xl transform transition-transform duration-300 scale-100 flex flex-col gap-6"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800/40 border border-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-red-950/40 border border-red-500/20 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <div className="w-8 h-8 bg-red-950/20 border border-red-500/10 rounded-xl flex items-center justify-center">
              <BullLogo className="w-4 h-4" />
            </div>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-[280px]">
            {mode === 'login' 
              ? 'Access real-time quotes, charts, and your portfolio.' 
              : 'Start monitoring stocks and building watchlists today.'}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {/* Forms */}
        {!showEmailForm ? (
          <div className="flex flex-col gap-3">
            {/* Google */}
            <button 
              onClick={() => alert("OAuth login is in demo mode. Please use Continue with Email.")}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white/5 border border-slate-800 rounded-2xl hover:bg-white/10 hover:border-slate-700 transition font-medium text-sm cursor-pointer"
            >
              {/* Google official logo SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.41 0-6.19-2.78-6.19-6.19s2.78-6.19 6.19-6.19c1.7 0 3.25.69 4.39 1.8l3.24-3.24C19.22 2.37 15.93 1.15 12.24 1.15 6.09 1.15 1.15 6.09 1.15 12.24s4.94 11.09 11.09 11.09c6.48 0 11.09-4.56 11.09-11.09 0-.75-.07-1.3-.19-1.96H12.24z"/>
              </svg>
              Continue with Google
            </button>

            {/* GitHub */}
            <button 
              onClick={() => alert("OAuth login is in demo mode. Please use Continue with Email.")}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white/5 border border-slate-800 rounded-2xl hover:bg-white/10 hover:border-slate-700 transition font-medium text-sm cursor-pointer"
            >
              {/* GitHub logo SVG */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              Continue with GitHub
            </button>

            <div className="relative flex items-center justify-center my-2 text-xs uppercase tracking-wider text-slate-500">
              <span className="absolute inset-x-0 h-px bg-slate-800"></span>
              <span className="relative px-3 bg-[#0b0f19]">or</span>
            </div>

            {/* Email Trigger */}
            <button 
              onClick={() => setShowEmailForm(true)}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl hover:bg-indigo-600/20 hover:border-indigo-500/40 text-indigo-400 transition font-medium text-sm cursor-pointer"
            >
              <Mail className="w-5 h-5" />
              Continue with Email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  required
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-slate-800/80 rounded-2xl focus:outline-none focus:border-indigo-500 text-sm placeholder-slate-500 font-medium transition"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
              <input 
                type="email" 
                required
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-slate-800/80 rounded-2xl focus:outline-none focus:border-indigo-500 text-sm placeholder-slate-500 font-medium transition"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
              <input 
                type="password" 
                required
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-slate-800/80 rounded-2xl focus:outline-none focus:border-indigo-500 text-sm placeholder-slate-500 font-medium transition"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 py-3.5 px-4 rounded-2xl font-bold text-sm text-white shadow-lg shadow-indigo-600/20 transition cursor-pointer mt-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>

            <button 
              type="button"
              onClick={() => setShowEmailForm(false)}
              className="text-xs text-slate-500 hover:text-slate-300 transition text-center cursor-pointer mt-1"
            >
              ← Back to other options
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-slate-400 mt-2 border-t border-slate-900 pt-4">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button 
                onClick={() => setMode('signup')}
                className="text-indigo-400 hover:underline font-semibold cursor-pointer"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button 
                onClick={() => setMode('login')}
                className="text-indigo-400 hover:underline font-semibold cursor-pointer"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
