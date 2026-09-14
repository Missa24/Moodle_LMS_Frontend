import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    toast,
} from "sonner";

import {
    CreateModulo,
    DeleteModuloLogically,
    GetModuloById,
    GetModulosByCurso,
    GetPaginatedModulos,
    RestoreModulo,
    UpdateModulo,
} from "../Service/ModuloService";

import {
    ModuloCreateType,
    ModuloUpdateType,
} from "../Schema/ModuloSchema";

export function useGetModulos(
    page: number,
    limit: number = 10,
    filtros?: {
        nombre?: string;
        categoria?: string;
        cursoId?: string;
        estaPublicado?: boolean;
    },
) {
    return useQuery({
        queryKey: [
            "modulos",
            "list",
            page,
            limit,
            filtros,
        ],

        queryFn: () =>
            GetPaginatedModulos(
                page,
                limit,
                filtros,
            ),
    });
}

export function useGetModulosByCurso(
    cursoId: string,
    page: number,
    limit: number = 10,
    filtros?: {
        nombre?: string;
        estaPublicado?: boolean;
    },
) {
    return useQuery({
        queryKey: [
            "modulos",
            "byCurso",
            cursoId,
            page,
            limit,
            filtros,
        ],

        queryFn: () =>
            GetModulosByCurso(
                cursoId,
                page,
                limit,
                filtros,
            ),

        enabled:
            !!cursoId,
    });
}

export function useGetModulo(
    id: string,
    enabled = true,
) {
    return useQuery({
        queryKey: [
            "modulos",
            "detail",
            id,
        ],

        queryFn: () =>
            GetModuloById(
                id,
            ),

        enabled:
            enabled &&
            !!id,
    });
}

export function useCreateModulo() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            data: ModuloCreateType,
        ) =>
            CreateModulo(
                data,
            ),

        onSuccess: (
            response,
            variables,
        ) => {
            toast.success(
                response.message ||
                "Módulo creado con éxito",
            );

            queryClient.invalidateQueries({
                queryKey: [
                    "modulos",
                    "list",
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "modulos",
                    "byCurso",
                    variables.cursoId,
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "descuentos",
                ],
            });
        },

        onError: () => {
            toast.error(
                "Error al procesar la solicitud de creación",
            );
        },
    });
}

export function useUpdateModulo() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: ModuloUpdateType;
        }) =>
            UpdateModulo(
                id,
                data,
            ),

        onSuccess: (
            response,
            variables,
        ) => {
            toast.success(
                response.message ||
                "Módulo actualizado con éxito",
            );

            queryClient.invalidateQueries({
                queryKey: [
                    "modulos",
                    "list",
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "modulos",
                    "detail",
                    variables.id,
                ],
            });

            /*
             * Invalidamos todas las listas
             * por curso porque precio/descuento
             * puede haber cambiado.
             */
            queryClient.invalidateQueries({
                queryKey: [
                    "modulos",
                    "byCurso",
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "descuentos",
                ],
            });
        },

        onError: () => {
            toast.error(
                "Error al procesar la solicitud de actualización",
            );
        },
    });
}

export function useDeleteModulo() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            id: string,
        ) =>
            DeleteModuloLogically(
                id,
            ),

        onSuccess: (
            response,
        ) => {
            toast.success(
                response.message ||
                "Módulo dado de baja con éxito",
            );

            queryClient.invalidateQueries({
                queryKey: [
                    "modulos",
                ],
            });
        },

        onError: () => {
            toast.error(
                "Error al intentar dar de baja el módulo",
            );
        },
    });
}

export function useRestoreModulo() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            id: string,
        ) =>
            RestoreModulo(
                id,
            ),

        onSuccess: (
            response,
        ) => {
            toast.success(
                response.message ||
                "Módulo restaurado con éxito",
            );

            queryClient.invalidateQueries({
                queryKey: [
                    "modulos",
                ],
            });
        },

        onError: () => {
            toast.error(
                "Error al intentar restaurar el módulo",
            );
        },
    });
}