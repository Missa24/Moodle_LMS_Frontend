import z from "zod";

import {
    createPaginatedResponseSchema,
} from "@/utils/Schema/Response";

export const TipoDescuentoCursoSchema =
    z.enum([
        "PORCENTAJE",
        "MODULO_GRATIS",
    ]);

export type TipoDescuentoCursoType =
    z.infer<
        typeof TipoDescuentoCursoSchema
    >;

export const CursoPrecioModuloSchema =
    z.object({
        id:
            z.string(),

        nombre:
            z.string(),

        orden:
            z.number(),

        precio:
            z.number(),
    });

export const CursoPrecioDescuentoSchema =
    z.discriminatedUnion(
        "tipo",
        [
            z.object({
                tipo:
                    z.literal(
                        "PORCENTAJE",
                    ),

                porcentaje:
                    z.number(),
            }),

            z.object({
                tipo:
                    z.literal(
                        "MODULO_GRATIS",
                    ),

                modulo:
                    z.object({
                        id:
                            z.string(),

                        nombre:
                            z.string(),

                        precio:
                            z.number(),
                    }),
            }),
        ],
    );

export const CursoPrecioSchema =
    z.object({
        cursoId:
            z.string(),

        nombre:
            z.string(),

        modulos:
            z.array(
                CursoPrecioModuloSchema,
            ),

        precioBase:
            z.number(),

        descuento:
            CursoPrecioDescuentoSchema
                .nullable(),

        montoDescuento:
            z.number(),

        precioFinal:
            z.number(),

        pago: z.object({
            urlPago:
                z.string()
                    .nullable(),

            urlPagoBolivia:
                z.string()
                    .nullable(),
        }),

        habilitado:
            z.boolean(),
    });

export type CursoPrecioType =
    z.infer<
        typeof CursoPrecioSchema
    >;

export const ConfiguracionVentaCursoSchema =
    z.object({
        id: z.string(),
        cursoId: z.string(),

        tipoDescuento:
            TipoDescuentoCursoSchema,

        porcentaje:
            z.coerce
                .number()
                .nullable(),

        moduloDescuentoId:
            z.string()
                .nullable(),

        urlPago:
            z.string()
                .nullable(),

        urlPagoBolivia:
            z.string()
                .nullable(),

        habilitado:
            z.boolean(),

        creadoEn:
            z.string(),

        actualizadoEn:
            z.string(),

        moduloDescuento: z
            .object({
                id: z.string(),
                nombre: z.string(),
                orden: z.number(),
            })
            .nullable()
            .optional(),
    });

export type ConfiguracionVentaCursoType =
    z.infer<
        typeof ConfiguracionVentaCursoSchema
    >;

export const ConfigurarVentaCursoSchema =
    z.object({
        tipoDescuento:
            TipoDescuentoCursoSchema,

        porcentaje:
            z.number()
                .min(0.01)
                .max(100)
                .optional(),

        moduloDescuentoId:
            z.string()
                .optional(),

        urlPago:
            z.string()
                .optional(),

        qrPagoBolivia:
            z.instanceof(File)
                .optional(),

        habilitado:
            z.boolean()
                .optional(),
    })
        .superRefine((data, ctx) => {
            if (
                data.tipoDescuento ===
                "PORCENTAJE" &&
                data.porcentaje ===
                undefined
            ) {
                ctx.addIssue({
                    code: "custom",
                    path: ["porcentaje"],
                    message:
                        "El porcentaje es obligatorio",
                });
            }

            if (
                data.tipoDescuento ===
                "MODULO_GRATIS" &&
                !data.moduloDescuentoId
            ) {
                ctx.addIssue({
                    code: "custom",
                    path: [
                        "moduloDescuentoId",
                    ],
                    message:
                        "Debes seleccionar un módulo",
                });
            }
        });

export type ConfigurarVentaCursoType =
    z.infer<
        typeof ConfigurarVentaCursoSchema
    >;

export const ConfigurarVentaCursoResponseSchema =
    z.object({
        configuracion:
            ConfiguracionVentaCursoSchema,

        precio:
            CursoPrecioSchema,
    });

export type ConfigurarVentaCursoResponseType =
    z.infer<
        typeof ConfigurarVentaCursoResponseSchema
    >;

