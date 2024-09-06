"use client";

import { MenuCategoryCard } from ".";
import { MenuCategory } from "@/types/menu";

interface MenuCategoryListProps {
    categories: MenuCategory[];
    selectedCategory: MenuCategory | null;
    onCategorySelect: (category: MenuCategory) => void;
}

const MenuCategoryList = (props: MenuCategoryListProps) => {
    return (
        <div className="flex gap-4 overflow-auto w-full">
            {/* Check if there are categories and render them */}
            {props.categories && props.categories.length > 0 ? (
                props.categories.map((category) => (
                    <MenuCategoryCard
                        key={category.id}
                        category={category}
                        isSelected={
                            props.selectedCategory &&
                            props.selectedCategory.id === category.id
                        }
                        onClick={() => props.onCategorySelect(category)}
                    />
                ))
            ) : (
                <p className="text-center text-vand-secondary-main r2l">
                    هیچ اطلاعاتی یافت نشد!
                </p>
            )}
        </div>
    );
};

export default MenuCategoryList;
