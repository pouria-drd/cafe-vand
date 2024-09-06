"use client";

import Link from "next/link";
import { Badge, Table } from "..";
import { formatDate } from "@/lib/utils";
import { PanelCategory } from "@/types/panel";
import { BinIcon, EditIcon } from "@/components/icons";
import { deleteCategoryBySlug } from "@/actions";

interface CategoryTableProps {
    error?: string;
    categories?: PanelCategory[];
}

const CategoryTable = (props: CategoryTableProps) => {
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

    const columns = [
        {
            header: "عملیات",
            accessor: (category: PanelCategory) => (
                <div className="flex items-center justify-center gap-3 transition-all">
                    <Link
                        href={`/vand-panel/categories/${category.slug}`}
                        className="text-blue-600 hover:text-blue-700">
                        <EditIcon />
                    </Link>
                    <button
                        onClick={() => handleDelete(category.slug)}
                        className="text-red-500 hover:text-red-600">
                        <BinIcon />
                    </button>
                </div>
            ),
        },
        {
            header: "تاریخ  به‌روزرسانی",
            accessor: (category: PanelCategory) => (
                <p className="text-center ss02">
                    {formatDate(category.updatedAt, true)}
                </p>
            ),
        },
        {
            header: "تاریخ ایجاد",
            accessor: (category: PanelCategory) => (
                <p className="text-center ss02">
                    {formatDate(category.createdAt, true)}
                </p>
            ),
        },
        {
            header: "وضعیت",
            accessor: (category: PanelCategory) => (
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
            header: "شناسه",
            accessor: (category: PanelCategory) => (
                <p className="text-center">{category.slug}</p>
            ),
        },
        {
            header: "نام دسته",
            accessor: (category: PanelCategory) => (
                <p className="text-center">{category.name}</p>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            data={props.categories}
            noDataMessage={props.error || "اطلاعاتی وجود ندارد"}
        />
    );
};

export default CategoryTable;