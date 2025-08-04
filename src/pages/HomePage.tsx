import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import type { Task, FilterType } from '../types/task.types';
import { calculateStats, filterTasks } from '../utils/taskUtils';
import { TaskHeader } from '../components/TaskHeader';
import { TaskStats } from '../components/TaskStats';
import { TaskInputForm } from '../components/TaskInputForm';
import { TaskFilters } from '../components/TaskFilters';
import { TaskList } from '../components/TaskList';

export function HomePage() {
    const { user, logout } = useAuth();
    const { taskService } = useAppContext();
    const navigate = useNavigate();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<FilterType>('all');
    const [loading, setLoading] = useState(false);
    const [taskInput, setTaskInput] = useState('');

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const fetchedTasks = await taskService.getTasks();
            const tasksWithDates = fetchedTasks.map((task: any) => ({
                ...task,
                createdAt: new Date(task.createdAt),
            }));
            setTasks(tasksWithDates);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (taskInput.trim()) {
            try {
                const newTask = { text: taskInput.trim(), completed: false, createdAt: new Date() };
                await taskService.addTask(newTask);
                setTaskInput('');
                await fetchTasks();
            } catch (error) {
                console.error("Failed to add task:", error);
            }
        }
    };

    const handleToggleTask = async (id: string) => {
        const taskToUpdate = tasks.find(task => task.id === id);
        if (!taskToUpdate) return;
        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
        try {
            await taskService.updateTask(id, updatedTask);
            await fetchTasks();
        } catch (error) {
            console.error("Failed to toggle task:", error);
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            await taskService.deleteTask(id);
            await fetchTasks();
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    const handleEditTask = async (id: string, text: string) => {
        const taskToUpdate = tasks.find(task => task.id === id);
        if (!taskToUpdate) return;
        const updatedTask = { ...taskToUpdate, text };
        try {
            await taskService.updateTask(id, updatedTask);
            await fetchTasks();
        } catch (error) {
            console.error("Failed to edit task:", error);
        }
    };

    const handleClearCompleted = async () => {
        const completedTasks = tasks.filter(task => task.completed);
        const deletePromises = completedTasks.map(task => taskService.deleteTask(task.id));
        try {
            await Promise.all(deletePromises);
            await fetchTasks();
        } catch (error) {
            console.error("Failed to clear completed tasks:", error);
        }
    };

    const filteredTasks = filterTasks(tasks, filter);
    const stats = calculateStats(tasks);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="flex items-center space-x-4 text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    <span className="text-xl font-medium">Loading tasks...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            </div>

            <div className="relative z-10 p-6">
                <div className="max-w-4xl mx-auto backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 space-y-8">
                    <TaskHeader user={user} logout={handleLogout} />
                    <TaskStats {...stats} />
                    <TaskInputForm
                        taskInput={taskInput}
                        setTaskInput={setTaskInput}
                        handleAddTask={handleAddTask}
                    />
                    <TaskFilters
                        filter={filter}
                        setFilter={setFilter}
                        handleClearCompleted={handleClearCompleted}
                    />
                    <TaskList
                        filteredTasks={filteredTasks}
                        handleToggleTask={handleToggleTask}
                        handleDeleteTask={handleDeleteTask}
                        handleEditTask={handleEditTask}
                    />
                </div>
            </div>
        </div>
    );
}