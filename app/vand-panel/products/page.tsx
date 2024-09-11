import { ProductTable } from "@/components/ui";
import { ProductForm } from "@/components/form";
import { getCategoryList, getProductList } from "@/actions/v1";

async function ProductsPage() {
    // Fetch products and categories from the server
    const products = await getProductList();
    const categories = await getCategoryList();

    return (
        <section className="flex flex-col gap-8">
            <ProductTable
                products={products?.data}
                error={products?.error}
                showCategoryName
            />
            {categories.data ? (
                <ProductForm type="create" category={categories.data} />
            ) : (
                <p className="text-red-500 text-center r2l">
                    خطایی در دریافت دسته ها رخ داده است!
                </p>
            )}
        </section>
    );
}

export default ProductsPage;
