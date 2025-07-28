import type { User } from '../types/user.types';
import { ApiClient } from './apiClient';

export class UserService {
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async signupUser(data: { email: string; password: string }) {
        const users = await this.client.get('/users');
        const existingUser = users.find((u: User) => u.email === data.email);
        if (existingUser) throw new Error('Email already registered');
        return await this.client.post('/users', data);
    }

    async loginUser(email: string, password: string): Promise<User | null> {
        const users: User[] = await this.client.get('/users');
        return users.find((u) => u.email === email && u.password === password) ?? null;
    }

    async getAllUsers(): Promise<User[]> {
        return await this.client.get('/users');
    }

    async getUser(id: string): Promise<User | null> {
        try {
            return await this.client.get(`/users/${id}`);
        } catch (error) {
            console.error('User not found:', error);
            return null;
        }
    }

    async addUser(user: User): Promise<User> {
        return await this.client.post('/users', user);
    }

    async updateUser(id: string, updatedUser: Partial<User>): Promise<User> {
        return await this.client.put(`/users/${id}`, updatedUser);
    }

    async deleteUser(id: string) {
        return await this.client.delete(`/users/${id}`);
    }
}
