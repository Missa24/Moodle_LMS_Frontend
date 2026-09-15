import {
    ArrowLeft,
} from "lucide-react";

import {
    Link,
    useParams,
} from "react-router-dom";


import { useVerificarCertificado } from "@/features/Certificado/Hook/CertificadoHook";

import {
    CertificadoVerificationStatus,
    VerificationHeader,
} from "@/features/Certificado/Components/CertificadoVerificationStatus";

import { CertificadoInfo } from "@/features/Certificado/Components/CertificadoInfo";

import { CertificadoVerificationCode } from "@/features/Certificado/Components/CertificadoVerificationCode";
import { QueryState } from "@/components/common/QueryState";

export default function VerificarCertificadoPage() {
    const {
        codigo,
    } = useParams<{
        codigo: string;
    }>();

    const {
        data,
        isLoading,
        isError,
        error,
    } =
        useVerificarCertificado(
            codigo
        );

    return (
        <main className="min-h-screen bg-muted/20 px-4 pb-12 pt-24 sm:px-6 sm:pt-28">
            <Link
                to="/"
                className="fixed left-5 top-5 z-50 inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-muted sm:left-8 sm:top-8"
            >
                <ArrowLeft className="size-4" />

                Ir al sitio web
            </Link>

            <div className="mx-auto max-w-3xl">
                <QueryState
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                    minHeight="min-h-[65vh]"
                    fallbackMessage="No se pudo verificar el certificado."
                >
                    {data && (
                        <>
                            <VerificationHeader
                                valido={data.valido}
                            />

                            <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                                <CertificadoVerificationStatus
                                    valido={data.valido}
                                    codigo={data.certificado.codigoVerificacion}
                                />

                                <CertificadoInfo
                                    certificado={data.certificado}
                                />

                                <div className="border-t border-border px-6 pb-6 sm:px-8 sm:pb-8">
                                    <CertificadoVerificationCode
                                        codigo={data.certificado.codigoVerificacion}
                                    />
                                </div>
                            </div>

                            <p className="mt-6 text-center text-xs text-muted-foreground">
                                Este certificado fue verificado mediante el sistema oficial de certificación de Elite Academy.
                            </p>
                        </>
                    )}
                </QueryState>
            </div>
        </main>
    );
}