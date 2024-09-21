import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products",
    description: "Cafe Vand Products",
};

interface ProductsLayoutProps {
    children?: React.ReactNode;
}

function ProductsLayout({ children }: ProductsLayoutProps) {
    return <main>{children}</main>;
}

export default ProductsLayout;
