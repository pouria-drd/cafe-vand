import { ProductCard2 } from ".";
import styles from "./menu2.module.css";
import { MenuProduct } from "@/types/menu";
import { motion, Variants } from "framer-motion";

interface ProductList2Props {
    products?: MenuProduct[];
}

const ProductList2 = (props: ProductList2Props) => {
    const container: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.15,
            },
        },
    };

    if (!props.products) {
        return (
            <section className="bg-gray-50 flex flex-1 items-center justify-center p-4">
                <p className="text-center w-full r2l">
                    یک مورد را انتخاب کنید!
                </p>
            </section>
        );
    }

    if (props.products.length === 0) {
        return (
            <section className="bg-gray-50 flex flex-1 items-center justify-center p-4">
                <p className="text-center w-full r2l">هیچ آیتمی یافت نشد!</p>
            </section>
        );
    }

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={container}
            className={`${styles.vandMenu2ProductList2}`}
            // The 'key' is created by mapping over the products and joining their IDs into a single string.
            // This ensures React re-renders this section when the list of products changes.
            key={props.products?.map((product) => product.id).join("-")}>
            {props.products.map((product) => (
                <ProductCard2 key={product.id} product={product} />
            ))}
        </motion.section>
    );
};

export default ProductList2;
