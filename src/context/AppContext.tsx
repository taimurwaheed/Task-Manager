import React, { createContext, useContext } from 'react';
import { ApiClient } from '../services/apiClient';
import { UserService } from '../services/userService';
import { TaskService } from '../services/taskService';
import type { AppContextType } from '../types/context.types';

const apiClient = new ApiClient('https://68870c64071f195ca97f0584.mockapi.io');
const userService = new UserService(apiClient);
const taskService = new TaskService(apiClient);

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AppContext.Provider value={{ userService, taskService }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
