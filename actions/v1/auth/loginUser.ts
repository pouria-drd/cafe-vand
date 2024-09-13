"use server";

import { LoginUserFormData, LoginUserResult } from "@/types/auth";

/**
 * Send a POST request to the server to login a user with configurable options.
 *
 * @param props - The user information to be submitted.
 * @param options - Optional configuration timeout.
 * @param options.timeout - Timeout in milliseconds for the request (default is 5000ms).
 * @returns {Promise<LoginUserResult>} - An object containing the user data or an error message.
 *
 * @example
 * ```typescript
 * const result = await loginUser(
 *   {
 *     username: "user1",
 *     password: "password123"
 *   },
 *   { timeout: 3000 }
 * );
 *
 * if (result.error) {
 *   console.error("Error:", result.error);
 * } else {
 *   console.log("User logged in:", result.data);
 * }
 * ```
 */
export async function loginUser(
    props: LoginUserFormData,
    options?: { timeout?: number }
): Promise<LoginUserResult> {
    // Set default options for timeout
    const timeout = options?.timeout || 5000;

    // Introduce a delay for testing purposes (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // Ensure the user information is valid before making the request
    if (!props || !props.username || !props.password) {
        return { error: "اطلاعات کاربر ناقص است!" };
    }

    // Retrieve the API base URL from environment variables
    const baseUrl = process.env.Base_API;

    // Validate if the API base URL is properly set
    if (!baseUrl) {
        return { error: "آدرسی برای ارتباط با سرور یافت نشد!" };
    }

    const url = `${baseUrl}/auth/login/`;

    // Prepare the form data
    const formData = new FormData();
    formData.append("username", props.username);
    formData.append("password", props.password);

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        // Send a POST request to login the user with configurable cache and timeout
        const response = await fetch(url, {
            method: "POST",
            body: formData,
            signal: controller.signal,
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        // Handle HTTP error responses
        if (!response.ok) {
            switch (response.status) {
                case 404:
                    return { error: "آدرس یافت نشد!" };
                case 500:
                    return {
                        error: "خطای سرور! لطفاً بعداً دوباره امتحان کنید.",
                    };
                case 400:
                    return { error: "نام کاربری یا رمز عبور اشتباه است!" };
                default:
                    return { error: "نام کاربری یا رمز عبور اشتباه است!" };
            }
        }

        // If the response is 200 OK, return the user data
        if (response.status === 200) {
            const data = await response.json();
            return { data };
        }

        // Handle unexpected responses
        return { error: "پاسخ نامعتبری از سرور دریافت شد!" };
    } catch (error: unknown) {
        // console.error("Fetch error:", error); // Log error for debugging in development

        // Handle network errors or unexpected issues
        if (error instanceof DOMException && error.name === "AbortError") {
            return {
                error: "مدت زمان درخواست منقضی شد. لطفاً دوباره تلاش کنید.",
            };
        }
        return { error: "خطای غیرمنتظره‌ای رخ داد!" };
    }
}
