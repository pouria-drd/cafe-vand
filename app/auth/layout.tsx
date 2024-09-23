import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Auth",
    description: "Cafe Vand Authentication",
};

interface AuthLayoutProps {
    children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main
            className="transition-all bg-loginBGMobile md:bg-loginBG bg-cover bg-center
            flex items-center justify-center min-h-screen">
            {children}
        </main>
    );
}

export default AuthLayout;
