"use client";

import style from "./menu.module.css";
import { motion, Variants } from "framer-motion";

interface CategoryCardProps {
    category: CategoryDetail;
    isSelected: boolean;
    onClick: (category: CategoryDetail) => void;
}

const CategoryCard = (props: CategoryCardProps) => {
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
            className={`${style.vandMenuCategoryCard} ${
                props.isSelected ? "bg-white/15" : "bg-white/5"
            }`}>
            <img
                className="min-w-10 w-10"
                src={props.category.icon}
                alt={`${props.category.name} icon`}
            />
            <h2 className="text-vand-secondary-main text-center text-xs truncate">
                {props.category.name}
            </h2>
        </motion.button>
    );
};

export default CategoryCard;
