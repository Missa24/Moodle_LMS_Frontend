import z from "zod";

export const CertificadoSchema = z.object({
    idCertificado: z.string(),
    idInscripcion: z.string().nullable(),
    idModulo: z.string().nullable(),
    idUsuario: z.string(),
    idCurso: z.string().nullable(),
    nombre: z.string(),
    descripcion: z.string(),
    tipo: z.string(),
    estado: z.string(),
    fechaEmision: z.string(),
    numeroCertificado: z.string(),
});

export type Certificado = z.infer<
    typeof CertificadoSchema
>;

export const VerificarCertificadoSchema = z.object({
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
            nombreCompleto: z.string(),
            nombre: z.string().nullable(),
            apellidoPaterno: z.string().nullable(),
            apellidoMaterno: z.string().nullable(),
            tipoDocumentoIdentidad: z.string().nullable(),
            numeroDocumento: z.string().nullable(),
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
                numeroInscripcion: z.string(),
                fechaInscripcion: z.string(),
                fechaFinalizacion: z.string().nullable(),
            })
            .nullable(),
    }),
});

export type VerificarCertificado = z.infer<
    typeof VerificarCertificadoSchema
>;