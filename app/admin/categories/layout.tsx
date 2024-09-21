import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Categories",
    description: "Cafe Vand Categories",
};

interface CategoriesLayoutProps {
    children?: React.ReactNode;
}

function CategoriesLayout({ children }: CategoriesLayoutProps) {
    return <main>{children}</main>;
}

export default CategoriesLayout;
