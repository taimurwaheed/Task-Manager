import type { Task, TaskAction } from '../types/task.types';

export const tasksReducer = (state: Task[], action: TaskAction): Task[] => {
    switch (action.type) {
        case 'ADD_TASK':
            return [
                ...state,
                {
                    id: Date.now(),
                    text: action.payload,
                    completed: false,
                    createdAt: new Date()
                }
            ];
        case 'TOGGLE_TASK':
            return state.map(task =>
                task.id === action.payload
                    ? { ...task, completed: !task.completed }
                    : task
            );
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);
        case 'EDIT_TASK':
            return state.map(task =>
                task.id === action.payload.id
                    ? { ...task, text: action.payload.text }
                    : task
            );
        case 'CLEAR_COMPLETED':
            return state.filter(task => !task.completed);
        case 'LOAD_TASKS':
            return action.payload;
        default:
            return state;
    }
};