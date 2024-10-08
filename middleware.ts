import { getSession } from "./actions/v1/session";
import { getTokenName } from "./actions/v1/token";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    // Get access cookies
    const refreshToken = request.cookies.get(
        await getTokenName("refresh")
    )?.value;

    // If refreshToken is not set, redirect to unauthorized page
    if (!refreshToken) {
        return NextResponse.redirect(new URL("/unauthorized", request.url), {
            status: 303,
        });
    }

    const user = await getSession();

    if (!user) {
        return NextResponse.redirect(new URL("/unauthorized", request.url), {
            status: 303,
        });
    }

    // Check if the user is trying to access an admin route
    const pathname = request.nextUrl.pathname;
    const isAdminRoute = pathname.startsWith("/admin");

    if (isAdminRoute && !user.isAdmin) {
        return NextResponse.redirect(new URL("/forbidden", request.url), {
            status: 303,
        });
    }

    // Otherwise, let the request through
    return NextResponse.next();
}

// Define the paths where middleware should be applied
export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"],
};
