import z from "zod";

export const EstadoLeadSchema = z.enum([
    "INTERESADO",
    "PAGO_INICIADO",
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

export const LeadModuloSchema = z.object({
    id: z.string(),
    nombre: z.string(),
});

export const LeadSchema = z.object({
    id: z.string(),

    nombre: z.string(),

    apellidoPaterno: z.string(),

    apellidoMaterno: z.string(),

    correo: z
        .string()
        .email(),

    telefono: z.string(),

    ciudad: z.string(),

    pais: z.string(),

    paisCodigo: z.string(),

    curso: LeadCursoSchema,

    modulo: LeadModuloSchema,

    estado: EstadoLeadSchema,

    creadoEn: z.string(),

    ultimoIntentoEn: z.string(),

    convertidoEn: z
        .string()
        .nullable(),
});

export type LeadType = z.infer<
    typeof LeadSchema
>;

export const LeadsResponseSchema =
    z.array(LeadSchema);

export type LeadsResponseType = z.infer<
    typeof LeadsResponseSchema
>;