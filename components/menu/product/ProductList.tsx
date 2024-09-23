import { cn } from "@/utils/base";
import { motion, Variants } from "framer-motion";

interface ProductListProps {
    products: Product[];
    renderItem: (product: Product, index: number) => React.ReactNode;
    className?: string;
}

const ProductList = (props: ProductListProps) => {
    const container: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0,
                staggerChildren: 0.15,
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className={cn(
                `grid grid-cols-1 md:grid-cols-3 gap-4`,
                props.className
            )}
            // The 'key' is created by mapping over the products and joining their IDs into a single string.
            // This ensures React re-renders this section when the list of products changes.
            key={props.products?.map((product) => product.id).join("-")}>
            {props.products.map((product, index) =>
                props.renderItem(product, index)
            )}
        </motion.div>
    );
};

export default ProductList;
