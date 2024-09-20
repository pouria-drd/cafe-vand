import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin",
    description: "Cafe Vand Admin Dashboard",
};

interface AdminLayoutProps {
    children: React.ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
    return <main>{children}</main>;
}

export default AdminLayout;
