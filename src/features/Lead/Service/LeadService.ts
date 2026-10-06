import { apiService } from "@/api/api";

import {
    CreateLeadResponseSchema,
    EstadoCompraCursoSchema,
    LeadDetailSchema,
    LeadsResponseSchema,
    LeadsUsuarioResponseSchema,
    UpdateLeadEstadoResponseSchema,
    type CreateLeadResponseType,
    type CreateLeadType,
    type EstadoCompraCursoType,
    type LeadDetailType,
    type LeadsResponseType,
    type LeadsUsuarioResponseType,
    type UpdateLeadEstadoResponseType,
    type UpdateLeadEstadoType,
} from "../Schema/LeadSchema";

export async function CreateLead(data: CreateLeadType): Promise<CreateLeadResponseType> {
    const response = await apiService.post("/leads", data);
    return CreateLeadResponseSchema.parse(response.data);
}

export async function GetLeads(page: number, limit = 10, q = ""): Promise<LeadsResponseType> {
    const response = await apiService.get("/leads", {
        params: { page, limit, q: q.trim() || undefined },
    });
    return LeadsResponseSchema.parse(response.data);
}

export async function GetMyLeads(): Promise<LeadsUsuarioResponseType> {
    const response = await apiService.get("/leads/me");
    return LeadsUsuarioResponseSchema.parse(response.data);
}

export async function GetLeadsByUser(usuarioId: string): Promise<LeadsUsuarioResponseType> {
    const response = await apiService.get(`/leads/usuario/${usuarioId}`);
    return LeadsUsuarioResponseSchema.parse(response.data);
}

export async function GetLeadById(id: string): Promise<LeadDetailType> {
    const response = await apiService.get(`/leads/${id}`);
    return LeadDetailSchema.parse(response.data);
}

export async function UpdateLeadEstado(id: string, data: UpdateLeadEstadoType): Promise<UpdateLeadEstadoResponseType> {
    const formData = new FormData();

    formData.append("estado", data.estado);
    if (data.medioPago) formData.append("medioPago", data.medioPago);
    if (data.moneda) formData.append("moneda", data.moneda);
    if (data.montoCobrado !== undefined) formData.append("montoCobrado", String(data.montoCobrado));
    if (data.referenciaPago?.trim()) formData.append("referenciaPago", data.referenciaPago.trim());
    if (data.observaciones?.trim()) formData.append("observaciones", data.observaciones.trim());
    if (data.comprobante) formData.append("comprobante", data.comprobante);

    const response = await apiService.patch(`/leads/${id}/estado`, formData);
    return UpdateLeadEstadoResponseSchema.parse(response.data);
}

export async function GetEstadoCompraCurso(cursoId: string): Promise<EstadoCompraCursoType> {
    const response = await apiService.get(`/leads/curso/${cursoId}/estado-compra`);
    return EstadoCompraCursoSchema.parse(response.data);
}