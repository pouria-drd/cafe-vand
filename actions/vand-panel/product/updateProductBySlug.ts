"use server";

import { revalidatePath } from "next/cache";
import { ProductFormData, UpdateProductBySlugResult } from "@/types/panel";

/**
 * Updates a product by its slug.
 * Returns either the success message or an error message if the operation fails.
 *
 * @param props The product information.
 * @returns {Promise<UpdateProductBySlugResult>} An object containing either the success message or an error message.
 */
export async function updateProductBySlug(
    productSlug: string,
    props: ProductFormData
): Promise<UpdateProductBySlugResult> {
    // Introduce a delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // Retrieve the API base URL from environment variables
    const baseUrl: string | undefined = process.env.Base_API;

    // Validate if the API base URL is properly set
    if (!baseUrl) {
        return { error: "آدرسی برای ارتباط با سرور یافت نشد!" };
    }

    const url = `${baseUrl}/panel/products/${productSlug}/`;

    // Prepare the form data
    const formData = new FormData();

    formData.append("name", props.name);
    formData.append("slug", props.slug);
    formData.append("newPrice", props.newPrice.toString());
    formData.append("category", props.categoryId);
    formData.append("isActive", props.isActive ? "true" : "false");

    try {
        // Send a POST request to update the product
        const response = await fetch(url, {
            cache: "no-cache",
            method: "PATCH",
            body: formData,
        });

        // Handle non-ok responses
        if (!response.ok) {
            const data = await response.json();
            if (data.slug) {
                return { error: "شناسه تکراری است / شناسه انگلیسی باید باشد" };
            }
            return { error: `خطا در ویرایش محصول: ${response.statusText}` };
        }

        // If the response is successful, return the data
        if (response.status === 200) {
            revalidatePath("/");
            // revalidatePath(`/vand-panel/products/${productSlug}`);
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
