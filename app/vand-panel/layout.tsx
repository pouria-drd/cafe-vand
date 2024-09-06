import type { Metadata } from "next";
import { PanelNavbar } from "@/components/navbar";

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
            <PanelNavbar />
            <section className="bg-gray-100 flex-1 p-4">
                {props.children}
            </section>
        </main>
    );
}

export default VandPanelLayout;
