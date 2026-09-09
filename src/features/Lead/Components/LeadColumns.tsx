"use client";

import { ColumnDef, } from "@tanstack/react-table";

import { Eye, MoreHorizontal, User, } from "lucide-react";

import { Button, } from "@/components/ui/button";

import { Badge, } from "@/components/ui/badge";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { LeadType, } from "../Schema/LeadSchema";

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

            header:
                "Estudiante",

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
                    <div className="min-w-[160px]">
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
                row.original
                    .telefono ||
                "Sin teléfono",
        },

        {
            id: "curso",

            accessorFn: (row) =>
                row.curso.nombre,

            header: "Formación",

            cell: ({ row }) => (
                <span className="font-medium">
                    {
                        row.original
                            .curso.nombre
                    }
                </span>
            ),
        },

        {
            id: "modulo",

            accessorFn: (row) =>
                row.modulo.nombre,

            header:
                "Módulo",

            cell: ({ row }) =>
                row.original
                    .modulo.nombre,
        },

        {
            accessorKey:
                "estado",

            header:
                "Estado",

            cell: ({ row }) => {
                const estado =
                    row.original.estado;

                return (
                    <Badge
                        variant={
                            estado ===
                                "CONVERTIDO"
                                ? "default"
                                : "secondary"
                        }
                    >
                        {estado.replace(
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
                                variant="ghost"
                                className="h-8 w-8 p-0"
                            >
                                <span className="sr-only">
                                    Abrir menú
                                </span>

                                <MoreHorizontal className="h-4 w-4" />
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
                                <Eye className="mr-2 h-4 w-4" />

                                Ver lead
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() =>
                                    onViewUser(
                                        lead.usuarioId,
                                    )
                                }
                            >
                                <User className="mr-2 h-4 w-4" />

                                Ver intereses del usuario
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
}