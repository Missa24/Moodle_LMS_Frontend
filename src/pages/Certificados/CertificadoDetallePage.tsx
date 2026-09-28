"use client";

import { useState } from "react";
import {
    Download,
    Pencil,
} from "lucide-react";
import { useParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PageHeader } from "@/components/common/PageHeader";
import { QueryState } from "@/components/common/QueryState";
import { InfoSection } from "@/components/common/info/InfoSection";
import { InfoField } from "@/components/common/info/InfoField";


import { useModulePermissions } from "@/hooks/useModulePermissions";
import { PERMISSIONS } from "@/utils/constants";
import { useActualizarNombreCertificado, useCertificado, useDescargarCertificado } from "@/features/Certificado/Hook/CertificadoHook";

const formatDate = (value?: string | null) => {
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

const getEstadoVariant = (
    estado?: string,
): "default" | "secondary" | "destructive" | "outline" => {
    if (estado === "anulado") {
        return "destructive";
    }

    if (estado === "emitido") {
        return "default";
    }

    return "outline";
};

export function CertificadoDetallePage() {
    const {
        id = "",
    } = useParams<{
        id: string;
    }>();

    const {
        data: certificado,
        isLoading,
        isError,
        error,
    } = useCertificado(
        id,
    );

    const actualizarNombre =
        useActualizarNombreCertificado();

    const descargar =
        useDescargarCertificado();

    const {
        puedeEditar,
    } = useModulePermissions(
        PERMISSIONS.CERTIFICADOS,
    );

    const [
        editandoNombre,
        setEditandoNombre,
    ] = useState(false);

    const [
        nombreCertificado,
        setNombreCertificado,
    ] = useState("");

    const iniciarEdicion = () => {
        if (!certificado) {
            return;
        }

        setNombreCertificado(
            certificado.nombreCertificado ?? "",
        );

        setEditandoNombre(true);
    };

    const cancelarEdicion = () => {
        setEditandoNombre(false);

        setNombreCertificado(
            certificado?.nombreCertificado ?? "",
        );
    };

    const guardarNombre = () => {
        if (!certificado) {
            return;
        }

        actualizarNombre.mutate(
            {
                idCertificado:
                    certificado.idCertificado!,
                nombreCertificado,
            },
            {
                onSuccess: () => {
                    setEditandoNombre(false);
                },
            },
        );
    };

    const handleDescargar = () => {
        if (!certificado?.idCertificado) {
            return;
        }

        descargar.mutate(
            certificado.idCertificado,
        );
    };

    const perfil =
        certificado?.usuario?.perfil;

    const nombreCompleto = [
        perfil?.nombre,
        perfil?.apellidoPaterno,
        perfil?.apellidoMaterno,
    ]
        .filter(Boolean)
        .join(" ");

    const formacion =
        certificado?.curso?.nombre ??
        certificado?.inscripcion?.modulo
            ?.nombre ??
        "Sin formación";

    const tipoFormacion =
        certificado?.curso
            ? "Curso"
            : certificado?.inscripcion
                ?.modulo
                ? "Módulo"
                : "Sin tipo";

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
            <PageHeader
                title="Detalle del certificado"
                subtitle="Consulta y administra la información del certificado emitido."
                badge={
                    certificado ? (
                        <Badge
                            variant={getEstadoVariant(
                                certificado.estado,
                            )}
                        >
                            {certificado.estado}
                        </Badge>
                    ) : undefined
                }
            />

            <QueryState
                isLoading={isLoading}
                isError={isError || !id}
                error={error}
                fallbackMessage="No se pudo cargar el certificado."
            >
                {certificado && (
                    <div className="space-y-8 rounded-2xl border bg-background p-5 sm:p-6">
                        <InfoSection
                            title="Estudiante"
                            subtitle="Información del usuario al que pertenece el certificado."
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
                                    certificado
                                        .usuario
                                        ?.correo ||
                                    "Sin correo"
                                }
                            />

                            <InfoField
                                label="Usuario"
                                value={
                                    certificado
                                        .usuario
                                        ?.username ||
                                    "Sin usuario"
                                }
                            />
                        </InfoSection>

                        <InfoSection
                            title="Formación"
                            subtitle="Formación académica asociada al certificado."
                        >
                            <InfoField
                                label={tipoFormacion}
                                value={formacion}
                            />

                            <InfoField
                                label="Tipo de certificado"
                                value={
                                    certificado.tipo
                                }
                            />

                            <InfoField
                                label="Inscripción"
                                value={
                                    certificado
                                        .inscripcion
                                        ?.numeroInscripcion ||
                                    "Sin inscripción"
                                }
                            />
                        </InfoSection>

                        <InfoSection
                            title="Certificado"
                            subtitle="Información que identifica oficialmente el certificado."
                        >
                            <InfoField
                                label="Nombre en el certificado"
                                value={
                                    editandoNombre ? (
                                        <div className="space-y-3 sm:max-w-lg">
                                            <Input
                                                value={
                                                    nombreCertificado
                                                }
                                                onChange={(
                                                    event,
                                                ) =>
                                                    setNombreCertificado(
                                                        event
                                                            .target
                                                            .value,
                                                    )
                                                }
                                            />

                                            <div className="flex flex-wrap gap-2">
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    disabled={
                                                        actualizarNombre.isPending ||
                                                        !nombreCertificado.trim()
                                                    }
                                                    onClick={
                                                        guardarNombre
                                                    }
                                                >
                                                    {actualizarNombre.isPending
                                                        ? "Guardando..."
                                                        : "Guardar"}
                                                </Button>

                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={
                                                        actualizarNombre.isPending
                                                    }
                                                    onClick={
                                                        cancelarEdicion
                                                    }
                                                >
                                                    Cancelar
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span>
                                                {
                                                    certificado
                                                        .nombreCertificado ||
                                                    "Sin nombre"
                                                }
                                            </span>

                                            {puedeEditar &&
                                                certificado.estado !==
                                                "anulado" && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="gap-2"
                                                        onClick={
                                                            iniciarEdicion
                                                        }
                                                    >
                                                        <Pencil className="size-4" />
                                                        Editar
                                                    </Button>
                                                )}
                                        </div>
                                    )
                                }
                            />

                            <InfoField
                                label="Número de certificado"
                                value={
                                    certificado
                                        .numeroCertificado ||
                                    "Sin número"
                                }
                            />

                            <InfoField
                                label="Código de verificación"
                                value={
                                    certificado
                                        .codigoVerificacion ||
                                    "Sin código"
                                }
                            />

                            <InfoField
                                label="Estado"
                                value={
                                    <Badge
                                        variant={getEstadoVariant(
                                            certificado.estado,
                                        )}
                                    >
                                        {
                                            certificado.estado
                                        }
                                    </Badge>
                                }
                            />
                        </InfoSection>

                        <InfoSection
                            title="Emisión"
                            subtitle="Información relacionada con la emisión del certificado."
                        >
                            <InfoField
                                label="Fecha de emisión"
                                value={formatDate(
                                    certificado.fechaEmision,
                                )}
                            />

                            <InfoField
                                label="Descripción"
                                value={
                                    certificado.descripcion ||
                                    "Sin descripción"
                                }
                            />
                        </InfoSection>

                        <InfoSection
                            title="Acciones"
                            subtitle="Acciones disponibles para este certificado."
                            withDivider={false}
                        >
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    type="button"
                                    className="gap-2"
                                    disabled={
                                        descargar.isPending ||
                                        !certificado.idCertificado
                                    }
                                    onClick={
                                        handleDescargar
                                    }
                                >
                                    <Download className="size-4" />

                                    {descargar.isPending
                                        ? "Descargando..."
                                        : "Descargar certificado"}
                                </Button>
                            </div>
                        </InfoSection>
                    </div>
                )}
            </QueryState>
        </div>
    );
}