export const CursoSchema = z.object({
    id:
        z.string(),

    nombre:
        z.string(),

    categoria: z
        .object({
            id:
                z.string(),

            nombre:
                z.string(),

            slug:
                z.string(),
        })
        .nullable(),

    slug:
        z.string(),

    descripcionCorta:
        z.string()
            .nullable(),

    descripcionCompleta:
        z.string()
            .nullable(),

    duracionHoras:
        z.number()
            .nullable(),

    rutaPortada:
        z.string()
            .nullable(),

    rutaImagenSecundaria:
        z.string()
            .nullable(),

    estado:
        z.string(),

    creadoPor:
        z.string()
            .nullable(),

    creadoEn:
        z.string(),

    actualizadoEn:
        z.string(),

    precioCurso:
        CursoPrecioSchema
            .omit({
                cursoId: true,
                nombre: true,
            })
            .nullable()
            .optional(),
});

export type CursoType = z.infer<
    typeof CursoSchema
>;

export const CursosResponseSchema =
    createPaginatedResponseSchema(
        CursoSchema,
    );

export type CursosResponseType =
    z.infer<
        typeof CursosResponseSchema
    >;

export const CategoriaSchema = z.object({
    id:
        z.string(),

    nombre:
        z.string(),

    slug:
        z.string(),

    categoriaPadreId:
        z.string()
            .nullable()
            .optional(),
});

export type CategoriaType =
    z.infer<
        typeof CategoriaSchema
    >;

export const CategoriasResponseSchema =
    z.array(
        CategoriaSchema,
    );

export type CategoriasResponseType =
    z.infer<
        typeof CategoriasResponseSchema
    >;

export const CategoriaCreateSchema =
    z.object({
        nombre: z
            .string()
            .min(
                1,
                "El nombre es obligatorio",
            ),

        slug: z
            .string()
            .min(
                1,
                "El slug es obligatorio",
            ),

        categoriaPadreId:
            z.string()
                .optional(),
    });

export type CategoriaCreateType =
    z.infer<
        typeof CategoriaCreateSchema
    >;

export const CursoDetailResponseSchema =
    CursoSchema;

export type CursoDetailType =
    z.infer<
        typeof CursoDetailResponseSchema
    >;

export const CursoCreateSchema = z.object({
    nombre: z
        .string()
        .min(
            1,
            "El nombre es obligatorio",
        ),

    categoriaId:
        z.string()
            .min(
                1,
                "La categoría es obligatoria",
            ),

    slug: z
        .string()
        .min(
            1,
            "El slug es obligatorio",
        ),

    descripcionCorta:
        z.string()
            .optional(),

    descripcionCompleta:
        z.string()
            .optional(),

    duracionHoras:
        z.number()
            .int()
            .min(
                1,
                "La duración debe ser mayor a 0",
            )
            .optional(),

    portada:
        z.instanceof(File)
            .optional(),

    imagenSecundaria:
        z.instanceof(File)
            .optional(),

    estado:
        z.string()
            .optional(),

    creadoPor:
        z.string()
            .optional(),
});

export type CursoCreateType =
    z.infer<
        typeof CursoCreateSchema
    >;

export const CursoUpdateSchema =
    CursoCreateSchema.partial();

export type CursoUpdateType =
    z.infer<
        typeof CursoUpdateSchema
    >;

export const MisCursoModuloSchema =
    z.object({
        id:
            z.string(),

        nombre:
            z.string(),

        orden:
            z.number(),

        estado:
            z.string(),

        estadoAcceso:
            z.string(),

        porcentajeAvance:
            z.number(),

        numeroInscripcion:
            z.string(),
    });

export type MisCursoModuloType =
    z.infer<
        typeof MisCursoModuloSchema
    >;

export const MisCursoInscritoSchema =
    z.object({
        id:
            z.string(),

        nombre:
            z.string(),

        categoria: z
            .object({
                id:
                    z.string(),

                nombre:
                    z.string(),

                slug:
                    z.string(),
            })
            .nullable(),

        modulos:
            z.array(
                MisCursoModuloSchema,
            ),
    });

export type MisCursoInscritoType =
    z.infer<
        typeof MisCursoInscritoSchema
    >;