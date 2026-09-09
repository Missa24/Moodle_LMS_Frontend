import { useNavigate, useParams } from "react-router-dom";

import { LeccionTimelineItem } from "./LeccionTimelineItem";
import { useGetLeccionesConProgreso } from "../Hook/LeccionHook";
import { LeccionProgresoType } from "../Schema/LeccionSchema";
import { QueryState } from "@/components/common/QueryState";

interface LeccionesTimelineProps {
    moduloId: string;
}

export function LeccionesTimeline({
    moduloId,
}: LeccionesTimelineProps) {
    const {
        id: cursoId,
        leccionId: leccionIdActual,
    } = useParams<{
        id: string;
        leccionId?: string;
    }>();

    const navigate = useNavigate();

    const {
        data: lecciones,
        isLoading,
        isError,
        error,
    } = useGetLeccionesConProgreso(moduloId);

    if (!lecciones || lecciones.length === 0) {
        return (
            <QueryState
                isLoading={isLoading}
                isError={isError}
                error={error}
                minHeight="min-h-[200px]"
            >
                <div className="flex min-h-[200px] items-center justify-center rounded-xl border bg-muted/20">
                    <p className="text-sm text-muted-foreground">
                        Este módulo todavía no tiene lecciones.
                    </p>
                </div>
            </QueryState>
        );
    }

    const handleClick = (
        leccion: LeccionProgresoType
    ) => {
        navigate(
            `/panel/cursos/${cursoId}/modulos/${moduloId}/lecciones/${leccion.id}`
        );
    };

    return (
        <QueryState
            isLoading={isLoading}
            isError={isError}
            error={error}
            minHeight="min-h-[200px]"
        >
            <div className="flex flex-col">
                {lecciones.map(
                    (leccion, index) => (
                        <LeccionTimelineItem
                            key={leccion.id}
                            leccion={leccion}
                            numero={index + 1}
                            esUltima={
                                index ===
                                lecciones.length - 1
                            }
                            esActual={
                                leccion.id ===
                                leccionIdActual
                            }
                            onClick={handleClick}
                        />
                    )
                )}
            </div>
        </QueryState>
    );
}
