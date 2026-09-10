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

const formatDate = (
    value?: string | null,
) => {
    if (!value) {
        return "Sin registro";
    }

    return new Date(value).toLocaleString(
        "es-BO",
        {
            dateStyle: "medium",
            timeStyle: "short",
        },
    );
};

export default function LeadDetailPage() {
    const { leadId = "" } =
        useParams<{
            leadId: string;
        }>();

    const {
        data: lead,
        isLoading,
        isError,
        error,
    } = useGetLead(
        leadId,
        !!leadId,
    );

    const actualizarEstado =
        useUpdateLeadEstado();

    const [
        confirmarPagoOpen,
        setConfirmarPagoOpen,
    ] = useState(false);

    const handleEstadoChange = (
        value: string,
    ) => {
        if (!lead) return;

        const resultado =
            EstadoLeadSchema.safeParse(
                value,
            );

        if (!resultado.success) {
            return;
        }

        /*
         * PAGO_COMPLETADO es especial porque
         * crea la inscripción y habilita acceso.
         *
         * Por eso primero pedimos confirmación.
         */
        if (
            resultado.data ===
            "PAGO_COMPLETADO"
        ) {
            setConfirmarPagoOpen(true);
            return;
        }

        /*
         * Los demás estados se actualizan
         * normalmente.
         */
        actualizarEstado.mutate({
            id: lead.id,

            data: {
                estado:
                    resultado.data,
            },
        });
    };

    const confirmarPago = () => {
        if (!lead) return;

        actualizarEstado.mutate(
            {
                id: lead.id,

                data: {
                    estado:
                        "PAGO_COMPLETADO",
                },
            },
            {
                onSuccess: () => {
                    setConfirmarPagoOpen(
                        false,
                    );
                },
            },
        );
    };

    const perfil =
        lead?.usuario.perfil;

    const nombreCompleto = [
        perfil?.nombre,
        perfil?.apellidoPaterno,
        perfil?.apellidoMaterno,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <>
            <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title="Detalle del lead"
                    subtitle="Información del estudiante y formación de interés."
                    badge={
                        lead ? (
                            <Badge
                                variant={getEstadoVariant(
                                    lead.estado,
                                )}
                            >
                                {
                                    estadoLabels[
                                    lead.estado
                                    ]
                                }
                            </Badge>
                        ) : undefined
                    }
                />

                <QueryState
                    isLoading={isLoading}
                    isError={
                        isError ||
                        !leadId
                    }
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
                                    value={
                                        nombreCompleto ||
                                        "Sin nombre"
                                    }
                                />

                                <InfoField
                                    label="Correo electrónico"
                                    value={
                                        lead.usuario
                                            .correo
                                    }
                                />

                                <InfoField
                                    label="Teléfono"
                                    value={
                                        perfil?.telefono ||
                                        "Sin teléfono"
                                    }
                                />

                                <InfoField
                                    label="Ciudad"
                                    value={
                                        perfil?.ciudad ||
                                        "Sin ciudad"
                                    }
                                />

                                <InfoField
                                    label="País"
                                    value={
                                        perfil?.pais ||
                                        "Sin país"
                                    }
                                />

                                <InfoField
                                    label="Código de país"
                                    value={
                                        perfil?.paisCodigo ||
                                        "Sin código"
                                    }
                                />
                            </InfoSection>

                            <InfoSection
                                title="Formación"
                                subtitle="Curso y módulo que despertaron el interés del estudiante."
                            >
                                <InfoField
                                    label="Curso"
                                    value={
                                        lead.modulo
                                            .curso
                                            .nombre
                                    }
                                />

                                <InfoField
                                    label="Módulo"
                                    value={
                                        lead.modulo
                                            .nombre
                                    }
                                />

                                <InfoField
                                    label="Estado actual"
                                    value={
                                        <Badge
                                            variant={getEstadoVariant(
                                                lead.estado,
                                            )}
                                        >
                                            {
                                                estadoLabels[
                                                lead
                                                    .estado
                                                ]
                                            }
                                        </Badge>
                                    }
                                />

                                <InfoField
                                    label="Fecha de interés"
                                    value={formatDate(
                                        lead.creadoEn,
                                    )}
                                />

                                <InfoField
                                    label="Último intento"
                                    value={formatDate(
                                        lead.ultimoIntentoEn,
                                    )}
                                />

                                <InfoField
                                    label="Fecha de conversión"
                                    value={formatDate(
                                        lead.convertidoEn,
                                    )}
                                />
                            </InfoSection>

                            <InfoSection
                                title="Seguimiento"
                                subtitle="Actualiza el estado comercial de este interés."
                                withDivider={
                                    false
                                }
                            >
                                <div className="space-y-2 sm:col-span-2">
                                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                        Estado del lead
                                    </p>

                                    <Select
                                        value={
                                            lead.estado
                                        }
                                        onValueChange={
                                            handleEstadoChange
                                        }
                                        disabled={
                                            actualizarEstado.isPending
                                        }
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

                                            <SelectItem value="CONVERTIDO">
                                                Convertido
                                            </SelectItem>

                                            <SelectItem value="DESCARTADO">
                                                Descartado
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Clock3 className="size-3.5" />

                                        Última actualización:{" "}
                                        {formatDate(
                                            lead.actualizadoEn,
                                        )}
                                    </div>
                                </div>
                            </InfoSection>
                        </div>
                    )}
                </QueryState>
            </div>

            {/* CONFIRMACIÓN DE PAGO */}
            <Dialog
                open={confirmarPagoOpen}
                onOpenChange={(value) => {
                    if (
                        actualizarEstado.isPending
                    ) {
                        return;
                    }

                    setConfirmarPagoOpen(
                        value,
                    );
                }}
            >
                <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl sm:rounded-2xl">
                    <DialogHeader>
                        <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <ShieldCheck className="size-6" />
                        </div>

                        <DialogTitle>
                            Confirmar pago
                        </DialogTitle>

                        <DialogDescription className="leading-6">
                            Confirma esta
                            acción solamente si
                            ya verificaste que
                            el estudiante
                            realizó
                            correctamente el
                            pago.
                        </DialogDescription>
                    </DialogHeader>

                    {lead && (
                        <div className="space-y-4 rounded-xl border bg-muted/20 p-4">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Estudiante
                                </p>

                                <p className="mt-1 text-sm font-semibold">
                                    {nombreCompleto ||
                                        lead.usuario
                                            .correo}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Curso
                                </p>

                                <p className="mt-1 text-sm font-semibold">
                                    {
                                        lead.modulo
                                            .curso
                                            .nombre
                                    }
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Módulo
                                </p>

                                <p className="mt-1 text-sm font-semibold">
                                    {
                                        lead.modulo
                                            .nombre
                                    }
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                        <p className="text-sm leading-6">
                            Al confirmar, el
                            estado cambiará a{" "}
                            <strong>
                                Pago completado
                            </strong>
                            . El sistema creará
                            automáticamente la
                            inscripción y
                            habilitará el acceso
                            del estudiante al
                            módulo.
                        </p>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={
                                actualizarEstado.isPending
                            }
                            onClick={() =>
                                setConfirmarPagoOpen(
                                    false,
                                )
                            }
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="button"
                            disabled={
                                actualizarEstado.isPending
                            }
                            onClick={
                                confirmarPago
                            }
                            className="gap-2"
                        >
                            <CheckCircle2 className="size-4" />

                            {actualizarEstado.isPending
                                ? "Confirmando..."
                                : "Sí, confirmar pago"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}