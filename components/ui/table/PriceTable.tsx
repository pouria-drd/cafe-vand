"use client";

import { Table } from "..";
import { formatDate } from "@/lib/utils";
import { PanelPrice } from "@/types/panel";
import { deletePriceById } from "@/actions";
import { BinIcon } from "@/components/icons";

interface PriceTableProps {
    error?: string;
    prices?: PanelPrice[];
}

const PriceTable = (props: PriceTableProps) => {
    const handleDelete = async (id: string) => {
        const canDelete = window.confirm(
            "آیا مطمئن هستید که میخواهید این قیمت را حذف کنید؟"
        );
        if (!canDelete) return;

        try {
            const result = await deletePriceById(id);
            if (result.error) {
                window.alert(`خطا در حذف قیمت: ${result.error}`);
                return;
            }
        } catch (error) {
            window.alert("Error deleting campaign");
        }
    };

    const columns = [
        {
            header: "عملیات",
            accessor: (price: PanelPrice) => (
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
            header: "تاریخ ایجاد",
            accessor: (price: PanelPrice) => (
                <p className="text-center ss02">
                    {formatDate(price.createdAt, true)}
                </p>
            ),
        },
        {
            header: "قیمت",
            accessor: (price: PanelPrice) => (
                <p className="text-center">{price.amount}</p>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            data={props.prices}
            noDataMessage={props.error || "اطلاعاتی وجود ندارد"}
        />
    );
};

export default PriceTable;
