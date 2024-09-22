"use client";

import styles from "./menu2.module.css";
import { Fragment, useState } from "react";
import { CategoryCard2, ProductList2 } from ".";
import { motion, Variants } from "framer-motion";

interface CategoryList2Props {
    categories: CategoryDetail[];
}

const CategoryList2 = (props: CategoryList2Props) => {
    const [selectedCategory, setSelectedCategory] = useState<CategoryDetail>();

    const onCategoryChanged = (category: CategoryDetail) => {
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
            <div className="bg-white/90 glass p-4">
                <p className="text-center r2l w-full">
                    هیچ دسته بندی یافت نشد!
                </p>
            </div>
        );
    }

    return (
        <Fragment>
            <ProductList2 products={selectedCategory?.products} />

            <section className={`${styles.vandMenu2CategoryList2}`}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={container}
                    className="flex items-center gap-8 overflow-auto p-1">
                    {props.categories.map((category) => (
                        <CategoryCard2
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

export default CategoryList2;
