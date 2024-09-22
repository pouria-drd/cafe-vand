"use server";

import { getTokenLifetime } from "../../token";
import { APIErrors, getBaseUrl } from "@/utils/base";

/**
 * This action is used to get the menu.
 * It returns the menu data and the input errors if the menu is not retrieved.
 * @returns The menu data or the input errors if the menu is not retrieved.
 */
export default async function getMenuAction(
    timeout: number = 10000
): Promise<APIResponse<CategoryDetail[], string>> {
    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        // Set up url
        const baseUrl = getBaseUrl();
        const url = baseUrl + "menu/menu-list/";
        // Send a GET request to retrieve the menu
        const response = await fetch(url, {
            method: "GET",
            signal: controller.signal,
            next: { revalidate: await getTokenLifetime("access") },
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        // Handle HTTP error responses
        if (!response.ok) {
            const jsonResponse = await response.json();
            const errorMsg = await APIErrors(response, jsonResponse);
            return { error: errorMsg || "An unexpected error occurred" };
        }

        const jsonResponse = await response.json();
        return { data: jsonResponse as CategoryDetail[] };
    } catch (error) {
        // Ensure the timeout is cleared even in case of error
        clearTimeout(timeoutId);

        // Log error for debugging in development.
        // console.error(error);

        return { error: "An unexpected error occurred" };
    }
}
