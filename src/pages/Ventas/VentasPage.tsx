import {
    useMemo,
    useState,
} from "react";

import { PageHeader } from "@/components/common/PageHeader";
import { QueryState } from "@/components/common/QueryState";
import { DataTable } from "@/components/data-table/data-table";

import { useGetVentas } from "@/features/Ventas/Hook/VentaHook";
import { VentaColumns } from "@/features/Ventas/Components/VentaColumns";

import { useModulePermissions } from "@/hooks/useModulePermissions";
import { PERMISSIONS } from "@/utils/constants";

export default function VentasPage() {
    const [page] =
        useState(1);

    const [limit] =
        useState(100);

    const {
        puedeEditar,
    } =
        useModulePermissions(
            PERMISSIONS.VENTAS,
        );

    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetVentas({
        page,
        limit,
    });

    const columns =
        useMemo(
            () =>
                VentaColumns({
                    puedeEditar,
                }),
            [
                puedeEditar,
            ],
        );

    return (
        <div className="space-y-6 p-4 sm:p-6">
            <PageHeader
                title="Ventas"
                subtitle="Consulta los pagos registrados y concilia las comisiones de cada operación."
            />

            <QueryState
                isLoading={
                    isLoading
                }
                isError={
                    isError
                }
                error={
                    error
                }
                fallbackMessage="No se pudieron cargar las ventas."
            >
                <DataTable
                    columns={
                        columns
                    }
                    data={
                        data?.data ??
                        []
                    }
                />
            </QueryState>
        </div>
    );
}