import type { Task } from '../../types/task.types';

export const addTask = (state: Task[], text: string): Task[] => [
    ...state,
    {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date(),
    },
];
