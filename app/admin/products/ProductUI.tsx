"use client";

import { Button } from "@/components/ui";
import { Fragment, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ProductForm } from "@/components/forms/v1/menu";

interface ProductUIProps {
    categories?: Category[];
}

const ProductUI = (props: ProductUIProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Fragment>
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 w-full">
                <Button
                    className="w-full sm:w-auto"
                    onClick={() => setIsOpen(true)}>
                    {props.categories
                        ? "محصول جدید"
                        : "خطایی در دریافت دسته ها رخ داده است!"}
                </Button>
                <h1 className="text-xl sm:text-2xl text-right">
                    آخرین محصولات
                </h1>
            </div>
            <AnimatePresence>
                {isOpen && props.categories && (
                    <ProductForm
                        type="modal"
                        category={props.categories}
                        onClose={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </Fragment>
    );
};

export default ProductUI;
