import { cn } from "@/utils/base";
import { motion, Variants } from "framer-motion";

interface ProductCardProps {
    product: Product;
    className?: string;
}
const ProductCard = (props: ProductCardProps) => {
    const item: Variants = {
        hidden: { y: 25, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.25, ease: "easeInOut" },
        },
    };

    return (
        <motion.div
            variants={item}
            className={cn(
                `shadow-md text-gray-200 bg-black/20 glass
                hover:bg-black/40 transition-colors rounded-md 
                flex items-center justify-between gap-4 px-4 py-6 r2l`,
                props.className
            )}>
            <h2 className="text-center">{props.product.name}</h2>
            <p className="text-sm text-center">
                {props.product.price} <span className="text-xs">تومان</span>
            </p>
        </motion.div>
    );
};

export default ProductCard;
