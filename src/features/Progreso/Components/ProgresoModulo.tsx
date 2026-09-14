import {
    CheckCircle2,
    Circle,
} from "lucide-react";

import { QueryState } from "@/components/common/QueryState";
import { useProgresoQuery } from "@/features/Progreso/Hook/ProgresoHook";
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
    } = useGetMiInscripcionModulo(
        moduloId,
        !!moduloId,
    );

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
    } = useProgresoQuery(
        moduloId,
        puedeConsultarProgreso,
    );

    if (isLoadingAcceso) {
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

    if (isErrorAcceso) {
        return (
            <QueryState
                isLoading={false}
                isError
                error={errorAcceso}
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
            isLoading={isLoading}
            isError={isError}
            error={error}
            minHeight="min-h-[80px]"
        >
            {data && (
                <div className="space-y-3 rounded-lg border bg-background p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium">
                                Tu progreso
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {
                                    data.leccionesCompletadas
                                }{" "}
                                de{" "}
                                {
                                    data.leccionesTotales
                                }{" "}
                                lecciones
                            </p>
                        </div>

                        <span className="text-lg font-semibold text-primary">
                            {Math.round(
                                data.porcentaje,
                            )}
                            %
                        </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                            className="h-full rounded-full bg-primary transition-all duration-500"
                            style={{
                                width: `${Math.min(
                                    Math.max(
                                        data.porcentaje,
                                        0,
                                    ),
                                    100,
                                )}%`,
                            }}
                        />
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                            {
                                data.leccionesCompletadas
                            }{" "}
                            completadas
                        </span>

                        <span className="flex items-center gap-1.5">
                            <Circle className="h-3.5 w-3.5" />
                            {
                                data.leccionesPendientes
                            }{" "}
                            pendientes
                        </span>
                    </div>
                </div>
            )}
        </QueryState>
    );
}