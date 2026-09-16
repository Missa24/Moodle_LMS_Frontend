import z from "zod";

export const DescuentoResumenSchema = z.object({
    hayDescuentos: z.boolean(),
    cantidadDescuentos: z.number().int().nonnegative(),
    cantidadModulosConDescuento: z.number().int().nonnegative(),
});

export type DescuentoResumenType = z.infer<typeof DescuentoResumenSchema>;