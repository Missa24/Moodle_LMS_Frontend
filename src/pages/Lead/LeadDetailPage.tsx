"use client";

import { Clock3 } from "lucide-react";
import { useParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { QueryState } from "@/components/common/QueryState";
import { AppTitle } from "@/components/common/Apptittle";
import { NoPermission } from "@/components/common/NoPermission";
import { InfoSection } from "@/components/common/info/InfoSection";
import { InfoField } from "@/components/common/info/InfoField";

import { EstadoLeadSchema, type EstadoLeadType } from "@/features/Lead/Schema/LeadSchema";
import { useGetLead, useUpdateLeadEstado } from "@/features/Lead/Hook/LeadHook";

import { useModulePermissions } from "@/hooks/useModulePermissions";
import { PERMISSIONS } from "@/utils/constants";

const estadoLabels: Record<EstadoLeadType, string> = {
    INTERESADO: "Interesado",
    PAGO_INICIADO: "Pago iniciado",
    CONVERTIDO: "Convertido",
    DESCARTADO: "Descartado",
};

const getEstadoVariant = (
    estado: EstadoLeadType,
): "default" | "secondary" | "destructive" | "outline" => {
    switch (estado) {
        case "CONVERTIDO":
            return "default";
        case "PAGO_INICIADO":
            return "secondary";
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

    const { puedeVer } = useModulePermissions(PERMISSIONS.LEADS);

    const { data: lead, isLoading, isError, error } = useGetLead(
        leadId,
        puedeVer && !!leadId,
    );

    const actualizarEstado = useUpdateLeadEstado();

    const handleEstadoChange = (value: string) => {
        if (!lead) return;

        const resultado = EstadoLeadSchema.safeParse(value);

        if (!resultado.success) return;

        actualizarEstado.mutate({
            id: lead.id,
            data: { estado: resultado.data },
        });
    };

    const perfil = lead?.usuario.perfil;

    const nombreCompleto = [
        perfil?.nombre,
        perfil?.apellidoPaterno,
        perfil?.apellidoMaterno,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
            <AppTitle
                title="Detalle del lead"
                subtitle="Información del estudiante y formación de interés."
                badge={
                    puedeVer && lead ? (
                        <Badge variant={getEstadoVariant(lead.estado)}>
                            {estadoLabels[lead.estado]}
                        </Badge>
                    ) : undefined
                }
            />

            {!puedeVer ? (
                <NoPermission message="No tienes permisos para ver este lead" />
            ) : (
                <QueryState
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                    fallbackMessage="No se pudo cargar el lead."
                >
                    {lead && (
                        <div className="space-y-8 rounded-2xl border bg-background p-5 sm:p-6">
                            <InfoSection
                                title="Estudiante"
                                subtitle="Información personal y datos de contacto."
                            >
                                <InfoField label="Nombre completo" value={nombreCompleto || "Sin nombre"} />
                                <InfoField label="Correo electrónico" value={lead.usuario.correo} />
                                <InfoField label="Teléfono" value={perfil?.telefono || "Sin teléfono"} />
                                <InfoField label="Ciudad" value={perfil?.ciudad || "Sin ciudad"} />
                                <InfoField label="País" value={perfil?.pais || "Sin país"} />
                                <InfoField label="Código de país" value={perfil?.paisCodigo || "Sin código"} />
                            </InfoSection>

                            <InfoSection
                                title="Formación"
                                subtitle="Curso y módulo que despertaron el interés del estudiante."
                            >
                                <InfoField label="Curso" value={lead.modulo.curso.nombre} />
                                <InfoField label="Módulo" value={lead.modulo.nombre} />

                                <InfoField
                                    label="Estado actual"
                                    value={
                                        <Badge variant={getEstadoVariant(lead.estado)}>
                                            {estadoLabels[lead.estado]}
                                        </Badge>
                                    }
                                />

                                <InfoField label="Fecha de interés" value={formatDate(lead.creadoEn)} />
                                <InfoField label="Último intento" value={formatDate(lead.ultimoIntentoEn)} />
                                <InfoField label="Fecha de conversión" value={formatDate(lead.convertidoEn)} />
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
                                            <SelectItem value="INTERESADO">Interesado</SelectItem>
                                            <SelectItem value="PAGO_INICIADO">Pago iniciado</SelectItem>
                                            <SelectItem value="CONVERTIDO">Convertido</SelectItem>
                                            <SelectItem value="DESCARTADO">Descartado</SelectItem>
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
            )}
        </div>
    );
}