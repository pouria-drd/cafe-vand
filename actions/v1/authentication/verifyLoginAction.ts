"use server";

import { cookies } from "next/headers";
import { convertTokenToUser } from "../token";
import { APIErrors, getBaseUrl } from "@/utils/base";
import { validateVerifyLoginForm } from "@/libs/v1/zod/auth";
import { getTokenName, getTokenLifetime } from "@/utils/base";

interface verifyLoginActionProps {
    data: VerifyLoginFormData;
    timeout?: number;
}

/**
 * This action is used to verify the login OTP by sending a POST request to the verify-login endpoint.
 * It returns the user's data if the OTP is valid.
 * It also returns the input errors if the user enters invalid data.
 */
export default async function verifyLoginAction(
    props: verifyLoginActionProps
): Promise<APIResponse<VerifyLoginSuccessData, VerifyLoginInputErrors>> {
    // Set default options for timeout
    const timeout = props.timeout || 5000;

    // Validate form fields
    const validatedFields = validateVerifyLoginForm(props.data);
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return { inputError: validatedFields.error.flatten().fieldErrors };
    }

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const baseUrl = getBaseUrl();
        const url = baseUrl + "authentication/verify-login/";

        // Send a POST request to verify the login with JSON body
        const response = await fetch(url, {
            cache: "no-cache",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                otpId: props.data.otpId,
                otpCode: props.data.otpCode,
            }),
            signal: controller.signal,
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        const jsonResponse = await response.json();

        // Handle HTTP error responses
        if (!response.ok) {
            const errorMsg = await APIErrors(response, jsonResponse);
            if (errorMsg) return { error: errorMsg };
            else return { inputError: jsonResponse };
        }

        if (jsonResponse.access && jsonResponse.refresh) {
            const accessToken = jsonResponse.access;
            const refreshToken = jsonResponse.refresh;

            cookies().set({
                path: "/",
                secure: true,
                httpOnly: true,
                value: accessToken,
                sameSite: "strict",
                name: getTokenName("access"),
                maxAge: getTokenLifetime("access"),
            });
            cookies().set({
                path: "/",
                secure: true,
                httpOnly: true,
                sameSite: "strict",
                value: refreshToken,
                name: getTokenName("refresh"),
                maxAge: getTokenLifetime("refresh"),
            });

            const user = await convertTokenToUser(refreshToken);

            if (!user) {
                return { error: "خطا در ورود به کافه وند." };
            }

            return { data: { user: user } };
        }

        return { error: "کد ورود اشتباه است." };
    } catch (error) {
        // Ensure the timeout is cleared even in case of error
        clearTimeout(timeoutId);

        // Log error for debugging in development.
        // console.error(error);

        if (error instanceof DOMException && error.name === "AbortError") {
            return {
                error: "مدت زمان درخواست طولانی شد. لطفاً دوباره تلاش کنید.",
            };
        }

        return { error: "خطای غیرمنتظره‌ای رخ داد!" };
    }
}
