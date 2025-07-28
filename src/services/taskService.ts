import type { Task } from '../types/task.types';
import { ApiClient } from './apiClient';

export class TaskService {
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async getTasks(): Promise<Task[]> {
        return this.client.get('/tasks');
    }

    async addTask(task: Task) {
        return this.client.post('/tasks', task);
    }

    async updateTask(id: string, updated: Task) {
        return this.client.put(`/tasks/${id}`, updated);
    }

    async deleteTask(id: string) {
        return this.client.delete(`/tasks/${id}`);
    }
}
