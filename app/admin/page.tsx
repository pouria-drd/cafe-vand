"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QuickAccess } from "@/components/ui";
import { AnimatePresence } from "framer-motion";
import { getCategoryListAction } from "@/actions/v1/menu/category";
import { AddIcon, EyeIcon, UserPlusIcon } from "@/components/icons";
import { CategoryForm, ProductForm } from "@/components/forms/v1/menu";

function AdminPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);

    const [isProductModalOpen, setIsProductModalOpen] =
        useState<boolean>(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] =
        useState<boolean>(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await getCategoryListAction();
            if (result.data) {
                setCategories(result.data);
            } else if (result.error === "invalid-credentials") {
                router.push("/unauthorized");
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="bg-white flex flex-col gap-8 rounded w-full p-4">
            <h1 className="text-xl sm:text-2xl text-right">دسترسی سریع</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-fr">
                <QuickAccess
                    variant="orange"
                    onClick={() => setIsProductModalOpen(true)}>
                    <AddIcon />
                    آیتم جدید
                </QuickAccess>
                <QuickAccess
                    variant="blue"
                    onClick={() => setIsCategoryModalOpen(true)}>
                    <AddIcon />
                    دسته بندی جدید
                </QuickAccess>

                <QuickAccess variant="green" href="/menu">
                    <EyeIcon />
                    مشاهده منو
                </QuickAccess>
                <QuickAccess variant="purple" disabled>
                    <UserPlusIcon />
                    کاربر جدید
                </QuickAccess>
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

export default AdminPage;
