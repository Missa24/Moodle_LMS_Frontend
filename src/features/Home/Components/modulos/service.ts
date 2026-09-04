import { apiService } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const moduloSchema = z.object({
    id: z.string(),
    cursoId: z.string(),
    nombre: z.string(),
    orden: z.number(),
    estaPublicado: z.boolean(),
    rutaImagen: z.string().nullable(),
    descripcion: z.string(),
});

export const moduloCursoCategoriaSchema = z
    .object({
        id: z.string(),
        nombre: z.string(),
        slug: z.string(),
    })
    .nullable();

export const moduloCursoSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    categoria: moduloCursoCategoriaSchema,
});

export const moduloDetalleSchema = moduloSchema.extend({
    curso: moduloCursoSchema,
    _count: z.object({
        lecciones: z.number(),
        inscripciones: z.number(),
    }),
});

export const modulosMetaSchema = z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
});

export const modulosResponseSchema = z.object({
    data: z.array(moduloSchema),
    meta: modulosMetaSchema,
});

export type Modulo = z.infer<typeof moduloSchema>;
export type ModuloDetalle = z.infer<
    typeof moduloDetalleSchema
>;
export type ModulosResponse = z.infer<
    typeof modulosResponseSchema
>;


export type GetModulosParams = {
    page?: number;
    limit?: number;
    nombre?: string;
    estaPublicado?: boolean;
};

export async function getModulosByCurso(cursoId: string, params?: GetModulosParams): Promise<ModulosResponse> {
    const response = await apiService.get(`/modulos/curso/${cursoId}`, { params, });

    return modulosResponseSchema.parse(response.data);
}

export async function getModuloById(moduloId: string): Promise<ModuloDetalle> {
    const response = await apiService.get(`/modulos/${moduloId}`);

    return moduloDetalleSchema.parse(response.data);
}


export const useModulos = (
    cursoId: string,
    params?: GetModulosParams
) => {
    return useQuery({
        queryKey: ["modulos", cursoId, params],

        queryFn: () => getModulosByCurso(cursoId, params),

        enabled: Boolean(cursoId),
    });
};

export const useModulo = (moduloId: string) => {
    return useQuery({
        queryKey: [
            "modulo",
            moduloId,
        ],
        queryFn: () =>
            getModuloById(moduloId),
        enabled: Boolean(moduloId),
    });
};