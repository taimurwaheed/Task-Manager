import type { User } from '../types/user.types';
import { ApiClient } from './apiClient';

export class UserService {
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async signupUser(data: { email: string; password: string }) {
        const users: User[] = await this.client.get(`/users?email=${data.email}`);
        if (users.length > 0) {
            throw new Error('Email already registered');
        }
        return await this.client.post('/users', data);
    }

    async loginUser(id: string, email: string, password: string): Promise<User | null> {
        try {
            const user: User = await this.client.get(`/users/${id}`);
            console.log("Fetched users by ID:", user);
            if (user && user.email === email && user.password === password) {
                return user;
            }
            return null;
        } catch (error) {
            console.error('Login failed:', error);
            return null;
        }
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
