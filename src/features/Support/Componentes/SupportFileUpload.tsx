import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import type {
    ChangeEvent,
    ClipboardEvent,
    DragEvent,
} from "react";

import {
    ImagePlus,
    Upload,
    X,
} from "lucide-react";

import {
    Alert,
    AlertDescription,
} from "@/components/ui/alert";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
];

interface SupportFileUploadProps {
    value: File[];
    onChange: (files: File[]) => void;
    error?: string | null;
}

export function SupportFileUpload({
    value,
    onChange,
    error,
}: SupportFileUploadProps) {
    const inputRef =
        useRef<HTMLInputElement>(null);

    const [isDragging, setIsDragging] =
        useState(false);

    const [previews, setPreviews] =
        useState<
            Array<{
                file: File;
                url: string;
            }>
        >([]);

    /**
     * Genera las URLs de preview de las imágenes.
     */
    useEffect(() => {
        const generatedPreviews = value.map(
            (file) => ({
                file,
                url: URL.createObjectURL(file),
            }),
        );

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPreviews(generatedPreviews);

        return () => {
            generatedPreviews.forEach(
                ({ url }) => {
                    URL.revokeObjectURL(url);
                },
            );
        };
    }, [value]);

    /**
     * Agrega archivos seleccionados,
     * arrastrados o pegados.
     */
    const addFiles = useCallback(
        (files: File[]) => {
            const validFiles: File[] = [];

            for (const file of files) {
                if (
                    !ACCEPTED_TYPES.includes(
                        file.type,
                    )
                ) {
                    continue;
                }

                if (
                    file.size > MAX_FILE_SIZE
                ) {
                    continue;
                }

                validFiles.push(file);
            }

            if (validFiles.length === 0) {
                return;
            }

            const available =
                MAX_FILES - value.length;

            if (available <= 0) {
                return;
            }

            const filesToAdd =
                validFiles.slice(
                    0,
                    available,
                );

            onChange([
                ...value,
                ...filesToAdd,
            ]);
        },
        [value, onChange],
    );

    /**
     * Selección mediante el input.
     */
    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const files = Array.from(
            event.target.files ?? [],
        );

        addFiles(files);

        // Permite seleccionar nuevamente
        // el mismo archivo.
        event.target.value = "";
    };

    /**
     * Ctrl + V / Cmd + V.
     */
    const handlePaste = useCallback(
        (
            event: ClipboardEvent<HTMLDivElement>,
        ) => {
            const items = Array.from(
                event.clipboardData.items,
            );

            const imageFiles: File[] = [];

            for (const item of items) {
                if (
                    item.kind !== "file" ||
                    !item.type.startsWith(
                        "image/",
                    )
                ) {
                    continue;
                }

                const file =
                    item.getAsFile();

                if (file) {
                    imageFiles.push(file);
                }
            }

            if (imageFiles.length > 0) {
                event.preventDefault();
                addFiles(imageFiles);
            }
        },
        [addFiles],
    );

    /**
     * Drag & Drop.
     */
    const handleDragOver = (
        event: DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();
        event.dataTransfer.dropEffect =
            "copy";

        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (
        event: DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();

        setIsDragging(false);

        const files = Array.from(
            event.dataTransfer.files,
        );

        addFiles(files);
    };

    /**
     * Elimina una imagen.
     */
    const removeFile = (index: number) => {
        onChange(
            value.filter(
                (_, fileIndex) =>
                    fileIndex !== index,
            ),
        );
    };

    /**
     * Abre el selector de archivos.
     */
    const openFilePicker = () => {
        inputRef.current?.click();
    };

    /**
     * Permite usar Enter/Espacio
     * cuando el dropzone tiene foco.
     */
    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLDivElement>,
    ) => {
        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();
            openFilePicker();
        }
    };

    return (
        <div
            className="space-y-3"
            onPaste={handlePaste}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium">
                        Capturas o imágenes
                    </p>

                    <p className="text-xs text-muted-foreground">
                        PNG, JPG, WEBP o GIF · máximo
                        5 MB por imagen
                    </p>
                </div>

                {value.length > 0 && (
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        {value.length}/{MAX_FILES}
                    </span>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_TYPES.join(",")}
                multiple
                className="hidden"
                onChange={handleInputChange}
            />

            <div
                role="button"
                tabIndex={0}
                aria-label="Adjuntar imágenes"
                onClick={openFilePicker}
                onKeyDown={handleKeyDown}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    group
                    cursor-pointer
                    rounded-2xl
                    border-2
                    border-dashed
                    p-6
                    text-center
                    outline-none
                    transition-all
                    sm:p-8

                    ${isDragging
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }
                `}
            >
                <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                    {isDragging ? (
                        <Upload className="size-6" />
                    ) : (
                        <ImagePlus className="size-6" />
                    )}
                </div>

                <p className="mt-3 text-sm font-medium">
                    {isDragging
                        ? "Suelta las imágenes aquí"
                        : "Adjunta capturas o imágenes"}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                    Haz clic para seleccionar,
                    arrastra archivos o pega una
                    captura con{" "}
                    <span className="font-medium text-foreground">
                        Ctrl + V
                    </span>
                </p>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>
            )}

            {previews.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {previews.map(
                        (
                            preview,
                            index,
                        ) => (
                            <div
                                key={`${preview.file.name}-${preview.file.size}-${index}`}
                                className="group relative overflow-hidden rounded-xl border bg-muted"
                            >
                                <img
                                    src={preview.url}
                                    alt={`Vista previa de ${preview.file.name}`}
                                    className="aspect-square w-full object-cover"
                                />

                                <button
                                    type="button"
                                    onClick={(
                                        event,
                                    ) => {
                                        event.stopPropagation();
                                        removeFile(
                                            index,
                                        );
                                    }}
                                    className="
                                        absolute
                                        right-2
                                        top-2
                                        flex
                                        size-7
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-black/70
                                        text-white
                                        shadow-sm
                                        transition
                                        hover:bg-destructive
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-white
                                    "
                                    aria-label={`Eliminar ${preview.file.name}`}
                                >
                                    <X className="size-4" />
                                </button>

                                <div className="absolute inset-x-0 bottom-0 bg-black/60 px-2 py-1.5">
                                    <p className="truncate text-[11px] text-white">
                                        {
                                            preview
                                                .file
                                                .name
                                        }
                                    </p>
                                </div>
                            </div>
                        ),
                    )}
                </div>
            )}

            <p className="text-xs text-muted-foreground">
                Puedes adjuntar hasta{" "}
                <span className="font-medium text-foreground">
                    {MAX_FILES} imágenes
                </span>{" "}
                de hasta{" "}
                <span className="font-medium text-foreground">
                    5 MB
                </span>{" "}
                cada una.
            </p>
        </div>
    );
}
