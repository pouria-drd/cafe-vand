import CategoryUI from "./CategoryUI";
import { getPanelCategories } from "@/actions";
import { CategoryTable } from "@/components/ui";

async function CategoriesPage() {
    // Fetch categories from the server
    const result = await getPanelCategories();

    return (
        <section className="bg-white flex flex-col gap-8 rounded p-4">
            <CategoryUI />

            <CategoryTable categories={result?.data} error={result?.error} />
        </section>
    );
}

export default CategoriesPage;
