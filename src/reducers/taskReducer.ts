import type { Task, TaskAction } from '../types/task.types';
import {
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    clearCompletedTasks,
    loadTasks,
} from './tasks';

export const tasksReducer = (state: Task[], action: TaskAction): Task[] => {
    switch (action.type) {
        case 'ADD_TASK':
            return addTask(state, action.payload);
        case 'TOGGLE_TASK':
            return toggleTask(state, action.payload);
        case 'DELETE_TASK':
            return deleteTask(state, action.payload);
        case 'EDIT_TASK':
            return editTask(state, action.payload);
        case 'CLEAR_COMPLETED':
            return clearCompletedTasks(state);
        case 'LOAD_TASKS':
            return loadTasks(action.payload);
        default:
            return state;
    }
};
