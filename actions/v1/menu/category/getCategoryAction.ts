"use server";

import { APIErrors, getBaseUrl } from "@/utils/base";
import { getTokenLifetime, getValidToken } from "../../token";

/**
 * This action is used to get a single category.
 * It returns the category data and the input errors if the category is not retrieved.
 * @param slug - The slug of the category to retrieve.
 * @param revalidate - Whether to revalidate the paths after the category is retrieved.
 * @returns The category data or the input errors if the category is not retrieved.
 */
async function getCategoryAction(
    slug: string,
    revalidate: boolean = true,
    timeout: number = 10000
): Promise<APIResponse<CategoryDetail, string | "invalid-credentials">> {
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
        const url = baseUrl + "menu/categories/" + slug + "/";
        // Send a GET request to retrieve the category
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${validAccessToken}`,
            },
            signal: controller.signal,
            ...(revalidate && {
                next: { revalidate: await getTokenLifetime("access") },
            }),
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        if (response.status === 401 || response.status === 403) {
            return { error: "invalid-credentials" };
        }

        // Handle HTTP error responses
        if (!response.ok) {
            const jsonResponse = await response.json();
            const errorMsg = await APIErrors(response, jsonResponse);
            return { error: errorMsg || "An unexpected error occurred" };
        }

        const jsonResponse = await response.json();
        return { data: jsonResponse as CategoryDetail };
    } catch (error) {
        // Ensure the timeout is cleared even in case of error
        clearTimeout(timeoutId);

        // Log error for debugging in development.
        // console.error(error);

        return { error: "An unexpected error occurred" };
    }
}

export default getCategoryAction;
