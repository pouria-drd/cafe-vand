"use client";

import style from "./menu2.module.css";
import { motion, Variants } from "framer-motion";

interface CategoryCard2Props {
    category: CategoryDetail;
    isSelected: boolean;
    onClick: (category: CategoryDetail) => void;
}

const CategoryCard2 = (props: CategoryCard2Props) => {
    const handleClick = (category: CategoryDetail) => {
        props.onClick(category);
    };

    const item: Variants = {
        hidden: { x: -25, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.2, ease: "easeInOut" },
        },
    };

    return (
        <motion.button
            variants={item}
            onClick={() => handleClick(props.category)}
            className={`${style.vandMenu2CategoryCard2}
        ${
            props.isSelected
                ? "bg-vand-primary-4 text-vand-primary-main ring-0"
                : "bg-white ring-1"
        }
        `}>
            <img
                className="min-w-10 sm:min-w-12 w-10 sm:w-12"
                src={props.category.icon}
                alt={`${props.category.name} icon`}
            />
            <h2 className="text-xs sm:text-sm text-center truncate r2l max-w-full w-full">
                {props.category.name}
            </h2>
        </motion.button>
    );
};

export default CategoryCard2;
