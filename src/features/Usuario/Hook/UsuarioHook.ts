import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ChangeMyPassword, CreateUser, DeleteUserLogically, GetMiPerfil, GetPaginatedUsers, GetUserById, SearchUsers, UpdateMiPerfil, updateProfilePhoto, UpdateUser } from "../Service/UsuarioService";
import { UserCreateType, UserUpdateType } from "../Schema/UsuarioSchema";
import { useAuthStore } from "@/store/authStore";

export function useGetUsers(page: number, limit: number = 10) {
    return useQuery({
        queryKey: ["users", "list", page, limit],
        queryFn: () => GetPaginatedUsers(page, limit),
        staleTime: 1000 * 60 * 2,
    });
}

export function useGetUser(id: string, enabled = true) {
    return useQuery({
        queryKey: ["users", "detail", id],
        queryFn: () => GetUserById(id),
        enabled: enabled && !!id,
    });
}
export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UserCreateType) => CreateUser(data),
        onSuccess: (response) => {
            toast.success(response.message || "Usuario creado con éxito");
            queryClient.invalidateQueries({ queryKey: ["users", "list"] });
        },
        onError: () => {
            toast.error("Error al procesar la solicitud de creación");
        }
    });
}

export function useSearchUsers(q: string) {
    return useQuery({
        queryKey: ["users", "search", q],
        queryFn: () => SearchUsers(q),
        enabled: q.trim().length > 0,
        staleTime: 1000 * 30,
    });
}

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UserUpdateType;
        }) => UpdateUser(id, data),

        onSuccess: (response, variables) => {
            toast.success(
                response.message ||
                "Usuario actualizado con éxito"
            );

            queryClient.invalidateQueries({
                queryKey: ["users", "list"],
            });

            queryClient.invalidateQueries({
                queryKey: ["users", "detail", variables.id],
            });
        },

        onError: () => {
            toast.error(
                "Error al procesar la solicitud de actualización"
            );
        },
    });
}
export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => DeleteUserLogically(id),
        onSuccess: (response) => {
            toast.success(response.message || "Usuario dado de baja con éxito");
            queryClient.invalidateQueries({ queryKey: ["users", "list"] });
        },
        onError: () => {
            toast.error("Error al intentar dar de baja al usuario");
        }
    });
}

export function useGetMiPerfil() {
    return useQuery({
        queryKey: ["users", "mi-perfil"],
        queryFn: GetMiPerfil,
        staleTime: 1000 * 60 * 2,
    });
}

export function useUpdateMiPerfil() {
    const queryClient = useQueryClient();

    const setRequiereCompletarPerfil =
        useAuthStore(
            (state) =>
                state.setRequiereCompletarPerfil,
        );

    return useMutation({
        mutationFn: UpdateMiPerfil,

        onSuccess: async (response) => {
            const requiereCompletarPerfil =
                !response.perfil?.nombre?.trim() ||
                !response.perfil?.paisCodigo?.trim();

            setRequiereCompletarPerfil(
                requiereCompletarPerfil,
            );

            await queryClient.invalidateQueries({
                queryKey: [
                    "users",
                    "mi-perfil",
                ],
            });

            toast.success(
                "Perfil actualizado correctamente",
            );
        },

        onError: () => {
            toast.error(
                "No se pudo actualizar el perfil",
            );
        },
    });
}

export function useCambiarMiPassword() {
    return useMutation({
        mutationFn: ChangeMyPassword,

        onSuccess: (response) => {
            toast.success(response.message || "Contraseña actualizada correctamente");
        },

        onError: () => {
            toast.error("No se pudo cambiar la contraseña");
        },
    });
}


export function useUpdateProfilePhoto() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfilePhoto,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["users", "mi-perfil"],
            });
            toast.success("Foto de perfil actualizada correctamente");
        },

        onError: () => {
            toast.error("No se pudo actualizar la foto de perfil");
        },
    });
}