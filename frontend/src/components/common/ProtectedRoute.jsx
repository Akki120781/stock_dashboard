"use client";

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.replace('/login');
            } else if (adminOnly && user.role !== 'admin') {
                router.replace('/dashboard');
            }
        }
    }, [user, loading, adminOnly, router]);

    if (loading || !user || (adminOnly && user.role !== 'admin')) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                    <p className="text-sm font-medium text-slate-400">Verifying session...</p>
                </div>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
