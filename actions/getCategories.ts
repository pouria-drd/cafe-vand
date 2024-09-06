"use server";

import { MenuCategory } from "@/types/menu";

/**
 * Interface representing the result of the getCategories function.
 * Contains either the fetched data or an error message.
 */
export interface FetchMenuResult {
    /** The array of Category objects if the fetch is successful */
    data?: MenuCategory[];

    /** The error message if the fetch fails */
    error?: string;
}

/**
 * Fetches categories data from the specified URL in the environment variable BASE_MENU_API.
 * The function returns either the data fetched or an error message if the fetch fails.
 *
 * @returns {Promise<FetchMenuResult>} An object containing either the array of categories or an error message.
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
export async function getCategories(): Promise<FetchMenuResult> {
    // Retrieve the BASE_MENU_API from environment variables. If not defined, use an empty string.
    const url: string = process.env.BASE_MENU_API || "";

    // Introduce a delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // Check if the URL is available; return an error if not.
    if (!url || url === "") {
        return { error: "آدرسی برای دریافت داده از سرور وجود ندارد!" };
    }

    try {
        // Attempt to fetch data from the URL.
        const response = await fetch(url);
        // const response = await fetch(url, { cache: "no-cache" }); // Disable caching for real-time data

        // If the response is not successful, return an error.
        if (!response.ok) {
            return {
                error: "خطایی در دریافت داده رخ داده است!",
            };
        }

        // Parse the JSON response into an array of Category objects.
        const data: MenuCategory[] = await response.json();
        // Return the data if the fetch and parsing were successful.
        return { data };
    } catch (error) {
        // Catch any unexpected errors during the fetch or parsing process and return a generic error message.
        return { error: "خطای غیرمنتظره‌ای رخ داد!" };
    }
}
