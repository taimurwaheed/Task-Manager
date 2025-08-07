import type { Task } from '../../types/task.types';
import type { TaskService } from '../../services/taskService';

export const fetchTasks = async (
    taskService: TaskService,
    setLoading: (loading: boolean) => void,
    setTasks: (tasks: Task[]) => void
) => {
    setLoading(true);
    try {
        const fetchedTasks = await taskService.getTasks();
        const tasksWithDates = fetchedTasks.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
        }));
        setTasks(tasksWithDates);
    } catch (error) {
        console.error("Failed to fetch tasks:", error);
    } finally {
        setLoading(false);
    }
};