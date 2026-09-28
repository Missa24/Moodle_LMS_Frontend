"use client";

import type {
    ColumnDef,
} from "@tanstack/react-table";

import {
    Eye,
    MoreHorizontal,
    User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type {
    LeadType,
} from "../Schema/LeadSchema";

interface LeadColumnsProps {
    onViewLead: (
        id: string,
    ) => void;

    onViewUser: (
        usuarioId: string,
    ) => void;
}

export function LeadColumns({
    onViewLead,
    onViewUser,
}: LeadColumnsProps): ColumnDef<LeadType>[] {
    return [
        {
            id: "estudiante",

            accessorFn: (row) =>
                [
                    row.nombre,
                    row.apellidoPaterno,
                    row.apellidoMaterno,
                ]
                    .filter(Boolean)
                    .join(" "),

            header: "Estudiante",

            cell: ({ row }) => {
                const lead =
                    row.original;

                const nombreCompleto =
                    [
                        lead.nombre,
                        lead.apellidoPaterno,
                        lead.apellidoMaterno,
                    ]
                        .filter(Boolean)
                        .join(" ");

                return (
                    <div className="min-w-[180px]">
                        <p className="font-medium">
                            {nombreCompleto ||
                                "Sin nombre"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            {lead.correo}
                        </p>
                    </div>
                );
            },
        },

        {
            accessorKey: "telefono",
            header: "Teléfono",

            cell: ({ row }) =>
                row.original.telefono ||
                "Sin teléfono",
        },

        {
            accessorKey: "tipoCompra",
            header: "Tipo",

            cell: ({ row }) => {
                const tipo =
                    row.original.tipoCompra;

                return (
                    <Badge
                        variant={
                            tipo === "CURSO"
                                ? "default"
                                : "secondary"
                        }
                    >
                        {tipo === "CURSO"
                            ? "Curso"
                            : "Módulo"}
                    </Badge>
                );
            },
        },

        {
            id: "formacion",

            accessorFn: (row) =>
                row.curso?.nombre ??
                "",

            header: "Formación",

            cell: ({ row }) =>
                row.original.curso?.nombre ??
                "Sin curso",
        },

        {
            id: "producto",

            accessorFn: (row) =>
                row.tipoCompra === "CURSO"
                    ? "Curso completo"
                    : row.modulo?.nombre ?? "",

            header: "Producto",

            cell: ({ row }) => {
                const lead =
                    row.original;

                if (
                    lead.tipoCompra ===
                    "CURSO"
                ) {
                    return (
                        <span className="font-medium">
                            Curso completo
                        </span>
                    );
                }

                return (
                    <span>
                        {lead.modulo?.nombre ??
                            "Sin módulo"}
                    </span>
                );
            },
        },

        {
            accessorKey: "estado",
            header: "Estado",

            cell: ({ row }) => {
                const estado =
                    row.original.estado;

                return (
                    <Badge
                        variant={
                            estado === "CONVERTIDO"
                                ? "default"
                                : estado === "DESCARTADO"
                                    ? "destructive"
                                    : "secondary"
                        }
                    >
                        {estado.replaceAll(
                            "_",
                            " ",
                        )}
                    </Badge>
                );
            },
        },

        {
            accessorKey:
                "ultimoIntentoEn",

            header:
                "Último intento",

            cell: ({ row }) =>
                new Date(
                    row.original
                        .ultimoIntentoEn,
                ).toLocaleString(
                    "es-BO",
                ),
        },

        {
            id: "acciones",
            header: "Acciones",

            cell: ({ row }) => {
                const lead =
                    row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            asChild
                        >
                            <Button
                                type="button"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                            >
                                <span className="sr-only">
                                    Abrir menú
                                </span>

                                <MoreHorizontal className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                        >
                            <DropdownMenuLabel>
                                Acciones
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() =>
                                    onViewLead(
                                        lead.id,
                                    )
                                }
                            >
                                <Eye className="mr-2 size-4" />

                                Ver lead
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() =>
                                    onViewUser(
                                        lead.usuarioId,
                                    )
                                }
                            >
                                <User className="mr-2 size-4" />

                                Ver intereses del usuario
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
}