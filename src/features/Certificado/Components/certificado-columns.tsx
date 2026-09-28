"use client";

import type {
    ColumnDef,
} from "@tanstack/react-table";

import {
    Eye,
    MoreHorizontal,
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
    CertificadoAdmin,
} from "../Schema/CertificadoSchema";

interface CertificadoColumnsProps {
    onView: (
        certificado: CertificadoAdmin,
    ) => void;
}

export function CertificadoColumns({
    onView,
}: CertificadoColumnsProps): ColumnDef<CertificadoAdmin>[] {
    return [
        {
            id: "estudiante",

            accessorFn: (row) =>
                [
                    row.usuario
                        .perfil
                        ?.nombre,

                    row.usuario
                        .perfil
                        ?.apellidoPaterno,

                    row.usuario
                        .perfil
                        ?.apellidoMaterno,
                ]
                    .filter(Boolean)
                    .join(" "),

            header: "Estudiante",

            cell: ({ row }) => {
                const certificado =
                    row.original;

                const perfil =
                    certificado
                        .usuario
                        .perfil;

                const nombreCompleto =
                    [
                        perfil?.nombre,
                        perfil
                            ?.apellidoPaterno,
                        perfil
                            ?.apellidoMaterno,
                    ]
                        .filter(Boolean)
                        .join(" ");

                return (
                    <div className="min-w-[180px]">
                        <p className="font-medium">
                            {nombreCompleto ||
                                certificado
                                    .nombreCertificado ||
                                "Sin nombre"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            {
                                certificado
                                    .usuario
                                    .correo
                            }
                        </p>
                    </div>
                );
            },
        },

        {
            id: "nombreCertificado",

            accessorKey:
                "nombreCertificado",

            header:
                "Nombre en certificado",

            cell: ({ row }) => (
                <span className="font-medium">
                    {row.original
                        .nombreCertificado ||
                        "Sin nombre"}
                </span>
            ),
        },

        {
            id: "formacion",

            accessorFn: (row) =>
                row.curso?.nombre ??
                row.inscripcion
                    ?.modulo
                    ?.nombre ??
                "",

            header: "Formación",

            cell: ({ row }) => {
                const certificado =
                    row.original;

                if (
                    certificado
                        .curso
                        ?.nombre
                ) {
                    return (
                        <div>
                            <p className="font-medium">
                                {
                                    certificado
                                        .curso
                                        .nombre
                                }
                            </p>

                            <p className="text-xs text-muted-foreground">
                                Curso
                            </p>
                        </div>
                    );
                }

                const modulo =
                    certificado
                        .inscripcion
                        ?.modulo;

                if (modulo?.nombre) {
                    return (
                        <div>
                            <p className="font-medium">
                                {
                                    modulo.nombre
                                }
                            </p>

                            <p className="text-xs text-muted-foreground">
                                Módulo
                            </p>
                        </div>
                    );
                }

                return (
                    <span className="text-muted-foreground">
                        Sin formación
                    </span>
                );
            },
        },

        {
            accessorKey: "tipo",

            header: "Tipo",

            cell: ({ row }) => (
                <Badge variant="secondary">
                    {
                        row.original
                            .tipo
                    }
                </Badge>
            ),
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
                            estado ===
                                "anulado"
                                ? "destructive"
                                : "default"
                        }
                    >
                        {estado}
                    </Badge>
                );
            },
        },

        {
            accessorKey:
                "fechaEmision",

            header:
                "Fecha de emisión",

            cell: ({ row }) => {
                const fecha =
                    row.original
                        .fechaEmision;

                return new Date(
                    fecha,
                ).toLocaleDateString(
                    "es-BO",
                    {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                    },
                );
            },
        },

        {
            id: "numeroCertificado",

            accessorKey:
                "numeroCertificado",

            header:
                "N.º certificado",

            cell: ({ row }) => (
                <span className="whitespace-nowrap font-mono text-xs">
                    {
                        row.original
                            .numeroCertificado
                    }
                </span>
            ),
        },

        {
            id: "acciones",

            header: "Acciones",

            cell: ({ row }) => {
                const certificado =
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
                                    onView(
                                        certificado,
                                    )
                                }
                            >
                                <Eye className="mr-2 size-4" />

                                Ver certificado
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
}