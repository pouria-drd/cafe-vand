import { PriceTable } from "@/components/ui";
import { ProductForm } from "@/components/form";
import { getProductBySlug, getPanelCategories } from "@/actions";

async function ProductDetailPage({
    params: { productSlug },
}: {
    params: { productSlug: string };
}) {
    // Fetch product and categories from the server
    const categories = await getPanelCategories();
    const product = await getProductBySlug(productSlug);

    if (product.error) {
        return <p className="text-red-500 text-center r2l">{product.error}</p>;
    }

    if (!product.data) {
        return <p className="text-red-500 text-center r2l">محصول یافت نشد!</p>;
    }

    return (
        <section className="flex flex-col gap-8">
            <PriceTable prices={product.data.prices} error={product?.error} />
            {categories.data ? (
                <ProductForm
                    type="update"
                    initialData={product.data}
                    productSlug={productSlug}
                    category={categories.data}
                />
            ) : (
                <p className="text-red-500 text-center r2l">
                    خطایی در دریافت دسته ها رخ داده است!
                </p>
            )}
        </section>
    );
}

export default ProductDetailPage;
