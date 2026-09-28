import z from "zod";

export const CertificadoUsuarioSchema = z.object({
    id: z.string(),

    username: z.string(),

    correo: z.string(),

    perfil: z
        .object({
            nombre: z.string().nullable(),

            apellidoPaterno: z
                .string()
                .nullable(),

            apellidoMaterno: z
                .string()
                .nullable(),
        })
        .nullable(),
});

export const CertificadoCursoSchema = z.object({
    id: z.string(),

    nombre: z.string(),

    slug: z.string(),
});

export const CertificadoModuloSchema = z.object({
    id: z.string(),

    nombre: z.string(),

    cursoId: z.string(),
});

export const CertificadoInscripcionSchema =
    z.object({
        id: z.string(),

        numeroInscripcion: z.string(),

        fechaInscripcion: z.string(),

        estado: z.string(),

        porcentajeAvance: z.number(),

        modulo: CertificadoModuloSchema.nullable(),
    });

export const CertificadoSchema = z.object({
    idCertificado: z.string().nullable(),

    idInscripcion: z.string().nullable(),

    idModulo: z.string().nullable(),

    idUsuario: z.string(),

    idCurso: z.string().nullable(),

    nombreCertificado: z
        .string()
        .nullable(),

    nombreSugerido: z
        .string()
        .nullable(),

    nombre: z.string(),

    descripcion: z.string(),

    titulo: z.string().nullable(),

    tipo: z.string(),

    estado: z.string(),

    fechaEmision: z
        .string()
        .nullable(),

    numeroCertificado: z
        .string()
        .nullable(),

    codigoVerificacion: z
        .string()
        .nullable(),

    usuario: CertificadoUsuarioSchema
        .nullable(),

    curso: CertificadoCursoSchema
        .nullable(),

    inscripcion:
        CertificadoInscripcionSchema
            .nullable(),
});

export type Certificado = z.infer<
    typeof CertificadoSchema
>;

export const CertificadoAdminMetaSchema =
    z.object({
        total: z.number(),

        page: z.number(),

        limit: z.number(),

        totalPages: z.number(),
    });

export const CertificadoAdminResponseSchema =
    z.object({
        data: z.array(
            CertificadoSchema,
        ),

        meta: CertificadoAdminMetaSchema,
    });

export type CertificadoAdminResponse =
    z.infer<
        typeof CertificadoAdminResponseSchema
    >;

export const VerificarCertificadoSchema =
    z.object({
        valido: z.boolean(),

        certificado: z.object({
            id: z.string(),

            codigoVerificacion: z.string(),

            numeroCertificado: z.string(),

            titulo: z.string(),

            tipo: z.string(),

            estado: z.string(),

            fechaEmision: z.string(),

            estudiante: z.object({
                nombreCompleto:
                    z.string(),

                nombre:
                    z.string().nullable(),

                apellidoPaterno:
                    z.string().nullable(),

                apellidoMaterno:
                    z.string().nullable(),

                tipoDocumentoIdentidad:
                    z.string().nullable(),

                numeroDocumento:
                    z.string().nullable(),
            }),

            curso: z
                .object({
                    id: z.string(),

                    nombre: z.string(),

                    slug: z.string(),
                })
                .nullable(),

            modulo: z
                .object({
                    id: z.string(),

                    nombre: z.string(),

                    cursoId: z.string(),
                })
                .nullable(),

            inscripcion: z
                .object({
                    numeroInscripcion:
                        z.string(),

                    fechaInscripcion:
                        z.string(),

                    fechaFinalizacion:
                        z.string().nullable(),
                })
                .nullable(),
        }),
    });

export type VerificarCertificado =
    z.infer<
        typeof VerificarCertificadoSchema
    >;