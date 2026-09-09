"use client";
import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterColumn?: keyof TData;
    filterPlaceholder?: string;
    pageCount?: number;
    pageIndex?: number;
    totalRows?: number;
    onPaginationChange?: (pageIndex: number,) => void;
    searchValue?: string;
    onSearchChange?: (value: string,) => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    filterColumn,
    filterPlaceholder = "Buscar...",
    pageCount,
    pageIndex: externalPageIndex,
    totalRows,
    onPaginationChange,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] =
        React.useState<Record<string, boolean>>({});
    const [pagination, setPagination] = React.useState({
        pageIndex: externalPageIndex ?? 0,
        pageSize: 10,
    });

    React.useEffect(() => {
        if (externalPageIndex !== undefined) {
            setPagination((prev) => ({ ...prev, pageIndex: externalPageIndex }));
        }
    }, [externalPageIndex]);

    const table = useReactTable<TData>({
        data,
        columns,
        pageCount: pageCount ?? -1,
        manualPagination: pageCount !== undefined,
        getCoreRowModel: getCoreRowModel<TData>(),
        getSortedRowModel: getSortedRowModel<TData>(),
        getFilteredRowModel: getFilteredRowModel<TData>(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: (updater) => {
            setPagination((prev) => {
                return typeof updater === "function" ? updater(prev) : updater;
            });
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    });

    React.useEffect(() => {
        onPaginationChange?.(pagination.pageIndex);
    }, [pagination.pageIndex, onPaginationChange]);
    return (
        <div className="space-y-4">
            <DataTableToolbar
                table={table}
                filterColumn={filterColumn}
                placeholder={filterPlaceholder}
            />
            <div className="rounded-md border overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected()
                                            ? "selected"
                                            : undefined
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-32 text-center"
                                >
                                    No existen registros.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} totalRows={totalRows} />
        </div>
    );
}