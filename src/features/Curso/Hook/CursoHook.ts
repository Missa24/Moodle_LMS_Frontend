import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    CreateCategoria,
    CreateCurso,
    DeleteCurso,
    GetCourseById,
    GetCourseCategories,
    GetCourseSubCategories,
    GetMisInscripcionesEnCursos,
    GetPaginatedCourses,
    ConfigurarVentaCurso,
    GetConfiguracionVentaCurso,
    GetCursoPrecio,
    UpdateCurso,
} from "../Service/CursoService";

import { CategoriaCreateType, ConfigurarVentaCursoType, CursoCreateType, CursoUpdateType } from "../Schema/CursoSchema";

export type TipoFiltro = "categoria" | "subcategoria";

export function useCursos(
    page: number,
    limit: number,
    search: string = "",
    categoriaId: string,
    tipoFiltro?: TipoFiltro
) {
    return useQuery({
        queryKey: ["cursos", page, limit, search, categoriaId, tipoFiltro],
        queryFn: () => GetPaginatedCourses({ page, limit, search, categoriaId }),
        placeholderData: (previousData) => previousData,
    });
}

export function useGetCurso(id: string, enabled = true) {
    return useQuery({
        queryKey: ["curso", id],
        queryFn: () => GetCourseById(id),
        enabled: enabled && !!id,
    });
}

export function useCategoriasCursos() {
    return useQuery({
        queryKey: ["categorias"],
        queryFn: GetCourseCategories,
        staleTime: 1000 * 60 * 10,
    });
}

export function useSubcategoriasCursos(categoriaId: string) {
    return useQuery({
        queryKey: ["categorias", "subcategorias", categoriaId],
        queryFn: () => GetCourseSubCategories(categoriaId),
        enabled: !!categoriaId,
        staleTime: 1000 * 60 * 10,
    });
}

export function useCreateCurso() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CursoCreateType) => CreateCurso(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cursos"],
            });
        },
    });
}

export function useUpdateCurso() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: CursoUpdateType;
        }) => UpdateCurso(id, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["cursos"],
            });

            queryClient.invalidateQueries({
                queryKey: ["curso", variables.id],
            });
        },
    });
}

export function useDeleteCurso() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => DeleteCurso(id),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["cursos"],
            });

            queryClient.invalidateQueries({
                queryKey: ["curso", id],
            });
        },
    });
}

export function useGetMisCursosInscritos(estudianteId: string) {
    return useQuery({
        queryKey: ["mis-cursos-inscritos", estudianteId],
        queryFn: () => GetMisInscripcionesEnCursos(estudianteId),
        enabled: !!estudianteId,
    });
}

export function useCreateCategoria() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CategoriaCreateType) => CreateCategoria(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categorias"] });
        },
    });
}

export function useCursoPrecio(
    cursoId: string,
    enabled = true,
) {
    return useQuery({
        queryKey: [
            "curso",
            cursoId,
            "precio",
        ],

        queryFn: () =>
            GetCursoPrecio(
                cursoId,
            ),

        enabled:
            enabled &&
            !!cursoId,
    });
}

export function useConfiguracionVentaCurso(
    cursoId: string,
    enabled = true,
) {
    return useQuery({
        queryKey: [
            "curso",
            cursoId,
            "configuracion-venta",
        ],

        queryFn: () =>
            GetConfiguracionVentaCurso(
                cursoId,
            ),

        enabled:
            enabled &&
            !!cursoId,
    });
}

export function useConfigurarVentaCurso() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: ({
            cursoId,
            data,
        }: {
            cursoId: string;
            data: ConfigurarVentaCursoType;
        }) =>
            ConfigurarVentaCurso(
                cursoId,
                data,
            ),

        onSuccess: async (
            _,
            variables,
        ) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [
                        "curso",
                        variables.cursoId,
                    ],
                }),

                queryClient.invalidateQueries({
                    queryKey: [
                        "cursos",
                    ],
                }),
            ]);
        },
    });
}