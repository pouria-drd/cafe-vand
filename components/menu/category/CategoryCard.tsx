"use client";

import { cn } from "@/utils/base";
import { motion, Variants } from "framer-motion";

interface CategoryCardProps {
    isActive: boolean;
    category: CategoryDetail;
    onSelect: (category: CategoryDetail) => void;
    className?: string;
}

const CategoryCard = (props: CategoryCardProps) => {
    const item: Variants = {
        hidden: { y: -50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.25, ease: "easeInOut" },
        },
    };

    return (
        <motion.button
            variants={item}
            onClick={() => props.onSelect(props.category)}
            className={cn(
                `transition-all flex flex-col items-center gap-1 glass text-white ${
                    props.isActive
                        ? "bg-vand-primary-4"
                        : "bg-vand-primary-4/50"
                } hover:bg-vand-primary-4 hover:text-white 
                backdrop-blur-2xl p-2 rounded min-w-20`,
                props.className
            )}>
            <img
                className="aspect-square w-10"
                src={props.category.icon}
                alt={props.category.name}
            />
            <p className="text-xs truncate max-w-full">{props.category.name}</p>
        </motion.button>
    );
};

export default CategoryCard;
