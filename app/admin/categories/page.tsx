import CategoryUI from "./CategoryUI";
import { CategoryTable } from "@/components/ui";
import { getCategoryListAction } from "@/actions/v1/menu/category";

async function CategoriesPage() {
    // Fetch categories from the server
    const result = await getCategoryListAction();

    return (
        <div className="bg-white flex flex-col gap-8 rounded p-4">
            <CategoryUI />

            <CategoryTable categories={result?.data} error={result?.error} />
        </div>
    );
}

export default CategoriesPage;
