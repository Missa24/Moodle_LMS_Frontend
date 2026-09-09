import { getProgresoByModuloId, getProgresoMe } from "../Service/ProgresoService";
import { useQuery } from "@tanstack/react-query";

export function useProgresoQuery(
    moduloId: string,
    enabled = true,
) {
    return useQuery({
        queryKey: [
            "progreso",
            "modulo",
            moduloId,
        ],

        queryFn: () =>
            getProgresoByModuloId(
                moduloId,
            ),

        enabled:
            enabled &&
            !!moduloId,

        staleTime:
            1000 * 60 * 2,
    });
}

export function useProgresoMeQuery() {
    return useQuery({
        queryKey: ["progreso", "me"],
        queryFn: () => getProgresoMe(),
    });
}