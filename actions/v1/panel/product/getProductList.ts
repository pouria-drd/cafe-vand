"use server";

import { RetrieveProductListResult, Product } from "@/types/panel";

/**
 * Fetches a list of products from the server with configurable options.
 *
 * @param options - Optional configuration for cache and timeout.
 * @param options.cache - Cache mode for the request (default is 'no-cache').
 * @param options.timeout - Timeout in milliseconds for the request (default is 5000ms).
 * @returns {Promise<RetrieveProductListResult>} - An object containing either the array of products or an error message.
 *
 * @example
 * ```typescript
 * const result = await getProductList({ cache: 'reload', timeout: 3000 });
 * if (result.error) {
 *     console.error("Error:", result.error);
 * } else {
 *     console.log("Products:", result.data);
 * }
 * ```
 */
export async function getProductList(options?: {
    cache?: RequestCache;
    timeout?: number;
}): Promise<RetrieveProductListResult> {
    // set delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 6000));

    // Retrieve the API base URL from environment variables and validate it
    const baseUrl = process.env.Base_API;
    if (!baseUrl) {
        return { error: "آدرسی برای ارتباط با سرور یافت نشد!" };
    }

    // Set default options for cache and timeout
    const {
        cache = "no-cache", // Default cache mode
        timeout = 5000, // Default timeout in milliseconds
    } = options || {};

    const url = `${baseUrl}/panel/products/`;

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        // Fetch product list data with configurable cache and timeout
        const response = await fetch(url, {
            signal: controller.signal,
            cache, // Use configurable cache option
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        // Handle non-200 responses
        if (!response.ok) {
            return {
                error: `خطا در دریافت محصولات: ${response.statusText}`,
            };
        }

        // Parse the JSON response into an array of Product objects
        const data: Product[] = await response.json();
        return { data };
    } catch (error: unknown) {
        // console.error("Fetch error:", error); // Log error for debugging in development

        // Handle request timeouts and other unexpected errors
        if (error instanceof DOMException && error.name === "AbortError") {
            return {
                error: "مدت زمان درخواست منقضی شد. لطفاً دوباره تلاش کنید.",
            };
        }
        return { error: "خطای غیرمنتظره‌ای رخ داد!" };
    }
}
