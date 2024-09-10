"use client";

import { Button, Input } from "..";
import React, { useState } from "react";
import { SearchIcon } from "@/components/icons";

type SortOrder = "asc" | "desc";

interface Column<T> {
    header: string;
    accessor: keyof T | string;
    sortable?: boolean;
    customRender?: (data: T) => React.ReactNode;
}

interface Props<T> {
    data: T[];
    columns: Column<T>[];
    pageSize?: number;
    filterable?: boolean;
    sortable?: boolean;
}

const Table = <T extends object>(props: Props<T>) => {
    const [filter, setFilter] = useState("");
    const { pageSize = props.pageSize || 5 } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
    const [sortColumn, setSortColumn] = useState<keyof T | string | null>(null);

    const filteredData = filter
        ? props.data.filter((item) =>
              Object.values(item).some((value) =>
                  String(value).toLowerCase().includes(filter.toLowerCase())
              )
          )
        : props.data;

    const sortedData = sortColumn
        ? [...filteredData].sort((a, b) => {
              const aValue = a[sortColumn as keyof T];
              const bValue = b[sortColumn as keyof T];
              if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
              if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
              return 0;
          })
        : filteredData;

    const paginatedData = sortedData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleSort = (column: keyof T | string) => {
        if (sortColumn === column) {
            setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const renderHeader = () => {
        return (
            <tr>
                {props.columns.map((column) => (
                    <th
                        className={`text-gray-600 text-center text-xs sm:text-sm
                        font-bold uppercase tracking-wider ${
                            column.sortable ? "cursor-pointer" : ""
                        } px-6 py-4 `}
                        key={String(column.accessor)}
                        onClick={() =>
                            props.sortable && column.sortable
                                ? handleSort(column.accessor)
                                : null
                        }
                        style={{
                            cursor:
                                props.sortable && column.sortable
                                    ? "pointer"
                                    : "default",
                        }}>
                        {column.header}
                        {props.sortable &&
                            column.sortable &&
                            sortColumn === column.accessor && (
                                <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                            )}
                    </th>
                ))}
            </tr>
        );
    };

    const renderBody = () => {
        return paginatedData.map((row, rowIndex) => (
            <tr className="odd:bg-white even:bg-gray-50" key={rowIndex}>
                {props.columns.map((column) => (
                    <td
                        key={String(column.accessor)}
                        className="text-gray-600 text-xs sm:text-sm font-medium 
                        whitespace-nowrap truncate max-w-44 p-4">
                        {column.customRender
                            ? column.customRender(row)
                            : (row[
                                  column.accessor as keyof T
                              ] as React.ReactNode)}
                    </td>
                ))}
            </tr>
        ));
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(sortedData.length / pageSize);

        return (
            <div className="flex items-center justify-center gap-4 w-full">
                {/* Previous Button */}
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}>
                    Previous
                </Button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                        <Button
                            className="min-w-10 size-10 aspect-square"
                            key={page}
                            onClick={() => handlePageChange(page)}
                            disabled={page === currentPage}
                            variant={
                                currentPage === page ? "filled" : "outlined"
                            }>
                            {page}
                        </Button>
                    )
                )}

                {/* Next Button */}
                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}>
                    Next
                </Button>
            </div>
        );
    };

    return (
        <div
            className="flex flex-col items-center gap-4 overflow-auto 
            border rounded-md p-4 max-h-screen">
            {props.filterable && (
                <div className="relative flex items-center w-full">
                    {!filter && (
                        <SearchIcon className="absolute left-3 size-5 text-gray-400" />
                    )}
                    <Input
                        type="text"
                        value={filter}
                        placeholder="Search..."
                        onChange={(e) => setFilter(e.target.value)}
                        className="placeholder:pl-6"
                    />
                </div>
            )}
            <table className="size-full overflow-auto">
                <thead className="bg-gray-50/85 sticky top-0 glass">
                    {renderHeader()}
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {renderBody()}
                </tbody>
            </table>
            {renderPagination()}
        </div>
    );
};

export default Table;
