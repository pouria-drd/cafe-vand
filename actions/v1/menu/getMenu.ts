"use server";

import { GetMenuResult, MenuCategory } from "@/types/menu";

/**
 * Send a GET request to the server to fetch a list of categories with configurable options.
 *
 * @param options - Optional configuration for cache, timeout, and revalidation.
 * @param options.cache - Cache mode for the request (default is 'no-cache').
 * @param options.timeout - Timeout in milliseconds for the request (default is 5000ms).
 * @param options.revalidate - Number of hours after which to revalidate the data (default is 1 hour).
 * @returns {Promise<GetMenuResult>} An object containing either the array of categories or an error message.
 *
 * @example
 * ```typescript
 * const result = await getMenu({ cache: 'force-cache', timeout: 3000, revalidate: 2 });
 * if (result.error) {
 *     console.error("Error:", result.error);
 * } else {
 *     console.log("Categories:", result.data);
 * }
 * ```
 */
export async function getMenu(options?: {
    cache?: RequestCache;
    timeout?: number;
    revalidate?: number; // Number of hours for revalidation
}): Promise<GetMenuResult> {
    // Set default options for cache, timeout, and revalidation
    const timeout = options?.timeout || 5000;
    const cache = options?.cache || "no-cache";
    const revalidateHours = options?.revalidate || 1; // Default revalidation time is 1 hour
    const revalidate =
        cache !== "no-cache" ? revalidateHours * 3600 : undefined; // Set revalidate only if cache is not 'no-cache'

    // Introduce a delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // Retrieve the API base URL from environment variables
    const baseUrl = process.env.Base_API;

    // Validate if the API base URL is properly set
    if (!baseUrl) {
        return { error: "آدرسی برای ارتباط با سرور یافت نشد!" };
    }

    const url = `${baseUrl}/menu/`;

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        // Fetch category list data with configurable cache, timeout, and revalidation
        const response = await fetch(url, {
            method: "GET",
            cache, // Use configurable cache
            signal: controller.signal,
            ...(revalidate !== undefined ? { next: { revalidate } } : {}), // Apply revalidate only if it's defined
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        // Handle HTTP error responses
        if (!response.ok) {
            switch (response.status) {
                case 404:
                    return { error: "منو یافت نشد!" };
                case 500:
                    return {
                        error: "خطای سرور! لطفاً بعداً دوباره امتحان کنید.",
                    };
                default:
                    return { error: `خطای سرور` };
            }
        }

        // If the response is OK, return the category list data
        if (response.status === 200) {
            const data: MenuCategory[] = await response.json();
            return { data };
        }

        // Handle unexpected responses
        return { error: "پاسخ نامعتبری از سرور دریافت شد!" };
    } catch (err: unknown) {
        // console.error("Fetch error:", error); // Log error for debugging in development

        // Handle network errors or unexpected issues
        if (err instanceof DOMException && err.name === "AbortError") {
            return {
                error: "مدت زمان درخواست منقضی شد. لطفاً دوباره تلاش کنید.",
            };
        }
        return { error: "خطای غیرمنتظره‌ای رخ داد!" };
    }
}
