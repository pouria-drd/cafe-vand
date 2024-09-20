"use server";

import { cookies } from "next/headers";
import refreshAction from "./refreshAction";
import { getUserFromToken } from "@/utils/auth/token";

/**
 * This action is used to get the user from the access token.
 * If the access token is not present, it will refresh the access token and return the user.
 * If the access token is present, it will return the user from the access token.
 */
export default async function getUserAction(): Promise<User | null> {
    const accessToken = cookies().get("access")?.value;
    const refreshToken = cookies().get("refresh")?.value;

    if (!refreshToken) {
        return null;
    }

    if (!accessToken) {
        const refreshResponse = await refreshAction({
            refreshToken: refreshToken,
        });
        if (refreshResponse.access) {
            const accessToken = refreshResponse.access;

            // Parse environment variables and provide defaults
            const accessTokenMinutes = parseInt(
                process.env.ACCESS_TOKEN_AGE || "10",
                10
            ); // default 10 minutes

            cookies().set({
                path: "/",
                secure: true,
                httpOnly: true,
                name: "access",
                value: accessToken,
                sameSite: "strict",
                maxAge: 60 * accessTokenMinutes, // 10 minutes default
            });

            const user: User | null = getUserFromToken(accessToken);

            return user;
        } else {
            return null;
        }
    }

    return getUserFromToken(accessToken);
}
