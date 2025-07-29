export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get(endpoint: string, headers?: HeadersInit) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'GET',
            headers: {
                ...(headers || {}),
            },
        });
        if (!response.ok) throw new Error(`GET ${endpoint} failed`);
        return response.json();
    }

    async post(endpoint: string, data: any, headers?: HeadersInit) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(headers || {}),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`POST ${endpoint} failed`);
        return response.json();
    }

    async put(endpoint: string, data: any, headers?: HeadersInit) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(headers || {}),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`PUT ${endpoint} failed`);
        return response.json();
    }

    async delete(endpoint: string, headers?: HeadersInit) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'DELETE',
            headers: {
                ...(headers || {}),
            },
        });
        if (!response.ok) throw new Error(`DELETE ${endpoint} failed`);
        return response.json();
    }
}
