import { z } from "zod";

export const CategoryFormSchema = z.object({
    name: z
        .string()
        .min(3, { message: "نام دسته کوتاه است" })
        .max(30, { message: "نام دسته طولانی است" })
        .trim(),
    slug: z
        .string()
        .min(3, { message: "شناسه کوتاه است" })
        .max(30, { message: "شناسه طولانی است" })
        .trim(),
});

function validateCategoryForm(
    formData: CategoryFormData
): z.SafeParseReturnType<any, any> {
    return CategoryFormSchema.safeParse({
        name: formData.name,
        slug: formData.slug,
    });
}

export default validateCategoryForm;
