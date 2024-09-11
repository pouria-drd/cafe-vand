"use server";

import { revalidatePath } from "next/cache";
import { ProductFormData, CreateProductResult } from "@/types/panel";

/**
 * Sends a POST request to the server to create a new product with configurable options.
 *
 * @param props - The product information to be submitted.
 * @param options - Optional configuration for cache and timeout.
 * @param options.cache - Cache mode for the request (default is 'no-cache').
 * @param options.timeout - Timeout in milliseconds for the request (default is 5000ms).
 * @returns {Promise<CreateProductResult>} - An object containing the created product data or an error message.
 *
 * @example
 * ```typescript
 * const result = await createProduct(
 *   {
 *     name: "شیک",
 *     slug: "milk-shake",
 *     newPrice: 10,
 *     categoryId: uuid,
 *     isActive: true
 *   },
 *   { cache: 'reload', timeout: 3000 }
 * );
 *
 * if (result.error) {
 *   console.error("Error:", result.error);
 * } else {
 *   console.log("Product created:", result.data);
 * }
 * ```
 */
export async function createProduct(
    props: ProductFormData,
    options?: { cache?: RequestCache; timeout?: number }
): Promise<CreateProductResult> {
    // set delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 6000));

    // Ensure product information is valid before making the request
    if (
        !props ||
        !props.name ||
        !props.slug ||
        !props.newPrice ||
        !props.categoryId
    ) {
        return { error: "اطلاعات محصول ناقص است!" };
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

    const url = `${baseUrl}/panel/products/`;

    // Prepare the form data
    const formData = new FormData();
    formData.append("name", props.name);
    formData.append("slug", props.slug);
    formData.append("newPrice", props.newPrice.toString());
    formData.append("category", props.categoryId);
    formData.append("isActive", props.isActive ? "true" : "false");

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        // Send a POST request to create the product
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
            const result = await response.json();
            if (result.category) {
                return { error: "دسته را انتخاب کنید" };
            }
            if (result.slug) {
                return { error: "شناسه تکراری است / شناسه انگلیسی باید باشد" };
            }
            return { error: "خطا در ایجاد محصول" };
        }

        // If the response is 201 Created, return the data
        if (response.status === 201) {
            revalidatePath("/");
            const result = await response.json();
            return { data: result };
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
