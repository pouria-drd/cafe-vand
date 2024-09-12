"use client";

import { useState } from "react";
import styles from "./menu.module.css";
import { GetMenuResult, MenuCategory } from "@/types/menu";
import { MenuCategoryList, MenuNavbar, MenuProductList } from ".";

interface MenuProps {
    result: GetMenuResult;
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
        <section
            className="transition-all mx-auto bg-bgImage bg-cover bg-center
                flex flex-col items-center justify-between 
                min-h-screen max-w-full sm:max-w-sm">
            <MenuNavbar />

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
        </section>
    );
};

export default Menu;
