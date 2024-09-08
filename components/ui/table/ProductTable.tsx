"use client";

import Link from "next/link";
import { Badge, Table } from "..";
import { formatDate } from "@/lib/utils";
import { PanelProduct } from "@/types/panel";
import { deleteProductBySlug } from "@/actions";
import { BinIcon, EditIcon } from "@/components/icons";

interface ProductTableProps {
    error?: string;
    products?: PanelProduct[];
    showCategoryName?: boolean;
}

const ProductTable = (props: ProductTableProps) => {
    const handleDelete = async (slug: string) => {
        const canDelete = window.confirm(
            "آیا مطمئن هستید که میخواهید این دسته را حذف کنید؟"
        );
        if (!canDelete) return;

        try {
            const result = await deleteProductBySlug(slug);
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
            accessor: (product: PanelProduct) => (
                <div className="flex items-center justify-center gap-4 transition-all">
                    <Link
                        href={`/vand-panel/products/${product.slug}`}
                        className="text-blue-600 hover:text-blue-700">
                        <EditIcon />
                    </Link>
                    <button
                        onClick={() => handleDelete(product.slug)}
                        className="text-red-500 hover:text-red-600">
                        <BinIcon />
                    </button>
                </div>
            ),
        },
        {
            header: "تاریخ  به‌روزرسانی",
            accessor: (product: PanelProduct) => (
                <p className="text-center ss02">
                    {formatDate(product.updatedAt, true)}
                </p>
            ),
        },
        {
            header: "تاریخ ایجاد",
            accessor: (product: PanelProduct) => (
                <p className="text-center ss02">
                    {formatDate(product.createdAt, true)}
                </p>
            ),
        },
        {
            header: "وضعیت",
            accessor: (product: PanelProduct) => (
                <div className="flex items-center justify-center">
                    {product.isActive ? (
                        <Badge status="active" />
                    ) : (
                        <Badge status="inactive" />
                    )}
                </div>
            ),
        },
        {
            header: "شناسه",
            accessor: (product: PanelProduct) => (
                <p className="text-center">{product.slug}</p>
            ),
        },
        {
            header: "نام محصول",
            accessor: (product: PanelProduct) => (
                <p className="text-center">{product.name}</p>
            ),
        },
    ];

    if (props.showCategoryName) {
        columns.push({
            header: "نام دسته",
            accessor: (product: PanelProduct) => (
                <p className="text-center">{product.categoryName}</p>
            ),
        });
    }

    return (
        <Table
            columns={columns}
            data={props.products}
            noDataMessage={props.error || "اطلاعاتی وجود ندارد"}
        />
    );
};

export default ProductTable;
