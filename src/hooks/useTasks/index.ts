import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import type { Task, FilterType } from '../../types/task.types';
import { calculateStats, filterTasks } from '../../utils/taskUtils';
import { fetchTasks } from './fetchTasks';

export const useTasks = () => {
    const { taskService } = useAppContext();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<FilterType>('all');
    const [loading, setLoading] = useState(false);
    const [taskInput, setTaskInput] = useState('');

    useEffect(() => {
        fetchTasks(taskService, setLoading, setTasks);
    }, [taskService]);

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (taskInput.trim()) {
            try {
                const newTask = { text: taskInput.trim(), completed: false, createdAt: new Date() };
                await taskService.addTask(newTask);
                setTaskInput('');
                await fetchTasks(taskService, setLoading, setTasks);
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
            await fetchTasks(taskService, setLoading, setTasks);
        } catch (error) {
            console.error("Failed to toggle task:", error);
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            await taskService.deleteTask(id);
            await fetchTasks(taskService, setLoading, setTasks);
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
            await fetchTasks(taskService, setLoading, setTasks);
        } catch (error) {
            console.error("Failed to edit task:", error);
        }
    };

    const handleClearCompleted = async () => {
        const completedTasks = tasks.filter(task => task.completed);
        const deletePromises = completedTasks.map(task => taskService.deleteTask(task.id));
        try {
            await Promise.all(deletePromises);
            await fetchTasks(taskService, setLoading, setTasks);
        } catch (error) {
            console.error("Failed to clear completed tasks:", error);
        }
    };

    const filteredTasks = filterTasks(tasks, filter);
    const stats = calculateStats(tasks);

    return {
        tasks,
        filter,
        setFilter,
        loading,
        taskInput,
        setTaskInput,
        handleAddTask,
        handleToggleTask,
        handleDeleteTask,
        handleEditTask,
        handleClearCompleted,
        filteredTasks,
        stats
    };
};