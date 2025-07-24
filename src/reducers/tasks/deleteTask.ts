import type { Task } from '../../types/task.types';

export const deleteTask = (state: Task[], id: number): Task[] =>
    state.filter(task => task.id !== id);
