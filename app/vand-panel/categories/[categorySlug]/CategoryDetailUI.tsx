"use client";

import { Button } from "@/components/ui";
import { Fragment, useState } from "react";
import { ProductForm } from "@/components/form";
import { RetrieveCategoryResult } from "@/types/panel";

interface CategoryDetailUIProps {
    apiResult: RetrieveCategoryResult;
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
                <h1 className="text-xl sm:text-2xl text-right">
                    آخرین محصولات این دسته
                </h1>
            </div>

            {props.apiResult && props.apiResult.data && (
                <ProductForm
                    type="modal"
                    isOpen={isOpen}
                    category={props.apiResult.data}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </Fragment>
    );
};

export default CategoryDetailUI;
