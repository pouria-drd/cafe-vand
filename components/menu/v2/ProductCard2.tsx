import styles from "./menu2.module.css";
import { motion, Variants } from "framer-motion";

interface ProductCardProps {
    product: Product;
}
const ProductCard2 = (props: ProductCardProps) => {
    const item: Variants = {
        hidden: { y: 25, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.2, ease: "easeInOut" },
        },
    };

    return (
        <motion.div
            variants={item}
            className={`${styles.vandMenu2ProductCard2} r2l`}>
            <h2 className="text-center text-lg">{props.product.name}</h2>
            <p className="text-base text-center text-vand-secondary-8">
                {props.product.price} <span className="text-sm">تومان</span>
            </p>
        </motion.div>
    );
};

export default ProductCard2;
