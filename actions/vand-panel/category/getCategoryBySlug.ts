"use server";

import {
    PanelPrice,
    PanelCategoryDetail,
    GetCategoryBySlugResult,
} from "@/types/panel";

export async function getCategoryBySlug(
    slug: string
): Promise<GetCategoryBySlugResult> {
    const baseUrl: string | undefined = process.env.Base_API;

    if (!baseUrl) {
        return { error: "آدرسی برای ارتباط با سرور یافت نشد!" };
    }

    const url = `${baseUrl}/panel/categories/${slug}/`;

    try {
        const response = await fetch(url, {
            cache: "no-cache",
        });

        if (response.status === 404) {
            return { error: "دسته یافت نشد!" };
        }

        if (!response.ok) {
            return {
                error: "خطایی در دریافت داده رخ داده است!",
            };
        }

        const data: PanelCategoryDetail = await response.json();

        // Construct a result object with the products and their prices including 'id'
        const categoryDetailWithPrices = {
            ...data,
            products: data.products.map((product) => {
                return {
                    ...product,
                    prices: product.prices.map((price: PanelPrice) => ({
                        id: price.id, // Include the 'id' for each price
                        amount: price.amount,
                        createdAt: price.createdAt,
                    })),
                };
            }),
        };

        // Return the category with the products and prices
        return { data: categoryDetailWithPrices };
    } catch (error) {
        return { error: "خطای غیرمنتظره‌ای رخ داد!" };
    }
}
