export interface LoginUserFormData {
    username: string;
    password: string;
}

interface IsAuthenticated {
    isAuthenticated: boolean;
}

/**
 * Generic API result interface.
 */
interface APIResult<T> {
    data?: T;
    error?: string;
}

export type LoginUserResult = APIResult<IsAuthenticated>;
