import type { Task } from '../../types/task.types';

export const editTask = (
    state: Task[],
    payload: { id: number; text: string }
): Task[] =>
    state.map(task =>
        task.id === payload.id ? { ...task, text: payload.text } : task
    );
