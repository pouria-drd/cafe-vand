"use server";

import { revalidatePath } from "next/cache";
import { DeletePriceByIdResult } from "@/types/panel";

/**
 * Deletes a price by its id with configurable options.
 *
 * @param id - The id of the price to be deleted.
 * @param options - Optional configuration for timeout.
 * @param options.timeout - Timeout in milliseconds for the request (default is 5000ms).
 * @returns {Promise<DeletePriceByIdResult>} An object containing either the success message or an error message.
 *
 * @example
 * ```typescript
 * const result = await deletePrice("price-id-123", { timeout: 3000 });
 * if (result.error) {
 *     console.error("Error:", result.error);
 * } else {
 *     console.log("Success:", result.data);
 * }
 * ```
 */
export async function deletePrice(
    id: string,
    options?: { timeout?: number }
): Promise<DeletePriceByIdResult> {
    // set delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 6000));

    // Set default options for timeout
    const timeout = options?.timeout || 5000;

    // Retrieve the API base URL from environment variables
    const baseUrl = process.env.Base_API;
    if (!baseUrl) {
        return { error: "آدرسی برای ارتباط با سرور یافت نشد!" };
    }

    const url = `${baseUrl}/panel/prices/${id}/`;

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        // Send a DELETE request to remove the price by its id
        const response = await fetch(url, {
            method: "DELETE",
            signal: controller.signal, // AbortController signal
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        // Handle response based on status codes
        if (response.status === 204) {
            revalidatePath("/");
            revalidatePath("/vand-panel/");
            revalidatePath("/vand-panel/products");
            revalidatePath("/vand-panel/categories");
            return { data: "قیمت با موفقیت حذف شد!" };
        }

        if (response.status === 404) {
            return { error: "قیمت یافت نشد!" };
        }

        if (!response.ok) {
            return { error: `خطا در حذف قیمت: ${response.statusText}` };
        }

        // Handle unexpected responses
        return { error: "پاسخ نامعتبری از سرور دریافت شد!" };
    } catch (error) {
        // console.error("Fetch error:", error); // Log error for debugging in development

        // Handle network errors or other unexpected issues
        if (error instanceof DOMException && error.name === "AbortError") {
            return {
                error: "مدت زمان درخواست منقضی شد. لطفاً دوباره تلاش کنید.",
            };
        }
        return { error: "خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره امتحان کنید." };
    }
}
