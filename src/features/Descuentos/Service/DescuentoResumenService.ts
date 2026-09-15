import { apiService } from "@/api/api";

import {
    DescuentoResumenSchema,
    type DescuentoResumenType,
} from "../Schema/DescuentoResumenSchema";

export async function GetDescuentoResumen(): Promise<DescuentoResumenType> {
    const response = await apiService.get("/descuentos/resumen",);

    return DescuentoResumenSchema.parse(response.data,);
}