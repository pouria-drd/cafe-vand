"use server";

import { cookies } from "next/headers";
import { getBaseUrl } from "@/utils/base";
import { logoutAction } from "../authentication";
import { getTokenLifetime, getTokenName } from ".";

/**
 * This function retrieves a valid access token from the cookies.
 * If the access token is not present, it will refresh the access token and return the access token.
 * If the access token is present, it will return the access token.
 * @param timeout - The timeout duration in milliseconds (default is 10000ms).
 * @returns The access token or null if the access token is not valid.
 */
async function getValidToken(timeout: number = 10000): Promise<string | null> {
    const accessToken = cookies().get(await getTokenName("access"))?.value;
    const refreshToken = cookies().get(await getTokenName("refresh"))?.value;

    if (!refreshToken) {
        return null;
    }
    if (accessToken) {
        return accessToken;
    }

    // Set up a timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const baseUrl = getBaseUrl();
        const url = baseUrl + "authentication/refresh/";

        // Send a POST request to refresh the access token with JSON body
        const response = await fetch(url, {
            cache: "no-cache",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh: refreshToken,
            }),
            signal: controller.signal,
        });

        // Clear the timeout if the request completes on time
        clearTimeout(timeoutId);

        if (!response.ok) {
            await logoutAction();
            return null;
        }

        const jsonResponse = await response.json();

        // Handle HTTP error responses
        if (response.ok && jsonResponse.access) {
            cookies().set({
                path: "/",
                secure: true,
                httpOnly: true,
                sameSite: "strict",
                value: jsonResponse.access,
                name: await getTokenName("access"),
                maxAge: await getTokenLifetime("access"),
            });
            return jsonResponse.access;
        }

        return null;
    } catch (error) {
        // Ensure the timeout is cleared even in case of error
        clearTimeout(timeoutId);

        // Log error for debugging in development.
        // console.error("error", error);

        return null;
    }
}

export default getValidToken;
