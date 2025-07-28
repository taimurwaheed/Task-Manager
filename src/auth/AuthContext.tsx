// src/context/auth/AuthContext.tsx
import { createContext, useContext, type ReactNode } from 'react';
import type { AuthContextType } from '../types/user.types';
import { useAuthProvider } from './useAuthProvider';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const auth = useAuthProvider();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
