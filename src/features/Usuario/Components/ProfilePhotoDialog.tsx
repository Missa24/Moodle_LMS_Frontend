import { useState } from "react";
import { ImagePlus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

    const actualizarFoto = useUpdateProfilePhoto();

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) return;

        const result = ProfilePhotoSchema.safeParse({
            file: selectedFile,
        });

        if (!result.success) {
            return;
        }

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleSubmit = () => {
        if (!file) return;

        actualizarFoto.mutate(file, {
            onSuccess: () => {
                setFile(null);
                setPreview(null);
                onOpenChange(false);
            },
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Cambiar foto de perfil
                    </DialogTitle>

                    <DialogDescription>
                        Selecciona una imagen para tu perfil.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="flex justify-center">
                        <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border bg-muted">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Vista previa"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                            )}
                        </div>
                    </div>

                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileChange}
                    />
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={actualizarFoto.isPending}
                    >
                        Cancelar
                    </Button>

                    <Button
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