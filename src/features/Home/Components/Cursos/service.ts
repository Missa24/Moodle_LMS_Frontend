import { apiService } from "@/api/api";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

export const categoriaCursoSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    slug: z.string(),
});

export const cursoSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    descripcionCorta: z.string().nullable(),
    descripcionCompleta: z.string().nullable(),
    rutaPortada: z.string().nullable(),
    categoria: categoriaCursoSchema.nullable(),
});

export const cursosMetaSchema = z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
});

export const cursosResponseSchema = z.object({
    data: z.array(cursoSchema),
    meta: cursosMetaSchema,
});

export type Curso = z.infer<typeof cursoSchema>;
export type CategoriaCurso = z.infer<typeof categoriaCursoSchema>;
export type CursosResponse = z.infer<typeof cursosResponseSchema>;


export type GetCursosParams = {
    page?: number;
    limit?: number;
    search?: string;
    categoriaId?: string;
};

export async function getCursos(
    params?: GetCursosParams
): Promise<CursosResponse> {
    const response = await apiService.get("/curso", {
        params,
    });

    return cursosResponseSchema.parse(response.data);
}



export const useCursos = (params?: GetCursosParams) => {
    return useQuery({
        queryKey: ["cursos", params],

        queryFn: () => getCursos(params),
    });
};
