import {
    BadgeCheck,
    ShieldCheck,
    XCircle,
} from "lucide-react";

interface CertificadoVerificationStatusProps {
    valido: boolean;
    codigo: string;
}

export function CertificadoVerificationStatus({
    valido,
    codigo,
}: CertificadoVerificationStatusProps) {
    return (
        <div
            className={`flex items-center gap-3 border-b px-6 py-4 ${
                valido
                    ? "bg-emerald-50 dark:bg-emerald-950/20"
                    : "bg-red-50 dark:bg-red-950/20"
            }`}
        >
            <ShieldCheck
                className={`h-5 w-5 ${
                    valido
                        ? "text-emerald-600"
                        : "text-red-600"
                }`}
            />

            <div>
                <p
                    className={`text-sm font-semibold ${
                        valido
                            ? "text-emerald-700 dark:text-emerald-400"
                            : "text-red-700 dark:text-red-400"
                    }`}
                >
                    {valido
                        ? "Certificado verificado"
                        : "Certificado no válido"}
                </p>

                <p className="text-xs text-muted-foreground">
                    Código: {codigo}
                </p>
            </div>
        </div>
    );
}

interface VerificationHeaderProps {
    valido: boolean;
}

export function VerificationHeader({
    valido,
}: VerificationHeaderProps) {
    return (
        <div className="mb-8 text-center">
            <div
                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
                    valido
                        ? "bg-emerald-100 dark:bg-emerald-950/40"
                        : "bg-red-100 dark:bg-red-950/40"
                }`}
            >
                {valido ? (
                    <BadgeCheck className="h-10 w-10 text-emerald-600" />
                ) : (
                    <XCircle className="h-10 w-10 text-red-600" />
                )}
            </div>

            <h1 className="mt-5 text-2xl font-bold tracking-tight">
                {valido
                    ? "Certificado válido"
                    : "Certificado no válido"}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
                Verificación oficial del certificado
            </p>
        </div>
    );
}