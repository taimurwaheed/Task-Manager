import type { User } from "../types/user.types";

const BASE_URL = 'https://68870c64071f195ca97f0584.mockapi.io/users';

export async function signupUser(data: { email: string; password: string }) {
    const response = await fetch(`${BASE_URL}`);
    const users = await response.json();

    const existingUser = users.find((u: any) => u.email === data.email);
    if (existingUser) {
        throw new Error('Email already registered');
    }

    const createResponse = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!createResponse.ok) {
        throw new Error('Signup failed');
    }

    return await createResponse.json();
};

export const getAllUsers = async (): Promise<User[]> => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Failed to fetch users');
    return await res.json();
};


export const loginUser = async (email: string, password: string): Promise<User | null> => {
    const users = await getAllUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    return user ?? null;
};