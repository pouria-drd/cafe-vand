"use client";

import { ProductCard } from ".";
import styles from "./menu.module.css";
import { motion, Variants } from "framer-motion";

interface ProductListProps {
    products?: Product[];
}

const ProductList = (props: ProductListProps) => {
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
            <div className={`${styles.vandMenuProductList} justify-center`}>
                <p className="text-center text-vand-secondary-main r2l">
                    یک مورد را انتخاب کنید!
                </p>
            </div>
        );
    }

    if (props.products.length === 0) {
        return (
            <div className={`${styles.vandMenuProductList} justify-center`}>
                <p className="text-center text-vand-secondary-main r2l">
                    هیچ آیتمی وجود ندارد!
                </p>
            </div>
        );
    }

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={container}
            className={`${styles.vandMenuProductList}`}
            // The 'key' is created by mapping over the products and joining their IDs into a single string.
            // This ensures React re-renders this section when the list of products changes.
            key={props.products?.map((product) => product.id).join("-")}>
            {props.products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </motion.section>
    );
};

export default ProductList;
