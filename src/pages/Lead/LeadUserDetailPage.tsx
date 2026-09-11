"use client";

import { useState } from "react";
import {
    CheckCircle2,
    Eye,
    GraduationCap,
    ShieldCheck,
} from "lucide-react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { QueryState } from "@/components/common/QueryState";
import { PageHeader } from "@/components/common/PageHeader";
import { InfoField } from "@/components/common/info/InfoField";
import { InfoSection } from "@/components/common/info/InfoSection";

import { useGetUser } from "@/features/Usuario/Hook/UsuarioHook";

import {
    useGetLeadsByUser,
    useUpdateLeadEstado,
} from "@/features/Lead/Hook/LeadHook";

import type {
    EstadoLeadType,
    LeadUsuarioModuloType,
} from "@/features/Lead/Schema/LeadSchema";

const estadoLabels: Record<
    EstadoLeadType,
    string
> = {
    INTERESADO: "Interesado",
    PAGO_COMPLETADO: "Pago completado",
    CONVERTIDO: "Convertido",
    DESCARTADO: "Descartado",
};

const getEstadoVariant = (
    estado: EstadoLeadType,
):
    | "default"
    | "secondary"
    | "destructive"
    | "outline" => {
    switch (estado) {
        case "CONVERTIDO":
            return "default";

        case "PAGO_COMPLETADO":
            return "secondary";

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

export default function LeadUserDetailPage() {
    const navigate = useNavigate();

    const { usuarioId = "" } =
        useParams<{
            usuarioId: string;
        }>();

    const usuarioQuery =
        useGetUser(
            usuarioId,
            !!usuarioId,
        );

    const leadsQuery =
        useGetLeadsByUser(
            usuarioId,
            !!usuarioId,
        );

    const actualizarEstado =
        useUpdateLeadEstado();

    const [dialogPagoOpen, setDialogPagoOpen] =
        useState(false);

    const [
        leadSeleccionado,
        setLeadSeleccionado,
    ] =
        useState<LeadUsuarioModuloType | null>(
            null,
        );

    const usuario =
        usuarioQuery.data;

    const leads =
        leadsQuery.data ?? [];

    const perfil =
        usuario?.perfil;

    const nombreCompleto = [
        perfil?.nombre,
        perfil?.apellidoPaterno,
        perfil?.apellidoMaterno,
    ]
        .filter(Boolean)
        .join(" ");

    const isLoading =
        usuarioQuery.isLoading ||
        leadsQuery.isLoading;

    const isError =
        usuarioQuery.isError ||
        leadsQuery.isError;

    const error =
        usuarioQuery.error ??
        leadsQuery.error;

    const abrirConfirmacionPago = (
        lead: LeadUsuarioModuloType,
    ) => {
        setLeadSeleccionado(lead);
        setDialogPagoOpen(true);
    };

    const confirmarPago = () => {
        if (!leadSeleccionado) {
            return;
        }

        actualizarEstado.mutate(
            {
                id: leadSeleccionado.id,

                data: {
                    estado:
                        "PAGO_COMPLETADO",
                },
            },
            {
                onSuccess: () => {
                    setDialogPagoOpen(
                        false,
                    );

                    setLeadSeleccionado(
                        null,
                    );
                },
            },
        );
    };

    const handleDialogPagoChange = (
        value: boolean,
    ) => {
        if (
            actualizarEstado.isPending
        ) {
            return;
        }

        setDialogPagoOpen(value);

        if (!value) {
            setLeadSeleccionado(
                null,
            );
        }
    };

    return (
        <>
            <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title={
                        nombreCompleto
                            ? `Intereses de ${nombreCompleto}`
                            : "Intereses del estudiante"
                    }
                    subtitle="Formaciones y módulos en los que este estudiante mostró interés."
                    badge={
                        <Badge variant="secondary">
                            {leads.length}{" "}
                            {leads.length === 1
                                ? "interés"
                                : "intereses"}
                        </Badge>
                    }
                />

                <QueryState
                    isLoading={
                        isLoading
                    }
                    isError={
                        isError ||
                        !usuarioId
                    }
                    error={error}
                    fallbackMessage="No se pudo cargar la información del estudiante."
                >
                    {usuario && (
                        <div className="space-y-8">
                            <div className="rounded-2xl border bg-background p-5 sm:p-6">
                                <InfoSection
                                    title="Estudiante"
                                    subtitle="Información principal y datos de contacto."
                                    withDivider={
                                        false
                                    }
                                >
                                    <InfoField
                                        label="Nombre completo"
                                        value={
                                            nombreCompleto ||
                                            "Sin nombre"
                                        }
                                    />

                                    <InfoField
                                        label="Usuario"
                                        value={
                                            usuario.username
                                        }
                                    />

                                    <InfoField
                                        label="Correo electrónico"
                                        value={
                                            usuario.correo
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
                                </InfoSection>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-lg font-semibold tracking-tight">
                                        Formaciones de
                                        interés
                                    </h2>

                                    <p className="text-sm text-muted-foreground">
                                        Cada registro
                                        corresponde a un
                                        módulo diferente.
                                    </p>
                                </div>

                                {leads.length >
                                    0 ? (
                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                        {leads.map(
                                            (
                                                lead,
                                            ) => (
                                                <div
                                                    key={
                                                        lead.id
                                                    }
                                                    className="group rounded-2xl border bg-background p-5 transition-colors hover:border-primary/30"
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex min-w-0 items-start gap-3">
                                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                                <GraduationCap className="size-5" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="truncate text-sm font-semibold">
                                                                    {
                                                                        lead
                                                                            .modulo
                                                                            .curso
                                                                            .nombre
                                                                    }
                                                                </p>

                                                                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                                                                    {
                                                                        lead
                                                                            .modulo
                                                                            .nombre
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>

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
                                                    </div>

                                                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                                                            label="Conversión"
                                                            value={formatDate(
                                                                lead.convertidoEn,
                                                            )}
                                                        />
                                                    </div>

                                                    <div className="mt-5 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:justify-end">
                                                        {lead.estado !==
                                                            "PAGO_COMPLETADO" &&
                                                            lead.estado !==
                                                            "CONVERTIDO" && (
                                                                <Button
                                                                    type="button"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        abrirConfirmacionPago(
                                                                            lead,
                                                                        )
                                                                    }
                                                                    className="gap-2"
                                                                >
                                                                    <CheckCircle2 className="size-4" />
                                                                    Confirmar
                                                                    pago
                                                                </Button>
                                                            )}

                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/panel/leads/${lead.id}`,
                                                                )
                                                            }
                                                        >
                                                            <Eye className="mr-2 size-4" />

                                                            Ver
                                                            lead
                                                        </Button>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    <div className="rounded-2xl border border-dashed p-10 text-center">
                                        <GraduationCap className="mx-auto size-8 text-muted-foreground" />

                                        <p className="mt-3 font-medium">
                                            Sin
                                            formaciones
                                            de interés
                                        </p>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Este
                                            estudiante
                                            todavía no
                                            tiene leads
                                            registrados.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </QueryState>
            </div>

            <Dialog
                open={dialogPagoOpen}
                onOpenChange={
                    handleDialogPagoChange
                }
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
                            acción únicamente
                            si ya verificaste
                            que el estudiante
                            completó
                            correctamente el
                            pago.
                        </DialogDescription>
                    </DialogHeader>

                    {leadSeleccionado && (
                        <div className="space-y-3 rounded-xl border bg-muted/20 p-4">
                            <div>
                                <p className="text-xs font-medium text-muted-foreground">
                                    Curso
                                </p>

                                <p className="mt-1 text-sm font-semibold">
                                    {
                                        leadSeleccionado
                                            .modulo
                                            .curso
                                            .nombre
                                    }
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-muted-foreground">
                                    Módulo
                                </p>

                                <p className="mt-1 text-sm font-semibold">
                                    {
                                        leadSeleccionado
                                            .modulo
                                            .nombre
                                    }
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                        <p className="text-sm leading-6">
                            Al confirmar el
                            pago, el estado del
                            lead cambiará a{" "}
                            <span className="font-semibold">
                                Pago completado
                            </span>
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
                                handleDialogPagoChange(
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