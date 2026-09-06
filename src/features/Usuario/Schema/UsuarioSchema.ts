import z from "zod"
import { createPaginatedResponseSchema } from "@/utils/Schema/Response";

export const UsuarioIndexSchema = z.object({
    id: z.string(),
    username: z.string(),
    correo: z.string().email(),
    estado: z.string(),
    correoVerificadoEn: z.string().nullable(),
    updatedAt: z.string(),
});

export type UsuarioIndexType = z.infer<typeof UsuarioIndexSchema>;
export const UserIndexResponseSchema = createPaginatedResponseSchema(UsuarioIndexSchema);
export type UserIndexResponseType = z.infer<typeof UserIndexResponseSchema>;

export const UserCreateSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    apellidoPaterno: z.string().min(1, "El apellido paterno es obligatorio"),
    apellidoMaterno: z.string().optional(), correo: z.string().email("Formato de correo inválido"),
    numeroDocumento: z.string().min(1, "El número de documento es obligatorio"),
    rolId: z.string().min(1, "Selecciona un rol"),
});

export type UserCreateType = z.infer<
    typeof UserCreateSchema
>;

export const UsuarioDetailSchema = z.object({
    id: z.string(),
    username: z.string(),
    correo: z.string().email(),
    estado: z.string(),
    correoVerificadoEn: z.string().nullable(),
    ultimoAccesoEn: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),

    perfil: z.object({
        id: z.string(),
        usuarioId: z.string(),
        nombre: z.string(),
        apellidoPaterno: z.string().nullable(),
        apellidoMaterno: z.string().nullable(),
        telefono: z.string().nullable(),
        tipoDocumentoIdentidad: z.string().nullable(),
        numeroDocumento: z.string().nullable(),
        fechaNacimiento: z.string().nullable(),
        genero: z.string().nullable(),
        ciudad: z.string().nullable(),
        pais: z.string().nullable(),
        ocupacion: z.string().nullable(),
        contactoEmergenciaNombre: z.string().nullable(),
        contactoEmergenciaTelefono: z.string().nullable(),
        fotografiaRuta: z.string().nullable(),
        creadoEn: z.string(),
        actualizadoEn: z.string(),
    }).nullable(),

    roles: z.array(
        z.object({
            usuarioId: z.string(),
            rolId: z.string(),
            asignadoPor: z.string().nullable(),
            asignadoEn: z.string(),
            rol: z.object({
                id: z.string(),
                nombre: z.string(),
                descripcion: z.string().nullable(),
                estado: z.string(),
                creadoEn: z.string(),
                actualizadoEn: z.string(),
            }),
        })
    ),
});

export type UsuarioDetailType = z.infer<typeof UsuarioDetailSchema>;

export const UserUpdateSchema = z.object({
    username: z.string().min(1, "El username es obligatorio"),
    correo: z.string().email("Formato de correo inválido"),
    estado: z.string().min(1, "El estado es obligatorio"),
    nombre: z.string().min(1, "El nombre es obligatorio"),
    apellidoPaterno: z.string().optional(),
    apellidoMaterno: z.string().optional(),
    telefono: z.string().optional(),
    tipoDocumentoIdentidad: z.string().optional(),
    numeroDocumento: z.string().optional(),
    fechaNacimiento: z.string().optional(),
    genero: z.string().optional(),
    ciudad: z.string().optional(),
    pais: z.string().optional(),
    ocupacion: z.string().optional(),
    contactoEmergenciaNombre: z.string().optional(),
    contactoEmergenciaTelefono: z.string().optional(),
    fotografiaRuta: z.string().optional(),
    rolId: z.string().min(1, "Selecciona un rol"),
});

export type UserUpdateType = z.infer<typeof UserUpdateSchema>;


export const MiPerfilSchema = z.object({
    id: z.string(),
    username: z.string(),
    correo: z.string().email(),
    estado: z.string(),
    correoVerificadoEn: z.string().nullable(),
    ultimoAccesoEn: z.string().nullable(),
    createdAt: z.string(),
    paisCodigo: z.string().nullable(),
    perfil: z.object({
        id: z.string(),
        usuarioId: z.string(),
        nombre: z.string(),
        apellidoPaterno: z.string().nullable(),
        apellidoMaterno: z.string().nullable(),
        telefono: z.string().nullable(),
        tipoDocumentoIdentidad: z.string().nullable(),
        numeroDocumento: z.string().nullable(),
        fechaNacimiento: z.string().nullable(),
        genero: z.string().nullable(),
        ciudad: z.string().nullable(),
        pais: z.string().nullable(),
        paisCodigo: z.string().nullable(),
        ocupacion: z.string().nullable(),
        contactoEmergenciaNombre: z.string().nullable(),
        contactoEmergenciaTelefono: z.string().nullable(),
        fotografiaRuta: z.string().nullable(),
        creadoEn: z.string(),
        actualizadoEn: z.string(),
    }).nullable(),

    roles: z.array(
        z.object({
            rol: z.object({
                id: z.string(),
                nombre: z.string(),
            }),
        })
    ),
});

export type MiPerfilType = z.infer<typeof MiPerfilSchema>;

export const UpdateMiPerfilSchema = z.object({
    correo: z.string().email("Formato de correo inválido").optional(),

    nombre: z
        .string()
        .min(1, "El nombre es obligatorio")
        .optional(),

    apellidoPaterno: z
        .string()
        .min(1, "El apellido paterno es obligatorio")
        .optional(),

    apellidoMaterno: z
        .string()
        .min(1, "El apellido materno es obligatorio")
        .optional(),

    tipoDocumentoIdentidad: z.string().optional(),

    numeroDocumento: z.string().optional(),

    fechaNacimiento: z.string().optional(),

    genero: z.string().optional(),

    telefono: z.string().optional(),

    ciudad: z.string().optional(),

    pais: z.string().optional(),
    paisCodigo: z
        .string()
        .length(2, "Código de país inválido")
        .optional(),
    ocupacion: z.string().optional(),

    contactoEmergenciaNombre: z.string().optional(),

    contactoEmergenciaTelefono: z.string().optional(),
});

export type UpdateMiPerfilType = z.infer<typeof UpdateMiPerfilSchema>;

export const CambiarMiPasswordSchema = z
    .object({
        passwordActual: z.string().min(1, "La contraseña actual es obligatoria"),

        passwordNueva: z.string().min(8, "La nueva contraseña debe tener al menos 8 caracteres"),

        confirmarPassword: z.string().min(1, "Confirma tu nueva contraseña"),
    })
    .refine(
        (data) => data.passwordNueva === data.confirmarPassword,
        {
            message: "Las contraseñas no coinciden",
            path: ["confirmarPassword"],
        }
    );

export type CambiarMiPasswordType = z.infer<
    typeof CambiarMiPasswordSchema
>;