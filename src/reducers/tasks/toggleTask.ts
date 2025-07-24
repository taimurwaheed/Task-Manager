import type { Task } from '../../types/task.types';

export const toggleTask = (state: Task[], id: number): Task[] =>
    state.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
