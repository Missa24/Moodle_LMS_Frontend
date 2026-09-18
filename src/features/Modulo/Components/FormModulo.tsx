"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Percent, Tag } from "lucide-react";

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
import { useGetDescuentos } from "@/features/Descuentos/Hook/DescuentoHook";


type FormValues = ModuloCreateType | ModuloUpdateType;

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
    const { mutate: createModulo, isPending: creating } = useCreateModulo();
    const { mutate: updateModulo, isPending: updating } = useUpdateModulo();

    const { data: descuentos = [], isLoading: loadingDescuentos } =
        useGetDescuentos();

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
                    nombre: initialData?.nombre ?? "",
                    descripcion: initialData?.descripcion ?? "",
                    fraseMotivacional:
                        initialData?.fraseMotivacional ?? "",
                    rutaImagen: undefined,
                    otorgaCertificacion:
                        initialData?.otorgaCertificacion ?? false,
                    estaPublicado:
                        initialData?.estaPublicado ?? true,
                    costo:
                        initialData?.costo ?? undefined,
                    urlPago:
                        initialData?.urlPago ?? "",
                    qrPagoBolivia: undefined,
                    descuentoId:
                        initialData?.descuentoId ?? "",
                }
                : {
                    cursoId,
                    nombre: "",
                    descripcion: "",
                    fraseMotivacional: "",
                    rutaImagen: undefined,
                    otorgaCertificacion: false,
                    estaPublicado: true,
                    costo: undefined,
                    urlPago: "",
                    qrPagoBolivia: undefined,
                    descuentoId: "",
                },
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const descuentoId = form.watch("descuentoId");

    const descuentoSeleccionado = descuentos.find(
        (descuento) => descuento.id === descuentoId,
    );

    const descuentosDisponibles = descuentos.filter(
        (descuento) =>
            descuento.habilitado &&
            new Date(descuento.finalizaEn) >= new Date(),
    );

    const descuentoOptions = [
        {
            value: "SIN_DESCUENTO",
            label: "Sin descuento",
        },
        ...descuentosDisponibles.map((descuento) => ({
            value: descuento.id,
            label:
                descuento.tipo === "PORCENTAJE"
                    ? `${descuento.nombre} · ${descuento.valor}%`
                    : `${descuento.nombre} · ${descuento.valor} de descuento`,
        })),
    ];

    const onSubmit = (values: FormValues) => {
        const data = {
            ...values,
            descuentoId:
                values.descuentoId === "SIN_DESCUENTO"
                    ? ""
                    : values.descuentoId,
        };

        if (mode === "edit") {
            updateModulo(
                {
                    id: initialData!.id,
                    data,
                },
                {
                    onSuccess: () => onSuccess?.(),
                },
            );

            return;
        }

        createModulo(
            {
                ...data,
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

                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-medium">
                            Precio y pagos
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Define el precio base y los medios de pago disponibles.
                        </p>
                    </div>

                    <FormField
                        type="number"
                        control={form.control}
                        name="costo"
                        label="Precio base en USD"
                        placeholder="0.00"
                        min={0}
                        allowEmpty
                        hint="Cada cambio registra un nuevo precio en el historial"
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="urlPago"
                            label="Pago internacional"
                            placeholder="https://www.paypal.com/..."
                            hint="PayPal u otro medio para estudiantes internacionales"
                        />
                        <ImageUpload
                            control={form.control}
                            name="qrPagoBolivia"
                            label="QR de pago Bolivia"
                            existingImage={
                                mode === "edit"
                                    ? initialData?.urlPagoBolivia
                                    : null
                            }
                            hint="JPG, PNG o WEBP · imagen del QR para pagos en Bolivia"
                        />
                    </div>
                </div>

                <div className="space-y-4 rounded-xl border p-4">
                    <div>
                        <p className="text-sm font-medium">
                            Promoción
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Puedes aplicar una promoción existente al módulo.
                        </p>
                    </div>

                    <FormField
                        type="select"
                        control={form.control}
                        name="descuentoId"
                        label="Descuento"
                        placeholder={
                            loadingDescuentos
                                ? "Cargando descuentos..."
                                : "Selecciona un descuento"
                        }
                        disabled={loadingDescuentos}
                        options={descuentoOptions}
                    />

                    {descuentoSeleccionado && (
                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-start gap-3">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    {descuentoSeleccionado.tipo ===
                                        "PORCENTAJE" ? (
                                        <Percent className="size-4" />
                                    ) : (
                                        <Tag className="size-4" />
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm font-medium">
                                        {descuentoSeleccionado.nombre}
                                    </p>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {descuentoSeleccionado.tipo ===
                                            "PORCENTAJE"
                                            ? `${descuentoSeleccionado.valor}% de descuento`
                                            : `${descuentoSeleccionado.valor} de descuento fijo`}
                                    </p>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Vigente hasta{" "}
                                        {new Intl.DateTimeFormat(
                                            "es-BO",
                                            {
                                                dateStyle: "medium",
                                            },
                                        ).format(
                                            new Date(
                                                descuentoSeleccionado.finalizaEn,
                                            ),
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
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