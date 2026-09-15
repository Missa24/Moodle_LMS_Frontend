import {
    CalendarDays,
    GraduationCap,
    Hash,
    IdCard,
    User,
} from "lucide-react";

import { InfoField } from "@/components/common/info/InfoField";

interface CertificadoInfoProps {
    certificado: {
        titulo: string;
        numeroCertificado: string;
        fechaEmision: string;

        estudiante: {
            nombreCompleto: string;
            tipoDocumentoIdentidad:
            | string
            | null;
            numeroDocumento:
            | string
            | null;
        };

        curso?: {
            nombre: string;
        } | null;

        modulo?: {
            nombre: string;
        } | null;

        inscripcion?: {
            numeroInscripcion: string;
        } | null;
    };
}

export function CertificadoInfo({
    certificado,
}: CertificadoInfoProps) {
    const documento =
        certificado.estudiante
            .numeroDocumento
            ? `${certificado.estudiante
                .tipoDocumentoIdentidad ??
            "Documento"
            }: ${certificado.estudiante
                .numeroDocumento
            }`
            : "No registrado";

    return (
        <div className="p-6 sm:p-8">
            <div className="mb-8 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Certificado
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                    {
                        certificado.titulo
                    }
                </h2>
            </div>

            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <InfoItem
                    icon={
                        <User className="size-5" />
                    }
                    label="Estudiante"
                    value={
                        certificado
                            .estudiante
                            .nombreCompleto ||
                        "No registrado"
                    }
                />

                <InfoItem
                    icon={
                        <IdCard className="size-5" />
                    }
                    label="Documento"
                    value={
                        documento
                    }
                />

                {certificado.curso && (
                    <InfoItem
                        icon={
                            <GraduationCap className="size-5" />
                        }
                        label="Curso"
                        value={
                            certificado
                                .curso
                                .nombre
                        }
                    />
                )}

                {certificado.modulo && (
                    <InfoItem
                        icon={
                            <GraduationCap className="size-5" />
                        }
                        label="Módulo"
                        value={
                            certificado
                                .modulo
                                .nombre
                        }
                    />
                )}

                <InfoItem
                    icon={
                        <CalendarDays className="size-5" />
                    }
                    label="Fecha de emisión"
                    value={new Date(
                        certificado.fechaEmision
                    ).toLocaleDateString(
                        "es-BO",
                        {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        }
                    )}
                />

                <InfoItem
                    icon={
                        <Hash className="size-5" />
                    }
                    label="N.º de certificado"
                    value={
                        certificado
                            .numeroCertificado
                    }
                    valueClassName="font-mono text-sm font-semibold"
                />

                {certificado.inscripcion && (
                    <InfoItem
                        icon={
                            <Hash className="size-5" />
                        }
                        label="N.º de inscripción"
                        value={
                            certificado
                                .inscripcion
                                .numeroInscripcion
                        }
                        valueClassName="font-mono text-sm font-semibold"
                    />
                )}
            </div>
        </div>
    );
}

interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    valueClassName?: string;
}

function InfoItem({
    icon,
    label,
    value,
    valueClassName,
}: InfoItemProps) {
    return (
        <div className="flex items-start gap-3 border-b border-border/70 pb-4">
            <div className="mt-0.5 text-primary">
                {icon}
            </div>

            <InfoField
                label={label}
                value={value}
                valueClassName={
                    valueClassName ??
                    "mt-1 text-sm font-semibold text-foreground"
                }
            />
        </div>
    );
}