import React from 'react';
import type { Stats } from '../types/task.types';

export const TaskStats: React.FC<Stats> = ({ active, completed, total }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-white/20 rounded-2xl p-6 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-white mb-2">{total}</div>
            <div className="text-blue-200 text-sm">Total</div>
        </div>
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-white/20 rounded-2xl p-6 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-white mb-2">{active}</div>
            <div className="text-green-200 text-sm">Active</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/20 rounded-2xl p-6 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-white mb-2">{completed}</div>
            <div className="text-purple-200 text-sm">Completed</div>
        </div>
    </div>
);