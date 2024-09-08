"use server";

import { GetCategoryBySlugResult, PanelCategoryDetail } from "@/types/panel";

/**
 * Fetches a category by its slug.
 * Returns either the success message or an error message if the operation fails.
 *
 * @param slug The slug of the category to be fetched.
 * @returns {Promise<GetCategoryBySlugResult>} An object containing either the fetched data or an error message.
 */
export async function getCategoryBySlug(
    slug: string
): Promise<GetCategoryBySlugResult> {
    // Introduce a delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // Retrieve the API base URL from environment variables
    const baseUrl: string | undefined = process.env.Base_API;

    // Validate if the API base URL is properly set
    if (!baseUrl) {
        return { error: "آدرسی برای ارتباط با سرور یافت نشد!" };
    }

    const url = `${baseUrl}/panel/categories/${slug}/`;

    try {
        // Attempt to fetch data from the URL.
        const response = await fetch(url);
        // const response = await fetch(url, {
        //     cache: "no-cache", // Disable caching for real-time data
        // });

        if (response.status === 404) {
            return { error: "دسته یافت نشد!" };
        }

        // If the response is not successful, return an error.
        if (!response.ok) {
            return {
                error: "خطایی در دریافت داده رخ داده است!",
            };
        }

        // Parse the JSON response into an array of Category objects.
        const data: PanelCategoryDetail = await response.json();
        // Return the data if the fetch and parsing were successful.
        return { data };
    } catch (error) {
        // Catch any unexpected errors during the fetch or parsing process and return a generic error message.
        return { error: "خطای غیرمنتظره‌ای رخ داد!" };
    }
}
