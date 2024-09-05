"use client";

import { MenuCategory } from "@/types/menu";

interface MenuCategoryProps {
    category: MenuCategory;
    isSelected: boolean | null;
    onClick: () => void;
}

const MenuCategoryCard = (props: MenuCategoryProps) => {
    const { category } = props;
    return (
        <button
            onClick={props.onClick}
            className={`transition-all ${
                props.isSelected ? "bg-white/15" : "bg-white/5"
            } flex flex-col items-center justify-center gap-2
            cursor-pointer rounded-lg min-w-24 h-24 p-2`}>
            <img
                className="min-w-10 w-10"
                src={category.icon}
                alt={`${category.name} icon`}
            />
            <h2 className="text-vand-secondary-main text-center text-xs truncate">
                {category.name}
            </h2>
        </button>
    );
};

export default MenuCategoryCard;
