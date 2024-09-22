"use client";

import { Button } from "@/components/ui";
import { Fragment, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ProductForm } from "@/components/forms/v1/menu";

interface CategoryDetailUIProps {
    category: Category;
}

const CategoryDetailUI = (props: CategoryDetailUIProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Fragment>
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 w-full">
                <Button
                    className="w-full sm:w-auto"
                    onClick={() => setIsOpen(true)}>
                    محصول جدید
                </Button>
                {props.category && (
                    <h1 className="text-xl sm:text-2xl text-right r2l">
                        آخرین محصولات {props.category.name}
                    </h1>
                )}
            </div>
            <AnimatePresence>
                {isOpen && props.category && (
                    <ProductForm
                        type="modal"
                        category={props.category}
                        onClose={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </Fragment>
    );
};

export default CategoryDetailUI;
