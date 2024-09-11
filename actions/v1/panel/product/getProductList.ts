"use server";

import { RetrieveProductListResult, Product } from "@/types/panel";

/**
 * Fetches a list of products from the server with configurable options.
 *
 * @param options - Optional configuration for cache and timeout.
 * @param options.cache - Cache mode for the request (default is 'no-cache').
 * @param options.timeout - Timeout in milliseconds for the request (default is 5000ms).
 * @param options.revalidate - Number of hours after which to revalidate the data (default is 1 hour).
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
    revalidate?: number; // Number of hours for revalidation
}): Promise<RetrieveProductListResult> {
    // set delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 6000));

    // Set default options for cache, timeout, and revalidation
    const timeout = options?.timeout || 5000;
    const cache = options?.cache || "no-cache";
    const revalidateHours = options?.revalidate || 1; // Default revalidation time is 1 hour
    const revalidate =
        cache !== "no-cache" ? revalidateHours * 3600 : undefined; // Set revalidate only if cache is not 'no-cache'

    // Retrieve the API base URL from environment variables and validate it
    const baseUrl = process.env.Base_API;
    if (!baseUrl) {
        return { error: "آدرسی برای ارتباط با سرور یافت نشد!" };
    }

    const url = `${baseUrl}/panel/products/`;

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        // Fetch product list data with configurable cache and timeout
        const response = await fetch(url, {
            method: "GET",
            cache, // Use configurable cache
            signal: controller.signal,
            ...(revalidate !== undefined ? { next: { revalidate } } : {}), // Apply revalidate only if it's defined
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
