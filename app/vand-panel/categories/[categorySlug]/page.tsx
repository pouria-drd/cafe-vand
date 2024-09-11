import { getCategory } from "@/actions/v1";
import { ProductTable } from "@/components/ui";
import CategoryDetailUI from "./CategoryDetailUI";

async function CategoryDetailPage({
    params,
}: {
    params: { categorySlug: string };
}) {
    // Fetch category from the server
    const result = await getCategory(
        params.categorySlug /*{
        cache: "force-cache",
    }*/
    );

    if (result.error) {
        return <p className="text-red-500 text-center r2l">{result.error}</p>;
    }

    if (!result.data) {
        return (
            <p className="text-red-500 text-center r2l">دسته بندی یافت نشد!</p>
        );
    }

    return (
        <section className="bg-white flex flex-col gap-8 rounded p-4">
            <CategoryDetailUI apiResult={result} />
            <ProductTable
                category={result.data}
                products={result.data.products}
                error={result?.error}
            />
        </section>
    );
}

export default CategoryDetailPage;
