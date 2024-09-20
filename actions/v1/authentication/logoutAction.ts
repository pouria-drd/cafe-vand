"use server";

import { cookies } from "next/headers";

/**
 * This action is used to log out the user by clearing the access and refresh tokens.
 */
export default async function logoutAction() {
    // Clear the access and refresh tokens
    cookies().delete("access");
    cookies().delete("refresh");
}
