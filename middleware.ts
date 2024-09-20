import { getUserFromToken } from "./utils/auth/token";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    // Get access cookies
    const refreshToken = request.cookies.get("refresh")?.value;

    // If refreshToken is not set, redirect to unauthorized page
    if (!refreshToken) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    const user: User | null = getUserFromToken(refreshToken);

    if (!user) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // Check if the user is trying to access an admin route
    const pathname = request.nextUrl.pathname;
    const isAdminRoute = pathname.startsWith("/admin");

    if (isAdminRoute && !user.isAdmin) {
        return NextResponse.redirect(new URL("/forbidden", request.url));
    }

    // Otherwise, let the request through
    return NextResponse.next();
}

// Define the paths where middleware should be applied
export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"],
};
