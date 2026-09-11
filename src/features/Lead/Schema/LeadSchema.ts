import z from "zod";

export const EstadoLeadSchema = z.enum([
    "INTERESADO",
    "PAGO_COMPLETADO",
    "CONVERTIDO",
    "DESCARTADO",
]);

export type EstadoLeadType = z.infer<
    typeof EstadoLeadSchema
>;

export const CreateLeadSchema = z.object({
    moduloId: z
        .string()
        .min(1, "El módulo es obligatorio"),
});

export type CreateLeadType = z.infer<
    typeof CreateLeadSchema
>;

export const CreateLeadResponseSchema = z.object({
    ok: z.boolean(),
});

export type CreateLeadResponseType = z.infer<
    typeof CreateLeadResponseSchema
>;

export const LeadCursoSchema = z.object({
    id: z.string(),
    nombre: z.string(),
});

export type LeadCursoType = z.infer<
    typeof LeadCursoSchema
>;

export const LeadModuloSchema = z.object({
    id: z.string(),
    nombre: z.string(),
});

export type LeadModuloType = z.infer<
    typeof LeadModuloSchema
>;

export const LeadSchema = z.object({
    id: z.string(),

    usuarioId: z.string(),

    nombre: z.string(),

    apellidoPaterno:
        z.string(),

    apellidoMaterno:
        z.string(),

    correo:
        z.string().email(),

    telefono:
        z.string(),

    ciudad:
        z.string(),

    pais:
        z.string(),

    paisCodigo:
        z.string(),

    curso: z.object({
        id: z.string(),
        nombre: z.string(),
    }),

    modulo: z.object({
        id: z.string(),
        nombre: z.string(),
    }),

    estado:
        EstadoLeadSchema,

    creadoEn:
        z.string(),

    actualizadoEn:
        z.string(),

    ultimoIntentoEn:
        z.string(),

    convertidoEn:
        z.string().nullable(),
});

export type LeadType =
    z.infer<
        typeof LeadSchema
    >;

export const LeadsResponseSchema =
    z.object({
        data: z.array(
            LeadSchema,
        ),

        pagination: z.object({
            page: z.number(),
            limit: z.number(),
            total: z.number(),
            totalPages: z.number(),
        }),
    });

export type LeadsResponseType =
    z.infer<
        typeof LeadsResponseSchema
    >;


export const LeadUsuarioModuloSchema = z.object({
    id: z.string(),

    estado: EstadoLeadSchema,

    creadoEn: z.string(),

    ultimoIntentoEn: z.string(),

    convertidoEn: z
        .string()
        .nullable(),

    modulo: z.object({
        id: z.string(),
        nombre: z.string(),

        curso: z.object({
            id: z.string(),
            nombre: z.string(),
        }),
    }),
});

export type LeadUsuarioModuloType = z.infer<
    typeof LeadUsuarioModuloSchema
>;

export const LeadsUsuarioResponseSchema =
    z.array(LeadUsuarioModuloSchema);

export type LeadsUsuarioResponseType = z.infer<
    typeof LeadsUsuarioResponseSchema
>;

export const LeadDetailSchema = z.object({
    id: z.string(),

    estado: EstadoLeadSchema,

    creadoEn: z.string(),

    actualizadoEn: z.string(),

    ultimoIntentoEn: z.string(),

    convertidoEn: z
        .string()
        .nullable(),

    usuario: z.object({
        id: z.string(),

        correo: z
            .string()
            .email(),

        perfil: z
            .object({
                nombre: z.string(),

                apellidoPaterno: z
                    .string()
                    .nullable(),

                apellidoMaterno: z
                    .string()
                    .nullable(),

                telefono: z
                    .string()
                    .nullable(),

                ciudad: z
                    .string()
                    .nullable(),

                pais: z
                    .string()
                    .nullable(),

                paisCodigo: z
                    .string()
                    .nullable(),
            })
            .nullable(),
    }),

    modulo: z.object({
        id: z.string(),

        nombre: z.string(),

        curso: z.object({
            id: z.string(),

            nombre: z.string(),
        }),
    }),
});

export type LeadDetailType = z.infer<
    typeof LeadDetailSchema
>;

export const UpdateLeadEstadoSchema = z.object({
    estado: EstadoLeadSchema,
});

export type UpdateLeadEstadoType = z.infer<
    typeof UpdateLeadEstadoSchema
>;

export const UpdateLeadEstadoResponseSchema =
    z.object({
        id: z.string(),

        estado: EstadoLeadSchema,

        convertidoEn: z
            .string()
            .nullable(),

        actualizadoEn: z.string(),
    });

export type UpdateLeadEstadoResponseType =
    z.infer<
        typeof UpdateLeadEstadoResponseSchema
    >;