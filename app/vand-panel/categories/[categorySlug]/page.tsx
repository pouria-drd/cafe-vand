import { getCategoryBySlug } from "@/actions";
import { ProductTable } from "@/components/ui";
import { ProductForm } from "@/components/form";

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
        return (
            <p className="text-red-500 text-center r2l">دسته بندی یافت نشد!</p>
        );
    }

    return (
        <section className="flex flex-col gap-8">
            <ProductTable
                products={result.data.products}
                error={result?.error}
            />

            <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-8">
                <ProductForm type="create" category={result.data} />
            </div>
        </section>
    );
}

export default CategoryDetailPage;
