import { z } from "zod";

export const LoginFormSchema = z.object({
    username: z
        .string()
        .min(3, { message: "نام کاربری کوتاه است" })
        .max(30, { message: "نام کاربری ط.لانی است" })
        .trim(),
    password: z.string().min(8, { message: "رمز عبور کوتاه است" }).trim(),
});

function validateLoginForm(
    formData: LoginFormData
): z.SafeParseReturnType<any, any> {
    return LoginFormSchema.safeParse({
        username: formData.username,
        password: formData.password,
    });
}

export default validateLoginForm;
