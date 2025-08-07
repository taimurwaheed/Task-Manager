export interface Task {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
}

export type NewTask = Omit<Task, 'id'>;

export type FilterType = 'all' | 'active' | 'completed';

export interface TaskInputFormProps {
    taskInput: string;
    setTaskInput: (input: string) => void;
    handleAddTask: (e: React.FormEvent) => Promise<void>;
}

export interface Stats {
    total: number;
    active: number;
    completed: number;
}

export interface TaskListProps {
    filteredTasks: Task[];
    handleToggleTask: (id: string) => Promise<void>;
    handleDeleteTask: (id: string) => Promise<void>;
    handleEditTask: (id: string, text: string) => Promise<void>;
}