"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ProfilePhotoSchema } from "../Schema/ProfilePhotoSchema";
import { useUpdateProfilePhoto } from "../Hook/UsuarioHook";

interface ProfilePhotoDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ProfilePhotoDialog({
    open,
    onOpenChange,
}: ProfilePhotoDialogProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const actualizarFoto = useUpdateProfilePhoto();

    /**
     * Libera la URL temporal creada con createObjectURL.
     */
    const revokePreview = () => {
        if (preview?.startsWith("blob:")) {
            URL.revokeObjectURL(preview);
        }
    };

    /**
     * Limpia el estado del componente.
     */
    const reset = () => {
        revokePreview();

        setFile(null);
        setPreview(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    /**
     * Limpia el blob cuando se desmonta el componente.
     */
    useEffect(() => {
        return () => {
            if (preview?.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) {
            return;
        }

        const result = ProfilePhotoSchema.safeParse({
            file: selectedFile,
        });

        if (!result.success) {
            return;
        }

        // Liberar preview anterior
        if (preview?.startsWith("blob:")) {
            URL.revokeObjectURL(preview);
        }

        const previewUrl = URL.createObjectURL(selectedFile);

        setFile(selectedFile);
        setPreview(previewUrl);
    };

    const handleRemove = () => {
        reset();
    };

    const handleSubmit = () => {
        if (!file) {
            return;
        }

        actualizarFoto.mutate(file, {
            onSuccess: () => {
                reset();
                onOpenChange(false);
            },
        });
    };

    const handleDialogChange = (value: boolean) => {
        if (!value && !actualizarFoto.isPending) {
            reset();
        }

        onOpenChange(value);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={handleDialogChange}
        >
            <DialogContent className="w-[calc(100%-2rem)] max-w-md overflow-hidden p-4 sm:p-6">
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-lg sm:text-xl">
                        Cambiar foto de perfil
                    </DialogTitle>

                    <DialogDescription className="text-sm">
                        Selecciona una imagen para utilizarla como foto de
                        perfil.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Preview / Upload */}
                    <div className="flex justify-center">
                        <div className="relative">
                            {preview ? (
                                <div className="group relative">
                                    <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-background bg-muted shadow-md sm:h-44 sm:w-44">
                                        <img
                                            src={preview}
                                            alt="Vista previa de la foto"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    {/* Botón eliminar */}
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute right-0 top-0 h-8 w-8 rounded-full shadow-md sm:h-9 sm:w-9"
                                        onClick={handleRemove}
                                        disabled={
                                            actualizarFoto.isPending
                                        }
                                        aria-label="Eliminar imagen"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <label
                                    htmlFor="profile-photo"
                                    className="flex h-36 w-36 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30 bg-muted/30 transition-all hover:border-primary/50 hover:bg-muted/60 active:scale-95 sm:h-44 sm:w-44"
                                >
                                    <ImagePlus className="mb-2 h-9 w-9 text-muted-foreground sm:h-10 sm:w-10" />

                                    <span className="px-4 text-center text-xs font-medium text-muted-foreground sm:text-sm">
                                        Seleccionar foto
                                    </span>

                                    <Input
                                        ref={inputRef}
                                        id="profile-photo"
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        disabled={
                                            actualizarFoto.isPending
                                        }
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Cambiar imagen */}
                    {preview && (
                        <div className="flex justify-center">
                            <label
                                htmlFor="profile-photo-change"
                                className="cursor-pointer"
                            >
                                <span className="text-sm font-medium text-primary hover:underline">
                                    Cambiar imagen
                                </span>

                                <Input
                                    id="profile-photo-change"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    disabled={
                                        actualizarFoto.isPending
                                    }
                                />
                            </label>
                        </div>
                    )}

                    {/* Información del archivo */}
                    {file && (
                        <div className="rounded-lg bg-muted/50 px-3 py-2 text-center">
                            <p className="truncate text-xs text-muted-foreground sm:text-sm">
                                {file.name}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                    )}

                    <p className="text-center text-xs text-muted-foreground">
                        JPG, PNG o WEBP · máximo 5 MB
                    </p>
                </div>

                <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => handleDialogChange(false)}
                        disabled={actualizarFoto.isPending}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="button"
                        className="w-full sm:w-auto"
                        onClick={handleSubmit}
                        disabled={
                            !file ||
                            actualizarFoto.isPending
                        }
                    >
                        {actualizarFoto.isPending
                            ? "Subiendo..."
                            : "Guardar foto"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
