import type { Task, FilterType, Stats } from '../types/task.types';

export const calculateStats = (tasks: Task[]): Stats => ({
    total: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length
});

export const filterTasks = (tasks: Task[], filter: FilterType): Task[] => {
    switch (filter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
};