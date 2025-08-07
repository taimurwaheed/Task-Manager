import React from 'react';
import type { User } from '../types/user.types';

export const TaskHeader: React.FC<{ user: User | null; logout: () => void }> = ({ user, logout }) => (
    <div className="flex justify-between items-center pb-6 border-b border-white/20">
        <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            Welcome, {user?.email}
        </h2>
        <button
            onClick={logout}
            className="bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-100 px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
        >
            Logout
        </button>
    </div>
);