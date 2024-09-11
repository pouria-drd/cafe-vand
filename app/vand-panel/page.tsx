"use client";

import { Button } from "@/components/ui";
import { Category } from "@/types/panel";
import { useEffect, useState } from "react";
import { getCategoryList } from "@/actions/v1";
import { CategoryForm, ProductForm } from "@/components/form";

function VandPanel() {
    const [error, setError] = useState<string>();
    const [categories, setCategories] = useState<Category[]>([]);

    const [isProductModalOpen, setIsProductModalOpen] =
        useState<boolean>(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] =
        useState<boolean>(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await getCategoryList();
            if (result.data) {
                setCategories(result.data);
            } else {
                setError(result.error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <section>
            <div className="bg-white flex flex-col gap-8 rounded w-full p-4">
                <h1 className="text-xl sm:text-2xl text-right">دسترسی سریع</h1>
                {error && (
                    <p className="text-center text-red-500 text-xs r2l">
                        {error}
                    </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Button onClick={() => setIsProductModalOpen(true)}>
                        محصول جدید
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => setIsCategoryModalOpen(true)}>
                        دسته بندی جدید
                    </Button>
                </div>
            </div>

            <ProductForm
                type="modal"
                category={categories}
                isOpen={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
            />

            <CategoryForm
                type="modal"
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
            />
        </section>
    );
}

export default VandPanel;
