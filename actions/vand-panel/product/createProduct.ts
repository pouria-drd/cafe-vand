"use server";

import { revalidatePath } from "next/cache";
import { ProductFormData, CreateProductResult } from "@/types/panel";

/**
 * Creates a new product.
 * Returns either the success message or an error message if the operation fails.
 *
 * @param props The product information.
 * @returns {Promise<CreateProductResult>} An object containing either the success message or an error message.
 */
export async function createProduct(
    props: ProductFormData
): Promise<CreateProductResult> {
    // Introduce a delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // Retrieve the API base URL from environment variables
    const baseUrl: string | undefined = process.env.Base_API;

    // Validate if the API base URL is properly set
    if (!baseUrl) {
        return { error: "آدرس API برای دریافت داده از سرور تعریف نشده است!" };
    }

    const url = `${baseUrl}/panel/products/`;

    // Prepare the form data
    const formData = new FormData();
    formData.append("name", props.name);
    formData.append("slug", props.slug);
    formData.append("category", props.category);
    formData.append("isActive", props.isActive ? "true" : "false");

    try {
        // Send a POST request to create the product
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        // Handle non-ok responses
        if (!response.ok) {
            const result = await response.json();
            console.log(result);
            if (result.category) {
                return { error: "دسته را انتخاب کنید" };
            }
            if (result.slug) {
                return { error: "شناسه تکراری است" };
            }
            return { error: `خطا در ایجاد دسته: ${response.statusText}` };
        }

        // If the response is 201 Created, return the data
        if (response.status === 201) {
            revalidatePath("/");
            revalidatePath("/vand-panel");
            revalidatePath("/vand-panel/products");
            revalidatePath("/vand-panel/products/[productSlug]");
            revalidatePath("/vand-panel/categories");
            revalidatePath("/vand-panel/categories/[categorySlug]");
            const result = await response.json();
            return { data: result };
        }

        // Handle unexpected responses
        return { error: "پاسخ نامعتبری از سرور دریافت شد!" };
    } catch (error) {
        // Catch and return any errors encountered during the fetch operation
        return { error: "خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره امتحان کنید." };
    }
}
