import z from "zod";

export const TipoDescuentoSchema = z.enum(["PORCENTAJE", "MONTO_FIJO"]);
export type TipoDescuentoType = z.infer<typeof TipoDescuentoSchema>;

export const DescuentoModuloSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    curso: z.object({
        id: z.string(),
        nombre: z.string(),
    }),
});

export const DescuentoSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    descripcion: z.string().nullable(),
    tipo: TipoDescuentoSchema,
    valor: z.number(),
    iniciaEn: z.string(),
    finalizaEn: z.string(),
    habilitado: z.boolean(),
    vigente: z.boolean(),
    creadoEn: z.string(),
    actualizadoEn: z.string(),
    modulos: z.array(DescuentoModuloSchema),
});

export type DescuentoType = z.infer<typeof DescuentoSchema>;

export const DescuentosResponseSchema = z.array(DescuentoSchema);
export type DescuentosResponseType = z.infer<typeof DescuentosResponseSchema>;

export const DescuentoCreateSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    descripcion: z.string().optional(),
    tipo: TipoDescuentoSchema,
    valor: z.number().positive("El descuento debe ser mayor a 0"),
    iniciaEn: z.string().min(1, "La fecha de inicio es obligatoria"),
    finalizaEn: z.string().min(1, "La fecha de finalización es obligatoria"),
    habilitado: z.boolean().optional(),
    aplicarATodos: z.boolean().optional(),
    moduloIds: z.array(z.string()).optional(),
}).superRefine((data, ctx) => {
    if (data.tipo === "PORCENTAJE" && data.valor > 100) {
        ctx.addIssue({
            code: "custom",
            path: ["valor"],
            message: "El porcentaje no puede superar el 100%",
        });
    }

    if (new Date(data.finalizaEn) <= new Date(data.iniciaEn)) {
        ctx.addIssue({
            code: "custom",
            path: ["finalizaEn"],
            message: "La fecha final debe ser posterior a la fecha de inicio",
        });
    }
});

export type DescuentoCreateType = z.infer<typeof DescuentoCreateSchema>;

export const DescuentoUpdateSchema = DescuentoCreateSchema;
export type DescuentoUpdateType = DescuentoCreateType;