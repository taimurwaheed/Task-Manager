import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';

import { TaskHeader } from '../components/TaskHeader';
import { TaskStats } from '../components/TaskStats';
import { TaskInputForm } from '../components/TaskInputForm';
import { TaskFilters } from '../components/TaskFilters';
import { TaskList } from '../components/TaskList';

export function HomePage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const {
        filter,
        setFilter,
        loading,
        taskInput,
        setTaskInput,
        handleAddTask,
        handleToggleTask,
        handleDeleteTask,
        handleEditTask,
        handleClearCompleted,
        filteredTasks,
        stats
    } = useTasks();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="flex items-center space-x-4 text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    <span className="text-xl font-medium">Loading tasks...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            </div>

            <div className="relative z-10 p-6">
                <div className="max-w-4xl mx-auto backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 space-y-8">
                    <TaskHeader user={user} logout={handleLogout} />
                    <TaskStats {...stats} />
                    <TaskInputForm
                        taskInput={taskInput}
                        setTaskInput={setTaskInput}
                        handleAddTask={handleAddTask}
                    />
                    <TaskFilters
                        filter={filter}
                        setFilter={setFilter}
                        handleClearCompleted={handleClearCompleted}
                    />
                    <TaskList
                        filteredTasks={filteredTasks}
                        handleToggleTask={handleToggleTask}
                        handleDeleteTask={handleDeleteTask}
                        handleEditTask={handleEditTask}
                    />
                </div>
            </div>
        </div>
    );
}