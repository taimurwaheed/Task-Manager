import type { Task } from '../../types/task.types';

export const clearCompletedTasks = (state: Task[]): Task[] =>
    state.filter(task => !task.completed);
