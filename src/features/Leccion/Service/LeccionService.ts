import { apiService } from "@/api/api";
import { ResponseType } from "@/utils/Schema/Response";
import {
    LeccionCreateType,
    LeccionUpdateType,
    LeccionesResponseType,
    LeccionesProgresoResponseType,
    LeccionDetailType,
    RecursoLeccionCreateType,
    RecursoLeccionUpdateType,
    RecursoLeccionType,
    FormularioLeccionPublicoType,
} from "../Schema/LeccionSchema";
import { buildFormData } from "@/utils/buildFormData";

export type MarcarLeccionCompletadaResponseType = ResponseType & {
    moduloCompletado: boolean;
    cursoCompletado: boolean;
};

export async function GetLeccionesByModulo(
    moduloId: string,
    filtros?: { nombre?: string; tipoLeccion?: string; estaPublicada?: boolean }
): Promise<LeccionesResponseType> {
    const params = new URLSearchParams();
    if (filtros?.nombre) params.append("nombre", filtros.nombre);
    if (filtros?.tipoLeccion) params.append("tipoLeccion", filtros.tipoLeccion);
    if (filtros?.estaPublicada !== undefined) params.append("estaPublicada", String(filtros.estaPublicada));

    const response = await apiService.get(`/lecciones/modulo/${moduloId}?${params.toString()}`);
    return response.data;
}

export async function GetLeccionesConProgreso(moduloId: string): Promise<LeccionesProgresoResponseType> {
    const response = await apiService.get(`/lecciones/modulo/${moduloId}/progreso`);
    return response.data;
}

export async function GetLeccionById(id: string): Promise<LeccionDetailType> {
    const response = await apiService.get(`/lecciones/${id}`);
    return response.data;
}

export async function CreateLeccion(data: LeccionCreateType): Promise<ResponseType> {
    const response = await apiService.post("/lecciones", data);
    return response.data;
}

export async function UpdateLeccion(id: string, data: LeccionUpdateType): Promise<ResponseType> {
    const response = await apiService.patch(`/lecciones/${id}`, data);
    return response.data;
}

export async function DeleteLeccionLogically(id: string): Promise<ResponseType> {
    const response = await apiService.delete(`/lecciones/${id}`);
    return response.data;
}

export async function RestoreLeccion(id: string): Promise<ResponseType> {
    const response = await apiService.patch(`/lecciones/${id}/restaurar`);
    return response.data;
}

export async function GetFormularioLeccion(leccionId: string): Promise<FormularioLeccionPublicoType> {
    const response = await apiService.get(`/lecciones/${leccionId}/formulario`);
    return response.data;
}

export async function MarcarLeccionCompletada(
    id: string,
    respuestas?: { preguntaFormularioId: string; opcionFormularioId: string }[],
): Promise<MarcarLeccionCompletadaResponseType> {
    const response = await apiService.post(`/lecciones/${id}/completar`, { respuestas });
    return response.data;
}

export async function GetRecursosByLeccion(leccionId: string): Promise<RecursoLeccionType[]> {
    const response = await apiService.get(`/lecciones/${leccionId}/recursos`);
    return response.data;
}

export async function CreateRecursoLeccion(leccionId: string, data: RecursoLeccionCreateType): Promise<ResponseType> {
    const formData = buildFormData(data);
    const response = await apiService.post(`/lecciones/${leccionId}/recursos`, formData);
    return response.data;
}

export async function GetRecursoLeccionById(id: string): Promise<RecursoLeccionType> {
    const response = await apiService.get(`/recursos-leccion/${id}`);
    return response.data;
}

export async function UpdateRecursoLeccion(id: string, data: RecursoLeccionUpdateType): Promise<ResponseType> {
    const formData = buildFormData(data);
    const response = await apiService.patch(`/recursos-leccion/${id}`, formData);
    return response.data;
}

export async function DeleteRecursoLeccion(id: string): Promise<ResponseType> {
    const response = await apiService.delete(`/recursos-leccion/${id}`);
    return response.data;
}