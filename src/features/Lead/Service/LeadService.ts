
import { apiService } from "@/api/api";
import {
    CreateLeadResponseSchema,
    LeadsResponseSchema,
    type CreateLeadResponseType,
    type CreateLeadType,
    type LeadsResponseType,
} from "../Schema/LeadSchema";

export async function CreateLead(data: CreateLeadType,): Promise<CreateLeadResponseType> {
    const response = await apiService.post("/leads", data,);

    return CreateLeadResponseSchema.parse(response.data,);
}

export async function GetLeads(): Promise<LeadsResponseType> {
    const response = await apiService.get("/leads",);

    return LeadsResponseSchema.parse(response.data,);
}