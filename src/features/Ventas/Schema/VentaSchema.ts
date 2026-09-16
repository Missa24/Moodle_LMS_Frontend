import z from "zod";

export const MedioPagoSchema = z.enum([
    "BOLIVIA",
    "PAYPAL",
]);

export const TipoDescuentoVentaSchema = z.enum([
    "PORCENTAJE",
    "MONTO_FIJO",
]);

export const VentaSchema = z.object({
    id: z.string(),
    usuarioId: z.string(),
    moduloId: z.string(),
    leadId: z.string().nullable(),
    inscripcionId: z.string().nullable(),
    descuentoId: z.string().nullable(),

    precioBase: z.number(),
    descuentoNombre: z.string().nullable(),
    descuentoTipo: TipoDescuentoVentaSchema.nullable(),
    descuentoValor: z.number().nullable(),
    montoDescuento: z.number(),

    montoCobrado: z.number(),
    comision: z.number(),
    comisionConfirmada: z.boolean(),
    totalRecibido: z.number(),

    moneda: z.string(),
    medioPago: MedioPagoSchema,
    paisCodigo: z.string().nullable(),

    referenciaPago: z.string().nullable(),
    observaciones: z.string().nullable(),
    creadoEn: z.string(),

    usuario: z.object({
        id: z.string(),
        username: z.string(),
        correo: z.string(),
        perfil: z.object({
            nombre: z.string(),
            apellidoPaterno: z.string().nullable(),
            apellidoMaterno: z.string().nullable(),
            pais: z.string().nullable(),
            paisCodigo: z.string().nullable(),
        }).nullable(),
    }),

    modulo: z.object({
        id: z.string(),
        nombre: z.string(),
        curso: z.object({
            id: z.string(),
            nombre: z.string(),
        }),
    }),

    descuento: z.object({
        id: z.string(),
        nombre: z.string(),
    }).nullable(),

    lead: z.object({
        id: z.string(),
        estado: z.string(),
    }).nullable(),

    inscripcion: z.object({
        id: z.string(),
        numeroInscripcion: z.string(),
        estado: z.string(),
    }).nullable(),
});

export type VentaType = z.infer<typeof VentaSchema>;

export const VentasResponseSchema = z.object({
    data: z.array(VentaSchema),
    meta: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number(),
        totalPages: z.number(),
    }),
});

export type VentasResponseType = z.infer<
    typeof VentasResponseSchema
>;

export const UpdateComisionSchema = z.object({
    comision: z.number()
        .min(0, "La comisión no puede ser negativa"),
});

export type UpdateComisionType = z.infer<
    typeof UpdateComisionSchema
>;