import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "403 Forbidden",
    description: "You are forbidden to access this route",
};

interface ForbiddenLayoutProps {
    children?: React.ReactNode;
}

function ForbiddenLayout({ children }: ForbiddenLayoutProps) {
    return <main>{children}</main>;
}

export default ForbiddenLayout;
