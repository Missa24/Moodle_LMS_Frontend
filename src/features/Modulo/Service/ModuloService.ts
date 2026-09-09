import { apiService } from "@/api/api";
import { ResponseType } from "@/utils/Schema/Response";
import {
    ModuloCreateType,
    ModuloUpdateType,
    ModulosResponseType,
    ModulosCursoResponseType,
    ModuloDetailType,
} from "../Schema/ModuloSchema";
import { buildFormData } from "@/utils/buildFormData";

type ModuloFiltros = {
    nombre?: string;
    categoria?: string;
    cursoId?: string;
    estaPublicado?: boolean;
};

type ModuloCursoFiltros = {
    nombre?: string;
    estaPublicado?: boolean;
};

function buildParams(base: Record<string, string | number>, filtros?: Record<string, string | boolean | undefined>) {
    const params = new URLSearchParams(
        Object.fromEntries(Object.entries(base).map(([k, v]) => [k, String(v)]))
    );
    if (filtros) {
        Object.entries(filtros).forEach(([key, value]) => {
            if (value !== undefined && value !== "") params.append(key, String(value));
        });
    }
    return params;
}

export async function GetPaginatedModulos(
    page: number,
    limit: number = 10,
    filtros?: ModuloFiltros
): Promise<ModulosResponseType> {
    const params = buildParams({ page, limit }, filtros);
    const response = await apiService.get(`/modulos?${params.toString()}`);
    return response.data;
}

export async function GetModulosByCurso(
    cursoId: string,
    page: number,
    limit: number = 10,
    filtros?: ModuloCursoFiltros
): Promise<ModulosCursoResponseType> {
    const params = buildParams({ page, limit }, filtros);
    const response = await apiService.get(`/modulos/curso/${cursoId}?${params.toString()}`);
    return response.data;
}

export async function GetModuloById(id: string): Promise<ModuloDetailType> {
    const response = await apiService.get(`/modulos/${id}`);
    return response.data;
}

export async function CreateModulo(data: ModuloCreateType): Promise<ResponseType> {
    const formData = buildFormData({
        cursoId: data.cursoId,
        nombre: data.nombre,
        descripcion: data.descripcion,
        fraseMotivacional: data.fraseMotivacional,
        rutaImagen: data.rutaImagen,
        orden: data.orden,
        otorgaCertificacion: data.otorgaCertificacion,
        estaPublicado: data.estaPublicado,
        costo: data.costo,
    });
    const response = await apiService.post("/modulos", formData);
    return response.data;
}

export async function UpdateModulo(id: string, data: ModuloUpdateType): Promise<ResponseType> {
    const formData = buildFormData({
        cursoId: data.cursoId,
        nombre: data.nombre,
        descripcion: data.descripcion,
        fraseMotivacional: data.fraseMotivacional,
        rutaImagen: data.rutaImagen,
        orden: data.orden,
        otorgaCertificacion: data.otorgaCertificacion,
        estaPublicado: data.estaPublicado,
        costo: data.costo,
    });
    const response = await apiService.patch(`/modulos/${id}`, formData);
    return response.data;
}

export async function DeleteModuloLogically(id: string): Promise<ResponseType> {
    const response = await apiService.delete(`/modulos/${id}`);
    return response.data;
}

export async function RestoreModulo(id: string): Promise<ResponseType> {
    const response = await apiService.patch(`/modulos/${id}/restaurar`);
    return response.data;
}