"use server";

import { jwtDecode } from "jwt-decode";

/**
 * Decodes a JWT token and returns its payload.
 * @param token - The JWT token to decode.
 * @returns The decoded token payload, or null if the token is invalid or not found.
 */
function decodeToken(token: string): Token {
    const decodedToken: Token = jwtDecode<Token>(token);
    return decodedToken;
}

/**
 * Retrieves the expiration date of a JWT token.
 * @param token - The JWT token to retrieve the expiration date from.
 * @returns The expiration date of the JWT token, or null if the token is invalid or not found.
 */
function getTokenExpirationDate(token: string): Date {
    const decodedToken = decodeToken(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    return expirationDate;
}

/** Checks if the token is expired.
 * @param token - The token to check.
 * @returns True if the token is expired, false otherwise.
 */
function isTokenExpired(token: string): boolean {
    const decodedToken = decodeToken(token);
    // Get the current timestamp in seconds
    const now = Math.floor(Date.now() / 1000);
    // Check if the current timestamp is less than the expiration timestamp
    const result = now > decodedToken.exp;
    return result;
}

/**
 * Retrieves the user object from the token.
 * @param token - The JWT token.
 * @returns The user object.
 */
export default async function convertTokenToUser(
    token: string
): Promise<User | null> {
    const isExpired = isTokenExpired(token);
    if (isExpired) return null;

    const decodedToken = decodeToken(token);
    const user: User = {
        id: decodedToken.user_id,
        email: decodedToken.email,
        isAdmin: decodedToken.isAdmin,
        fullName: decodedToken.fullName,
        username: decodedToken.username,
    };
    return user;
}
