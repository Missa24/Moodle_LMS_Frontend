"use client";
import {
    Table as ReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    X,
} from "lucide-react";
import {
    DataTableViewOptions,
} from "./data-table-view-options";
interface DataTableToolbarProps<TData> {
    table: ReactTable<TData>;
    filterColumn?: keyof TData;
    placeholder?: string;
    searchValue?: string;

    onSearchChange?: (
        value: string,
    ) => void;
}
export function DataTableToolbar<TData>({
    table,
    filterColumn,
    placeholder = "Buscar...",
    searchValue,
    onSearchChange,
}: DataTableToolbarProps<TData>) {
    const isFiltered =
        table.getState()
            .columnFilters.length > 0;
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {
                    filterColumn && (
                        <Input
                            placeholder={
                                placeholder
                            }

                            value={
                                onSearchChange
                                    ? searchValue ?? ""
                                    : String(
                                        table
                                            .getColumn(
                                                String(
                                                    filterColumn,
                                                ),
                                            )
                                            ?.getFilterValue() ??
                                        "",
                                    )
                            }

                            onChange={(event) => {
                                const value =
                                    event.target.value;

                                if (
                                    onSearchChange
                                ) {
                                    onSearchChange(
                                        value,
                                    );

                                    return;
                                }

                                if (
                                    filterColumn
                                ) {
                                    table
                                        .getColumn(
                                            String(
                                                filterColumn,
                                            ),
                                        )
                                        ?.setFilterValue(
                                            value,
                                        );
                                }
                            }}

                            className="h-8 w-[250px]"
                        />
                    )
                }
                {
                    isFiltered && (
                        <Button
                            variant="ghost"
                            onClick={() =>
                                table.resetColumnFilters()
                            }
                            className="h-8 px-2 lg:px-3"
                        >
                            Limpiar
                            <X
                                className="ml-2 h-4 w-4"
                            />
                        </Button>
                    )
                }
            </div>
            <DataTableViewOptions
                table={table}
            />
        </div>
    );
}