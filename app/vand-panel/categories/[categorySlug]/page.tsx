import { getCategoryBySlug } from "@/actions";
import { ProductTable } from "@/components/ui";
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
                <>
                    <ProductTable
                        products={result?.data.products}
                        error={result?.error}
                    />

                    <CategoryForm
                        type="update"
                        categorySlug={params.categorySlug}
                        initialData={result.data}
                    />
                </>
            )}
        </section>
    );
}

export default CategoryDetailPage;
