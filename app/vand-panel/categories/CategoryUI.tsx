"use client";

import { Fragment, useState } from "react";
import { Button, CategoryModalForm } from "@/components/ui";

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

            <CategoryModalForm
                type="create"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </Fragment>
    );
};

export default CategoryUI;
