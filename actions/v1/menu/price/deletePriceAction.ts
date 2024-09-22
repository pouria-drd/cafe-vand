"use server";

import { revalidatePath } from "next/cache";
import { getValidToken } from "../../token";
import { APIErrors, getBaseUrl } from "@/utils/base";

/**
 * This action is used to delete a price.
 * It returns the price data and the input errors if the price is not deleted.
 * @param id - The id of the price to delete.
 * @param productSlug - The slug of the product to delete the price from.
 * @returns The price data or the input errors if the price is not deleted.
 */
async function deletePriceAction(
    id: string
): Promise<APIResponse<string, string>> {
    // Get a valid access token
    const validAccessToken = await getValidToken();
    if (!validAccessToken) {
        return { error: "invalid-credentials" };
    }

    // set delay for testing purposes (e.g., 3 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
        // Set up url
        const baseUrl = getBaseUrl();
        const url = baseUrl + "menu/prices/" + id + "/";
        // Send a POST request to login the user with JSON body
        const response = await fetch(url, {
            cache: "no-cache",
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${validAccessToken}`,
            },
            signal: controller.signal,
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        if (response.status === 401 || response.status === 403) {
            return { error: "invalid-credentials" };
        }

        // Handle HTTP error responses
        if (!response.ok) {
            const jsonResponse = await response.json();
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

        return { data: "قیمت حذف شد" };
    } catch (error) {
        // Ensure the timeout is cleared even in case of error
        clearTimeout(timeoutId);

        // Log error for debugging in development.
        // console.error(error);

        return { error: "خطای غیرمنتظره‌ای رخ داد!" };
    }
}

export default deletePriceAction;
