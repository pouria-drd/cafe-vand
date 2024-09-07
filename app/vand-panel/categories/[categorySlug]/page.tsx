import { getCategoryBySlug } from "@/actions";
import { CategoryForm } from "@/components/form";

async function CategoryDetailPage({
    params,
}: {
    params: { categorySlug: string };
}) {
    // Fetch category from the server
    const result = await getCategoryBySlug(params.categorySlug);

    return (
        <section className="flex flex-col gap-8">
            {result.error && (
                <p className="text-red-500 text-center r2l">{result.error}</p>
            )}
            {result.data && (
                <CategoryForm
                    type="update"
                    categorySlug={params.categorySlug}
                    initialData={result.data}
                />
            )}
        </section>
    );
}

export default CategoryDetailPage;
