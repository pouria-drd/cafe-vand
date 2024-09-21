import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
    title: {
        template: "Admin | %s",
        default: "Admin",
    },
    description: "Cafe Vand Admin Dashboard",
};

interface AdminLayoutProps {
    children: React.ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <main className="overflow-auto flex flex-col min-h-screen max-h-screen">
            <Navbar />
            <div className="bg-gray-100 flex-1 px-6 py-4">{children}</div>
        </main>
    );
}

export default AdminLayout;
