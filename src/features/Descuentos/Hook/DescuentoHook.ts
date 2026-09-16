import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
    CreateDescuento,
    DeleteDescuento,
    GetDescuentoById,
    GetDescuentos,
    RestoreDescuento,
    UpdateDescuento,
} from "../Service/DescuentoService";

import {
    DescuentoCreateType,
    DescuentoUpdateType,
} from "../Schema/DescuentoSchema";

export function useGetDescuentos() {
    return useQuery({
        queryKey: [
            "descuentos",
            "list",
        ],

        queryFn:
            GetDescuentos,
    });
}

export function useGetDescuento(
    id: string,
    enabled = true,
) {
    return useQuery({
        queryKey: [
            "descuentos",
            "detail",
            id,
        ],

        queryFn: () =>
            GetDescuentoById(
                id,
            ),

        enabled:
            enabled && !!id,
    });
}

export function useCreateDescuento() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            data: DescuentoCreateType,
        ) =>
            CreateDescuento(
                data,
            ),

        onSuccess: () => {
            toast.success(
                "Descuento creado correctamente",
            );

            queryClient.invalidateQueries({
                queryKey: [
                    "descuentos",
                ],
            });

            /*
             * Los precios finales de módulos
             * también pudieron cambiar.
             */
            queryClient.invalidateQueries({
                queryKey: [
                    "modulos",
                ],
            });
        },

        onError: () => {
            toast.error(
                "No se pudo crear el descuento",
            );
        },
    });
}

export function useUpdateDescuento() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: DescuentoUpdateType;
        }) =>
            UpdateDescuento(
                id,
                data,
            ),

        onSuccess: (
            _response,
            variables,
        ) => {
            toast.success(
                "Descuento actualizado correctamente",
            );

            queryClient.invalidateQueries({
                queryKey: [
                    "descuentos",
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "descuentos",
                    "detail",
                    variables.id,
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "modulos",
                ],
            });
        },

        onError: () => {
            toast.error(
                "No se pudo actualizar el descuento",
            );
        },
    });
}

export function useDeleteDescuento() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            id: string,
        ) =>
            DeleteDescuento(
                id,
            ),

        onSuccess: () => {
            toast.success(
                "Descuento deshabilitado",
            );

            queryClient.invalidateQueries({
                queryKey: [
                    "descuentos",
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "modulos",
                ],
            });
        },

        onError: () => {
            toast.error(
                "No se pudo deshabilitar el descuento",
            );
        },
    });
}

export function useRestoreDescuento() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            id: string,
        ) =>
            RestoreDescuento(
                id,
            ),

        onSuccess: () => {
            toast.success(
                "Descuento habilitado correctamente",
            );

            queryClient.invalidateQueries({
                queryKey: [
                    "descuentos",
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "modulos",
                ],
            });
        },

        onError: () => {
            toast.error(
                "No se pudo habilitar el descuento",
            );
        },
    });
}