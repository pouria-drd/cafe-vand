import { MenuCategoryCard } from "..";
import styles from "./table.module.css";
import { getCategories } from "@/actions";

const MenuCategoryTable = async () => {
    // Fetch categories from the server
    const result = await getCategories();

    return (
        <div className={`${styles.vandMenuCategoryTable} glass`}>
            {/* Display an error message if there was an error fetching data */}
            {result.error && <p className="text-red-500">{result.error}</p>}

            {/* Map over the categories and render a MenuCategoryCard for each one */}
            {result.data && result.data.length > 0 ? (
                result.data.map((category) => (
                    <MenuCategoryCard key={category.id} category={category} />
                ))
            ) : (
                <p className="text-center">هیچ دسته ای در سایت موجود نیست</p>
            )}
        </div>
    );
};

export default MenuCategoryTable;
