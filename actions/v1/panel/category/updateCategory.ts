"use server";

import { revalidatePath } from "next/cache";
import { CategoryFormData, UpdateCategoryResult } from "@/types/panel";

/**
 * Send a PATCH request to the server to update an existing category with configurable options.
 *
 * @param slug - The slug of the category to be updated.
 * @param props - The category information.
 * @param options - Optional configuration for timeout.
 * @param options.timeout - Timeout in milliseconds for the request (default is 5000ms).
 * @returns {Promise<UpdateCategoryResult>} An object containing either the updated category data or an error message.
 *
 * @example
 * ```typescript
 * const result = await updateCategory("milk-shake", {
 *     name: "شیک",
 *     slug: "milk-shake",
 *     isActive: false,
 *     icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABkCAYAAAD..."
 * }, { timeout: 3000 });
 *
 * if (result.error) {
 *     console.error("Error:", result.error);
 * } else {
 *     console.log("Category updated:", result.data);
 * }
 * ```
 */
export async function updateCategory(
    slug: string,
    props: CategoryFormData,
    options?: { timeout?: number }
): Promise<UpdateCategoryResult> {
    // set delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 6000));

    // Set default options for timeout
    const timeout = options?.timeout || 5000;

    // Retrieve the API base URL from environment variables and validate it
    const baseUrl = process.env.Base_API;
    if (!baseUrl) {
        return { error: "آدرسی برای ارتباط با سرور یافت نشد!" };
    }

    const url = `${baseUrl}/panel/categories/${slug}/`;

    // Prepare the form data
    const formData = new FormData();
    if (props.name) formData.append("name", props.name);
    if (props.slug) formData.append("slug", props.slug);
    if (props.isActive !== undefined)
        formData.append("isActive", props.isActive ? "true" : "false");
    if (props.icon) formData.append("icon", props.icon);

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        // Send a PATCH request to update the category with configurable timeout
        const response = await fetch(url, {
            method: "PATCH",
            body: formData,
            signal: controller.signal,
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        // Handle non-ok responses
        if (!response.ok) {
            const data = await response.json();
            if (data.slug) {
                return { error: "شناسه تکراری است / شناسه انگلیسی باید باشد" };
            }
            if (data.icon) {
                return { error: `خطا در به‌روزرسانی دسته: ${data.icon}` };
            }
            return { error: `خطا در به‌روزرسانی دسته: ${response.statusText}` };
        }

        // If the response is successful, return the updated data
        const data = await response.json();
        revalidatePath("/");
        revalidatePath("/vand-panel/");
        revalidatePath("/vand-panel/products");
        revalidatePath("/vand-panel/categories");
        revalidatePath("/vand-panel/categories/" + slug);
        return { data };
    } catch (error) {
        // console.error("Fetch error:", error); // Log error for debugging in development

        if (error instanceof DOMException && error.name === "AbortError") {
            return {
                error: "مدت زمان درخواست منقضی شد. لطفاً دوباره تلاش کنید.",
            };
        }
        return { error: "خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره امتحان کنید." };
    }
}
