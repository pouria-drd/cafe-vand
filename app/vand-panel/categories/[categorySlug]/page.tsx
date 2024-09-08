import { getCategoryBySlug } from "@/actions";
import { ProductTable } from "@/components/ui";
import { CategoryForm, ProductForm } from "@/components/form";

async function CategoryDetailPage({
    params,
}: {
    params: { categorySlug: string };
}) {
    // Fetch category from the server
    const result = await getCategoryBySlug(params.categorySlug);

    if (result.error) {
        return <p className="text-red-500 text-center r2l">{result.error}</p>;
    }

    if (!result.data) {
        return <p className="text-red-500 text-center r2l">دسته یافت نشد!</p>;
    }

    return (
        <section className="flex flex-col gap-8">
            <ProductTable
                products={result.data.products}
                error={result?.error}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <CategoryForm
                    type="update"
                    categorySlug={params.categorySlug}
                    initialData={result.data}
                />

                <ProductForm type="create" category={result.data} />
            </div>
        </section>
    );
}

export default CategoryDetailPage;
