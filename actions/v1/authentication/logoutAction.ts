"use server";

import { cookies } from "next/headers";
import { getTokenName } from "@/utils/base";

/**
 * This action is used to log out the user by clearing the access and refresh tokens.
 */
export default async function logoutAction() {
    // Clear the access and refresh tokens
    cookies().delete(getTokenName("access"));
    cookies().delete(getTokenName("refresh"));
}
