"use client";

import {
    Control,
    Controller,
    FieldValues,
    Path,
} from "react-hook-form";

import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    VideoIcon,
    X,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

interface VideoUploadProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    hint?: string;
    existingVideo?: string | null;
}

export function VideoUpload<T extends FieldValues>({
    control,
    name,
    label,
    hint,
    existingVideo,
}: VideoUploadProps<T>) {
    const [preview, setPreview] = useState<string | null>(
        existingVideo ?? null
    );

    useEffect(() => {
        return () => {
            if (preview?.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const file = field.value as File | undefined;

                const handleChange = (
                    event: React.ChangeEvent<HTMLInputElement>
                ) => {
                    const selectedFile =
                        event.target.files?.[0];

                    if (!selectedFile) {
                        return;
                    }

                    if (!selectedFile.type.startsWith("video/")) {
                        return;
                    }

                    // 500 MB
                    if (
                        selectedFile.size >
                        500 * 1024 * 1024
                    ) {
                        return;
                    }

                    if (preview?.startsWith("blob:")) {
                        URL.revokeObjectURL(preview);
                    }

                    const previewUrl =
                        URL.createObjectURL(
                            selectedFile
                        );

                    setPreview(previewUrl);

                    field.onChange(selectedFile);
                };

                const handleRemove = () => {
                    if (preview?.startsWith("blob:")) {
                        URL.revokeObjectURL(preview);
                    }

                    setPreview(null);

                    field.onChange(undefined);
                };

                return (
                    <Field
                        data-invalid={fieldState.invalid}
                    >
                        <FieldLabel>
                            {label}
                        </FieldLabel>

                        <div className="space-y-3">
                            {preview ? (
                                <div className="relative overflow-hidden rounded-lg border bg-black">
                                    <video
                                        src={preview}
                                        controls
                                        className="max-h-[400px] w-full"
                                    />

                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute right-2 top-2"
                                        onClick={
                                            handleRemove
                                        }
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center transition-colors hover:bg-muted/50">
                                    <VideoIcon className="mb-3 h-8 w-8 text-muted-foreground" />

                                    <span className="text-sm font-medium">
                                        Seleccionar video
                                    </span>

                                    <span className="mt-1 text-xs text-muted-foreground">
                                        MP4, WebM o MOV · máximo 500 MB
                                    </span>

                                    <Input
                                        type="file"
                                        accept="video/mp4,video/webm,video/quicktime"
                                        className="hidden"
                                        onChange={
                                            handleChange
                                        }
                                    />
                                </label>
                            )}

                            {file && (
                                <p className="text-xs text-muted-foreground">
                                    {file.name}
                                </p>
                            )}

                            {hint && (
                                <p className="text-xs text-muted-foreground">
                                    {hint}
                                </p>
                            )}

                            {fieldState.invalid && (
                                <FieldError
                                    errors={[
                                        fieldState.error,
                                    ]}
                                />
                            )}
                        </div>
                    </Field>
                );
            }}
        />
    );
}
