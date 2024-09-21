"use server";

import { getBaseUrl } from "@/utils/base";
import { getTokenLifetime, getValidToken } from "../token";

/**
 * This action is used to get the user from the refresh token.
 * If the refresh token is not present, it will return null.
 * @returns The user object or null if the user is not found.
 */
export default async function getUserAction(
    timeout: number = 10000
): Promise<User | null> {
    const validAccessToken = await getValidToken(timeout);

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        // Set up url
        const baseUrl = getBaseUrl();
        const url = baseUrl + "users/me/";
        // Send a POST request to login the user with JSON body
        const response = await fetch(url, {
            // cache: "force-cache",
            next: { revalidate: await getTokenLifetime("access") },
            method: "GET",
            headers: {
                Authorization: `Bearer ${validAccessToken}`,
            },
            signal: controller.signal,
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        // Handle HTTP error responses
        if (!response.ok) {
            return null;
        }
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        // Ensure the timeout is cleared even in case of error
        clearTimeout(timeoutId);

        // Log error for debugging in development.
        // console.error(error);

        return null;
    }
}
