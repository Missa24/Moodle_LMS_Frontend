"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    MoreHorizontal,
    Pencil,
    Power,
    RotateCcw,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DescuentoType } from "../Schema/DescuentoSchema";

type Props = {
    onEdit: (descuento: DescuentoType) => void;
    onDisable: (id: string) => void;
    onRestore: (id: string) => void;
    canEdit: boolean;
    canDelete: boolean;
};

export function getDescuentoColumns({
    onEdit,
    onDisable,
    onRestore,
    canEdit,
    canDelete,
}: Props): ColumnDef<DescuentoType>[] {
    const columns: ColumnDef<DescuentoType>[] = [
        {
            accessorKey: "nombre",
            header: "Nombre",
            cell: ({ row }) => (
                <div>
                    <p className="font-medium">
                        {row.original.nombre}
                    </p>

                    {row.original.descripcion && (
                        <p className="max-w-[300px] truncate text-xs text-muted-foreground">
                            {row.original.descripcion}
                        </p>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "tipo",
            header: "Tipo",
            cell: ({ row }) =>
                row.original.tipo === "PORCENTAJE"
                    ? "Porcentaje"
                    : "Monto fijo",
        },
        {
            accessorKey: "valor",
            header: "Valor",
            cell: ({ row }) =>
                row.original.tipo === "PORCENTAJE"
                    ? `${row.original.valor}%`
                    : row.original.valor,
        },
        {
            id: "vigencia",
            header: "Vigencia",
            cell: ({ row }) => (
                <div className="text-sm">
                    <p>{formatDate(row.original.iniciaEn)}</p>

                    <p className="text-muted-foreground">
                        hasta {formatDate(row.original.finalizaEn)}
                    </p>
                </div>
            ),
        },
        {
            id: "modulos",
            header: "Módulos",
            cell: ({ row }) => (
                <span className="text-sm">
                    {row.original.modulos.length}
                </span>
            ),
        },
        {
            id: "estado",
            header: "Estado",
            cell: ({ row }) => {
                const descuento = row.original;

                if (!descuento.habilitado) {
                    return (
                        <Badge variant="secondary">
                            Deshabilitado
                        </Badge>
                    );
                }

                if (descuento.vigente) {
                    return <Badge>Vigente</Badge>;
                }

                return new Date(descuento.iniciaEn) > new Date() ? (
                    <Badge variant="outline">
                        Programado
                    </Badge>
                ) : (
                    <Badge variant="secondary">
                        Finalizado
                    </Badge>
                );
            },
        },
    ];

    if (canEdit || canDelete) {
        columns.push({
            id: "acciones",
            enableHiding: false,
            cell: ({ row }) => {
                const descuento = row.original;

                return (
                    <div className="flex justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                >
                                    <MoreHorizontal className="size-4" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                {canEdit && (
                                    <DropdownMenuItem
                                        onClick={() =>
                                            onEdit(descuento)
                                        }
                                    >
                                        <Pencil className="mr-2 size-4" />
                                        Editar
                                    </DropdownMenuItem>
                                )}

                                {canDelete &&
                                    (descuento.habilitado ? (
                                        <DropdownMenuItem
                                            onClick={() =>
                                                onDisable(
                                                    descuento.id,
                                                )
                                            }
                                        >
                                            <Power className="mr-2 size-4" />
                                            Deshabilitar
                                        </DropdownMenuItem>
                                    ) : (
                                        <DropdownMenuItem
                                            onClick={() =>
                                                onRestore(
                                                    descuento.id,
                                                )
                                            }
                                        >
                                            <RotateCcw className="mr-2 size-4" />
                                            Restaurar
                                        </DropdownMenuItem>
                                    ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        });
    }

    return columns;
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat("es-BO", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(value));
}