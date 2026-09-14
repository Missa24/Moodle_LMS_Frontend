import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
    CreateLead,
    GetLeadById,
    GetLeads,
    GetLeadsByUser,
    GetMyLeads,
    UpdateLeadEstado,
} from "../Service/LeadService";

import type {
    CreateLeadType,
    UpdateLeadEstadoType,
} from "../Schema/LeadSchema";

export function useCreateLead() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            data: CreateLeadType,
        ) => CreateLead(data),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [
                    "leads",
                ],
            });
        },
    });
}

export function useGetLeads(
    page: number,
    limit: number = 10,
    q: string = "",
    enabled = true,
) {
    return useQuery({
        queryKey: [
            "leads",
            "list",
            page,
            limit,
            q,
        ],

        queryFn: () =>
            GetLeads(
                page,
                limit,
                q,
            ),

        enabled,

        staleTime:
            1000 * 60 * 2,
    });
}

export function useGetMyLeads() {
    return useQuery({
        queryKey: [
            "leads",
            "me",
        ],

        queryFn: GetMyLeads,

        staleTime:
            1000 * 60 * 2,
    });
}

export function useGetLeadsByUser(
    usuarioId: string,
    enabled = true,
) {
    return useQuery({
        queryKey: [
            "leads",
            "usuario",
            usuarioId,
        ],

        queryFn: () =>
            GetLeadsByUser(
                usuarioId,
            ),

        enabled:
            enabled &&
            !!usuarioId,

        staleTime:
            1000 * 60 * 2,
    });
}

export function useGetLead(
    id: string,
    enabled = true,
) {
    return useQuery({
        queryKey: [
            "leads",
            "detail",
            id,
        ],

        queryFn: () =>
            GetLeadById(id),

        enabled:
            enabled &&
            !!id,
    });
}

export function useUpdateLeadEstado() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateLeadEstadoType }) =>
            UpdateLeadEstado(id, data),

        onSuccess: async (response) => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["leads"] }),
                queryClient.invalidateQueries({ queryKey: ["ventas"] }),
                queryClient.invalidateQueries({ queryKey: ["inscripciones"] }),
                queryClient.invalidateQueries({ queryKey: ["notificaciones"] }),
            ]);

            toast.success(`Estado actualizado a ${response.estado}`);
        },

        onError: () => {
            toast.error("No se pudo actualizar el estado del lead");
        },
    });
}