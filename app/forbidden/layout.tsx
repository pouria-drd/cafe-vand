import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "403 Forbidden",
    description: "You are forbidden to access this route",
};

interface ForbiddenLayoutProps {
    children?: React.ReactNode;
}

function ForbiddenLayout({ children }: ForbiddenLayoutProps) {
    return (
        <main className="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-4">
            {children}
        </main>
    );
}

export default ForbiddenLayout;
