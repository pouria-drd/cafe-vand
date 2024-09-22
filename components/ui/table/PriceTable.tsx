"use client";

import { Table, TableColumn } from "..";
import { formatDate } from "@/utils/base";
import { useRouter } from "next/navigation";
import { BinIcon } from "@/components/icons";
import { deletePriceAction } from "@/actions/v1/menu/price";

interface PriceTableProps {
    error?: string;
    prices?: Price[];
}

const PriceTable = (props: PriceTableProps) => {
    const router = useRouter();
    const handleDelete = async (id: string) => {
        const canDelete = window.confirm(
            "آیا مطمئن هستید که میخواهید این قیمت را حذف کنید؟"
        );
        if (!canDelete) return;

        try {
            const result = await deletePriceAction(id);

            if (!result || result.error === "invalid-credentials") {
                router.push("/unauthorized");
                return;
            }

            if (result.error) {
                window.alert(`خطا در حذف دسته: ${result.error}`);
                return;
            }
        } catch (error) {
            window.alert("Error deleting campaign");
        }
    };

    const columns: TableColumn<Price>[] = [
        {
            header: "عملیات",
            accessor: "actions",
            customRender: (price: Price) => (
                <div className="flex items-center justify-center gap-4 transition-all">
                    <button
                        onClick={() => handleDelete(price.id)}
                        className="text-red-500 hover:text-red-600">
                        <BinIcon />
                    </button>
                </div>
            ),
        },
        {
            header: "ایجاد",
            accessor: "createdAt",
            customRender: (price: Price) => (
                <p className="text-center">
                    {formatDate(price.createdAt, { isPersian: true })}
                </p>
            ),
            sortable: true,
        },
        {
            header: "قیمت",
            accessor: "amount",
            customRender: (price: Price) => (
                <p className="text-center">{price.amount}</p>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            data={props.prices || []}
            noDataMessage={props.error || "اطلاعاتی وجود ندارد"}
        />
    );
};

export default PriceTable;
