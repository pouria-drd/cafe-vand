"use client";

import { useState } from "react";
import { MenuCategoryList, MenuProductList } from ".";
import styles from "./menu.module.css";
import { MenuCategory, MenuProduct } from "@/types/menu";
import { FetchMenuResult } from "@/actions/getCategories";

interface MenuProps {
    result: FetchMenuResult;
}

const Menu = (props: MenuProps) => {
    const [categories, setCategories] = useState<MenuCategory[]>(() => {
        if (props.result.data) {
            return props.result.data;
        }
        return [];
    });

    const [selectedCategory, setSelectedCategory] =
        useState<MenuCategory | null>(() => {
            if (props.result.data && props.result.data.length > 0) {
                return props.result.data[1];
            }
            return null;
        });

    // Handler for selecting a category
    const handleCategorySelect = (category: MenuCategory) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <MenuProductList products={selectedCategory?.products} />

            <div className={`${styles.vandMenu} glass`}>
                {props.result.error ? (
                    <p className="text-red-500 text-center r2l">
                        {props.result.error}
                    </p>
                ) : (
                    <MenuCategoryList
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategorySelect={handleCategorySelect}
                    />
                )}
            </div>
        </>
    );
};

export default Menu;
