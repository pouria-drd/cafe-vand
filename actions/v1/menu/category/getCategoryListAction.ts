"use server";

import { APIErrors, getBaseUrl } from "@/utils/base";
import { getTokenLifetime, getValidToken } from "../../token";

/**
 * This action is used to get a list of categories.
 * It returns the list of categories or the input errors if the list is not retrieved.
 * @returns The list of categories or the input errors if the list is not retrieved.
 */
async function getCategoryListAction(
    timeout: number = 10000
): Promise<APIResponse<Category[], string | "invalid-credentials">> {
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
        const url = baseUrl + "menu/categories/";
        // Send a GET request to retrieve the categories
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${validAccessToken}`,
            },
            signal: controller.signal,
            next: { revalidate: await getTokenLifetime("access") },
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        if (response.status === 401 || response.status === 403) {
            return { error: "invalid-credentials" };
        }

        const jsonResponse = await response.json();

        // Handle HTTP error responses
        if (!response.ok) {
            const errorMsg = await APIErrors(response, jsonResponse);
            return { error: errorMsg || "An unexpected error occurred" };
        }

        return { data: jsonResponse as Category[] };
    } catch (error) {
        // Ensure the timeout is cleared even in case of error
        clearTimeout(timeoutId);

        // Log error for debugging in development.
        // console.error(error);

        return { error: "An unexpected error occurred" };
    }
}

export default getCategoryListAction;
