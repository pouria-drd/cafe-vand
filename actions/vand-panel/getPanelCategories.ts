"use server";

import { getPanelCategoryResult, PanelCategory } from "@/types/panel";

/**
 * Fetches categories data.
 * The function returns either the data fetched or an error message if the fetch fails.
 *
 * @returns {Promise<getPanelCategoryResult>} An object containing either the array of categories or an error message.
 *
 * @example
 * ```typescript
 * const result = await getCategories();
 * if (result.error) {
 *     console.error("Error:", result.error);
 * } else {
 *     console.log("Categories:", result.data);
 * }
 * ```
 */
export async function getPanelCategories(): Promise<getPanelCategoryResult> {
    // Introduce a delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // Retrieve the API base URL from environment variables
    const baseUrl: string | undefined = process.env.Base_API;

    // Validate if the API base URL is properly set
    if (!baseUrl) {
        return { error: "آدرس API برای دریافت داده از سرور تعریف نشده است!" };
    }

    const url = `${baseUrl}/panel/categories/`;

    try {
        // Attempt to fetch data from the URL.
        const response = await fetch(url);
        // const response = await fetch(url, {
        //     cache: "no-cache",// Disable caching for real-time data
        // });

        // If the response is not successful, return an error.
        if (!response.ok) {
            return {
                error: "خطایی در دریافت داده رخ داده است!",
            };
        }

        // Parse the JSON response into an array of Category objects.
        const data: PanelCategory[] = await response.json();
        // Return the data if the fetch and parsing were successful.
        return { data };
    } catch (error) {
        // Catch any unexpected errors during the fetch or parsing process and return a generic error message.
        return { error: "خطای غیرمنتظره‌ای رخ داد!" };
    }
}
