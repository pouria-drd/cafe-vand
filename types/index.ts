// Models ----------------------------------------------------------------------
interface Token {
    exp: number;
    iat: number;
    jti: string;
    email: string;
    user_id: string;
    isAdmin: boolean;
    fullName: string;
    username: string;
    token_type: string;
}

interface User {
    id: string;
    email: string;
    isAdmin: boolean;
    fullName: string;
    username: string;
}

interface APIResponse<TSuccess, TInputError> {
    data?: TSuccess;
    error?: string;
    inputError?: TInputError;
}

// Forms -----------------------------------------------------------------------

// login form
interface LoginFormData {
    username: string;
    password: string;
}

interface LoginSuccessData {
    otpId?: string;
    success?: string;
}

interface LoginInputErrors {
    username?: string;
    password?: string;
}

// VerifyLogin form
interface VerifyLoginFormData {
    otpId: string;
    otpCode: string;
}

interface VerifyLoginSuccessData {
    user?: User;
}

interface VerifyLoginInputErrors {
    otpId?: string;
    otpCode?: string;
}
