"use server";

import { revalidatePath } from "next/cache";
import { DeletePriceByIdResult } from "@/types/panel";

/**
 * Deletes a price by its id.
 * Returns either the success message or an error message if the operation fails.
 *
 * @param id The id of the price to be deleted.
 * @returns {Promise<deletePriceByIdResult>} An object containing either the success message or an error message.
 */
export async function deletePriceById(
    id: string
    // productSlug: string
): Promise<DeletePriceByIdResult> {
    // Introduce a delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // Retrieve the API base URL from environment variables
    const baseUrl: string | undefined = process.env.Base_API;

    // Validate if the API base URL is properly set
    if (!baseUrl) {
        return { error: "آدرسی برای ارتباط با سرور یافت نشد!" };
    }

    const url = `${baseUrl}/panel/prices/${id}/`;

    try {
        // Send a DELETE request to remove the price by its id
        const response = await fetch(url, {
            cache: "no-cache",
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Handle non-2xx responses
        if (!response.ok) {
            if (response.status === 404) {
                return { error: "قیمت یافت نشد!" };
            }
            return { error: `خطا در حذف قیمت: ${response.statusText}` };
        }

        // If the response is 204 No Content, consider it successful
        if (response.status === 204) {
            revalidatePath("/");
            // revalidatePath(`/vand-panel/products/${productSlug}`);
            return { data: "قیمت با موفقیت حذف شد!" };
        }

        // Handle unexpected responses
        return { error: "پاسخ نامعتبری از سرور دریافت شد!" };
    } catch (error) {
        // Catch and return any errors encountered during the fetch operation
        return { error: "خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره امتحان کنید." };
    }
}
