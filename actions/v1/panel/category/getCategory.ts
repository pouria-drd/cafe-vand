"use server";

import { CategoryDetail, RetrieveCategoryResult } from "@/types/panel";

/**
 * Send a GET request to the server to fetch a category with configurable options.
 *
 * @param slug - The slug of the category to be fetched.
 * @param options - Optional configuration for cache, timeout, and revalidation.
 * @param options.cache - Cache mode for the request (default is 'no-cache').
 * @param options.timeout - Timeout in milliseconds for the request (default is 5000ms).
 * @param options.revalidate - Number of hours after which to revalidate the data (default is 1 hour).
 * @returns {Promise<RetrieveCategoryResult>} - An object containing either the detailed category data or an error message.
 *
 * @example
 * ```typescript
 * const result = await getCategory('milk-shake', { cache: 'force-cache', timeout: 3000, revalidate: 2 });
 * if (result.error) {
 *     console.error("Error:", result.error);
 * } else {
 *     console.log("Category:", result.data);
 * }
 * ```
 */
export async function getCategory(
    slug: string,
    options?: { cache?: RequestCache; timeout?: number; revalidate?: number }
): Promise<RetrieveCategoryResult> {
    // Set default options for cache, timeout, and revalidation
    const timeout = options?.timeout || 5000;
    const cache = options?.cache || "no-cache";
    const revalidateHours = options?.revalidate || 1; // Default revalidation time is 1 hour
    const revalidate =
        cache !== "no-cache" ? revalidateHours * 3600 : undefined; // Set revalidate only if cache is not 'no-cache'

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

    const url = `${baseUrl}/panel/categories/${encodeURIComponent(slug)}/`;

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        // Fetch category data with configurable cache, timeout, and revalidation
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
                    return { error: "دسته بندی یافت نشد!" };
                case 500:
                    return {
                        error: "خطای سرور! لطفاً بعداً دوباره امتحان کنید.",
                    };
                default:
                    return { error: `خطای سرور: ${response.statusText}` };
            }
        }

        // If the response is OK, return the category data
        if (response.status === 200) {
            const data: CategoryDetail = await response.json();
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