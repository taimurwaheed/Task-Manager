import { useReducer, useState, useEffect } from 'react';
import type { Task, FilterType, Stats } from '../types/task.types';
import { tasksReducer } from '../reducers/taskReducer';
import { useLocalStorage } from './useLocalStorage';
import { calculateStats, filterTasks } from '../utils/taskUtils';

export const useTasks = () => {
    const [tasks, dispatch] = useReducer(tasksReducer, [] as Task[]);
    const [filter, setFilter] = useState<FilterType>('all');

    useLocalStorage(tasks, dispatch);

    useEffect(() => {
        const activeTasks = tasks.filter(task => !task.completed).length;
        document.title = activeTasks > 0 ? `Tasks (${activeTasks})` : 'Task Manager';

        return () => {
            document.title = 'Task Manager';
        };
    }, [tasks]);

    const stats: Stats = calculateStats(tasks);
    const filteredTasks: Task[] = filterTasks(tasks, filter);

    return {
        tasks,
        dispatch,
        filter,
        setFilter,
        stats,
        filteredTasks
    };
};