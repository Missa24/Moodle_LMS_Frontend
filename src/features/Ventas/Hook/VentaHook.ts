import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
    GetVentaById,
    GetVentas,
    MarcarComisionPendiente,
    UpdateVentaComision,
    type GetVentasParams,
} from "../Service/VentaService";

import type {
    UpdateComisionType,
} from "../Schema/VentaSchema";

export function useGetVentas(
    params: GetVentasParams,
    enabled = true,
) {
    return useQuery({
        queryKey: ["ventas", "list", params],
        queryFn: () => GetVentas(params),
        enabled,
        staleTime: 1000 * 60,
    });
}

export function useGetVenta(
    id: string,
    enabled = true,
) {
    return useQuery({
        queryKey: ["ventas", "detail", id],
        queryFn: () => GetVentaById(id),
        enabled: enabled && !!id,
    });
}

export function useUpdateVentaComision() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdateComisionType;
        }) => UpdateVentaComision(id, data),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["ventas"],
            });

            toast.success("Comisión actualizada");
        },

        onError: () => {
            toast.error("No se pudo actualizar la comisión");
        },
    });
}

export function useMarcarComisionPendiente() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            MarcarComisionPendiente(id),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["ventas"],
            });

            toast.success("Comisión marcada como pendiente");
        },

        onError: () => {
            toast.error("No se pudo actualizar la venta");
        },
    });
}