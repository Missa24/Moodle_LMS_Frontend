import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import {
    CrearInscripcion,
    ObtenerCursos,
    ObtenerEstudiantes,
    ObtenerInscripciones,
    ObtenerInscripcionPorEstudiante,
    AgregarCursoInscripcion,
    EliminarCursoInscripcion,
    EliminarModuloInscripcion,
    EliminarInscripcionesPorEstudiante,
} from "../Service/InscripcionService";

import {
    CrearInscripcionSchemaType,
    CursoType,
} from "../Schema/InscripcionSchema";

export function useCrearInscripcion(
    onSuccess?: () => void
) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: CrearInscripcion,

        onSuccess: () => {
            toast.success(
                "Inscripción creada exitosamente"
            );

            queryClient.invalidateQueries({
                queryKey: ["inscripciones", "list"],
            });

            if (onSuccess) {
                onSuccess();
            } else {
                navigate(
                    "/panel/inscripciones"
                );
            }
        },

        onError: () => {
            toast.error(
                "Error al crear la inscripción"
            );
        },
    });
}

export function useGetInscripciones(
    page: number,
    limit: number = 10,
    search?: string
) {
    return useQuery({
        queryKey: [
            "inscripciones",
            "list",
            page,
            limit,
            search,
        ],
        queryFn: () =>
            ObtenerInscripciones(
                page,
                limit,
                search
            ),
        staleTime: 1000 * 60 * 2,
    });
}

export function useCursos() {
    return useQuery<CursoType[]>({
        queryKey: [
            "inscripciones",
            "cursos",
        ],
        queryFn: ObtenerCursos,
    });
}

export function useEstudiantes() {
    return useQuery({
        queryKey: [
            "inscripciones",
            "estudiantes",
        ],
        queryFn: ObtenerEstudiantes,
    });
}

export function useEliminarCurso() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: ({
            estudianteId,
            cursoId,
        }: {
            estudianteId: string;
            cursoId: string;
        }) =>
            EliminarCursoInscripcion(
                estudianteId,
                cursoId
            ),

        onSuccess: () => {
            toast.success(
                "Curso eliminado exitosamente"
            );

            queryClient.invalidateQueries({
                queryKey: [
                    "inscripciones",
                    "list",
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "inscripciones",
                    "estudiante",
                ],
            });
        },

        onError: () => {
            toast.error(
                "Error al eliminar el curso"
            );
        },
    });
}

export function useEliminarModulo() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: ({
            inscripcionId,
            cursoId,
            moduloId,
        }: {
            inscripcionId: string;
            cursoId: string;
            moduloId: string;
        }) =>
            EliminarModuloInscripcion(
                inscripcionId,
                cursoId,
                moduloId
            ),

        onSuccess: () => {
            toast.success(
                "Módulo eliminado exitosamente"
            );

            queryClient.invalidateQueries({
                queryKey: [
                    "inscripciones",
                    "list",
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "inscripciones",
                    "estudiante",
                ],
            });
        },

        onError: () => {
            toast.error(
                "Error al eliminar el módulo"
            );
        },
    });
}

export function useGetInscripcionesPorEstudiante(
    estudianteId: string
) {
    return useQuery({
        queryKey: [
            "inscripciones",
            "estudiante",
            estudianteId,
        ],
        queryFn: () =>
            ObtenerInscripcionPorEstudiante(
                estudianteId
            ),
        staleTime: 1000 * 60 * 2,
        enabled: !!estudianteId,
    });
}

export function useAgregarCurso() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            data: CrearInscripcionSchemaType
        ) =>
            AgregarCursoInscripcion(data),

        onSuccess: () => {
            toast.success(
                "Curso agregado exitosamente"
            );

            queryClient.invalidateQueries({
                queryKey: [
                    "inscripciones",
                    "list",
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "inscripciones",
                    "estudiante",
                ],
            });
        },

        onError: () => {
            toast.error(
                "Error al agregar el curso"
            );
        },
    });
}

export function useEliminarInscripcionesPorEstudiante() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            estudianteId: string
        ) =>
            EliminarInscripcionesPorEstudiante(
                estudianteId
            ),

        onSuccess: () => {
            toast.success(
                "Inscripciones eliminadas exitosamente"
            );

            queryClient.invalidateQueries({
                queryKey: [
                    "inscripciones",
                    "list",
                ],
            });
        },

        onError: () => {
            toast.error(
                "Error al eliminar las inscripciones"
            );
        },
    });
}