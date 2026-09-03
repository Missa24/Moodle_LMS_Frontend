import { z } from "zod";

export const InscripcionModuloSchema = z.object({
    id: z.string(),
    moduloId: z.string(),
    estudianteId: z.string(),
    numeroInscripcion: z.string(),
    fechaInscripcion: z.string(),
    estado: z.string(),
    estadoAcceso: z.string(),
    porcentajeAvance: z.number(),
    fechaFinalizacion: z.string().nullable(),
    observaciones: z.string().nullable(),
    inscritoPor: z.string().nullable(),
});

export type InscripcionModuloType = z.infer<typeof InscripcionModuloSchema>;

export const ModuloSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    orden: z.number(),
    inscripcion: InscripcionModuloSchema.optional(),
});

export type ModuloType = z.infer<typeof ModuloSchema>;

export const CursoSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    categoria: z.object({
        nombre: z.string(),
    }),
    modulos: z.array(ModuloSchema),
});

export type CursoType = z.infer<typeof CursoSchema>;

export const InscripcionIndexSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    apellidoPaterno: z.string(),
    apellidoMaterno: z.string(),
    correo: z.string().email(),
    estado: z.string(),
    cursos: z.array(CursoSchema),
    estadoAcceso: z.string(),
});

export type InscripcionIndexType = z.infer<typeof InscripcionIndexSchema>;

export const CrearInscripcionSchema = z.object({
    cursoId: z.string().min(1, { message: "El curso es obligatorio" }),
    moduloIds: z.array(z.string()).min(1, { message: "Debe seleccionar al menos un módulo" }),
    estudianteIds: z.array(z.string()).min(1, { message: "Debe seleccionar al menos un estudiante" }),
    estadoAcceso: z.string()
});

export type CrearInscripcionSchemaType = z.infer<typeof CrearInscripcionSchema>;
