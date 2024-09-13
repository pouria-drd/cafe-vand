import ProductUI from "./ProductUI";
import { ProductTable } from "@/components/ui";
import { getCategoryList, getProductList } from "@/actions/v1";

export default async function ProductsPage() {
    // Fetch products and categories from the server
    const products = await getProductList({ cache: "force-cache" });
    const categories = await getCategoryList({ cache: "force-cache" });

    return (
        <div className="bg-white flex flex-col gap-8 rounded p-4">
            <ProductUI apiResult={categories} />

            <ProductTable
                showCategoryName
                error={products?.error}
                products={products?.data}
                category={categories.data}
            />
        </div>
    );
}
