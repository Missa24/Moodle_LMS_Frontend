interface CertificadoVerificationCodeProps {
    codigo: string;
}

export function CertificadoVerificationCode({
    codigo,
}: CertificadoVerificationCodeProps) {
    return (
        <div className="mt-6 rounded-xl border border-dashed p-5 text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Código de verificación
            </p>

            <p className="mt-2 font-mono text-lg font-bold tracking-widest">
                {codigo}
            </p>
        </div>
    );
}