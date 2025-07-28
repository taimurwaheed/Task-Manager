import type { ReactNode } from 'react';
import type { Task, TaskAction, FilterType, Stats } from './task.types';
import { UserService } from '../services/userService';
import { TaskService } from '../services/taskService';
export interface TaskProviderProps {
    children: ReactNode;
}

export interface TaskContextType {
    tasks: Task[];
    dispatch: React.Dispatch<TaskAction>;
    filter: FilterType;
    setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
    stats: Stats;
    filteredTasks: Task[];
}
export interface AppContextType {
    userService: UserService;
    taskService: TaskService;
}