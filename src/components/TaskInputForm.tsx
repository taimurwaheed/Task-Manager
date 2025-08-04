import React from 'react';
import type { TaskInputFormProps } from '../types/task.types';

export const TaskInputForm: React.FC<TaskInputFormProps> = ({ taskInput, setTaskInput, handleAddTask }) => (
    <form onSubmit={handleAddTask} className="space-y-4">
        <div className="flex gap-4">
            <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Add a new task"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
            />
            <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg font-medium"
            >
                Add Task
            </button>
        </div>
    </form>
);