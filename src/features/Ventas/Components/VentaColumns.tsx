"use client";

import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import type { VentaType } from "../Schema/VentaSchema";
import { useUpdateVentaComision } from "../Hook/VentaHook";

const dinero = (valor: number) =>
    new Intl.NumberFormat("es-BO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(valor);

function ComisionCell({ venta }: { venta: VentaType }) {
    const actualizar = useUpdateVentaComision();
    const [valor, setValor] = useState(venta.comision.toString());
    const [modificado, setModificado] = useState(false);

    const restaurar = () => {
        setValor(venta.comision.toString());
        setModificado(false);
    };

    const guardar = () => {
        if (!modificado || actualizar.isPending) return;

        const comision = Number(valor.replace(",", "."));

        if (
            !Number.isFinite(comision) ||
            comision < 0 ||
            comision > venta.montoCobrado
        ) {
            restaurar();
            return;
        }

        actualizar.mutate(
            {
                id: venta.id,
                data: { comision },
            },
            {
                onSuccess: (ventaActualizada) => {
                    setValor(ventaActualizada.comision.toString());
                    setModificado(false);
                },
                onError: restaurar,
            },
        );
    };

    return (
        <div className="min-w-[125px]">
            <div className="relative w-28">
                <Input
                    type="number"
                    min="0"
                    max={venta.montoCobrado}
                    step="0.01"
                    value={valor}
                    disabled={actualizar.isPending}
                    onChange={(event) => {
                        setValor(event.target.value);
                        setModificado(true);
                    }}
                    onBlur={guardar}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.currentTarget.blur();
                        }

                        if (event.key === "Escape") {
                            restaurar();
                            event.currentTarget.blur();
                        }
                    }}
                    className="h-8 pr-10"
                />

                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                    {actualizar.isPending ? (
                        <Loader2 className="size-4 animate-spin text-muted-foreground" />
                    ) : (
                        <span className="text-[10px] text-muted-foreground">
                            {venta.moneda}
                        </span>
                    )}
                </div>
            </div>

            <p className="mt-1 text-[10px] text-muted-foreground">
                {venta.comisionConfirmada
                    ? "Confirmada"
                    : "Pendiente"}
            </p>
        </div>
    );
}

export function VentaColumns(): ColumnDef<VentaType>[] {
    return [
        {
            accessorKey: "creadoEn",
            header: "Fecha",
            cell: ({ row }) =>
                new Date(row.original.creadoEn).toLocaleString(
                    "es-BO",
                    {
                        dateStyle: "short",
                        timeStyle: "short",
                    },
                ),
        },
        {
            id: "estudiante",
            header: "Estudiante",
            accessorFn: (row) => row.usuario.correo,
            cell: ({ row }) => {
                const venta = row.original;

                const nombre = [
                    venta.usuario.perfil?.nombre,
                    venta.usuario.perfil?.apellidoPaterno,
                    venta.usuario.perfil?.apellidoMaterno,
                ]
                    .filter(Boolean)
                    .join(" ");

                return (
                    <div className="min-w-[170px]">
                        <p className="font-medium">
                            {nombre || venta.usuario.username}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            {venta.usuario.correo}
                        </p>
                    </div>
                );
            },
        },
        {
            id: "formacion",
            header: "Formación",
            accessorFn: (row) =>
                `${row.modulo.curso.nombre} ${row.modulo.nombre}`,
            cell: ({ row }) => (
                <div className="min-w-[180px]">
                    <p className="font-medium">
                        {row.original.modulo.curso.nombre}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {row.original.modulo.nombre}
                    </p>
                </div>
            ),
        },
        {
            accessorKey: "medioPago",
            header: "Medio",
            cell: ({ row }) => (
                <Badge variant="outline">
                    {row.original.medioPago === "PAYPAL"
                        ? "PayPal"
                        : "QR Bolivia"}
                </Badge>
            ),
        },
        {
            accessorKey: "precioBase",
            header: "Precio base",
            cell: ({ row }) => (
                <span className="whitespace-nowrap">
                    {dinero(row.original.precioBase)}{" "}
                    {row.original.moneda}
                </span>
            ),
        },
        {
            accessorKey: "montoDescuento",
            header: "Descuento",
            cell: ({ row }) => {
                const venta = row.original;

                if (venta.montoDescuento <= 0) {
                    return (
                        <span className="text-muted-foreground">
                            Sin descuento
                        </span>
                    );
                }

                return (
                    <div className="min-w-[110px]">
                        <p className="whitespace-nowrap">
                            -{dinero(venta.montoDescuento)}{" "}
                            {venta.moneda}
                        </p>

                        {venta.descuentoNombre && (
                            <p className="text-xs text-muted-foreground">
                                {venta.descuentoNombre}
                            </p>
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: "montoCobrado",
            header: "Cobrado",
            cell: ({ row }) => (
                <span className="whitespace-nowrap font-medium">
                    {dinero(row.original.montoCobrado)}{" "}
                    {row.original.moneda}
                </span>
            ),
        },
        {
            id: "comision",
            header: "Comisión",
            cell: ({ row }) => {
                const venta = row.original;

                return (
                    <ComisionCell
                        key={`${venta.id}-${venta.comision}-${venta.comisionConfirmada}`}
                        venta={venta}
                    />
                );
            },
        },
        {
            accessorKey: "totalRecibido",
            header: "Neto recibido",
            cell: ({ row }) => (
                <span className="whitespace-nowrap font-semibold">
                    {dinero(row.original.totalRecibido)}{" "}
                    {row.original.moneda}
                </span>
            ),
        },
    ];
}