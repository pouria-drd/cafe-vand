"use server";

import { revalidatePath } from "next/cache";
import { CategoryFormData, CreateCategoryResult } from "@/types/panel";

/**
 * Creates a new category.
 * Returns either the success message or an error message if the operation fails.
 *
 * @param props The category information.
 * @returns {Promise<CreateCategoryResult>} An object containing either the success message or an error message.
 */
export async function createCategory(
    props: CategoryFormData
): Promise<CreateCategoryResult> {
    // Introduce a delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // Retrieve the API base URL from environment variables
    const baseUrl: string | undefined = process.env.Base_API;

    // Validate if the API base URL is properly set
    if (!baseUrl) {
        return { error: "آدرسی برای ارتباط با سرور یافت نشد!" };
    }

    const url = `${baseUrl}/panel/categories/`;

    // Prepare the form data
    const formData = new FormData();
    formData.append("name", props.name);
    formData.append("slug", props.slug);
    formData.append("isActive", props.isActive ? "true" : "false");
    if (props.icon) {
        formData.append("icon", props.icon); // Append icon file if available
    }

    try {
        // Send a POST request to create the category
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        // Handle non-ok responses
        if (!response.ok) {
            const data = await response.json();
            if (data.slug) {
                return { error: "شناسه تکراری است" };
            }
            if (data.icon) {
                return { error: `خطا در ایجاد دسته: ${data.icon}` };
            }
            return { error: `خطا در ایجاد دسته: ${response.statusText}` };
        }

        // If the response is 201 Created, return the data
        if (response.status === 201) {
            revalidatePath("/");
            revalidatePath("/vand-panel");
            const data = await response.json();
            return { data: data };
        }

        // Handle unexpected responses
        return { error: "پاسخ نامعتبری از سرور دریافت شد!" };
    } catch (error) {
        // Catch and return any errors encountered during the fetch operation
        return { error: "خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره امتحان کنید." };
    }
}
