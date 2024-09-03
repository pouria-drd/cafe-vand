import { MenuCategory } from "@/types/menu";

interface MenuCategoryProps {
    category: MenuCategory;
}

const MenuCategoryCard = (props: MenuCategoryProps) => {
    const { category } = props;
    return (
        <div
            className="bg-white/5 hover:bg-white/15 transition-all 
            flex flex-col items-center justify-center gap-2
            cursor-pointer rounded-lg min-w-24 h-24 p-2">
            {/* 
            <h2 className="text-2xl">{category.slug}</h2> */}
            <img
                className="min-w-10 w-10"
                src={category.icon}
                alt={`${category.name} icon`}
            />
            <h2 className="text-vand-secondary text-center text-xs truncate">
                {category.name}
            </h2>
        </div>
    );
};

export default MenuCategoryCard;
