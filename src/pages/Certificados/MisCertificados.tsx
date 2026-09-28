import { AppTitle } from "@/components/common/Apptittle";
import { QueryState } from "@/components/common/QueryState";
import { CertificadoEmpty } from "@/features/Certificado/Components/CertificadoEmpty";
import { CertificadoList } from "@/features/Certificado/Components/CertificadoList";
import {
    useDescargarCertificado,
    useEmitirCertificadoCurso,
    useEmitirCertificadoModulo,
    useMisCertificados,
} from "@/features/Certificado/Hook/CertificadoHook";

const MisCertificados = () => {
    const certificadosQuery = useMisCertificados();

    const {
        mutate: descargar,
        isPending: isDownloading,
        variables: downloadingId,
    } = useDescargarCertificado();

    const {
        mutate: emitirModulo,
        isPending: isEmitiendoModulo,
        variables: moduloVariables,
    } = useEmitirCertificadoModulo();

    const {
        mutate: emitirCurso,
        isPending: isEmitiendoCurso,
        variables: cursoVariables,
    } = useEmitirCertificadoCurso();

    const certificados = certificadosQuery.data ?? [];

    const handleEmitir = (
        certificado: (typeof certificados)[number],
        nombreCertificado: string,
    ) => {
        if (certificado.tipo === "modulo") {
            if (!certificado.idInscripcion) return;

            emitirModulo({
                inscripcionId: certificado.idInscripcion,
                nombreCertificado,
            });

            return;
        }

        if (certificado.tipo === "curso") {
            if (!certificado.idCurso) return;

            emitirCurso({
                cursoId: certificado.idCurso,
                nombreCertificado,
            });
        }
    };

    const emittingId =
        isEmitiendoModulo && moduloVariables
            ? moduloVariables.inscripcionId
            : isEmitiendoCurso && cursoVariables
                ? cursoVariables.cursoId
                : undefined;

    return (
        <div className="space-y-6 p-6">
            <AppTitle
                title="Mis certificados"
                subtitle="Certificados que has obtenido."
            />

            <QueryState
                isLoading={certificadosQuery.isLoading}
                isError={certificadosQuery.isError}
                error={certificadosQuery.error}
                minHeight="min-h-[400px]"
            >
                {certificados.length === 0 ? (
                    <CertificadoEmpty />
                ) : (
                    <CertificadoList
                        certificados={certificados}
                        onDownload={descargar}
                        onEmitir={handleEmitir}
                        downloadingId={isDownloading ? downloadingId : undefined}
                        emittingId={emittingId}
                    />
                )}
            </QueryState>
        </div>
    );
};

export default MisCertificados;
