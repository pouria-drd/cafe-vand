import { z } from "zod";

// Zod schema
const ProductSchema = z.object({
    name: z.string().min(3, { message: "نام محصول الزامی است" }),
    slug: z.string().min(3, { message: "شناسه محصول الزامی است" }),
    categoryId: z.string().uuid({ message: "شناسه دسته محصول الزامی است" }),
    newPrice: z.union([z.string(), z.number()]).refine(
        (val) => {
            if (typeof val === "string") {
                return !isNaN(parseFloat(val)) && parseFloat(val) > 0;
            }
            return typeof val === "number" && val > 0;
        },
        {
            message: "قیمت محصول الزامی است",
        }
    ),
});

function validateProductForm(
    formData: ProductFormData
): z.SafeParseReturnType<any, any> {
    return ProductSchema.safeParse({
        name: formData.name,
        slug: formData.slug,
        newPrice: formData.newPrice,
        categoryId: formData.category,
    });
}

export default validateProductForm;
