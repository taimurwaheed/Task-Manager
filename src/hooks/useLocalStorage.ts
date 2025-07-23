import { useEffect } from 'react';
import type { Task, TaskAction } from '../types/task.types';

export const useLocalStorage = (
    tasks: Task[],
    dispatch: React.Dispatch<TaskAction>
) => {
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            try {
                const parsedTasks: Task[] = JSON.parse(savedTasks).map((task: any) => ({
                    ...task,
                    createdAt: new Date(task.createdAt)
                }));
                dispatch({ type: 'LOAD_TASKS', payload: parsedTasks });
            } catch (error) {
                console.error('Failed to parse saved tasks:', error);
            }
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
};