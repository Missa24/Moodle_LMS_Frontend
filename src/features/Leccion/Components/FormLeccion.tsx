"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

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
import { VideoUpload } from "@/components/common/form/VideoUpload";

type FormValues =
    | LeccionCreateType
    | LeccionUpdateType;

type VideoSource =
    | "archivo"
    | "drive";

type FormLeccionProps = {
    initialData?: LeccionDetailType;
    mode: "create" | "edit";
    moduloId: string;
    onSuccess?: () => void;
};

export function FormLeccion({
    initialData,
    mode,
    moduloId,
    onSuccess,
}: FormLeccionProps) {

    const { data: leccionesExistentes } =
        useGetLecciones(moduloId);

    const {
        mutate: createLeccion,
        isPending: creating,
    } = useCreateLeccion();

    const {
        mutate: updateLeccion,
        isPending: updating,
    } = useUpdateLeccion();

    const isPending =
        creating || updating;

    const [
        videoSource,
        setVideoSource,
    ] = useState<VideoSource>(
        initialData?.proveedorVideo ===
            "GOOGLE_DRIVE" &&
            initialData?.urlVideo
            ? "drive"
            : "archivo"
    );

    const form = useForm<FormValues>({
        resolver: zodResolver(
            mode === "edit"
                ? LeccionUpdateSchema
                : LeccionCreateSchema
        ),

        defaultValues:
            mode === "edit"
                ? {
                    nombre:
                        initialData?.nombre ??
                        "",

                    descripcion:
                        initialData?.descripcion ??
                        "",

                    contenidoHtml:
                        initialData?.contenidoHtml ??
                        "",

                    tipoLeccion:
                        initialData?.tipoLeccion ??
                        "video",

                    urlVideo:
                        initialData?.urlVideo ??
                        "",

                    proveedorVideo:
                        initialData?.proveedorVideo ??
                        "",

                    video: undefined,

                    orden:
                        initialData?.orden ??
                        0,

                    esVistaPrevia:
                        initialData?.esVistaPrevia ??
                        false,

                    requiereLeccionAnteriorCompletada:
                        initialData?.requiereLeccionAnteriorCompletada ??
                        true,

                    estaPublicada:
                        initialData?.estaPublicada ??
                        true,
                }
                : {
                    moduloId,

                    nombre: "",

                    descripcion: "",

                    contenidoHtml: "",

                    tipoLeccion: "video",

                    urlVideo: "",

                    proveedorVideo:
                        "GOOGLE_DRIVE",

                    video: undefined,

                    orden: 0,

                    esVistaPrevia: false,

                    requiereLeccionAnteriorCompletada:
                        true,

                    estaPublicada: true,
                },
    });

    const tipoLeccion =
        form.watch("tipoLeccion");

    const cambiarFuenteVideo = (
        source: VideoSource
    ) => {
        setVideoSource(source);

        form.setValue(
            "proveedorVideo",
            "GOOGLE_DRIVE"
        );

        if (source === "archivo") {
            form.setValue(
                "urlVideo",
                ""
            );
        }

        if (source === "drive") {
            form.setValue(
                "video",
                undefined
            );
        }
    };

    const onSubmit = (
        values: FormValues
    ) => {

        const datos = {
            ...values,

            proveedorVideo:
                tipoLeccion === "video"
                    ? "GOOGLE_DRIVE"
                    : values.proveedorVideo,
        };

        if (
            tipoLeccion === "video" &&
            videoSource === "archivo"
        ) {
            datos.urlVideo = undefined;
        }

        if (
            tipoLeccion === "video" &&
            videoSource === "drive"
        ) {
            datos.video = undefined;
        }

        if (mode === "edit") {

            updateLeccion(
                {
                    id: initialData!.id,
                    data: datos,
                },
                {
                    onSuccess: () => {
                        onSuccess?.();
                    },
                }
            );

            return;
        }

        createLeccion(
            {
                ...datos,
                moduloId,
            } as LeccionCreateType,
            {
                onSuccess: () => {
                    form.reset();

                    setVideoSource(
                        "archivo"
                    );

                    onSuccess?.();
                },
            }
        );
    };

    useEffect(() => {
        if (
            mode === "create" &&
            leccionesExistentes &&
            !form.formState
                .dirtyFields.orden
        ) {
            form.setValue(
                "orden",
                leccionesExistentes.length +
                1
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        mode,
        leccionesExistentes,
    ]);

    return (
        <form
            onSubmit={form.handleSubmit(
                onSubmit
            )}
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

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-4
                        sm:grid-cols-2
                    "
                >
                    <FormField
                        control={
                            form.control
                        }
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
                        control={
                            form.control
                        }
                        name="orden"
                        label="Orden"
                        type="number"
                        min={1}
                        hint="Si eliges una posición ya ocupada, las demás lecciones se recorren automáticamente."
                    />
                </div>

                {tipoLeccion ===
                    "video" && (
                        <div
                            className="
                            space-y-4
                            rounded-lg
                            border
                            p-4
                        "
                        >
                            <div>
                                <p
                                    className="
                                    mb-2
                                    text-sm
                                    font-medium
                                "
                                >
                                    Fuente del video
                                </p>

                                <div
                                    className="
                                    flex
                                    gap-2
                                "
                                >
                                    <Button
                                        type="button"
                                        variant={
                                            videoSource ===
                                                "archivo"
                                                ? "default"
                                                : "outline"
                                        }
                                        onClick={() =>
                                            cambiarFuenteVideo(
                                                "archivo"
                                            )
                                        }
                                    >
                                        Subir archivo
                                    </Button>

                                    <Button
                                        type="button"
                                        variant={
                                            videoSource ===
                                                "drive"
                                                ? "default"
                                                : "outline"
                                        }
                                        onClick={() =>
                                            cambiarFuenteVideo(
                                                "drive"
                                            )
                                        }
                                    >
                                        Google Drive
                                    </Button>
                                </div>
                            </div>

                            {videoSource ===
                                "archivo" && (
                                    <VideoUpload
                                        control={
                                            form.control
                                        }
                                        name="video"
                                        label="Video"
                                        existingVideo={
                                            undefined
                                        }
                                        hint="MP4, WebM o MOV · el archivo será almacenado en Google Drive"
                                    />
                                )}

                            {videoSource ===
                                "drive" && (
                                    <FormField
                                        control={
                                            form.control
                                        }
                                        name="urlVideo"
                                        label="Enlace de Google Drive"
                                        placeholder="https://drive.google.com/file/d/..."
                                        hint="Pega el enlace del video almacenado en Google Drive."
                                    />
                                )}

                            {mode ===
                                "edit" &&
                                initialData?.urlVideo && (
                                    <div
                                        className="
                                        rounded-md
                                        bg-muted
                                        p-3
                                        text-sm
                                    "
                                    >
                                        <span
                                            className="
                                            font-medium
                                        "
                                        >
                                            Video actual:
                                        </span>{" "}
                                        registrado
                                    </div>
                                )}
                        </div>
                    )}

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-4
                        sm:grid-cols-3
                    "
                >
                    <FormField
                        control={
                            form.control
                        }
                        name="esVistaPrevia"
                        label="Vista previa"
                        type="checkbox"
                        description="Visible sin inscripción"
                    />

                    <FormField
                        control={
                            form.control
                        }
                        name="requiereLeccionAnteriorCompletada"
                        label="Secuencial"
                        type="checkbox"
                        description="Requiere anterior"
                    />

                    <FormField
                        control={
                            form.control
                        }
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
                    ? mode === "edit"
                        ? "Guardando..."
                        : "Creando..."
                    : mode === "edit"
                        ? "Guardar cambios"
                        : "Crear lección"}
            </Button>
        </form>
    );
}