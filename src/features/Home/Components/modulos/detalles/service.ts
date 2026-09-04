import { apiService } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export type GetLeccionesParams = {
    nombre?: string;
    tipoLeccion?: string;
    estaPublicada?: boolean;
};

export async function getLeccionesByModulo(
    moduloId: string,
    params?: GetLeccionesParams
): Promise<LeccionesResponse> {
    const response = await apiService.get(
        `/lecciones/modulo/${moduloId}`,
        {
            params,
        }
    );

    return leccionesResponseSchema.parse(response.data);
}
import { z } from "zod";

export const recursoLeccionSchema = z.object({
    id: z.string(),
    orden: z.number(),
}).passthrough();

export const leccionSchema = z.object({
    id: z.string(),
    moduloId: z.string(),
    nombre: z.string(),
    tipoLeccion: z.string(),
    orden: z.number(),
    estaPublicada: z.boolean(),
    recursos: z.array(recursoLeccionSchema),
});

export const leccionesResponseSchema = z.array(leccionSchema);

export type RecursoLeccion = z.infer<typeof recursoLeccionSchema>;
export type Leccion = z.infer<typeof leccionSchema>;
export type LeccionesResponse = z.infer<
    typeof leccionesResponseSchema
>;

export const useLecciones = (
    moduloId: string,
    params?: GetLeccionesParams
) => {
    return useQuery({
        queryKey: ["lecciones", moduloId, params],

        queryFn: () =>
            getLeccionesByModulo(moduloId, params),

        enabled: Boolean(moduloId),
    });
};
