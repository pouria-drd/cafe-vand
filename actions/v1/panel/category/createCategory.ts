"use server";

import { revalidatePath } from "next/cache";
import { CategoryFormData, CreateCategoryResult } from "@/types/panel";

/**
 * Send a POST request to the server to create a new category with configurable options.
 *
 * @param props - The category form data.
 * @param options - Optional configuration for cache and timeout.
 * @param options.cache - Cache mode for the request (default is 'no-cache').
 * @param options.timeout - Timeout in milliseconds for the request (default is 5000ms).
 * @returns {Promise<CreateCategoryResult>} - An object containing either the created category data or an error message.
 *
 * @example
 * ```typescript
 * const result = await createCategory(
 *   {
 *     name: "شیک",
 *     slug: "milk-shake",
 *     isActive: true,
 *     icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABkCAYAAAD..."
 *   },
 *   { cache: 'reload', timeout: 3000 }
 * );
 *
 * if (result.error) {
 *   console.error("Error:", result.error);
 * } else {
 *   console.log("Category created:", result.data);
 * }
 * ```
 */
export async function createCategory(
    props: CategoryFormData,
    options?: { cache?: RequestCache; timeout?: number }
): Promise<CreateCategoryResult> {
    // set delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 6000));

    // Ensure the category information is valid before making the request
    if (!props || !props.name || !props.slug || !props.icon) {
        return { error: "اطلاعات دسته ناقص است!" };
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

    const url = `${baseUrl}/panel/categories/`;

    // Prepare the form data
    const formData = new FormData();
    formData.append("name", props.name);
    formData.append("slug", props.slug);
    formData.append("icon", props.icon);
    formData.append("isActive", props.isActive ? "true" : "false");

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        // Send a POST request to create the category with configurable cache and timeout
        const response = await fetch(url, {
            method: "POST",
            body: formData,
            cache, // Use configurable cache
            signal: controller.signal,
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        // Handle non-ok responses
        if (!response.ok) {
            const data = await response.json();
            if (data.slug) {
                return { error: "شناسه تکراری است" };
            }
            if (data.icon) {
                return { error: `خطا در ایجاد دسته: ${data.icon}` };
            }
            return { error: "خطا در ایجاد دسته" };
        }

        // If category is created, return the data
        if (response.status === 201) {
            revalidatePath("/");
            const data = await response.json();
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
