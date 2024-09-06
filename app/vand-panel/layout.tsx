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
        <>
            <PanelNavbar />
            <main className="p-4">{props.children}</main>
        </>
    );
}

export default VandPanelLayout;
