// src/context/auth/useAuthProvider.tsx
import { useState, useEffect } from 'react';
import type { AuthContextType } from '../types/user.types';

export const useAuthProvider = (): AuthContextType => {
    const [user, setUser] = useState(() => {
        const stored = sessionStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });

    const [hasSignedUp, setHasSignedUp] = useState<boolean>(() => {
        return localStorage.getItem('hasSignedUp') === 'true';
    });

    const login = (userData: any) => {
        sessionStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        sessionStorage.removeItem('user');
        setUser(null);
    };

    useEffect(() => {
        localStorage.setItem('hasSignedUp', String(hasSignedUp));
    }, [hasSignedUp]);

    return {
        user,
        login,
        logout,
        hasSignedUp,
        setHasSignedUp,
    };
};
