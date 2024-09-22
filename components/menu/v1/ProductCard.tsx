import styles from "./menu.module.css";
import { motion, Variants } from "framer-motion";

interface ProductCardProps {
    product: Product;
}
const ProductCard = (props: ProductCardProps) => {
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
            className={`${styles.vandMenuProductCard} r2l`}>
            <span>{props.product.name}</span>
            <span>{props.product.price} تومان</span>
        </motion.div>
    );
};

export default ProductCard;
