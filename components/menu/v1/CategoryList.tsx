"use client";

import styles from "./menu.module.css";
import { Fragment, useState } from "react";
import { MenuCategory } from "@/types/menu";
import { CategoryCard, ProductList } from ".";
import { motion, Variants } from "framer-motion";

interface MenuCategoryListProps {
    categories: MenuCategory[];
}

const CategoryList = (props: MenuCategoryListProps) => {
    const [selectedCategory, setSelectedCategory] = useState<MenuCategory>();

    const onCategoryChanged = (category: MenuCategory) => {
        setSelectedCategory(category);
    };

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

    if (!props.categories || props.categories.length === 0) {
        return (
            <div className="relative flex items-center justify-center h-screen">
                <p
                    className="absolute bottom-0
                    text-white text-center r2l w-full p-4 bg-vand-primary-2/80 glass">
                    هیچ دسته بندی یافت نشد!
                </p>
            </div>
        );
    }

    return (
        <Fragment>
            <ProductList products={selectedCategory?.products} />

            <section className={`${styles.vandMenuCategoryList}`}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={container}
                    className="flex items-center gap-8 overflow-auto p-1">
                    {props.categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            isSelected={selectedCategory === category}
                            onClick={(category) => onCategoryChanged(category)}
                        />
                    ))}
                </motion.div>
            </section>
        </Fragment>
    );
};

export default CategoryList;
