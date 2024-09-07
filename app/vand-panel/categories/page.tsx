import { getPanelCategories } from "@/actions";
import { CategoryTable } from "@/components/ui";
import { CategoryForm } from "@/components/form";

async function CategoriesPage() {
    // Fetch categories from the server
    const result = await getPanelCategories();

    return (
        <section className="flex flex-col gap-8">
            <CategoryTable categories={result?.data} error={result?.error} />
            <CategoryForm type="create" />
        </section>
    );
}

export default CategoriesPage;
