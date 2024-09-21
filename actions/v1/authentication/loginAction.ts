"use server";

import { cookies } from "next/headers";
import { APIErrors, getBaseUrl } from "@/utils/base";
import { validateLoginForm } from "@/libs/v1/zod/auth";
import { getTokenLifetime, getTokenName } from "../token";

interface LoginActionProps {
    data: LoginFormData;
    timeout?: number;
}

/**
 * This action is used to login the user by sending a POST request to the login endpoint.
 * It returns the user's data and the OTP ID if the user has OTP enabled.
 * It also returns the input errors if the user enters invalid data.
 */
export default async function loginAction(
    props: LoginActionProps
): Promise<APIResponse<LoginSuccessData, LoginInputErrors>> {
    // Set default options for timeout
    const timeout = props.timeout || 5000;

    // set delay for testing purposes (e.g., 3 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // Validate form fields
    const validatedFields = validateLoginForm(props.data);
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return { inputError: validatedFields.error.flatten().fieldErrors };
    }

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        // Set up url
        const baseUrl = getBaseUrl();
        const url = baseUrl + "authentication/login/";

        // Send a POST request to login the user with JSON body
        const response = await fetch(url, {
            cache: "no-cache",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: props.data.username,
                password: props.data.password,
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
                name: await getTokenName("access"),
                maxAge: await getTokenLifetime("access"),
            });
            cookies().set({
                path: "/",
                secure: true,
                httpOnly: true,
                sameSite: "strict",
                value: refreshToken,
                name: await getTokenName("refresh"),
                maxAge: await getTokenLifetime("refresh"),
            });

            return { data: { success: "ورود به کافه وند انجام شد" } };
        }

        return { data: { otpId: jsonResponse.otpId } };
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
