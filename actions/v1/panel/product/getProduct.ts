"use server";

import { RetrieveProductResult, ProductDetail } from "@/types/panel";

/**
 * Fetches a product by its slug from the server with configurable options.
 *
 * @param slug - The slug of the product to be fetched.
 * @param options - Optional configuration for cache and timeout.
 * @param options.cache - Cache mode for the request (default is 'no-cache').
 * @param options.timeout - Timeout in milliseconds for the request (default is 5000ms).
 * @returns {Promise<RetrieveProductResult>} - An object containing the product data or an error message.
 *
 * @example
 * ```typescript
 * const result = await getProduct('milk-shake', { cache: 'reload', timeout: 3000 });
 * if (result.error) {
 *     console.error("Error:", result.error);
 * } else {
 *     console.log("Product:", result.data);
 * }
 * ```
 */
export async function getProduct(
    slug: string,
    options?: { cache?: RequestCache; timeout?: number }
): Promise<RetrieveProductResult> {
    // set delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 6000));

    // Ensure the slug is valid before making the request
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
        return { error: "اسلاگ نامعتبر است!" };
    }

    // Retrieve the API base URL from environment variables
    const baseUrl = process.env.Base_API;

    // Validate if the API base URL is properly set
    if (!baseUrl) {
        return { error: "آدرسی برای ارتباط با سرور یافت نشد!" };
    }

    // Set default options for cache and timeout
    const {
        cache = "no-cache", // Default cache mode
        timeout = 5000, // Default timeout in milliseconds
    } = options || {};

    const url = `${baseUrl}/panel/products/${encodeURIComponent(slug)}/`;

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        // Fetch product data with configurable cache and timeout
        const response = await fetch(url, {
            signal: controller.signal,
            cache, // Use configurable cache
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        // Handle HTTP error responses
        if (!response.ok) {
            switch (response.status) {
                case 404:
                    return { error: "محصول یافت نشد!" };
                case 500:
                    return {
                        error: "خطای سرور! لطفاً بعداً دوباره امتحان کنید.",
                    };
                default:
                    return { error: `خطای سرور: ${response.statusText}` };
            }
        }

        // Parse and return the product data if response is OK
        const data: ProductDetail = await response.json();
        return { data };
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
