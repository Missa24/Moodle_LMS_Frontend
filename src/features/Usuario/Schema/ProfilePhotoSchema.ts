import { z } from "zod";

export const ProfilePhotoSchema = z.object({
    file: z
        .instanceof(File)
        .refine(
            (file) => file.size <= 5 * 1024 * 1024,
            "La imagen no debe superar los 5 MB",
        )
        .refine(
            (file) =>
                ["image/jpeg", "image/png", "image/webp"].includes(
                    file.type,
                ),
            "Solo se permiten imágenes JPG, PNG o WEBP",
        ),
});

export type ProfilePhotoType = z.infer<
    typeof ProfilePhotoSchema
>;