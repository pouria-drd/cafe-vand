"use client";

import { cn } from "@/utils/base";
import { motion, Variants } from "framer-motion";

interface CategoryListProps {
    categories: CategoryDetail[];
    renderItem: (category: CategoryDetail, index: number) => React.ReactNode;
    className?: string;
}

const CategoryList = (props: CategoryListProps) => {
    const container: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0,
                staggerChildren: 0.25,
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className={cn(
                "flex items-end gap-4 vand-green-scroll overflow-auto p-1",
                props.className
            )}>
            {props.categories.map((category, index) =>
                props.renderItem(category, index)
            )}
        </motion.div>
    );
};

export default CategoryList;
