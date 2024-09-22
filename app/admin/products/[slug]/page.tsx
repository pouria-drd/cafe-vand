import { PriceTable } from "@/components/ui";
import ProductDetailUI from "./ProductDetailUI";
import { getProductAction } from "@/actions/v1/menu/product";

async function ProductDetailPage({
    params: { slug },
}: {
    params: { slug: string };
}) {
    const product = await getProductAction(slug, false);

    if (product.error) {
        return <p className="text-red-500 text-center r2l">{product.error}</p>;
    }

    if (!product.data) {
        return <p className="text-red-500 text-center r2l">محصول یافت نشد!</p>;
    }

    return (
        <section className="bg-white flex flex-col gap-8 rounded p-4">
            <ProductDetailUI product={product.data} />
            <PriceTable prices={product.data.prices} error={product?.error} />
        </section>
    );
}

export default ProductDetailPage;
