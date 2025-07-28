export interface Task {
    id: number;
    text: string;
    completed: boolean;
    createdAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed';

export type TaskAction =
    | { type: 'ADD_TASK'; payload: string }
    | { type: 'TOGGLE_TASK'; payload: number }
    | { type: 'DELETE_TASK'; payload: number }
    | { type: 'EDIT_TASK'; payload: { id: number; text: string } }
    | { type: 'CLEAR_COMPLETED' }
    | { type: 'LOAD_TASKS'; payload: Task[] };

export interface Stats {
    total: number;
    active: number;
    completed: number;
}
