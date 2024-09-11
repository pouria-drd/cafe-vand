"use server";

import { RetrieveCategoryListResult, Category } from "@/types/panel";

/**
 * Send a GET request to the server to fetch a list of categories with configurable options.
 *
 * @param options - Optional configuration for cache and timeout.
 * @param options.cache - Cache mode for the request (default is 'no-cache').
 * @param options.timeout - Timeout in milliseconds for the request (default is 5000ms).
 * @returns {Promise<RetrieveCategoryListResult>} An object containing either the list of categories or an error message.
 *
 * @example
 * ```typescript
 * const result = await getCategoryList({ cache: 'reload', timeout: 3000 });
 * if (result.error) {
 *     console.error("Error:", result.error);
 * } else {
 *     console.log("Categories:", result.data);
 * }
 * ```
 */
export async function getCategoryList(options?: {
    cache?: RequestCache;
    timeout?: number;
}): Promise<RetrieveCategoryListResult> {
    // set delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 6000));

    // Set default options for cache and timeout
    const {
        cache = "no-cache", // Default cache mode
        timeout = 5000, // Default timeout in milliseconds
    } = options || {};

    // Retrieve the API base URL from environment variables
    const baseUrl = process.env.Base_API;

    // Validate if the API base URL is properly set
    if (!baseUrl) {
        return { error: "آدرسی برای ارتباط با سرور یافت نشد!" };
    }

    const url = `${baseUrl}/panel/categories/`;

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        // Fetch category list data with configurable cache and timeout
        const response = await fetch(url, {
            method: "GET",
            cache, // Use configurable cache
            signal: controller.signal,
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        // Handle HTTP error responses
        if (!response.ok) {
            switch (response.status) {
                case 404:
                    return { error: "دسته‌بندی‌ها یافت نشد!" };
                case 500:
                    return {
                        error: "خطای سرور! لطفاً بعداً دوباره امتحان کنید.",
                    };
                default:
                    return { error: `خطای سرور: ${response.statusText}` };
            }
        }

        // If the response is OK, return the category list data
        if (response.status === 200) {
            const data: Category[] = await response.json();
            return { data };
        }

        // Handle unexpected responses
        return { error: "پاسخ نامعتبری از سرور دریافت شد!" };
    } catch (error: unknown) {
        // console.error("Fetch error:", error); // Log error for debugging in development

        // Handle network errors or unexpected issues
        if (error instanceof DOMException && error.name === "AbortError") {
            return {
                error: "مدت زمان درخواست منقضی شد. لطفاً دوباره تلاش کنید.",
            };
        }
        return { error: "خطای غیرمنتظره‌ای رخ داد!" };
    }
}
