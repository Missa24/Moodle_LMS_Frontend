import { z } from "zod";

export const SupportSchema = z.object({
    nombre: z
        .string()
        .min(1, {
            message: "El nombre es obligatorio",
        }),

    correo: z
        .string()
        .email({
            message: "Ingresa un correo electrónico válido",
        }),

    asunto: z
        .string()
        .min(1, {
            message: "El asunto es obligatorio",
        })
        .max(150, {
            message: "El asunto no puede superar los 150 caracteres",
        }),

    mensaje: z
        .string()
        .min(10, {
            message: "Describe el problema con más detalle",
        })
        .max(5000, {
            message: "El mensaje no puede superar los 5000 caracteres",
        }),
});

export type SupportFormValues = z.infer<
    typeof SupportSchema
>;
