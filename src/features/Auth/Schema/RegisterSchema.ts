import { z } from "zod";


export const RegisterPayloadSchema = z.object({
    nombre: z.string().trim().min(2, "Ingresa tu nombre")
        .max(80, "El nombre es demasiado largo"),

    apellidoPaterno: z.string().trim().max(80).optional(),

    apellidoMaterno: z.string().trim().max(80).optional(),

    correo: z.string().trim().email("Ingresa un correo válido"),

    paisCodigo: z.string().length(2, "Selecciona tu país"),

    contrasena: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").max(100, "La contraseña es demasiado larga"),

})

export type RegisterPayload = z.infer<typeof RegisterPayloadSchema>

export const registerSchema = z
    .object({
        nombre: z.string().trim().min(2, "Ingresa tu nombre")
            .max(80, "El nombre es demasiado largo"),

        apellidoPaterno: z.string().trim().max(80).optional(),

        apellidoMaterno: z.string().trim().max(80).optional(),

        correo: z.string().trim().email("Ingresa un correo válido"),

        paisCodigo: z.string().length(2, "Selecciona tu país"),

        contrasena: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").max(100, "La contraseña es demasiado larga"),

        confirmarContrasena: z.string(),
    })
    .refine(
        (data) =>
            data.contrasena === data.confirmarContrasena,
        {
            message: "Las contraseñas no coinciden", path: ["confirmarContrasena",],
        }
    );

export type RegisterFormValues =
    z.infer<
        typeof registerSchema
    >;