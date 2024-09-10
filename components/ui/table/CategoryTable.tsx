"use client";

import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Fragment, useState } from "react";
import { PanelCategory } from "@/types/panel";
import { AnimatePresence } from "framer-motion";
import { deleteCategoryBySlug } from "@/actions";
import { BinIcon, EditIcon, EyeIcon } from "@/components/icons";
import { Badge, CategoryModalForm, Table, TableColumn } from "..";

interface CategoryTableProps {
    error?: string;
    categories?: PanelCategory[];
}

const CategoryTable = (props: CategoryTableProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] =
        useState<PanelCategory | null>(null);

    const handleEdit = (category: PanelCategory) => {
        setIsOpen(true);
        setSelectedCategory(category);
    };

    const handleDelete = async (slug: string) => {
        const canDelete = window.confirm(
            "آیا مطمئن هستید که میخواهید این دسته را حذف کنید؟"
        );
        if (!canDelete) return;

        try {
            const result = await deleteCategoryBySlug(slug);
            if (result.error) {
                window.alert(`خطا در حذف دسته: ${result.error}`);
                return;
            }
        } catch (error) {
            window.alert("Error deleting campaign");
        }
    };

    const columns: TableColumn<PanelCategory>[] = [
        {
            header: "عملیات",
            accessor: "actions",
            customRender: (category: PanelCategory) => (
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
                        href={`/vand-panel/categories/${category.slug}`}
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
            customRender: (category: PanelCategory) => (
                <p className="text-center ss02">
                    {formatDate(category.updatedAt, true)}
                </p>
            ),
        },
        {
            sortable: true,
            header: "ایجاد",
            accessor: "createdAt",
            customRender: (category: PanelCategory) => (
                <p className="text-center ss02">
                    {formatDate(category.createdAt, true)}
                </p>
            ),
        },
        {
            header: "وضعیت",
            accessor: "isActive",
            customRender: (category: PanelCategory) => (
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
            customRender: (category: PanelCategory) => (
                <p className="text-center">{category.slug}</p>
            ),
        },
        {
            header: "نام",
            sortable: true,
            accessor: "name",
            customRender: (category: PanelCategory) => (
                <p className="text-center">{category.name}</p>
            ),
        },
        {
            header: "تصویر",
            accessor: "icon",
            customRender: (category: PanelCategory) =>
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
                    <CategoryModalForm
                        type="update"
                        isOpen={isOpen}
                        categoryData={selectedCategory}
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
