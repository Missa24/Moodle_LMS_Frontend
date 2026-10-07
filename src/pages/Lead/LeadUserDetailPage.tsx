"use client";

import {
    useState,
} from "react";

import {
    CheckCircle2,
    Eye,
    GraduationCap,
} from "lucide-react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { QueryState } from "@/components/common/QueryState";
import { PageHeader } from "@/components/common/PageHeader";
import { InfoField } from "@/components/common/info/InfoField";
import { InfoSection } from "@/components/common/info/InfoSection";

import {
    useGetUser,
} from "@/features/Usuario/Hook/UsuarioHook";

import {
    useGetLead,
    useGetLeadsByUser,
} from "@/features/Lead/Hook/LeadHook";

import {
    ConfirmarPagoLeadDialog,
} from "@/features/Lead/Components/ConfirmarPagoLeadDialog";

import type {
    EstadoLeadType,
    LeadUsuarioType,
} from "@/features/Lead/Schema/LeadSchema";

const estadoLabels: Record<
    EstadoLeadType,
    string
> = {
    INTERESADO:
        "Interesado",

    PAGO_COMPLETADO:
        "Pago completado",

    CONVERTIDO:
        "Convertido",

    DESCARTADO:
        "Descartado",
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

    return new Date(
        value,
    ).toLocaleString(
        "es-BO",
        {
            dateStyle:
                "medium",

            timeStyle:
                "short",
        },
    );
};

const getCursoNombre = (
    lead: LeadUsuarioType,
) =>
    lead.tipoCompra ===
        "CURSO"
        ? lead.curso
            ?.nombre ??
        "Sin curso"
        : lead.modulo
            ?.curso
            .nombre ??
        "Sin curso";

const getProductoNombre = (
    lead: LeadUsuarioType,
) =>
    lead.tipoCompra ===
        "CURSO"
        ? "Curso completo"
        : lead.modulo
            ?.nombre ??
        "Sin módulo";

export default function LeadUserDetailPage() {
    const navigate =
        useNavigate();

    const {
        usuarioId = "",
    } =
        useParams<{
            usuarioId: string;
        }>();

    const [
        dialogPagoOpen,
        setDialogPagoOpen,
    ] =
        useState(false);

    const [
        leadSeleccionadoId,
        setLeadSeleccionadoId,
    ] =
        useState<string | null>(
            null,
        );

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

    const leadDetalleQuery =
        useGetLead(
            leadSeleccionadoId ?? "",
            !!leadSeleccionadoId,
        );

    const usuario =
        usuarioQuery.data;

    const leads =
        leadsQuery.data ??
        [];

    const perfil =
        usuario?.perfil;

    const nombreCompleto =
        [
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

    const abrirConfirmacionPago =
        (
            lead: LeadUsuarioType,
        ) => {
            setLeadSeleccionadoId(
                lead.id,
            );

            setDialogPagoOpen(
                true,
            );
        };

    const handleDialogPagoChange =
        (
            value: boolean,
        ) => {
            setDialogPagoOpen(
                value,
            );

            if (!value) {
                setLeadSeleccionadoId(
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
                    subtitle="Módulos y cursos en los que este estudiante mostró interés."
                    badge={
                        <Badge variant="secondary">
                            {
                                leads.length
                            }{" "}
                            {leads.length ===
                                1
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
                    error={
                        error
                    }
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
                                            perfil
                                                ?.telefono ||
                                            "Sin teléfono"
                                        }
                                    />

                                    <InfoField
                                        label="Ciudad"
                                        value={
                                            perfil
                                                ?.ciudad ||
                                            "Sin ciudad"
                                        }
                                    />

                                    <InfoField
                                        label="País"
                                        value={
                                            perfil
                                                ?.pais ||
                                            "Sin país"
                                        }
                                    />
                                </InfoSection>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-lg font-semibold tracking-tight">
                                        Formaciones de interés
                                    </h2>

                                    <p className="text-sm text-muted-foreground">
                                        Cada registro corresponde a una compra de módulo o curso completo.
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
                                                                <div className="flex flex-wrap items-center gap-2">
                                                                    <p className="truncate text-sm font-semibold">
                                                                        {getCursoNombre(
                                                                            lead,
                                                                        )}
                                                                    </p>

                                                                    <Badge
                                                                        variant="secondary"
                                                                        className="text-[10px]"
                                                                    >
                                                                        {lead.tipoCompra ===
                                                                            "CURSO"
                                                                            ? "CURSO"
                                                                            : "MÓDULO"}
                                                                    </Badge>
                                                                </div>

                                                                <p className="mt-1 truncate text-sm text-muted-foreground">
                                                                    {getProductoNombre(
                                                                        lead,
                                                                    )}
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
                                                                lead.estado
                                                                ]
                                                            }
                                                        </Badge>
                                                    </div>

                                                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                        <InfoField
                                                            label="Tipo de compra"
                                                            value={
                                                                lead.tipoCompra ===
                                                                    "CURSO"
                                                                    ? "Curso completo"
                                                                    : "Módulo"
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
                                                            "CONVERTIDO" &&
                                                            lead.estado !==
                                                            "DESCARTADO" && (
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

                                                                    Confirmar pago
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

                                                            Ver lead
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
                                            Sin formaciones de interés
                                        </p>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Este estudiante todavía no tiene leads registrados.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </QueryState>
            </div>

            <ConfirmarPagoLeadDialog
                open={dialogPagoOpen}
                onOpenChange={handleDialogPagoChange}
                lead={leadDetalleQuery.data ?? null}
                estudianteNombre={nombreCompleto || usuario?.correo}
                onSuccess={() => {
                    setLeadSeleccionadoId(null,);
                }}
            />
        </>
    );
}
