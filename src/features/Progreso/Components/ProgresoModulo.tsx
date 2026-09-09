import {
    Check,
    Circle,
} from "lucide-react";

import { QueryState } from "@/components/common/QueryState";

import {
    useProgresoQuery,
} from "@/features/Progreso/Hook/ProgresoHook";
import { useGetMiInscripcionModulo } from "@/features/Inscripciones/Hook/InscripcionHook";

interface ProgresoModuloProps {
    moduloId: string;
}

export function ProgresoModulo({
    moduloId,
}: ProgresoModuloProps) {
    const {
        data: accesoModulo,
        isLoading: isLoadingAcceso,
        isError: isErrorAcceso,
        error: errorAcceso,
    } =
        useGetMiInscripcionModulo(moduloId, !!moduloId,);

    const puedeConsultarProgreso =
        accesoModulo?.inscrito ===
        true &&
        accesoModulo?.tieneAcceso ===
        true;

    const {
        data,
        isLoading,
        isError,
        error,
    } = useProgresoQuery(moduloId, puedeConsultarProgreso,);

    if (
        isLoadingAcceso
    ) {
        return (
            <QueryState
                isLoading
                isError={false}
                minHeight="min-h-[80px]"
            >
                {null}
            </QueryState>
        );
    }

    if (
        isErrorAcceso
    ) {
        return (
            <QueryState
                isLoading={false}
                isError
                error={
                    errorAcceso
                }
                minHeight="min-h-[80px]"
            >
                {null}
            </QueryState>
        );
    }

    if (
        !accesoModulo?.inscrito ||
        !accesoModulo?.tieneAcceso
    ) {
        return null;
    }

    return (
        <QueryState
            isLoading={
                isLoading
            }
            isError={
                isError
            }
            error={
                error
            }
            minHeight="min-h-[80px]"
        >
            {data && (
                <div className="space-y-3">
                    <div className="flex items-center gap-1">
                        {Array.from({
                            length:
                                Math.min(
                                    data.leccionesTotales,
                                    10,
                                ),
                        }).map(
                            (
                                _,
                                i,
                            ) => {
                                const isCompleted =
                                    i <
                                    data.leccionesCompletadas;

                                return (
                                    <div
                                        key={
                                            i
                                        }
                                        className={`h-1 flex-1 rounded-full transition-all ${isCompleted
                                            ? "bg-primary"
                                            : "bg-muted"
                                            }`}
                                    />
                                );
                            },
                        )}

                        {data.leccionesTotales >
                            10 && (
                                <span className="ml-1 text-[10px] text-muted-foreground">
                                    +
                                    {data.leccionesTotales -
                                        10}
                                </span>
                            )}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Check className="h-3 w-3 text-emerald-500" />

                                {
                                    data.leccionesCompletadas
                                }
                            </span>

                            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />

                            <span className="flex items-center gap-1">
                                <Circle className="h-3 w-3" />

                                {
                                    data.leccionesPendientes
                                }
                            </span>
                        </div>

                        <span className="text-sm font-semibold text-primary">
                            {
                                data.porcentaje
                            }
                            %
                        </span>
                    </div>
                </div>
            )}
        </QueryState>
    );
}