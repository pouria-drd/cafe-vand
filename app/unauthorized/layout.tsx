import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "401 Unauthorized",
    description: "You are not authorized to access this route",
};

interface UnauthorizedLayoutProps {
    children: React.ReactNode;
}

function UnauthorizedLayout({ children }: UnauthorizedLayoutProps) {
    return (
        <main className="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-4">
            {children}
        </main>
    );
}

export default UnauthorizedLayout;
