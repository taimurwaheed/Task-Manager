export interface User {
    id: string;
    email: string;
    password: string;
}

export type AuthContextType = {
    user: any;
    login: (user: any) => void;
    logout: () => void;
    hasSignedUp: boolean;
    setHasSignedUp: (value: boolean) => void;
};
