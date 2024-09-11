"use server";

import { revalidatePath } from "next/cache";
import { DeleteProductResult } from "@/types/panel";

/**
 * Sends a DELETE request to the server to delete a product with configurable options.
 *
 * @param slug - The slug of the product to be deleted.
 * @param options - Optional configuration for timeout.
 * @param options.timeout - Timeout in milliseconds for the request (default is 5000ms).
 * @returns {Promise<DeleteProductResult>} - An object containing the result of the delete operation or an error message.
 *
 * @example
 * ```typescript
 * const result = await deleteProduct("milk-shake", { timeout: 3000 });
 * if (result.error) {
 *     console.error("Error:", result.error);
 * } else {
 *     console.log("Product deleted:", result.data);
 * }
 * ```
 */
export async function deleteProduct(
    slug: string,
    options?: { timeout?: number }
): Promise<DeleteProductResult> {
    // set delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 6000));

    // Set default options for timeout
    const timeout = options?.timeout || 5000;

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

    const url = `${baseUrl}/panel/products/${encodeURIComponent(slug)}/`;

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        // Send the DELETE request with configurable cache and timeout
        const response = await fetch(url, {
            method: "DELETE",
            signal: controller.signal,
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

        // Handle successful response (204 No Content)
        if (response.status === 204) {
            // Revalidate the cache after deletion
            revalidatePath("/");
            revalidatePath("/vand-panel/");
            revalidatePath("/vand-panel/products");
            revalidatePath("/vand-panel/categories");
            return { data: "محصول با موفقیت حذف شد!" };
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
