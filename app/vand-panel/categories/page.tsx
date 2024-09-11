import CategoryUI from "./CategoryUI";
import { getCategoryList } from "@/actions/v1";
import { CategoryTable } from "@/components/ui";

async function CategoriesPage() {
    // Fetch categories from the server
    const result = await getCategoryList({ cache: "force-cache" });

    return (
        <section className="bg-white flex flex-col gap-8 rounded p-4">
            <CategoryUI />

            <CategoryTable categories={result?.data} error={result?.error} />
        </section>
    );
}

export default CategoriesPage;
