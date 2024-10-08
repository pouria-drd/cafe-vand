import { redirect } from "next/navigation";
import { ProductTable } from "@/components/ui";
import CategoryDetailUI from "./CategoryDetailUI";
import { getCategoryAction } from "@/actions/v1/menu/category";

async function CategoryDetailPage({ params }: { params: { slug: string } }) {
    // Fetch category from the server
    const result = await getCategoryAction(params.slug, false);

    if (!result || result.error === "invalid-credentials") {
        redirect("/unauthorized");
    }

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
            <CategoryDetailUI category={result.data} />
            <ProductTable
                category={result.data}
                products={result.data.products}
                error={result?.error}
            />
        </section>
    );
}

export default CategoryDetailPage;
