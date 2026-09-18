import { apiService } from "@/api/api";

import {
    UpdateComisionType,
    VentaResumenParams,
    VentaResumenSchema,
    VentaResumenType,
    VentaSchema,
    VentasEstadisticasParams,
    VentasEstadisticasSchema,
    VentasEstadisticasType,
    VentasResponseSchema,
    VentasResponseType,
    VentaType,
} from "../Schema/VentaSchema";

export type GetVentasParams = {
    page?: number;
    limit?: number;
    usuarioId?: string;
    moduloId?: string;
    medioPago?: "BOLIVIA" | "PAYPAL";
    moneda?: string;
    comisionConfirmada?: boolean;
    desde?: string;
    hasta?: string;
};

export async function GetVentas(
    params: GetVentasParams = {},
): Promise<VentasResponseType> {
    const response = await apiService.get("/ventas", {
        params,
    });

    return VentasResponseSchema.parse(response.data);
}

export async function GetVentaById(
    id: string,
): Promise<VentaType> {
    const response = await apiService.get(`/ventas/${id}`);

    return VentaSchema.parse(response.data);
}

export async function UpdateVentaComision(
    id: string,
    data: UpdateComisionType,
): Promise<VentaType> {
    const response = await apiService.patch(
        `/ventas/${id}/comision`,
        data,
    );

    return VentaSchema.parse(response.data);
}

export async function MarcarComisionPendiente(
    id: string,
): Promise<VentaType> {
    const response = await apiService.patch(
        `/ventas/${id}/comision/pendiente`,
    );

    return VentaSchema.parse(response.data);
}

export async function GetVentasResumen(
    params: VentaResumenParams = {},
): Promise<VentaResumenType> {
    const response = await apiService.get("/ventas/resumen", {
        params: {
            desde: params.desde || undefined,
            hasta: params.hasta || undefined,
        },
    });

    const raw: unknown = response.data;

    return VentaResumenSchema.parse(raw);
}

export async function GetVentasEstadisticas(
    params: VentasEstadisticasParams = {},
): Promise<VentasEstadisticasType> {
    const response =
        await apiService.get("/ventas/estadisticas", {
            params: {
                desde: params.desde || undefined,

                hasta: params.hasta || undefined,

                agrupacion: params.agrupacion ?? "MES",
            },
        },
        );

    const raw: unknown = response.data;
    return VentasEstadisticasSchema.parse(raw,);
}