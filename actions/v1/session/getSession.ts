"use server";

import { cookies } from "next/headers";
import { convertTokenToUser, getTokenName } from "../token";

/**
 * This action is used to get the user from the refresh token.
 * If the refresh token is not present, it will return null.
 * @returns The user object or null if the user is not found.
 */
export default async function getSession(): Promise<User | null> {
    // const accessToken = cookies().get("access")?.value;
    const refreshToken = cookies().get(await getTokenName("refresh"))?.value;

    if (!refreshToken) {
        return null;
    }
    const user = await convertTokenToUser(refreshToken);
    return user;
}
