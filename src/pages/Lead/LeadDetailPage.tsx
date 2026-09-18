"use client";

import { useState } from "react";
import {
    CheckCircle2,
    Clock3,
    ShieldCheck,
} from "lucide-react";
import { useParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { PageHeader } from "@/components/common/PageHeader";
import { QueryState } from "@/components/common/QueryState";
import { InfoSection } from "@/components/common/info/InfoSection";
import { InfoField } from "@/components/common/info/InfoField";

import {
    EstadoLeadSchema,
    type EstadoLeadType,
    type MedioPagoType,
} from "@/features/Lead/Schema/LeadSchema";

import {
    useGetLead,
    useUpdateLeadEstado,
} from "@/features/Lead/Hook/LeadHook";

const estadoLabels: Record<EstadoLeadType, string> = {
    INTERESADO: "Interesado",
    PAGO_COMPLETADO: "Pago completado",
    CONVERTIDO: "Convertido",
    DESCARTADO: "Descartado",
};

const getEstadoVariant = (
    estado: EstadoLeadType,
): "default" | "secondary" | "destructive" | "outline" => {
    switch (estado) {
        case "PAGO_COMPLETADO":
        case "CONVERTIDO":
            return "default";
        case "DESCARTADO":
            return "destructive";
        default:
            return "outline";
    }
};

const formatDate = (value?: string | null) => {
    if (!value) return "Sin registro";

    return new Date(value).toLocaleString("es-BO", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

export default function LeadDetailPage() {
    const { leadId = "" } = useParams<{ leadId: string }>();

    const {
        data: lead,
        isLoading,
        isError,
        error,
    } = useGetLead(leadId, !!leadId);

    const actualizarEstado = useUpdateLeadEstado();

    const [confirmarPagoOpen, setConfirmarPagoOpen] = useState(false);
    const [medioPago, setMedioPago] = useState<MedioPagoType | "">("");
    const [referenciaPago, setReferenciaPago] = useState("");
    const [observaciones, setObservaciones] = useState("");

    const handleEstadoChange = (value: string) => {
        if (!lead) return;

        const resultado = EstadoLeadSchema.safeParse(value);
        if (!resultado.success) return;

        if (resultado.data === "PAGO_COMPLETADO") {
            setMedioPago("");
            setReferenciaPago("");
            setObservaciones("");
            setConfirmarPagoOpen(true);
            return;
        }

        actualizarEstado.mutate({
            id: lead.id,
            data: { estado: resultado.data },
        });
    };

    const confirmarPago = () => {
        if (!lead || !medioPago) return;

        actualizarEstado.mutate(
            {
                id: lead.id,
                data: {
                    estado: "PAGO_COMPLETADO",
                    medioPago,
                    moneda: medioPago === "PAYPAL" ? "USD" : "BOB",
                    referenciaPago: referenciaPago.trim() || undefined,
                    observaciones: observaciones.trim() || undefined,
                },
            },
            {
                onSuccess: () => setConfirmarPagoOpen(false),
            },
        );
    };

    const perfil = lead?.usuario.perfil;

    const nombreCompleto = [
        perfil?.nombre,
        perfil?.apellidoPaterno,
        perfil?.apellidoMaterno,
    ].filter(Boolean).join(" ");

    return (
        <>
            <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title="Detalle del lead"
                    subtitle="Información del estudiante y formación de interés."
                    badge={
                        lead ? (
                            <Badge variant={getEstadoVariant(lead.estado)}>
                                {estadoLabels[lead.estado]}
                            </Badge>
                        ) : undefined
                    }
                />

                <QueryState
                    isLoading={isLoading}
                    isError={isError || !leadId}
                    error={error}
                    fallbackMessage="No se pudo cargar el lead."
                >
                    {lead && (
                        <div className="space-y-8 rounded-2xl border bg-background p-5 sm:p-6">
                            <InfoSection
                                title="Estudiante"
                                subtitle="Información personal y datos de contacto."
                            >
                                <InfoField
                                    label="Nombre completo"
                                    value={nombreCompleto || "Sin nombre"}
                                />

                                <InfoField
                                    label="Correo electrónico"
                                    value={lead.usuario.correo}
                                />

                                <InfoField
                                    label="Teléfono"
                                    value={perfil?.telefono || "Sin teléfono"}
                                />

                                <InfoField
                                    label="Ciudad"
                                    value={perfil?.ciudad || "Sin ciudad"}
                                />

                                <InfoField
                                    label="País"
                                    value={perfil?.pais || "Sin país"}
                                />

                                <InfoField
                                    label="Código de país"
                                    value={perfil?.paisCodigo || "Sin código"}
                                />
                            </InfoSection>

                            <InfoSection
                                title="Formación"
                                subtitle="Curso y módulo que despertaron el interés del estudiante."
                            >
                                <InfoField
                                    label="Curso"
                                    value={lead.modulo.curso.nombre}
                                />

                                <InfoField
                                    label="Módulo"
                                    value={lead.modulo.nombre}
                                />

                                <InfoField
                                    label="Estado actual"
                                    value={
                                        <Badge variant={getEstadoVariant(lead.estado)}>
                                            {estadoLabels[lead.estado]}
                                        </Badge>
                                    }
                                />

                                <InfoField
                                    label="Fecha de interés"
                                    value={formatDate(lead.creadoEn)}
                                />

                                <InfoField
                                    label="Último intento"
                                    value={formatDate(lead.ultimoIntentoEn)}
                                />

                                <InfoField
                                    label="Fecha de conversión"
                                    value={formatDate(lead.convertidoEn)}
                                />
                            </InfoSection>

                            <InfoSection
                                title="Seguimiento"
                                subtitle="Actualiza el estado comercial de este interés."
                                withDivider={false}
                            >
                                <div className="space-y-2 sm:col-span-2">
                                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                        Estado del lead
                                    </p>

                                    <Select
                                        value={lead.estado}
                                        onValueChange={handleEstadoChange}
                                        disabled={actualizarEstado.isPending}
                                    >
                                        <SelectTrigger className="w-full sm:max-w-sm">
                                            <SelectValue />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="INTERESADO">
                                                Interesado
                                            </SelectItem>

                                            <SelectItem value="PAGO_COMPLETADO">
                                                Pago completado
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Clock3 className="size-3.5" />
                                        Última actualización: {formatDate(lead.actualizadoEn)}
                                    </div>
                                </div>
                            </InfoSection>
                        </div>
                    )}
                </QueryState>
            </div>

            <Dialog
                open={confirmarPagoOpen}
                onOpenChange={(value) => {
                    if (!actualizarEstado.isPending) {
                        setConfirmarPagoOpen(value);
                    }
                }}
            >
                <DialogContent className="w-[calc(100%-2rem)] max-w-md overflow-x-hidden rounded-2xl">
                    <DialogHeader>
                        <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <ShieldCheck className="size-6" />
                        </div>

                        <DialogTitle>Confirmar pago</DialogTitle>

                        <DialogDescription>
                            Completa los datos del pago antes de habilitar el acceso del estudiante.
                        </DialogDescription>
                    </DialogHeader>

                    {lead && (
                        <div className="space-y-1 border-b pb-4 text-sm">
                            <p className="font-medium">
                                {nombreCompleto || lead.usuario.correo}
                            </p>

                            <p className="text-muted-foreground">
                                {lead.modulo.curso.nombre} · {lead.modulo.nombre}
                            </p>
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
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecciona el medio de pago" />
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
                            <div className="space-y-2">
                                <Label>Moneda</Label>

                                <Input
                                    value={medioPago === "PAYPAL" ? "USD" : "BOB"}
                                    disabled
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label>Referencia de pago</Label>

                            <Input
                                value={referenciaPago}
                                onChange={(event) =>
                                    setReferenciaPago(event.target.value)
                                }
                                placeholder="Ej: ID de transacción"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Observaciones</Label>

                            <Textarea
                                value={observaciones}
                                onChange={(event) =>
                                    setObservaciones(event.target.value)
                                }
                                placeholder="Observación opcional"
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-3">
                        <p className="text-sm leading-6 text-muted-foreground">
                            Al confirmar se registrará la venta, se creará la inscripción y se habilitará el acceso al módulo.
                        </p>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={actualizarEstado.isPending}
                            onClick={() => setConfirmarPagoOpen(false)}
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="button"
                            disabled={
                                actualizarEstado.isPending ||
                                !medioPago
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
        </>
    );
}