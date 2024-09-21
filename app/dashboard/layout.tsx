import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Cafe Vand Dashboard",
};

interface DashboardLayoutProps {
    children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <main className="overflow-auto flex flex-col min-h-screen max-h-screen">
            <Navbar />
            <div className="bg-gray-100 flex-1 px-6 py-4">{children}</div>
        </main>
    );
}

export default DashboardLayout;
