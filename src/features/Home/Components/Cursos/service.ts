import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { apiService } from "@/api/api";

export const categoriaCursoSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    slug: z.string(),
});

export const cursoSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    slug: z.string(),
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
    conDescuento?: boolean;
};

export async function getCursos(params?: GetCursosParams): Promise<CursosResponse> {
    const response = await apiService.get("/curso", { params });
    return cursosResponseSchema.parse(response.data);
}

export async function getCurso(cursoId: string): Promise<Curso> {
    const response = await apiService.get(`/curso/${cursoId}`);
    return cursoSchema.parse(response.data);
}

export async function getCursoPorSlug(slug: string): Promise<Curso> {
    const response = await apiService.get(`/curso/slug/${slug}`);
    return cursoSchema.parse(response.data);
}

export const useCursos = (params?: GetCursosParams) => {
    return useQuery({
        queryKey: ["cursos", params],
        queryFn: () => getCursos(params),
    });
};

export const useCurso = (cursoId?: string) => {
    return useQuery({
        queryKey: ["curso", cursoId],
        queryFn: () => getCurso(cursoId!),
        enabled: Boolean(cursoId),
    });
};

export const useCursoPorSlug = (slug?: string) => {
    return useQuery({
        queryKey: ["curso", "slug", slug],
        queryFn: () => getCursoPorSlug(slug!),
        enabled: Boolean(slug),
    });
};