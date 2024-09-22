"use server";

import { APIErrors, getBaseUrl } from "@/utils/base";
import { getTokenLifetime, getValidToken } from "../../token";

/**
 * This action is used to get a list of products.
 * It returns the list of products or the input errors if the list is not retrieved.
 * @returns The list of products or the input errors if the list is not retrieved.
 */
async function getProductListAction(
    timeout: number = 10000
): Promise<APIResponse<Product[], string | "invalid-credentials">> {
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
        const url = baseUrl + "menu/products/";
        // Send a GET request to retrieve the products
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

        // Handle HTTP error responses
        if (!response.ok) {
            const jsonResponse = await response.json();
            const errorMsg = await APIErrors(response, jsonResponse);
            return { error: errorMsg || "An unexpected error occurred" };
        }

        const jsonResponse = await response.json();
        return { data: jsonResponse as Product[] };
    } catch (error) {
        // Ensure the timeout is cleared even in case of error
        clearTimeout(timeoutId);

        // Log error for debugging in development.
        // console.error(error);

        return { error: "An unexpected error occurred" };
    }
}

export default getProductListAction;
