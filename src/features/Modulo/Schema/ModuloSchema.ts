import z from "zod";

import { createPaginatedResponseSchema } from "@/utils/Schema/Response";

const CategoriaResumenSchema = z.object({
    nombre: z.string(),
});

const CursoResumenSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    categoria: CategoriaResumenSchema,
});

export const TipoDescuentoSchema = z.enum([
    "PORCENTAJE",
    "MONTO_FIJO",
]);

export type TipoDescuentoType = z.infer<typeof TipoDescuentoSchema>;

export const DescuentoAplicadoSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    descripcion: z.string().nullable(),
    tipo: TipoDescuentoSchema,
    valor: z.number(),
    iniciaEn: z.string(),
    finalizaEn: z.string(),
});

export type DescuentoAplicadoType = z.infer<typeof DescuentoAplicadoSchema>;

export const ModuloSchema = z.object({
    id: z.string(),
    cursoId: z.string(),
    nombre: z.string(),
    descripcion: z.string().nullable(),
    fraseMotivacional: z.string().nullable(),
    rutaImagen: z.string().nullable(),
    orden: z.number(),
    otorgaCertificacion: z.boolean(),
    estaPublicado: z.boolean(),
    costo: z.number().nullable(),
    precioFinal: z.number().nullable(),
    montoDescuento: z.number(),
    descuento: DescuentoAplicadoSchema.nullable(),
    urlPago: z.string().nullable(),
    urlPagoBolivia: z.string().nullable(),
    creadoEn: z.string(),
    actualizadoEn: z.string(),
});

export type ModuloType = z.infer<typeof ModuloSchema>;

export const ModuloListItemSchema = ModuloSchema.extend({
    curso: CursoResumenSchema,
});

export type ModuloListItemType = z.infer<typeof ModuloListItemSchema>;

export const ModulosResponseSchema = createPaginatedResponseSchema(
    ModuloListItemSchema,
);

export type ModulosResponseType = z.infer<typeof ModulosResponseSchema>;

export const ModulosCursoResponseSchema = createPaginatedResponseSchema(
    ModuloSchema,
);

export type ModulosCursoResponseType = z.infer<
    typeof ModulosCursoResponseSchema
>;

export const ModuloDetailResponseSchema = ModuloSchema.extend({
    curso: CursoResumenSchema,
    descuentoId: z.string().nullable(),
    _count: z.object({
        lecciones: z.number(),
        inscripciones: z.number(),
    }),
});

export type ModuloDetailType = z.infer<typeof ModuloDetailResponseSchema>;

export const ModuloCreateSchema = z.object({
    cursoId: z.string().min(1, "El curso es obligatorio"),
    nombre: z.string().min(1, "El nombre es obligatorio"),
    descripcion: z.string().optional(),
    fraseMotivacional: z.string().optional(),
    rutaImagen: z.instanceof(File).optional(),
    qrPagoBolivia: z.instanceof(File).optional(),
    otorgaCertificacion: z.boolean().optional(),
    estaPublicado: z.boolean().optional(),
    costo: z
        .number()
        .min(0, "El costo no puede ser negativo")
        .optional(),
    urlPago: z
        .union([
            z.string().url("Ingresa un enlace de pago internacional válido"),
            z.literal(""),
        ])
        .optional(),
    descuentoId: z.string().optional(),
});

export type ModuloCreateType = z.infer<typeof ModuloCreateSchema>;

export const ModuloUpdateSchema = ModuloCreateSchema.partial();

export type ModuloUpdateType = z.infer<typeof ModuloUpdateSchema>;