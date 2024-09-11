import { Product } from "@/types/panel";

interface ProductDetailUIProps {
    product: Product;
}

const ProductDetailUI = (props: ProductDetailUIProps) => {
    return (
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 w-full">
            <h1 className="text-xl sm:text-2xl text-right r2l w-full">
                آخرین قیمت های {props.product.name}
            </h1>
        </div>
    );
};

export default ProductDetailUI;
