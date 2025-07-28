import { createContext, useContext, } from 'react';
import type { TaskContextType } from '../types/context.types';
import { useTasks } from '../hooks/useTasks';
import type { TaskProviderProps } from '../types/context.types';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    const taskData = useTasks();

    return (
        <TaskContext.Provider value={taskData}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = (): TaskContextType => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};