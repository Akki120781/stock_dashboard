"use client";

import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
        }
        return response.data;
    };

    const signup = async (username, email, password, role = 'user') => {
        const response = await api.post('/auth/signup', { username, email, password, role });
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
        }
        return response.data;
    };

    const googleLogin = async (accessToken) => {
        const response = await api.post('/auth/google', { accessToken });
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
        }
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const fetchWatchlist = async () => {
        if (user && user.token) {
            try {
                const response = await api.get('/watchlist');
                setUser({ ...user, watchlist: response.data });
                localStorage.setItem('user', JSON.stringify({ ...user, watchlist: response.data }));
            } catch (error) {
                console.error('Failed to fetch watchlist', error);
            }
        }
    };

    const providerValue = {
        user,
        loading,
        login,
        signup,
        googleLogin,
        logout,
        fetchWatchlist,
        watchlistCount: user?.watchlist?.length || 0,
    };

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || 'dummy-client-id.apps.googleusercontent.com'}>
            <AuthContext.Provider value={providerValue}>
                {children}
            </AuthContext.Provider>
        </GoogleOAuthProvider>
    );
};
