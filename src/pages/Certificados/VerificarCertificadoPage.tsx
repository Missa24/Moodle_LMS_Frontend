import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useVerificarCertificado } from "@/features/Certificado/Hook/CertificadoHook";
import {
    CertificadoVerificationStatus,
    VerificationHeader,
} from "@/features/Certificado/Components/CertificadoVerificationStatus";
import { CertificadoInfo } from "@/features/Certificado/Components/CertificadoInfo";
import { CertificadoVerificationCode } from "@/features/Certificado/Components/CertificadoVerificationCode";

export default function VerificarCertificadoPage() {
    const { codigo } = useParams<{
        codigo: string;
    }>();

    const {
        data,
        isLoading,
        isError,
    } = useVerificarCertificado(codigo);

    if (isLoading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center px-4">
                <Link
                    to="/"
                    className="fixed left-5 top-5 z-50 flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-muted sm:left-8 sm:top-8"
                >
                    <ArrowLeft className="size-4" />

                    Ir al sitio web
                </Link>
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>

                    <div>
                        <h1 className="text-lg font-semibold">
                            Verificando certificado
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Estamos comprobando el código de verificación...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center px-4">
                <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
                        <XCircle className="h-8 w-8 text-red-600" />
                    </div>

                    <h1 className="mt-5 text-xl font-bold">
                        Certificado no encontrado
                    </h1>

                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        No encontramos ningún certificado asociado al código de
                        verificación proporcionado.
                    </p>

                    {codigo && (
                        <div className="mt-5 rounded-lg bg-muted p-3">
                            <p className="text-xs text-muted-foreground">
                                Código consultado
                            </p>

                            <p className="mt-1 font-mono text-sm font-semibold">
                                {codigo}
                            </p>
                        </div>
                    )}

                    <Button asChild className="mt-6">
                        <Link to="/">
                            Volver al inicio
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    const { certificado, valido } = data;

    return (
        <div className="min-h-[80vh] bg-muted/20 px-4 py-10">
            <div className="mx-auto max-w-3xl">
                <VerificationHeader valido={valido} />

                <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                    <CertificadoVerificationStatus
                        valido={valido}
                        codigo={certificado.codigoVerificacion}
                    />

                    <CertificadoInfo
                        certificado={certificado}
                    />

                    <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                        <CertificadoVerificationCode
                            codigo={certificado.codigoVerificacion}
                        />
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                    Este certificado fue verificado mediante el sistema oficial
                    de certificación.
                </p>
            </div>
        </div>
    );
}
