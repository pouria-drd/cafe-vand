import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Auth",
    description: "Cafe Vand Authentication",
};

interface VandPanelLayoutProps {
    children: React.ReactNode;
}

function AuthLayout(props: VandPanelLayoutProps) {
    return <main className="bg-gray-100 p-4">{props.children}</main>;
}

export default AuthLayout;
