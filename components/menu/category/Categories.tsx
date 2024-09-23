"use client";

import { Message } from "../../ui";
import { CategoryCard, CategoryList } from ".";

interface CategoriesProps {
    categories?: CategoryDetail[];
    selectedCategory?: CategoryDetail;
    onSelect: (category: CategoryDetail) => void;
}

const Categories = (props: CategoriesProps) => {
    const categories = props.categories || [];

    return (
        <div className="bg-black/25 flex items-center px-3 min-h-24">
            {categories.length === 0 ? (
                <Message status="warning">موردی برای نمایش وجود ندارد</Message>
            ) : (
                <CategoryList
                    categories={categories}
                    renderItem={(category, index) => (
                        <CategoryCard
                            key={index}
                            category={category}
                            onSelect={props.onSelect}
                            isActive={
                                category.id === props.selectedCategory?.id
                            }
                        />
                    )}
                />
            )}
        </div>
    );
};

export default Categories;
