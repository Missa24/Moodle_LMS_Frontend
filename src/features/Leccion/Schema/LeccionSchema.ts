import z from "zod";

export const RecursoLeccionSchema = z.object({
    id: z.string(),
    leccionId: z.string(),
    nombre: z.string(),
    descripcion: z.string().nullable(),
    tipoRecurso: z.string(),
    rutaRecurso: z.string().nullable(),
    urlExterna: z.string().nullable(),
    orden: z.number(),
    creadoEn: z.string(),
    actualizadoEn: z.string(),
});
export type RecursoLeccionType = z.infer<typeof RecursoLeccionSchema>;

export const RecursoLeccionCreateSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    descripcion: z.string().optional(),
    tipoRecurso: z.string().min(1, "El tipo de recurso es obligatorio"),
    urlExterna: z.string().optional(),
    orden: z.number().int().min(0).optional(),
    archivo: z.instanceof(File).optional(),
});

export type RecursoLeccionCreateType = z.infer<typeof RecursoLeccionCreateSchema>;

export const RecursoLeccionUpdateSchema = RecursoLeccionCreateSchema.partial();
export type RecursoLeccionUpdateType = z.infer<typeof RecursoLeccionUpdateSchema>;

export const LeccionSchema = z.object({
    id: z.string(),
    moduloId: z.string(),
    nombre: z.string(),
    descripcion: z.string().nullable(),
    contenidoHtml: z.string().nullable(),
    tipoLeccion: z.string(),
    urlVideo: z.string().nullable(),
    proveedorVideo: z.string().nullable(),
    orden: z.number(),
    esVistaPrevia: z.boolean(),
    requiereLeccionAnteriorCompletada: z.boolean(),
    estaPublicada: z.boolean(),
    creadoEn: z.string(),
    actualizadoEn: z.string(),
});
export type LeccionType = z.infer<typeof LeccionSchema>;

export const LeccionListItemSchema = LeccionSchema.extend({
    recursos: z.array(RecursoLeccionSchema),
});
export type LeccionListItemType = z.infer<typeof LeccionListItemSchema>;

export const LeccionesResponseSchema = z.array(LeccionListItemSchema);
export type LeccionesResponseType = z.infer<typeof LeccionesResponseSchema>;

export const LeccionDetailResponseSchema = LeccionSchema.extend({
    recursos: z.array(RecursoLeccionSchema),
    modulo: z.object({
        id: z.string(),
        nombre: z.string(),
        cursoId: z.string(),
    }),
    bloqueada: z.boolean(),
    motivoBloqueo: z.enum(["no_inscrito", "leccion_anterior_pendiente"]).nullable(),
});
export type LeccionDetailType = z.infer<typeof LeccionDetailResponseSchema>;


export const LeccionProgresoSchema = LeccionSchema.extend({
    recursos: z.array(RecursoLeccionSchema),
    completada: z.boolean(),
    bloqueada: z.boolean(),
    motivoBloqueo: z.enum(["no_inscrito", "leccion_anterior_pendiente"]).nullable(),
});
export type LeccionProgresoType = z.infer<typeof LeccionProgresoSchema>;

export const LeccionesProgresoResponseSchema = z.array(LeccionProgresoSchema);
export type LeccionesProgresoResponseType = z.infer<typeof LeccionesProgresoResponseSchema>;

export const LeccionCreateSchema = z.object({
    moduloId: z.string().min(1, "El módulo es obligatorio"),

    nombre: z.string().min(1, "El nombre es obligatorio"),

    descripcion: z.string().optional(),

    contenidoHtml: z.string().optional(),

    tipoLeccion: z
        .string()
        .min(1, "El tipo de lección es obligatorio"),

    // Lo dejamos por ahora para compatibilidad
    // con las lecciones que ya tienen URL.
    urlVideo: z.string().optional(),

    proveedorVideo: z.string().optional(),

    // NUEVO
    video: z.instanceof(File).optional(),

    orden: z
        .number()
        .int()
        .min(0)
        .optional(),

    esVistaPrevia: z.boolean().optional(),

    requiereLeccionAnteriorCompletada:
        z.boolean().optional(),

    estaPublicada:
        z.boolean().optional(),
});

export type LeccionCreateType = z.infer<typeof LeccionCreateSchema>;

export const LeccionUpdateSchema = LeccionCreateSchema.partial();

export type LeccionUpdateType = z.infer<typeof LeccionUpdateSchema>;



export const OpcionFormularioPublicaSchema = z.object({
    id: z.string(),
    texto: z.string(),
    orden: z.number(),
});

export const PreguntaFormularioPublicaSchema = z.object({
    id: z.string(),
    enunciado: z.string(),
    tipoPregunta: z.string(),
    orden: z.number(),
    opciones: z.array(OpcionFormularioPublicaSchema),
});

export const FormularioLeccionPublicoSchema = z.object({
    id: z.string(),
    leccionId: z.string(),
    titulo: z.string(),
    preguntas: z.array(PreguntaFormularioPublicaSchema),
}).nullable();
export type FormularioLeccionPublicoType = z.infer<typeof FormularioLeccionPublicoSchema>;