"use client";

import Link from "next/link";
import { formatDate } from "@/utils/base";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge, Table, TableColumn } from "..";
import { AnimatePresence } from "framer-motion";
import { CategoryForm } from "@/components/forms/v1/menu";
import { deleteCategoryAction } from "@/actions/v1/menu/category";
import { BinIcon, EditIcon, EyeIcon } from "@/components/icons";

interface CategoryTableProps {
    error?: string;
    categories?: Category[];
}

const CategoryTable = (props: CategoryTableProps) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null
    );

    const handleEdit = (category: Category) => {
        setIsOpen(true);
        setSelectedCategory(category);
    };

    const handleDelete = async (slug: string) => {
        const canDelete = window.confirm(
            "آیا مطمئن هستید که میخواهید این دسته را حذف کنید؟"
        );
        if (!canDelete) return;

        try {
            const result = await deleteCategoryAction(slug);
            if (!result || result.error === "invalid-credentials") {
                router.push("/unauthorized");
                return;
            }

            if (result.error) {
                console.log(result.error);
                window.alert(`خطا در حذف دسته: ${result.error}`);
                return;
            }
        } catch (error) {
            window.alert("Error deleting campaign");
        }
    };

    const columns: TableColumn<Category>[] = [
        {
            header: "عملیات",
            accessor: "actions",
            customRender: (category: Category) => (
                <div className="flex items-center justify-center gap-4 transition-all">
                    <button
                        onClick={() => handleDelete(category.slug)}
                        className="text-red-500 hover:text-red-600">
                        <BinIcon />
                    </button>
                    <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:text-blue-700">
                        <EditIcon />
                    </button>
                    <Link
                        href={`/admin/categories/${category.slug}`}
                        className="text-green-600 hover:text-green-700">
                        <EyeIcon />
                    </Link>
                </div>
            ),
        },
        {
            sortable: true,
            header: "به‌روزرسانی",
            accessor: "updatedAt",
            customRender: (category: Category) => (
                <p className="text-center ss02">
                    {formatDate(category.updatedAt, { isPersian: true })}
                </p>
            ),
        },
        {
            sortable: true,
            header: "ایجاد",
            accessor: "createdAt",
            customRender: (category: Category) => (
                <p className="text-center ss02">
                    {formatDate(category.createdAt, { isPersian: true })}
                </p>
            ),
        },
        {
            header: "وضعیت",
            accessor: "isActive",
            customRender: (category: Category) => (
                <div className="flex items-center justify-center">
                    {category.isActive ? (
                        <Badge status="active" />
                    ) : (
                        <Badge status="inactive" />
                    )}
                </div>
            ),
        },
        {
            sortable: true,
            header: "شناسه",
            accessor: "slug",
            customRender: (category: Category) => (
                <p className="text-center">{category.slug}</p>
            ),
        },
        {
            header: "نام",
            sortable: true,
            accessor: "name",
            customRender: (category: Category) => (
                <p className="text-center">{category.name}</p>
            ),
        },
        {
            header: "تصویر",
            accessor: "icon",
            customRender: (category: Category) =>
                category.icon ? (
                    <img
                        className="min-w-8 sm:min-w-10 w-8 sm:w-10 mx-auto"
                        src={category.icon}
                        alt={`تصویر دسته ${category.name}`}
                    />
                ) : (
                    <p className="text-center">-</p>
                ),
        },
    ];
    return (
        <Fragment>
            <Table
                columns={columns}
                data={props.categories || []} // Pass the data to the table
                filterable // Enable search filter
                sortable // Enable column sorting
                pageSize={5} // Example page size for pagination
                noDataMessage="اطلاعاتی وجود ندارد" // Customize the no data message
            />
            <AnimatePresence>
                {isOpen && selectedCategory && (
                    <CategoryForm
                        type="modal"
                        initialData={selectedCategory}
                        onClose={() => {
                            setIsOpen(false);
                            setSelectedCategory(null);
                        }}
                    />
                )}
            </AnimatePresence>
        </Fragment>
    );
};

export default CategoryTable;
