import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    GetLeccionesByModulo,
    GetLeccionesConProgreso,
    GetLeccionById,
    CreateLeccion,
    UpdateLeccion,
    DeleteLeccionLogically,
    RestoreLeccion,
    MarcarLeccionCompletada,
    GetRecursosByLeccion,
    CreateRecursoLeccion,
    GetRecursoLeccionById,
    UpdateRecursoLeccion,
    DeleteRecursoLeccion,
    GetFormularioLeccion,
} from "../Service/LeccionService";
import {
    LeccionCreateType,
    LeccionUpdateType,
    RecursoLeccionCreateType,
    RecursoLeccionUpdateType,
} from "../Schema/LeccionSchema";
import { getApiErrorCode, getApiErrorMessage } from "@/utils/apiError";

export function useGetLecciones(
    moduloId: string,
    filtros?: { nombre?: string; tipoLeccion?: string; estaPublicada?: boolean }
) {
    return useQuery({
        queryKey: ["lecciones", "byModulo", moduloId, filtros],
        queryFn: () => GetLeccionesByModulo(moduloId, filtros),
        enabled: !!moduloId,
        staleTime: 1000 * 60 * 2,
    });
}

export function useGetLeccionesConProgreso(moduloId: string, enabled = true) {
    return useQuery({
        queryKey: ["lecciones", "progreso", moduloId],
        queryFn: () => GetLeccionesConProgreso(moduloId),
        enabled: enabled && !!moduloId,
        staleTime: 1000 * 30,
    });
}

export function useGetLeccion(id: string, enabled = true) {
    return useQuery({
        queryKey: ["lecciones", "detail", id],
        queryFn: () => GetLeccionById(id),
        enabled: enabled && !!id,
    });
}

export function useCreateLeccion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LeccionCreateType) => CreateLeccion(data),
        onSuccess: (response, variables) => {
            toast.success(response.message || "Lección creada con éxito");
            queryClient.invalidateQueries({ queryKey: ["lecciones", "byModulo", variables.moduloId] });
            queryClient.invalidateQueries({ queryKey: ["lecciones", "progreso", variables.moduloId] });
        },
        onError: () => {
            toast.error("Error al procesar la solicitud de creación");
        },
    });
}

export function useUpdateLeccion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: LeccionUpdateType }) => UpdateLeccion(id, data),
        onSuccess: (response, variables) => {
            toast.success(response.message || "Lección actualizada con éxito");
            queryClient.invalidateQueries({ queryKey: ["lecciones", "detail", variables.id] });
            queryClient.invalidateQueries({ queryKey: ["lecciones", "byModulo"] });
            queryClient.invalidateQueries({ queryKey: ["lecciones", "progreso"] });
        },
        onError: () => {
            toast.error("Error al procesar la solicitud de actualización");
        },
    });
}

export function useDeleteLeccion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => DeleteLeccionLogically(id),
        onSuccess: (response) => {
            toast.success(response.message || "Lección dada de baja con éxito");
            queryClient.invalidateQueries({ queryKey: ["lecciones"] });
        },
        onError: () => {
            toast.error("Error al intentar dar de baja la lección");
        },
    });
}

export function useRestoreLeccion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => RestoreLeccion(id),
        onSuccess: (response) => {
            toast.success(response.message || "Lección restaurada con éxito");
            queryClient.invalidateQueries({ queryKey: ["lecciones"] });
        },
        onError: () => {
            toast.error("Error al intentar restaurar la lección");
        },
    });
}

export function useMarcarLeccionCompletada() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, respuestas }: { id: string; respuestas?: { preguntaFormularioId: string; opcionFormularioId: string }[] }) =>
            MarcarLeccionCompletada(id, respuestas),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lecciones", "progreso"] });
            queryClient.invalidateQueries({ queryKey: ["notificaciones"] });
            queryClient.invalidateQueries({ queryKey: ["notificaciones-no-leidas"] });
        },
        onError: (error: unknown) => {
            const code = getApiErrorCode(error);
            if (code === "no_inscrito" || code === "leccion_anterior_pendiente") return;

            toast.error(getApiErrorMessage(error, "No se pudo completar la lección."));
        },
    });
}


export function useGetFormularioLeccion(leccionId: string, enabled = true) {
    return useQuery({
        queryKey: ["lecciones", "formulario", leccionId],
        queryFn: () => GetFormularioLeccion(leccionId),
        enabled: enabled && !!leccionId,
    });
}

export function useGetRecursosLeccion(leccionId: string, enabled = true) {
    return useQuery({
        queryKey: ["recursos-leccion", "byLeccion", leccionId],
        queryFn: () => GetRecursosByLeccion(leccionId),
        enabled: enabled && !!leccionId,
    });
}

export function useGetRecursoLeccion(id: string, enabled = true) {
    return useQuery({
        queryKey: ["recursos-leccion", "detail", id],
        queryFn: () => GetRecursoLeccionById(id),
        enabled: enabled && !!id,
    });
}

export function useCreateRecursoLeccion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ leccionId, data }: { leccionId: string; data: RecursoLeccionCreateType }) =>
            CreateRecursoLeccion(leccionId, data),
        onSuccess: (response, variables) => {
            toast.success(response.message || "Recurso agregado con éxito");
            queryClient.invalidateQueries({ queryKey: ["recursos-leccion", "byLeccion", variables.leccionId] });
        },
        onError: () => {
            toast.error("Error al agregar el recurso");
        },
    });
}

export function useUpdateRecursoLeccion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: RecursoLeccionUpdateType }) =>
            UpdateRecursoLeccion(id, data),
        onSuccess: (response, variables) => {
            toast.success(response.message || "Recurso actualizado con éxito");
            queryClient.invalidateQueries({ queryKey: ["recursos-leccion", "detail", variables.id] });
            queryClient.invalidateQueries({ queryKey: ["recursos-leccion", "byLeccion"] });
        },
        onError: () => {
            toast.error("Error al actualizar el recurso");
        },
    });
}

export function useDeleteRecursoLeccion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => DeleteRecursoLeccion(id),
        onSuccess: (response) => {
            toast.success(response.message || "Recurso eliminado con éxito");
            queryClient.invalidateQueries({ queryKey: ["recursos-leccion"] });
        },
        onError: () => {
            toast.error("Error al eliminar el recurso");
        },
    });
}