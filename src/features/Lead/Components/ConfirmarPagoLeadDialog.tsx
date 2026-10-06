"use client";

import { useState } from "react";
import { CheckCircle2, ImageUp, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useUpdateLeadEstado } from "../Hook/LeadHook";

import type {
    LeadDetailType,
    MedioPagoType,
} from "../Schema/LeadSchema";

type LeadParaPago = Pick<
    LeadDetailType,
    "id" | "tipoCompra" | "curso" | "modulo"
>;

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    lead: LeadParaPago | null;
    estudianteNombre?: string;
    onSuccess?: () => void;
}

export function ConfirmarPagoLeadDialog({
    open,
    onOpenChange,
    lead,
    estudianteNombre,
    onSuccess,
}: Props) {
    const actualizarEstado = useUpdateLeadEstado();

    const [medioPago, setMedioPago] = useState<MedioPagoType | "">("");
    const [montoCobrado, setMontoCobrado] = useState("");
    const [referenciaPago, setReferenciaPago] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [comprobante, setComprobante] = useState<File | null>(null);

    const cursoNombre =
        lead?.tipoCompra === "CURSO"
            ? lead.curso?.nombre
            : lead?.modulo?.curso.nombre;

    const productoNombre =
        lead?.tipoCompra === "CURSO"
            ? "Curso completo"
            : lead?.modulo?.nombre;

    const limpiar = () => {
        setMedioPago("");
        setMontoCobrado("");
        setReferenciaPago("");
        setObservaciones("");
        setComprobante(null);
    };

    const cerrar = () => {
        if (actualizarEstado.isPending) return;
        limpiar();
        onOpenChange(false);
    };

    const confirmarPago = () => {
        if (!lead || !medioPago || !montoCobrado || !comprobante) return;

        actualizarEstado.mutate(
            {
                id: lead.id,
                data: {
                    estado: "PAGO_COMPLETADO",
                    medioPago,
                    moneda: medioPago === "PAYPAL" ? "USD" : "BOB",
                    montoCobrado: Number(montoCobrado),
                    referenciaPago: referenciaPago.trim() || undefined,
                    observaciones: observaciones.trim() || undefined,
                    comprobante,
                },
            },
            {
                onSuccess: () => {
                    limpiar();
                    onOpenChange(false);
                    onSuccess?.();
                },
            },
        );
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!value) return cerrar();
                onOpenChange(true);
            }}
        >
            <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl pr-3">
                <DialogHeader>
                    <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <ShieldCheck className="size-6" />
                    </div>

                    <DialogTitle>Confirmar pago</DialogTitle>

                    <DialogDescription>
                        Verifica el pago y adjunta el comprobante antes de habilitar
                        el acceso al estudiante.
                    </DialogDescription>
                </DialogHeader>

                {lead && (
                    <div className="space-y-3 rounded-xl border bg-muted/20 p-4">
                        {estudianteNombre && (
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Estudiante
                                </p>
                                <p className="font-medium">
                                    {estudianteNombre}
                                </p>
                            </div>
                        )}

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Tipo de compra
                            </p>
                            <p className="font-medium">
                                {lead.tipoCompra === "CURSO"
                                    ? "Curso completo"
                                    : "Módulo"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Curso
                            </p>
                            <p className="font-medium">
                                {cursoNombre ?? "Sin curso"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Producto
                            </p>
                            <p className="font-medium">
                                {productoNombre ?? "Sin información"}
                            </p>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Medio de pago</Label>

                        <Select
                            value={medioPago}
                            onValueChange={(value) =>
                                setMedioPago(value as MedioPagoType)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar medio de pago" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="PAYPAL">
                                    PayPal
                                </SelectItem>
                                <SelectItem value="BOLIVIA">
                                    QR Bolivia
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {medioPago && (
                        <>
                            <div className="space-y-2">
                                <Label>Moneda</Label>
                                <Input
                                    value={
                                        medioPago === "PAYPAL"
                                            ? "USD"
                                            : "BOB"
                                    }
                                    disabled
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Monto cobrado</Label>
                                <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={montoCobrado}
                                    onChange={(e) =>
                                        setMontoCobrado(e.target.value)
                                    }
                                    placeholder="Ej: 10"
                                />
                            </div>
                        </>
                    )}

                    <div className="space-y-2">
                        <Label>Referencia de pago</Label>
                        <Input
                            value={referenciaPago}
                            onChange={(e) =>
                                setReferenciaPago(e.target.value)
                            }
                            placeholder="Ej: ID de transacción"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Comprobante de pago</Label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed p-4 transition-colors hover:bg-muted/40">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <ImageUp className="size-5" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm font-medium">
                                    {comprobante
                                        ? comprobante.name
                                        : "Seleccionar comprobante"}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    JPG, PNG o WEBP
                                </p>
                            </div>

                            <Input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                className="hidden"
                                onChange={(e) =>
                                    setComprobante(
                                        e.target.files?.[0] ?? null,
                                    )
                                }
                            />
                        </label>
                    </div>

                    <div className="space-y-2">
                        <Label>Observaciones</Label>
                        <Textarea
                            value={observaciones}
                            onChange={(e) =>
                                setObservaciones(e.target.value)
                            }
                            placeholder="Observación opcional"
                            rows={3}
                        />
                    </div>
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <p className="text-sm leading-6">
                        {lead?.tipoCompra === "CURSO"
                            ? "Al confirmar se registrará la venta y se habilitará el acceso a todos los módulos incluidos en la compra."
                            : "Al confirmar se registrará la venta, la inscripción y se habilitará el acceso al módulo."}
                    </p>
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={actualizarEstado.isPending}
                        onClick={cerrar}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="button"
                        disabled={
                            actualizarEstado.isPending ||
                            !medioPago ||
                            !montoCobrado ||
                            !comprobante
                        }
                        onClick={confirmarPago}
                        className="gap-2"
                    >
                        <CheckCircle2 className="size-4" />

                        {actualizarEstado.isPending
                            ? "Confirmando..."
                            : "Confirmar pago"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
