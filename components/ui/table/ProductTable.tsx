"use client";

import Link from "next/link";
import { Category, Product } from "@/types/panel";
import { formatDate } from "@/lib/utils";
import { deleteProduct } from "@/actions/v1";
import { Badge, Table, TableColumn } from "..";
import { BinIcon, EditIcon, EyeIcon } from "@/components/icons";
import { Fragment, useState } from "react";
import { ProductForm } from "@/components/form";
import { AnimatePresence } from "framer-motion";

interface ProductTableProps {
    error?: string;
    products?: Product[];
    showCategoryName?: boolean;
    category?: Category | Category[];
}

const ProductTable = (props: ProductTableProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );

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

    const handleEdit = (product: Product) => {
        setIsOpen(true);
        setSelectedProduct(product);
    };

    const columns: TableColumn<Product>[] = [
        {
            header: "عملیات",
            accessor: "actions",
            customRender: (product: Product) => (
                <div className="flex items-center justify-center gap-4 transition-all">
                    <button
                        onClick={() => handleDelete(product.slug)}
                        className="text-red-500 hover:text-red-600">
                        <BinIcon />
                    </button>
                    <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-700">
                        <EditIcon />
                    </button>
                    <Link
                        href={`/vand-panel/products/${product.slug}`}
                        className="text-green-600 hover:text-green-700">
                        <EyeIcon />
                    </Link>
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
        <Fragment>
            <Table
                sortable
                filterable
                pageSize={10}
                columns={columns}
                data={props.products || []}
                noDataMessage={props.error || "اطلاعاتی وجود ندارد"}
            />
            <AnimatePresence>
                {isOpen && selectedProduct && props.category && (
                    <ProductForm
                        type="modal"
                        isOpen={isOpen}
                        category={props.category}
                        initialData={selectedProduct}
                        onClose={() => {
                            setIsOpen(false);
                            setSelectedProduct(null);
                        }}
                    />
                )}
            </AnimatePresence>
        </Fragment>
    );
};

export default ProductTable;
