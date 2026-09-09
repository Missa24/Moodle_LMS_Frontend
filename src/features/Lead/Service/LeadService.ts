
import { apiService } from "@/api/api";
import {
    CreateLeadResponseSchema,
    LeadDetailSchema,
    LeadsResponseSchema,
    LeadsUsuarioResponseSchema,
    UpdateLeadEstadoResponseSchema,
    type CreateLeadResponseType,
    type CreateLeadType,
    type LeadDetailType,
    type LeadsResponseType,
    type LeadsUsuarioResponseType,
    type UpdateLeadEstadoResponseType,
    type UpdateLeadEstadoType,
} from "../Schema/LeadSchema";

export async function CreateLead(
    data: CreateLeadType,
): Promise<CreateLeadResponseType> {
    const response =
        await apiService.post(
            "/leads",
            data,
        );

    return CreateLeadResponseSchema.parse(
        response.data,
    );
}

export async function GetLeads(
    page: number,
    limit: number = 10,
    q: string = "",
): Promise<LeadsResponseType> {
    const response =
        await apiService.get(
            "/leads",
            {
                params: {
                    page,
                    limit,
                    q:
                        q.trim() ||
                        undefined,
                },
            },
        );

    return LeadsResponseSchema.parse(
        response.data,
    );
}

export async function GetMyLeads(): Promise<LeadsUsuarioResponseType> {
    const response =
        await apiService.get(
            "/leads/me",
        );

    return LeadsUsuarioResponseSchema.parse(
        response.data,
    );
}

export async function GetLeadsByUser(
    usuarioId: string,
): Promise<LeadsUsuarioResponseType> {
    const response =
        await apiService.get(
            `/leads/usuario/${usuarioId}`,
        );

    return LeadsUsuarioResponseSchema.parse(
        response.data,
    );
}

export async function GetLeadById(
    id: string,
): Promise<LeadDetailType> {
    const response =
        await apiService.get(
            `/leads/${id}`,
        );

    return LeadDetailSchema.parse(
        response.data,
    );
}

export async function UpdateLeadEstado(
    id: string,
    data: UpdateLeadEstadoType,
): Promise<UpdateLeadEstadoResponseType> {
    const response =
        await apiService.patch(
            `/leads/${id}/estado`,
            data,
        );

    return UpdateLeadEstadoResponseSchema.parse(
        response.data,
    );
}