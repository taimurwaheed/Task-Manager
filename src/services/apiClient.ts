export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get(endpoint: string) {
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        if (!response.ok) throw new Error(`GET ${endpoint} failed`);
        return response.json();
    }

    async post(endpoint: string, data: any) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`POST ${endpoint} failed`);
        return response.json();
    }

    async put(endpoint: string, data: any) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`PATCH ${endpoint} failed`);
        return response.json();
    }

    async delete(endpoint: string) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error(`DELETE ${endpoint} failed`);
        return response.json();
    }
}
