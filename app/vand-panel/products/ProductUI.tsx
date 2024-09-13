"use client";

import { Button } from "@/components/ui";
import { Fragment, useState } from "react";
import { ProductForm } from "@/components/form";
import { AnimatePresence } from "framer-motion";
import { RetrieveCategoryListResult } from "@/types/panel";

interface ProductUIProps {
    apiResult: RetrieveCategoryListResult;
}

const ProductUI = (props: ProductUIProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Fragment>
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 w-full">
                <Button
                    className="w-full sm:w-auto"
                    onClick={() => setIsOpen(true)}>
                    {props.apiResult.data
                        ? "محصول جدید"
                        : "خطایی در دریافت دسته ها رخ داده است!"}
                </Button>
                <h1 className="text-xl sm:text-2xl text-right">
                    آخرین محصولات
                </h1>
            </div>
            <AnimatePresence>
                {isOpen && props.apiResult && props.apiResult.data && (
                    <ProductForm
                        type="modal"
                        category={props.apiResult.data}
                        onClose={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </Fragment>
    );
};

export default ProductUI;
