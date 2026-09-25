import certificado_preview from "@/assets/certificado_preview.png";

export function CertificadoEmpty() {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-full max-w-sm overflow-hidden rounded-xl border bg-muted/20 opacity-70">
                <img
                    src={certificado_preview}
                    alt="Certificado"
                    className="w-full grayscale"
                />
            </div>

            <p className="mt-5 text-sm font-medium">
                Aún no tienes certificados
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
                Cuando completes una certificación, aparecerá aquí.
            </p>
        </div>
    );
}