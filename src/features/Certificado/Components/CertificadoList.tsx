import { Certificado } from "../Schema/CertificadoSchema";
import { CertificadoCard } from "./CardCertificado";

interface CertificadoListProps {
    certificados: Certificado[];
    onDownload: (idCertificado: string) => void;
    onEmitir: (
        certificado: Certificado,
        nombreCertificado: string,
    ) => void;
    downloadingId?: string;
    emittingId?: string;
}

export function CertificadoList({
    certificados,
    onDownload,
    onEmitir,
    downloadingId,
    emittingId,
}: CertificadoListProps) {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certificados.map((certificado) => {
                const certificadoKey =
                    certificado.idCertificado ??
                    certificado.idInscripcion ??
                    certificado.idCurso ??
                    "";

                return (
                    <CertificadoCard
                        key={certificadoKey}
                        certificado={certificado}
                        onDownload={onDownload}
                        onEmitir={onEmitir}
                        isDownloading={
                            downloadingId ===
                            certificado.idCertificado
                        }
                        isEmitting={
                            emittingId === certificadoKey
                        }
                    />
                );
            })}
        </div>
    );
}