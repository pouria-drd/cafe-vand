"use client";

import { Button } from "@/components/ui";
import { Fragment, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CategoryForm } from "@/components/forms/v1/menu";

const CategoryUI = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Fragment>
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 w-full">
                <Button
                    className="w-full sm:w-auto"
                    onClick={() => setIsOpen(true)}>
                    دسته بندی جدید
                </Button>
                <h1 className="text-xl sm:text-2xl text-right">
                    آخرین دسته بندی ها
                </h1>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <CategoryForm
                        type="modal"
                        onClose={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </Fragment>
    );
};

export default CategoryUI;
