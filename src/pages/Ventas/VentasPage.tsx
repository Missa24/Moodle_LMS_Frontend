import {
    useMemo,
    useState,
} from "react";

import { PageHeader } from "@/components/common/PageHeader";
import { QueryState } from "@/components/common/QueryState";
import { DataTable } from "@/components/data-table/data-table";

import {
    useGetVentas,
    useGetVentasResumen,
} from "@/features/Ventas/Hook/VentaHook";

import { VentaColumns } from "@/features/Ventas/Components/VentaColumns";
import { VentasResumenCards } from "@/features/Ventas/Components/VentasResumenCards";

import { useModulePermissions } from "@/hooks/useModulePermissions";
import { PERMISSIONS } from "@/utils/constants";
import { VentasChart } from "@/features/Ventas/Components/VentasChart";

export default function VentasPage() {
    const [page] = useState(1);
    const [limit] = useState(100);

    const {
        puedeEditar,
    } = useModulePermissions(
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

    const {
        data: resumen,
        isLoading: isLoadingResumen,
        isError: isErrorResumen,
    } = useGetVentasResumen();

    const columns = useMemo(
        () =>
            VentaColumns({
                puedeEditar,
            }),
        [
            puedeEditar,
        ],
    );

    const ventas =
        data?.data ??
        [];

    return (
        <div className="space-y-6 p-4 sm:p-6">
            <PageHeader
                title="Ventas"
                subtitle="Consulta los pagos registrados, los ingresos obtenidos y las comisiones de cada operación."
            />

            <VentasResumenCards
                resumen={resumen}
                isLoading={isLoadingResumen}
                isError={isErrorResumen}
            />
            <VentasChart />

            <QueryState
                isLoading={isLoading}
                isError={isError}
                error={error}
                fallbackMessage="No se pudieron cargar las ventas."
            >
                <div className="space-y-3">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                            {resumen
                                ? `${resumen.totalVentas} ${resumen.totalVentas === 1
                                    ? "venta registrada"
                                    : "ventas registradas"
                                }`
                                : "Ventas registradas"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            Mostrando {ventas.length} de hasta {limit} registros
                            en esta vista
                        </p>
                    </div>

                    <DataTable
                        columns={columns}
                        data={ventas}
                    />
                </div>
            </QueryState>
        </div>
    );
}