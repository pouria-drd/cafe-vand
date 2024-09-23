import { Message } from "../../ui";
import { ProductCard, ProductList } from ".";

interface ProductsProps {
    products?: Product[];
}

const Products = (props: ProductsProps) => {
    if (!props.products)
        return (
            <div className="bg-black/25 flex-1 flex items-center h-full">
                <Message status="warning">یک مورد را انتخاب کنید</Message>
            </div>
        );

    if (props.products.length === 0)
        return (
            <div className="bg-black/25 flex-1 flex items-center">
                <Message status="warning">موردی برای نمایش وجود ندارد</Message>
            </div>
        );

    return (
        <div className="flex-1 bg-black/25 overflow-auto px-4">
            <ProductList
                products={props.products}
                renderItem={(product, index) => (
                    <ProductCard key={index} product={product} />
                )}
            />
        </div>
    );
};

export default Products;
