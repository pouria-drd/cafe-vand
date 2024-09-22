"use server";

import { getValidToken } from "../../token";
import { APIErrors, getBaseUrl } from "@/utils/base";

/**
 * This action is used to create a new category.
 * It returns the category data and the input errors if the category is not created.
 * @param data - The category data to create.
 * @returns The category data or the input errors if the category is not created.
 */
async function deleteCategoryAction(
    slug: string
): Promise<APIResponse<string, string>> {
    // Get a valid access token
    const validAccessToken = await getValidToken();
    if (!validAccessToken) {
        return { error: "invalid-credentials" };
    }

    // set delay for testing purposes (e.g., 3 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
        // Set up url
        const baseUrl = getBaseUrl();
        const url = baseUrl + "menu/categories/" + slug + "/";
        // Send a POST request to login the user with JSON body
        const response = await fetch(url, {
            cache: "no-cache",
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${validAccessToken}`,
            },
            signal: controller.signal,
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
            if (errorMsg) return { error: errorMsg };
            else return { inputError: jsonResponse };
        }

        return { data: "مورد حذف شد" };
    } catch (error) {
        // Ensure the timeout is cleared even in case of error
        clearTimeout(timeoutId);

        // Log error for debugging in development.
        // console.error(error);

        return { error: "خطای غیرمنتظره‌ در حذف رخ داد!" };
    }
}

export default deleteCategoryAction;
