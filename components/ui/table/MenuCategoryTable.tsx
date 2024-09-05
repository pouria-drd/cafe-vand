import { MenuCategoryCard } from "..";
import styles from "./table.module.css";
import { getCategories } from "@/actions";

const MenuCategoryTable = async () => {
    // Fetch categories from the server
    const result = await getCategories();

    return (
        <div className={`${styles.vandMenuCategoryTable} glass`}>
            <div className="overflow-auto flex items-center justify-evenly gap-6 w-full">
                {/* Display an error message if there was an error fetching data */}
                {result.error ? (
                    <p className="text-red-500 text-center r2l">
                        {result.error}
                    </p>
                ) : /* Check if there are categories and render them */
                result.data && result.data.length > 0 ? (
                    result.data.map((category) => (
                        <MenuCategoryCard
                            key={category.id}
                            category={category}
                        />
                    ))
                ) : (
                    <p className="text-center text-vand-secondary-main r2l">
                        هیچ دسته ای یافت نشد!
                    </p>
                )}
            </div>
        </div>
    );
};

export default MenuCategoryTable;
