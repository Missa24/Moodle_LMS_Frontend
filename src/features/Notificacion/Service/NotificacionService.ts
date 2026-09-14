import { apiService } from "@/api/api";

export interface Notificacion {
  id: string;
  usuarioId: string;
  tipo: string;
  titulo: string;
  contenido: string;
  urlAccion: string | null;
  estado: string;
  leidaEn: string | null;
  creadoEn: string;
}

export async function GetMisNotificaciones(): Promise<Notificacion[]> {
  const response = await apiService.get("/notificaciones");
  return response.data;
}

export async function GetNotificacionesPendientes(): Promise<Notificacion[]> {
  const response = await apiService.get("/notificaciones/pendientes");
  return response.data;
}

export async function ContarNoLeidas(): Promise<number> {
  const response = await apiService.get("/notificaciones/no-leidas");
  return response.data;
}

export async function MarcarComoLeida(notificacionId: string): Promise<void> {
  await apiService.patch(
    `/notificaciones/${notificacionId}/marcar-como-leida`,
  );
}