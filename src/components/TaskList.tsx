import React from 'react';
import type { TaskListProps } from '../types/task.types';

export const TaskList: React.FC<TaskListProps> = ({ filteredTasks, handleToggleTask, handleDeleteTask, handleEditTask }) => (
    <>
        <ul className="space-y-3 max-h-96 overflow-y-auto">
            {filteredTasks.map((task) => (
                <li
                    key={task.id}
                    className="group flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-6 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg"
                >
                    <div className="flex items-center gap-4">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleTask(task.id)}
                            className="w-5 h-5 text-purple-500 bg-transparent border-2 border-white/30 rounded focus:ring-purple-400 focus:ring-2"
                        />
                        <span
                            className={`cursor-pointer transition-all duration-300 ${task.completed
                                ? 'line-through text-white/50'
                                : 'text-white hover:text-white/90'
                                }`}
                            onClick={() => {
                                const newText = prompt("Edit task:", task.text);
                                if (newText !== null && newText.trim() !== '') {
                                    handleEditTask(task.id, newText.trim());
                                }
                            }}
                        >
                            {task.text}
                        </span>
                    </div>
                    <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-300 hover:text-red-200 transition-colors font-medium px-4 py-2 hover:bg-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
        {filteredTasks.length === 0 && (
            <div className="text-center py-12">
                <div className="text-white/60 text-lg mb-2">No tasks found</div>
                <div className="text-white/40 text-sm">Add a task to get started!</div>
            </div>
        )}
    </>
);