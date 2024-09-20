"use server";

import { getBaseUrl, APIErrors } from "@/utils/base";

interface RefreshAction {
    refreshToken: string;
    timeout?: number;
}

interface RefreshResponse {
    access?: string;
    error?: string;
}

/**
 * This action is used to refresh the access token by sending a POST request to the refresh endpoint.
 * It returns the access token if the request is successful.
 * It also returns the error message if the request fails.
 */
export default async function refreshAction(
    props: RefreshAction
): Promise<RefreshResponse> {
    // Set default options for timeout
    const timeout = props.timeout || 5000;

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const baseUrl = getBaseUrl();
        const url = baseUrl + "authentication/refresh/";

        // Send a POST request to refresh the access token with JSON body
        const response = await fetch(url, {
            cache: "no-cache",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh: props.refreshToken,
            }),
            signal: controller.signal,
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        const jsonResponse = await response.json();

        // Handle HTTP error responses
        if (response.ok && jsonResponse.access) {
            return { access: jsonResponse.access };
        } else {
            const errorMsg = await APIErrors(response, jsonResponse);
            if (errorMsg) return { error: errorMsg };
            else return { error: jsonResponse };
        }
    } catch (error) {
        // Ensure the timeout is cleared even in case of error
        // clearTimeout(timeoutId);

        // Log error for debugging in development.
        // console.error("error",error);

        if (error instanceof DOMException && error.name === "AbortError") {
            return {
                error: "مدت زمان درخواست طولانی شد. لطفاً دوباره تلاش کنید.",
            };
        }

        return { error: "خطای غیرمنتظره‌ای رخ داد!" };
    }
}
