"use client";

import { Category } from "@/types/panel";
import { useEffect, useState } from "react";
import { getCategoryList } from "@/actions/v1";
import { AnimatePresence } from "framer-motion";
import { Button, Message } from "@/components/ui";
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
            const result = await getCategoryList({ cache: "force-cache" });
            if (result.data) {
                setCategories(result.data);
            } else {
                setError(result.error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div>
            <div className="bg-white flex flex-col gap-8 rounded w-full p-4">
                <h1 className="text-xl sm:text-2xl text-right">دسترسی سریع</h1>
                {error && <Message className="text-center">{error}</Message>}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <Button as="link" href="/">
                        منو
                    </Button>
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

            <AnimatePresence>
                {isProductModalOpen && (
                    <ProductForm
                        type="modal"
                        category={categories}
                        onClose={() => setIsProductModalOpen(false)}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isCategoryModalOpen && (
                    <CategoryForm
                        type="modal"
                        onClose={() => setIsCategoryModalOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default VandPanel;
