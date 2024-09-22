import ProductUI from "./ProductUI";
import { ProductTable } from "@/components/ui";
import { getProductListAction } from "@/actions/v1/menu/product";
import { getCategoryListAction } from "@/actions/v1/menu/category";

export default async function ProductsPage() {
    // Fetch products and categories from the server
    const products = await getProductListAction();
    const categories = await getCategoryListAction();

    return (
        <div className="bg-white flex flex-col gap-8 rounded p-4">
            <ProductUI categories={categories.data} />

            <ProductTable
                showCategoryName
                error={products?.error}
                products={products?.data}
                category={categories.data}
            />
        </div>
    );
}
