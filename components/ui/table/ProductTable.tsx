"use client";

import Link from "next/link";
import { Product } from "@/types/panel";
import { formatDate } from "@/lib/utils";
import { Badge, Table, TableColumn } from "..";
import { deleteProduct } from "@/actions/v1";
import { BinIcon, EditIcon } from "@/components/icons";

interface ProductTableProps {
    error?: string;
    products?: Product[];
    showCategoryName?: boolean;
}

const ProductTable = (props: ProductTableProps) => {
    const handleDelete = async (slug: string) => {
        const canDelete = window.confirm(
            "آیا مطمئن هستید که میخواهید این دسته را حذف کنید؟"
        );
        if (!canDelete) return;

        try {
            const result = await deleteProduct(slug);
            if (result.error) {
                window.alert(`خطا در حذف دسته: ${result.error}`);
                return;
            }
        } catch (error) {
            window.alert("Error deleting campaign");
        }
    };

    const columns: TableColumn<Product>[] = [
        {
            header: "عملیات",
            accessor: "actions",
            customRender: (product: Product) => (
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
            sortable: true,
            accessor: "updatedAt",
            header: "به‌روزرسانی",
            customRender: (product: Product) => (
                <p className="text-center ss02">
                    {formatDate(product.updatedAt, true)}
                </p>
            ),
        },
        {
            sortable: true,
            header: "ایجاد",
            accessor: "createdAt",
            customRender: (product: Product) => (
                <p className="text-center ss02">
                    {formatDate(product.createdAt, true)}
                </p>
            ),
        },
        {
            header: "قیمت",
            accessor: "price",
            customRender: (product: Product) => (
                <p className="text-center">{product.price || 0}</p>
            ),
        },
        {
            header: "وضعیت",
            accessor: "isActive",
            customRender: (product: Product) => (
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
            sortable: true,
            header: "شناسه",
            accessor: "slug",
            customRender: (product: Product) => (
                <p className="text-center">{product.slug}</p>
            ),
        },
        {
            header: "نام",
            sortable: true,
            accessor: "name",
            customRender: (product: Product) => (
                <p className="text-center">{product.name}</p>
            ),
        },
    ];

    if (props.showCategoryName) {
        columns.push({
            header: "دسته",
            sortable: true,
            accessor: "categoryName",
            customRender: (product: Product) => (
                <p className="text-center">{product.categoryName}</p>
            ),
        });
    }

    return (
        <Table
            sortable
            filterable
            pageSize={10}
            columns={columns}
            data={props.products || []}
            noDataMessage={props.error || "اطلاعاتی وجود ندارد"}
        />
    );
};

export default ProductTable;
