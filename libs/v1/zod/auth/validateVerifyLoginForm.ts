import { z } from "zod";

export const VerifyLoginFormSchema = z.object({
    otpId: z.string().uuid({ message: "شناسه کد ورود الزامی است" }).trim(),
    otpCode: z
        .string()
        .min(6, { message: "کد ورود باید 6 کاراکتر داشته باشد" })
        .max(6, { message: "کد ورود باید 6 کاراکتر داشته باشد" })
        .trim(),
});

function validateVerifyLoginForm(
    formData: VerifyLoginFormData
): z.SafeParseReturnType<any, any> {
    return VerifyLoginFormSchema.safeParse({
        otpId: formData.otpId,
        otpCode: formData.otpCode,
    });
}

export default validateVerifyLoginForm;
