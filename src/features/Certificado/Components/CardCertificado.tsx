import { Download, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Certificado } from "../Schema/CertificadoSchema";

import certificado_preview from "@/assets/certificado_preview.png";

interface CertificadoCardProps {
    certificado: Certificado;
    onDownload: (idCertificado: string) => void;
    onEmitir: (
        certificado: Certificado,
        nombreCertificado: string,
    ) => void;
    isDownloading?: boolean;
    isEmitting?: boolean;
}

export function CertificadoCard({
    certificado,
    onDownload,
    onEmitir,
    isDownloading = false,
    isEmitting = false,
}: CertificadoCardProps) {
    const esPendiente =
        certificado.estado === "pendiente_emision";

    const [nombreCertificado, setNombreCertificado] =
        useState(
            certificado.nombreCertificado ??
            certificado.nombreSugerido ??
            "",
        );

    useEffect(() => {
        setNombreCertificado(
            certificado.nombreCertificado ??
            certificado.nombreSugerido ??
            "",
        );
    }, [
        certificado.nombreCertificado,
        certificado.nombreSugerido,
    ]);

    const puedeEmitir =
        nombreCertificado.trim().length > 0 &&
        !isEmitting;

    const handleEmitir = () => {
        const nombre = nombreCertificado.trim();

        if (!nombre) {
            return;
        }

        onEmitir(certificado, nombre);
    };

    const handleDownload = () => {
        if (!certificado.idCertificado) {
            return;
        }

        onDownload(certificado.idCertificado);
    };

    return (
        <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="flex gap-4 p-3">
                <div className="h-24 w-32 shrink-0 overflow-hidden rounded-md border bg-muted">
                    <img
                        src={certificado_preview}
                        alt="Vista previa del certificado"
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Certificado de{" "}
                            {certificado.tipo === "curso"
                                ? "curso"
                                : "módulo"}
                        </p>

                        <h3 className="mt-1 truncate text-sm font-semibold">
                            {certificado.nombre}
                        </h3>

                        {esPendiente ? (
                            <div className="mt-2">
                                <label
                                    htmlFor={`nombre-certificado-${certificado.idInscripcion ?? certificado.idCurso}`}
                                    className="mb-1.5 block text-xs font-medium text-muted-foreground"
                                >
                                    Nombre para tu certificado
                                </label>

                                <Input
                                    id={`nombre-certificado-${certificado.idInscripcion ?? certificado.idCurso}`}
                                    value={nombreCertificado}
                                    onChange={(event) =>
                                        setNombreCertificado(
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Ingresa tu nombre"
                                    disabled={isEmitting}
                                    maxLength={150}
                                    className="h-8 text-xs"
                                />
                            </div>
                        ) : (
                            certificado.nombreCertificado && (
                                <p className="mt-1 truncate text-xs text-muted-foreground">
                                    A nombre de:{" "}
                                    {certificado.nombreCertificado}
                                </p>
                            )
                        )}
                    </div>

                    {esPendiente ? (
                        <Button
                            size="sm"
                            className="mt-2 w-fit transition-all hover:-translate-y-0.5 hover:shadow-sm"
                            onClick={handleEmitir}
                            disabled={!puedeEmitir}
                        >
                            {isEmitting ? (
                                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-3.5 w-3.5" />
                            )}

                            {isEmitting
                                ? "Emitiendo..."
                                : "Guardar y emitir"}
                        </Button>
                    ) : (
                        <Button
                            size="sm"
                            className="mt-2 w-fit transition-all hover:-translate-y-0.5 hover:shadow-sm"
                            onClick={handleDownload}
                            disabled={
                                isDownloading ||
                                !certificado.idCertificado
                            }
                        >
                            {isDownloading ? (
                                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                            ) : (
                                <Download className="mr-2 h-3.5 w-3.5" />
                            )}

                            {isDownloading
                                ? "Descargando..."
                                : "Descargar"}
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}