import { apiService } from "@/api/api";

import {
    DescuentoCreateType,
    DescuentoSchema,
    DescuentosResponseSchema,
    DescuentosResponseType,
    DescuentoType,
    DescuentoUpdateType,
} from "../Schema/DescuentoSchema";

export async function GetDescuentos(): Promise<DescuentosResponseType> {
    const response =
        await apiService.get(
            "/descuentos",
        );

    return DescuentosResponseSchema.parse(
        response.data,
    );
}

export async function GetDescuentoById(
    id: string,
): Promise<DescuentoType> {
    const response =
        await apiService.get(
            `/descuentos/${id}`,
        );

    return DescuentoSchema.parse(
        response.data,
    );
}

export async function CreateDescuento(
    data: DescuentoCreateType,
): Promise<DescuentoType> {
    const response =
        await apiService.post(
            "/descuentos",
            data,
        );

    return DescuentoSchema.parse(
        response.data,
    );
}

export async function UpdateDescuento(
    id: string,
    data: DescuentoUpdateType,
): Promise<DescuentoType> {
    const response =
        await apiService.patch(
            `/descuentos/${id}`,
            data,
        );

    return DescuentoSchema.parse(
        response.data,
    );
}

export async function DeleteDescuento(
    id: string,
) {
    const response =
        await apiService.delete(
            `/descuentos/${id}`,
        );

    return response.data;
}

export async function RestoreDescuento(
    id: string,
) {
    const response =
        await apiService.patch(
            `/descuentos/${id}/restaurar`,
        );

    return response.data;
}