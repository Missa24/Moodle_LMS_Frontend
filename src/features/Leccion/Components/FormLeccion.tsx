"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import {
    LeccionCreateSchema,
    LeccionCreateType,
    LeccionUpdateSchema,
    LeccionUpdateType,
    LeccionDetailType,
} from "../Schema/LeccionSchema";

import {
    useCreateLeccion,
    useGetLecciones,
    useUpdateLeccion,
} from "../Hook/LeccionHook";

import { FormField } from "@/components/common/form/FormField";
import { useEffect } from "react";
import { VideoUpload } from "@/components/common/form/VideoUpload";

type FormValues = LeccionCreateType | LeccionUpdateType;

type FormLeccionProps = {
    initialData?: LeccionDetailType;
    mode: "create" | "edit";
    moduloId: string;
    onSuccess?: () => void;
};

export function FormLeccion({ initialData, mode, moduloId, onSuccess, }: FormLeccionProps) {
    const { data: leccionesExistentes } = useGetLecciones(moduloId);

    const { mutate: createLeccion, isPending: creating, } = useCreateLeccion();

    const { mutate: updateLeccion, isPending: updating, } = useUpdateLeccion();

    const isPending = creating || updating;

    const form = useForm<FormValues>({
        resolver: zodResolver(
            mode === "edit"
                ? LeccionUpdateSchema
                : LeccionCreateSchema
        ),

        defaultValues:
            mode === "edit"
                ? {
                    nombre: initialData?.nombre ?? "",
                    descripcion: initialData?.descripcion ?? "",
                    contenidoHtml: initialData?.contenidoHtml ?? "",
                    tipoLeccion: initialData?.tipoLeccion ?? "video",
                    urlVideo: initialData?.urlVideo ?? "",
                    proveedorVideo: initialData?.proveedorVideo ?? "",
                    video: undefined,
                    orden: initialData?.orden ?? 0,
                    esVistaPrevia:
                        initialData?.esVistaPrevia ?? false,
                    requiereLeccionAnteriorCompletada:
                        initialData?.requiereLeccionAnteriorCompletada ?? true,
                    estaPublicada:
                        initialData?.estaPublicada ?? true,
                }
                : {
                    moduloId,
                    nombre: "",
                    descripcion: "",
                    contenidoHtml: "",
                    tipoLeccion: "video",
                    urlVideo: "",
                    proveedorVideo: "",
                    video: undefined,
                    orden: 0,
                    esVistaPrevia: false,
                    requiereLeccionAnteriorCompletada: true,
                    estaPublicada: true,
                }
    });

    const onSubmit = (values: FormValues) => {
        if (mode === "edit") {
            updateLeccion({ id: initialData!.id, data: values, },
                { onSuccess: () => onSuccess?.(), }
            );
            return;
        }

        createLeccion({ ...values, moduloId, } as LeccionCreateType,
            {
                onSuccess: () => { form.reset(); onSuccess?.(); },
            }
        );
    };

    useEffect(() => {
        if (
            mode === "create" &&
            leccionesExistentes &&
            !form.formState.dirtyFields.orden
        ) {
            form.setValue(
                "orden",
                leccionesExistentes.length + 1
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, leccionesExistentes]);

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <FieldGroup>
                <FormField
                    control={form.control}
                    name="nombre"
                    label="Nombre"
                    placeholder="Ej: Presente simple"
                />

                <FormField
                    control={form.control}
                    name="descripcion"
                    label="Descripción"
                    type="textarea"
                    placeholder="Descripción breve"
                    rows={2}
                />

                <FormField
                    control={form.control}
                    name="contenidoHtml"
                    label="Contenido"
                    type="richtext"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="tipoLeccion"
                        label="Tipo"
                        type="select"
                        options={[
                            {
                                value: "video",
                                label: "Video",
                            },
                            {
                                value: "lectura",
                                label: "Lectura",
                            },
                            {
                                value: "html",
                                label: "HTML",
                            },
                        ]}
                    />

                    <FormField
                        control={form.control}
                        name="orden"
                        label="Orden"
                        type="number"
                        min={1}
                        hint="Si eliges una posición ya ocupada, las demás lecciones se recorren automáticamente."
                    />
                </div>
                {form.watch("tipoLeccion") === "video" && (
                    <VideoUpload
                        control={form.control}
                        name="video"
                        label="Video"
                        existingVideo={undefined}
                        hint="MP4, WebM o MOV · máximo 500 MB"
                    />
                )}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <FormField
                        control={form.control}
                        name="esVistaPrevia"
                        label="Vista previa"
                        type="checkbox"
                        description="Visible sin inscripción"
                    />

                    <FormField
                        control={form.control}
                        name="requiereLeccionAnteriorCompletada"
                        label="Secuencial"
                        type="checkbox"
                        description="Requiere anterior"
                    />

                    <FormField
                        control={form.control}
                        name="estaPublicada"
                        label="Publicada"
                        type="checkbox"
                        description="Visible a estudiantes"
                    />
                </div>
            </FieldGroup>

            <Button
                type="submit"
                className="w-full"
                disabled={isPending}
            >
                {isPending
                    ? mode === "edit" ? "Guardando..." : "Creando..."
                    : mode === "edit" ? "Guardar cambios" : "Crear lección"}
            </Button>
        </form>
    );
}