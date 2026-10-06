import z from "zod";

export const EstadoLeadSchema = z.enum(["INTERESADO", "PAGO_COMPLETADO", "CONVERTIDO", "DESCARTADO"]);
export type EstadoLeadType = z.infer<typeof EstadoLeadSchema>;

export const MedioPagoSchema = z.enum(["PAYPAL", "BOLIVIA"]);
export type MedioPagoType = z.infer<typeof MedioPagoSchema>;

export const TipoCompraSchema = z.enum(["MODULO", "CURSO"]);
export type TipoCompraType = z.infer<typeof TipoCompraSchema>;

export const CreateLeadSchema = z.discriminatedUnion("tipoCompra", [
    z.object({ tipoCompra: z.literal("MODULO"), moduloId: z.string().min(1, "El módulo es obligatorio") }),
    z.object({ tipoCompra: z.literal("CURSO"), cursoId: z.string().min(1, "El curso es obligatorio") }),
]);
export type CreateLeadType = z.infer<typeof CreateLeadSchema>;

export const CreateLeadResponseSchema = z.object({
    ok: z.boolean(),
    leadId: z.string(),
    tipoCompra: TipoCompraSchema,
});
export type CreateLeadResponseType = z.infer<typeof CreateLeadResponseSchema>;

export const LeadCursoSchema = z.object({
    id: z.string(),
    nombre: z.string(),
});
export type LeadCursoType = z.infer<typeof LeadCursoSchema>;

export const LeadModuloSchema = z.object({
    id: z.string(),
    nombre: z.string(),
});
export type LeadModuloType = z.infer<typeof LeadModuloSchema>;

export const LeadModuloConCursoSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    curso: LeadCursoSchema,
});

export const LeadSchema = z.object({
    id: z.string(),
    tipoCompra: TipoCompraSchema,
    usuarioId: z.string(),
    nombre: z.string(),
    apellidoPaterno: z.string(),
    apellidoMaterno: z.string(),
    correo: z.string().email(),
    telefono: z.string(),
    ciudad: z.string(),
    pais: z.string(),
    paisCodigo: z.string(),
    curso: LeadCursoSchema.nullable(),
    modulo: LeadModuloSchema.nullable(),
    ventaId: z.string().nullable(),
    estado: EstadoLeadSchema,
    creadoEn: z.string(),
    actualizadoEn: z.string(),
    ultimoIntentoEn: z.string(),
    convertidoEn: z.string().nullable(),
});
export type LeadType = z.infer<typeof LeadSchema>;

export const LeadsResponseSchema = z.object({
    data: z.array(LeadSchema),
    pagination: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number(),
        totalPages: z.number(),
    }),
});
export type LeadsResponseType = z.infer<typeof LeadsResponseSchema>;

export const LeadUsuarioSchema = z.object({
    id: z.string(),
    tipoCompra: TipoCompraSchema,
    estado: EstadoLeadSchema,
    creadoEn: z.string(),
    ultimoIntentoEn: z.string(),
    convertidoEn: z.string().nullable(),
    modulo: LeadModuloConCursoSchema.nullable(),
    curso: LeadCursoSchema.nullable(),
});
export type LeadUsuarioType = z.infer<typeof LeadUsuarioSchema>;

export const LeadsUsuarioResponseSchema = z.array(LeadUsuarioSchema);
export type LeadsUsuarioResponseType = z.infer<typeof LeadsUsuarioResponseSchema>;

const ComprobanteVentaSchema = z.object({
    id: z.string(),
    comprobantePagoUrl: z.string().nullable().optional(),
    comprobantePagoNombre: z.string().nullable().optional(),
});

export const LeadDetailSchema = z.object({
    id: z.string(),
    tipoCompra: TipoCompraSchema,
    estado: EstadoLeadSchema,
    precioUSD: z.number().positive().nullable(),
    creadoEn: z.string(),
    actualizadoEn: z.string(),
    ultimoIntentoEn: z.string(),
    convertidoEn: z.string().nullable(),
    usuario: z.object({
        id: z.string(),
        correo: z.string().email(),
        perfil: z.object({
            nombre: z.string(),
            apellidoPaterno: z.string().nullable(),
            apellidoMaterno: z.string().nullable(),
            telefono: z.string().nullable(),
            ciudad: z.string().nullable(),
            pais: z.string().nullable(),
            paisCodigo: z.string().nullable(),
        }).nullable(),
    }),
    modulo: LeadModuloConCursoSchema.nullable(),
    curso: LeadCursoSchema.nullable(),
    ventaModulo: ComprobanteVentaSchema.nullable(),
    ventaCurso: ComprobanteVentaSchema.nullable(),
});

export type LeadDetailType = z.infer<typeof LeadDetailSchema>;

export const UpdateLeadEstadoSchema = z.object({
    estado: EstadoLeadSchema,
    medioPago: MedioPagoSchema.optional(),
    moneda: z.enum(["USD", "BOB"]).optional(),
    montoCobrado: z.number().positive("El monto debe ser mayor a 0").optional(),
    referenciaPago: z.string().optional(),
    observaciones: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.estado === "PAGO_COMPLETADO" && !data.medioPago)
        ctx.addIssue({
            code: "custom",
            path: ["medioPago"],
            message: "El medio de pago es obligatorio",
        });

    if (data.estado === "PAGO_COMPLETADO" && data.montoCobrado === undefined)
        ctx.addIssue({
            code: "custom",
            path: ["montoCobrado"],
            message: "El monto cobrado es obligatorio",
        });
});

export type UpdateLeadEstadoType = z.infer<typeof UpdateLeadEstadoSchema> & {
    comprobante?: File;
};

export const UpdateLeadEstadoResponseSchema = z.object({
    id: z.string(),
    tipoCompra: TipoCompraSchema,
    estado: EstadoLeadSchema,
    convertidoEn: z.string().nullable(),
    actualizadoEn: z.string(),
    ventaModulo: z.object({ id: z.string() }).nullable(),
    ventaCurso: z.object({ id: z.string() }).nullable(),
});

export type UpdateLeadEstadoResponseType = z.infer<typeof UpdateLeadEstadoResponseSchema>;

export const EstadoCompraCursoSchema = z.object({
    cursoId: z.string(),
    compradoComoCurso: z.boolean(),
    ventaCursoId: z.string().nullable(),
    compradoEn: z.string().nullable(),
    modulosPublicados: z.number(),
    modulosConAcceso: z.number(),
    tieneTodosLosModulos: z.boolean(),
    puedeComprarCurso: z.boolean(),
});

export type EstadoCompraCursoType = z.infer<typeof EstadoCompraCursoSchema>;