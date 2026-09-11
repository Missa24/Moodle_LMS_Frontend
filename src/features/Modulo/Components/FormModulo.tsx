"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/common/form/FormField";
import { ImageUpload } from "@/components/common/form/ImageUpload";

import {
    ModuloCreateSchema,
    ModuloCreateType,
    ModuloUpdateSchema,
    ModuloUpdateType,
    ModuloDetailType,
} from "../Schema/ModuloSchema";

import {
    useCreateModulo,
    useUpdateModulo,
} from "../Hook/ModuloHook";

type FormValues =
    | ModuloCreateType
    | ModuloUpdateType;

type FormModuloProps = {
    initialData?: ModuloDetailType;
    mode: "create" | "edit";
    cursoId: string;
    onSuccess?: () => void;
};

export function FormModulo({
    initialData,
    mode,
    cursoId,
    onSuccess,
}: FormModuloProps) {
    const {
        mutate: createModulo,
        isPending: creating,
    } = useCreateModulo();

    const {
        mutate: updateModulo,
        isPending: updating,
    } = useUpdateModulo();

    const isPending = creating || updating;

    const form = useForm<FormValues>({
        resolver: zodResolver(
            mode === "edit"
                ? ModuloUpdateSchema
                : ModuloCreateSchema,
        ),

        defaultValues:
            mode === "edit"
                ? {
                    nombre:
                        initialData?.nombre ?? "",

                    descripcion:
                        initialData?.descripcion ?? "",

                    fraseMotivacional:
                        initialData?.fraseMotivacional ?? "",

                    rutaImagen: undefined,

                    orden:
                        initialData?.orden ?? 0,

                    otorgaCertificacion:
                        initialData?.otorgaCertificacion ??
                        false,

                    estaPublicado:
                        initialData?.estaPublicado ??
                        true,

                    costo:
                        initialData?.costo ??
                        undefined,

                    urlPago:
                        initialData?.urlPago ?? "",
                }
                : {
                    cursoId,

                    nombre: "",

                    descripcion: "",

                    fraseMotivacional: "",

                    rutaImagen: undefined,

                    orden: 0,

                    otorgaCertificacion: false,

                    estaPublicado: true,

                    costo: undefined,

                    urlPago: "",
                },
    });

    const onSubmit = (
        values: FormValues,
    ) => {
        if (mode === "edit") {
            updateModulo(
                {
                    id: initialData!.id,
                    data: values,
                },
                {
                    onSuccess: () =>
                        onSuccess?.(),
                },
            );

            return;
        }

        createModulo(
            {
                ...values,
                cursoId,
            } as ModuloCreateType,
            {
                onSuccess: () => {
                    form.reset();
                    onSuccess?.();
                },
            },
        );
    };

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
                    placeholder="Ej: Cosmetología Facial"
                />

                <FormField
                    control={form.control}
                    name="fraseMotivacional"
                    label="Frase motivacional"
                    placeholder="Ej: ¡Continúa avanzando!"
                />

                <FormField
                    type="textarea"
                    control={form.control}
                    name="descripcion"
                    label="Descripción"
                    placeholder="Descripción del módulo"
                    rows={3}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <ImageUpload
                            control={form.control}
                            name="rutaImagen"
                            label="Imagen del módulo"
                            existingImage={
                                mode === "edit"
                                    ? initialData?.rutaImagen
                                    : null
                            }
                            hint="JPG, PNG o WEBP · máximo 5 MB"
                        />
                    </div>

                    <FormField
                        type="number"
                        control={form.control}
                        name="orden"
                        label="Orden"
                        min={0}
                    />

                    <FormField
                        type="number"
                        control={form.control}
                        name="costo"
                        label="Precio"
                        placeholder="0.00"
                        min={0}
                        allowEmpty
                        hint="Cada cambio registra un nuevo precio en el historial"
                    />

                    <div className="sm:col-span-2">
                        <FormField
                            control={form.control}
                            name="urlPago"
                            label="Enlace de pago"
                            placeholder="https://www.paypal.com/..."
                            hint="Enlace al que será dirigido el estudiante para realizar el pago"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        type="checkbox"
                        control={form.control}
                        name="otorgaCertificacion"
                        label="Otorga certificación"
                        description="El módulo emite certificado propio"
                    />

                    <FormField
                        type="checkbox"
                        control={form.control}
                        name="estaPublicado"
                        label="Publicado"
                        description="Visible para estudiantes"
                        defaultChecked
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
                        : "Crear módulo"}
            </Button>
        </form>
    );
}