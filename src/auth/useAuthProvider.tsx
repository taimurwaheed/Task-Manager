import { useState } from 'react';
import type { AuthContextType } from '../types/user.types';

export const useAuthProvider = (): AuthContextType => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });

    const login = (userData: any) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return {
        user,
        login,
        logout
    };
};
