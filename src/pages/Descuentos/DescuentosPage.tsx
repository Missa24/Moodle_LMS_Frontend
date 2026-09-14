"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { QueryState } from "@/components/common/QueryState";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";

import { DescuentoFormDialog } from "@/features/Descuentos/Components/DescuentoFormDialog";
import { getDescuentoColumns } from "@/features/Descuentos/Components/DescuentoColumns";
import {
    useDeleteDescuento,
    useGetDescuentos,
    useRestoreDescuento,
} from "@/features/Descuentos/Hook/DescuentoHook";
import { DescuentoType } from "@/features/Descuentos/Schema/DescuentoSchema";

import { useModulePermissions } from "@/hooks/useModulePermissions";
import { PERMISSIONS } from "@/utils/constants";

export default function DescuentosPage() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<DescuentoType | null>(null);

    const {
        puedeCrear,
        puedeEditar,
        puedeEliminar,
    } = useModulePermissions(PERMISSIONS.DESCUENTOS);

    const {
        data: descuentos = [],
        isLoading,
        isError,
        error,
    } = useGetDescuentos();

    const deleteDescuento = useDeleteDescuento();
    const restoreDescuento = useRestoreDescuento();

    const columns = useMemo(
        () =>
            getDescuentoColumns({
                onEdit: (descuento) => {
                    setSelected(descuento);
                    setOpen(true);
                },
                onDisable: (id) => deleteDescuento.mutate(id),
                onRestore: (id) => restoreDescuento.mutate(id),
                canEdit: puedeEditar,
                canDelete: puedeEliminar,
            }),
        [
            deleteDescuento,
            restoreDescuento,
            puedeEditar,
            puedeEliminar,
        ],
    );

    const handleCreate = () => {
        setSelected(null);
        setOpen(true);
    };

    return (
        <div className="space-y-6 p-6">
            <PageHeader
                title="Descuentos"
                subtitle="Administra promociones, fechas y módulos asociados"
                action={
                    puedeCrear ? (
                        <Button onClick={handleCreate}>
                            <Plus className="mr-2 size-4" />
                            Nuevo descuento
                        </Button>
                    ) : undefined
                }
            />

            <QueryState
                isLoading={isLoading}
                isError={isError}
                error={error}
            >
                <DataTable
                    columns={columns}
                    data={descuentos}
                    filterColumn="nombre"
                    filterPlaceholder="Buscar descuento..."
                />
            </QueryState>

            <DescuentoFormDialog
                open={open}
                onOpenChange={setOpen}
                descuento={selected}
            />
        </div>
    );
}