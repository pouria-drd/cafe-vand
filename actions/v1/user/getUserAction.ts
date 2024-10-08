"use server";

import { APIErrors, getBaseUrl } from "@/utils/base";
import { getTokenLifetime, getValidToken } from "../token";

/**
 * This action is used to get the user from the refresh token.
 * If the refresh token is not present, it will return null.
 * @returns The user object or null if the user is not found.
 */
export default async function getUserAction(
    timeout: number = 10000
): Promise<APIResponse<User, string | "invalid-credentials">> {
    // Get a valid access token
    const validAccessToken = await getValidToken();

    if (!validAccessToken) {
        return { error: "invalid-credentials" };
    }

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
            method: "GET",
            headers: {
                Authorization: `Bearer ${validAccessToken}`,
            },
            signal: controller.signal,
            next: { revalidate: await getTokenLifetime("access") },
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        const jsonResponse = await response.json();

        // Handle HTTP error responses
        if (!response.ok) {
            const errorMsg = await APIErrors(response, jsonResponse);
            return { error: errorMsg || "An unexpected error occurred" };
        }
        return { data: jsonResponse as User };
    } catch (error) {
        // Ensure the timeout is cleared even in case of error
        clearTimeout(timeoutId);

        // Log error for debugging in development.
        // console.error(error);

        return { error: "An unexpected error occurred" };
    }
}
