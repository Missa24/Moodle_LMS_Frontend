import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  ContarNoLeidas,
  GetMisNotificaciones,
  GetNotificacionesPendientes,
  MarcarComoLeida,
} from "../Service/NotificacionService";

export function useGetNotificaciones() {
  return useQuery({
    queryKey: ["notificaciones", "list"],
    queryFn: GetMisNotificaciones,
  });
}

export function useGetNotificacionesPendientes() {
  return useQuery({
    queryKey: ["notificaciones", "pendientes"],
    queryFn: GetNotificacionesPendientes,
    staleTime: 1000 * 30,
  });
}

export function useContarNoLeidas() {
  return useQuery({
    queryKey: ["notificaciones", "no-leidas"],
    queryFn: ContarNoLeidas,
  });
}

export function useMarcarComoLeida() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificacionId: string) =>
      MarcarComoLeida(notificacionId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notificaciones"],
      });
    },
  });
}