"use server";

import { revalidatePath } from "next/cache";
import { getValidToken } from "../../token";
import { APIErrors, getBaseUrl } from "@/utils/base";
import { validateProductForm } from "@/libs/v1/zod/menu";

/**
 * This action is used to create a new product.
 * It returns the product data and the input errors if the product is not created.
 * @param data - The product data to create.
 * @returns The product data or the input errors if the product is not created.
 */
async function createProductAction(
    data: ProductFormData
): Promise<APIResponse<ProductSuccessData, ProductInputErrors>> {
    // Get a valid access token
    const validAccessToken = await getValidToken();
    if (!validAccessToken) {
        return { error: "invalid-credentials" };
    }

    // set delay for testing purposes (e.g., 3 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // Validate form fields
    const validatedFields = validateProductForm(data);
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return { inputError: validatedFields.error.flatten().fieldErrors };
    }

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
        // Set up url
        const baseUrl = getBaseUrl();
        const url = baseUrl + "menu/products/";
        // Send a POST request to login the user with JSON body
        const response = await fetch(url, {
            cache: "no-cache",
            method: "POST",
            headers: {
                Authorization: `Bearer ${validAccessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            signal: controller.signal,
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        if (response.status === 401 || response.status === 403) {
            return { error: "invalid-credentials" };
        }

        const jsonResponse = await response.json();

        // Handle HTTP error responses
        if (!response.ok) {
            const errorMsg = await APIErrors(response, jsonResponse);
            if (errorMsg) return { error: errorMsg };
            else return { inputError: jsonResponse };
        }

        // Revalidate paths
        revalidatePath("/");
        revalidatePath("/menu");
        revalidatePath("/admin");
        revalidatePath("/admin/products");
        revalidatePath("/admin/categories");

        return { data: { product: jsonResponse } };
    } catch (error) {
        // Ensure the timeout is cleared even in case of error
        clearTimeout(timeoutId);

        // Log error for debugging in development.
        // console.error(error);

        return { error: "خطای غیرمنتظره‌ای رخ داد!" };
    }
}

export default createProductAction;
