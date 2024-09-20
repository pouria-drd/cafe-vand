import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Menu",
    description: "Cafe Vand Menu",
};

interface MenuLayoutProps {
    children: React.ReactNode;
}

function MenuLayout({ children }: MenuLayoutProps) {
    return <main>{children}</main>;
}

export default MenuLayout;
