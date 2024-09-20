import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Cafe Vand Dashboard",
};

interface DashboardLayoutProps {
    children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
    return <main>{children}</main>;
}

export default DashboardLayout;
