import { useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QueryState } from "@/components/common/QueryState";

import { LeccionBloqueadaDialog } from "@/features/Leccion/Components/LeccionBloqueadaDialog";
import { CompletionDialog } from "@/features/Leccion/Components/CompletionDialog";

import {
    useGetLeccion,
    useGetLeccionesConProgreso,
} from "@/features/Leccion/Hook/LeccionHook";
import { LeccionContenido } from "@/features/Leccion/Components/LeccionContenido";

export default function LeccionDetallePage() {
    const {
        id: cursoId,
        moduloId,
        leccionId,
    } = useParams<{
        id: string;
        moduloId: string;
        leccionId: string;
    }>();

    const navigate =
        useNavigate();

    const [
        completionType,
        setCompletionType,
    ] = useState<
        "modulo" | "curso" | null
    >(null);

    const {
        data: leccion,
        isLoading,
        isError,
        error,
    } = useGetLeccion(
        leccionId!,
    );

    const {
        data: leccionesProgreso,
    } =
        useGetLeccionesConProgreso(
            moduloId!,
        );

    const handleModuloCompletado = (
        cursoCompletado: boolean,
    ) => {
        setCompletionType(
            cursoCompletado
                ? "curso"
                : "modulo",
        );
    };

    const verCertificados =
        () => {
            setCompletionType(
                null,
            );

            navigate(
                "/panel/certificados",
            );
        };

    return (
        <div className="space-y-6 p-4 text-foreground sm:p-6">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-1 px-0 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() =>
                    navigate(
                        `/panel/cursos/${cursoId}/modulos/${moduloId}`,
                    )
                }
            >
                <ArrowLeft className="h-4 w-4" />
                Volver al módulo
            </Button>

            <QueryState
                isLoading={
                    isLoading
                }
                isError={
                    isError
                }
                error={error}
                fallbackMessage="No se pudo cargar la lección."
            >
                {leccion &&
                    leccion.bloqueada ? (
                    <LeccionBloqueadaDialog
                        open
                        motivo={leccion.motivoBloqueo}
                        cursoId={cursoId!}
                        moduloId={moduloId!}
                    />
                ) : leccion ? (
                    <LeccionContenido
                        leccion={leccion}
                        cursoId={cursoId!}
                        moduloId={moduloId!}
                        leccionesProgreso={leccionesProgreso}
                        onNavigateSiguiente={(siguienteId,) =>
                            navigate(`/panel/cursos/${cursoId}/modulos/${moduloId}/lecciones/${siguienteId}`,)
                        }
                        onModuloCompletado={handleModuloCompletado}
                    />
                ) : null}
            </QueryState>

            <CompletionDialog
                open={completionType !== null}
                type={completionType ?? "modulo"}
                onOpenChange={(open,) => {
                    if (!open) {
                        setCompletionType(null,);
                    }
                }}
                onViewCertificate={verCertificados}
            />
        </div>
    );
}