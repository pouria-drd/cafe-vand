"use server";

/**
 * This function returns the token name based on the token type.
 * It throws an error if the token name is not set in the environment variables.
 * @param tokenType - The type of the token to retrieve the name for.
 * @returns The token name.
 * @throws An error if the token name is not set in the environment variables.
 */
export async function getTokenName(
    tokenType: "access" | "refresh"
): Promise<string> {
    if (tokenType === "access") {
        const accessName = process.env.ACCESS_TOKEN_NAME;
        if (!accessName) {
            throw new Error(
                "Access token name is not set in the environment variables."
            );
        }
        return accessName;
    } else {
        const refreshName = process.env.REFRESH_TOKEN_NAME;
        if (!refreshName) {
            throw new Error(
                "Refresh token name is not set in the environment variables."
            );
        }
        return refreshName;
    }
}

/**
 * This function returns the token lifetime based on the token type.
 * It throws an error if the token lifetime is not set in the environment variables.
 * @param tokenType - The type of the token to retrieve the lifetime for.
 * @returns The token lifetime.
 * @throws An error if the token lifetime is not set in the environment variables.
 */
export async function getTokenLifetime(
    tokenType: "access" | "refresh"
): Promise<number> {
    if (tokenType === "access") {
        const accessLifetime = process.env.ACCESS_TOKEN_LIFETIME;
        if (!accessLifetime) {
            throw new Error(
                "Access token lifetime is not set in the environment variables."
            );
        }
        return 60 * parseInt(accessLifetime, 10); // Convert to minutes
    } else {
        const refreshLifetime = process.env.REFRESH_TOKEN_LIFETIME;
        if (!refreshLifetime) {
            throw new Error(
                "Refresh token lifetime is not set in the environment variables."
            );
        }
        return 60 * 60 * parseInt(refreshLifetime, 10); // Convert to hours
        // return 60 * parseInt(refreshLifetime, 10); // Convert to minutes
    }
}
