"use server";

import { revalidatePath } from "next/cache";
import { ProductFormData, UpdateProductResult } from "@/types/panel";

/**
 * Sends a PATCH request to the server to update a product with configurable options.
 *
 * @param productSlug - The slug of the product to be updated.
 * @param props - The product information to be updated.
 * @param options - Optional configuration for timeout.
 * @param options.timeout - Timeout in milliseconds for the request (default is 5000ms).
 * @returns {Promise<UpdateProductResult>} - An object containing the updated product data or an error message.
 *
 * @example
 * ```typescript
 * const result = await updateProduct(
 *   "milk-shake",
 *   {
 *     name: "شیک",
 *     slug: "milk-shake",
 *     newPrice: 12,
 *     categoryId: uuid,
 *     isActive: true
 *   },
 *   { timeout: 3000 }
 * );
 *
 * if (result.error) {
 *   console.error("Error:", result.error);
 * } else {
 *   console.log("Product updated:", result.data);
 * }
 * ```
 */
export async function updateProduct(
    productSlug: string,
    props: ProductFormData,
    options?: { timeout?: number }
): Promise<UpdateProductResult> {
    // set delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 6000));

    // Set default options for timeout
    const timeout = options?.timeout || 5000;

    // Retrieve the API base URL from environment variables and validate it
    const baseUrl = process.env.Base_API;
    if (!baseUrl) {
        return { error: "آدرسی برای ارتباط با سرور یافت نشد!" };
    }

    const url = `${baseUrl}/panel/products/${encodeURIComponent(productSlug)}/`;

    // Prepare the form data
    const formData = new FormData();
    if (props.name) formData.append("name", props.name);
    if (props.slug) formData.append("slug", props.slug);
    if (props.categoryId) formData.append("category", props.categoryId);
    if (props.newPrice) formData.append("newPrice", props.newPrice.toString());
    if (props.isActive !== undefined)
        formData.append("isActive", props.isActive ? "true" : "false");

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        // Send a PATCH request to update the product with configurable cache and timeout
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
            return { error: "خطا در ویرایش محصول" };
        }

        // If the response is successful (200 OK), return the updated data
        if (response.status === 200) {
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
