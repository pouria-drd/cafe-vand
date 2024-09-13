import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
    title: "Admin Panel",
    description: "vand panel",
};

interface VandPanelLayoutProps {
    children: React.ReactNode;
}

function VandPanelLayout(props: VandPanelLayoutProps) {
    return (
        <main className="flex flex-col min-h-screen">
            <Navbar />
            <div className="bg-gray-100 flex-1 p-4">{props.children}</div>
        </main>
    );
}

export default VandPanelLayout;
