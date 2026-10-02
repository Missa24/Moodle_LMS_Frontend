"use client";

import { useState } from "react";

import {
    ImageIcon,
    Loader2,
} from "lucide-react";

import { toast } from "sonner";

import {
    Button,
} from "@/components/ui/button";

import {
    Input,
} from "@/components/ui/input";

import {
    Label,
} from "@/components/ui/label";

import {
    DialogFooter,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    useConfigurarVentaCurso,
} from "../Hook/CursoHook";

import type {
    ConfiguracionVentaCursoType,
    CursoPrecioType,
    TipoDescuentoCursoType,
} from "../Schema/CursoSchema";


interface Props {
    cursoId: string;

    configuracion:
    ConfiguracionVentaCursoType | null;

    precio?: CursoPrecioType;

    onSuccess?: () => void;
}


export function FormConfiguracionVentaCurso({
    cursoId,
    configuracion,
    precio,
    onSuccess,
}: Props) {
    const configurar =
        useConfigurarVentaCurso();


    const [
        tipoDescuento,
        setTipoDescuento,
    ] =
        useState<TipoDescuentoCursoType>(
            configuracion
                ?.tipoDescuento ??
            "PORCENTAJE"
        );


    const [
        porcentaje,
        setPorcentaje,
    ] =
        useState(
            configuracion?.porcentaje !=
                null
                ? String(
                    configuracion.porcentaje
                )
                : ""
        );


    const [
        moduloDescuentoId,
        setModuloDescuentoId,
    ] =
        useState(
            configuracion
                ?.moduloDescuentoId ??
            ""
        );


    const [
        urlPago,
        setUrlPago,
    ] =
        useState(
            configuracion
                ?.urlPago ??
            ""
        );


    const [
        qrPagoBolivia,
        setQrPagoBolivia,
    ] =
        useState<File | null>(
            null
        );


    const [
        habilitado,
        setHabilitado,
    ] =
        useState(
            configuracion
                ?.habilitado ??
            true
        );


    const guardar = () => {
        if (
            tipoDescuento ===
            "PORCENTAJE"
        ) {
            const valor =
                Number(
                    porcentaje
                );

            if (
                !Number.isFinite(
                    valor
                ) ||
                valor <= 0 ||
                valor > 100
            ) {
                toast.error(
                    "Ingresa un porcentaje válido entre 0 y 100"
                );

                return;
            }
        }


        if (
            tipoDescuento ===
            "MODULO_GRATIS" &&
            !moduloDescuentoId
        ) {
            toast.error(
                "Selecciona el módulo a descontar"
            );

            return;
        }


        if (
            qrPagoBolivia &&
            !qrPagoBolivia.type.startsWith(
                "image/"
            )
        ) {
            toast.error(
                "El QR debe ser una imagen"
            );

            return;
        }


        configurar.mutate(
            {
                cursoId,

                data: {
                    tipoDescuento,

                    porcentaje:
                        tipoDescuento ===
                            "PORCENTAJE"
                            ? Number(
                                porcentaje
                            )
                            : undefined,

                    moduloDescuentoId:
                        tipoDescuento ===
                            "MODULO_GRATIS"
                            ? moduloDescuentoId
                            : undefined,

                    urlPago:
                        urlPago.trim(),

                    qrPagoBolivia:
                        qrPagoBolivia ??
                        undefined,

                    habilitado,
                },
            },
            {
                onSuccess: () => {
                    toast.success(
                        "Configuración actualizada"
                    );

                    onSuccess?.();
                },

                onError: () => {
                    toast.error(
                        "No se pudo guardar la configuración"
                    );
                },
            }
        );
    };


    return (
        <div className="space-y-5">
            {precio && (
                <div className="grid grid-cols-3 gap-3 rounded-xl border bg-muted/20 p-4 text-center">
                    <div>
                        <p className="text-xs text-muted-foreground">
                            Precio base
                        </p>

                        <p className="font-semibold">
                            $
                            {precio.precioBase.toFixed(
                                2
                            )}
                        </p>
                    </div>


                    <div>
                        <p className="text-xs text-muted-foreground">
                            Descuento
                        </p>

                        <p className="font-semibold">
                            -$
                            {precio.montoDescuento.toFixed(
                                2
                            )}
                        </p>
                    </div>


                    <div>
                        <p className="text-xs text-muted-foreground">
                            Precio final
                        </p>

                        <p className="font-semibold text-primary">
                            $
                            {precio.precioFinal.toFixed(
                                2
                            )}
                        </p>
                    </div>
                </div>
            )}

            <div className="space-y-2">
                <Label>
                    Tipo de descuento
                </Label>

                <Select
                    value={
                        tipoDescuento
                    }
                    onValueChange={(
                        value
                    ) =>
                        setTipoDescuento(
                            value as TipoDescuentoCursoType
                        )
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue
                            placeholder="Seleccionar tipo de descuento"
                        />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem
                            value="PORCENTAJE"
                        >
                            Porcentaje
                        </SelectItem>

                        <SelectItem
                            value="MODULO_GRATIS"
                        >
                            Descontar un módulo
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {tipoDescuento ===
                "PORCENTAJE" && (
                    <div className="space-y-2">
                        <Label>
                            Porcentaje
                        </Label>

                        <Input
                            type="number"
                            min={0.01}
                            max={100}
                            step={0.01}
                            value={
                                porcentaje
                            }
                            onChange={(
                                event
                            ) =>
                                setPorcentaje(
                                    event
                                        .target
                                        .value
                                )
                            }
                            placeholder="Ej: 20"
                        />
                    </div>
                )}

            {tipoDescuento ===
                "MODULO_GRATIS" && (
                    <div className="space-y-2">
                        <Label>
                            Módulo a descontar
                        </Label>

                        <Select
                            value={
                                moduloDescuentoId
                            }
                            onValueChange={
                                setModuloDescuentoId
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue
                                    placeholder="Seleccionar módulo..."
                                />
                            </SelectTrigger>

                            <SelectContent>
                                {precio?.modulos.map(
                                    (
                                        modulo
                                    ) => (
                                        <SelectItem
                                            key={
                                                modulo.id
                                            }
                                            value={
                                                modulo.id
                                            }
                                        >
                                            {
                                                modulo.nombre
                                            }{" "}
                                            - $
                                            {modulo.precio.toFixed(
                                                2
                                            )}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                )}

            <div className="space-y-2">
                <Label>
                    Enlace PayPal
                </Label>

                <Input
                    type="url"
                    value={
                        urlPago
                    }
                    onChange={(
                        event
                    ) =>
                        setUrlPago(
                            event
                                .target
                                .value
                        )
                    }
                    placeholder="https://..."
                />
            </div>

            <div className="space-y-3">
                <Label>
                    QR de pago Bolivia
                </Label>


                {configuracion
                    ?.urlPagoBolivia && (
                        <div className="w-fit rounded-xl border bg-white p-3">
                            <img
                                src={
                                    configuracion.urlPagoBolivia
                                }
                                alt="QR Bolivia actual"
                                className="h-40 w-40 object-contain"
                            />

                            <p className="mt-2 text-center text-xs text-muted-foreground">
                                QR actual
                            </p>
                        </div>
                    )}


                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed p-4 transition-colors hover:bg-muted/40">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                        <ImageIcon className="size-5 text-muted-foreground" />
                    </div>


                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">
                            {qrPagoBolivia
                                ? qrPagoBolivia.name
                                : configuracion
                                    ?.urlPagoBolivia
                                    ? "Cambiar imagen QR"
                                    : "Seleccionar imagen QR"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            PNG, JPG, JPEG
                            o WEBP
                        </p>
                    </div>


                    <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(
                            event
                        ) =>
                            setQrPagoBolivia(
                                event
                                    .target
                                    .files?.[0] ??
                                null
                            )
                        }
                    />
                </label>
            </div>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
                <input
                    type="checkbox"
                    checked={
                        habilitado
                    }
                    onChange={(
                        event
                    ) =>
                        setHabilitado(
                            event
                                .target
                                .checked
                        )
                    }
                />

                <span className="text-sm font-medium">
                    Habilitar compra del
                    curso completo
                </span>
            </label>

            <DialogFooter>
                <Button
                    type="button"
                    onClick={
                        guardar
                    }
                    disabled={
                        configurar.isPending
                    }
                >
                    {configurar.isPending && (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                    )}

                    Guardar
                </Button>
            </DialogFooter>
        </div>
    );
}