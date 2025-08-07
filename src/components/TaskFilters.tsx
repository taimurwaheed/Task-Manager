import React from 'react';
import type { FilterType } from '../types/task.types';

export const TaskFilters: React.FC<{
    filter: FilterType;
    setFilter: (filter: FilterType) => void;
    handleClearCompleted: () => Promise<void>;
}> = ({ filter, setFilter, handleClearCompleted }) => (
    <div className="flex flex-wrap gap-2 justify-between items-center border-t border-white/20 pt-6">
        <div className="flex gap-2">
            <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${filter === 'all'
                    ? 'bg-white text-purple-900 shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
            >
                All
            </button>
            <button
                onClick={() => setFilter('active')}
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${filter === 'active'
                    ? 'bg-white text-purple-900 shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
            >
                Active
            </button>
            <button
                onClick={() => setFilter('completed')}
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${filter === 'completed'
                    ? 'bg-white text-purple-900 shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
            >
                Completed
            </button>
        </div>
        <button
            onClick={handleClearCompleted}
            className="text-sm text-red-300 hover:text-red-200 transition-colors font-medium px-4 py-2 hover:bg-red-500/10 rounded-lg"
        >
            Clear Completed
        </button>
    </div>
);