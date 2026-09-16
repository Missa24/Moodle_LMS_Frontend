"use client";

import { useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Search, X } from "lucide-react";

import { EntityDialog } from "@/components/common/form/EntityDialog";
import { FormField } from "@/components/common/form/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    DescuentoCreateSchema,
    DescuentoCreateType,
    DescuentoType,
} from "../Schema/DescuentoSchema";

import {
    useCreateDescuento,
    useUpdateDescuento,
} from "../Hook/DescuentoHook";

import { useGetModulos } from "@/features/Modulo/Hook/ModuloHook";

interface DescuentoFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    descuento?: DescuentoType | null;
    moduloId?: string;
    onCreated?: (descuento: DescuentoType) => void;
}

export function DescuentoFormDialog({
    open,
    onOpenChange,
    descuento,
    moduloId,
    onCreated,
}: DescuentoFormDialogProps) {
    return (
        <EntityDialog
            open={open}
            onOpenChange={onOpenChange}
            mode={descuento ? "edit" : "create"}
            titleCreate="Nuevo descuento"
            titleEdit="Editar descuento"
            descriptionCreate="Crea una promoción y selecciona los módulos donde será aplicada."
            descriptionEdit="Modifica la promoción, vigencia y módulos asociados."
            maxWidth="max-w-[calc(100vw-2rem)] sm:max-w-3xl"
        >
            {open && (
                <DescuentoForm
                    key={descuento?.id ?? "nuevo"}
                    descuento={descuento}
                    moduloId={moduloId}
                    onCreated={onCreated}
                    onClose={() => onOpenChange(false)}
                />
            )}
        </EntityDialog>
    );
}

interface DescuentoFormProps {
    descuento?: DescuentoType | null;
    moduloId?: string;
    onCreated?: (descuento: DescuentoType) => void;
    onClose: () => void;
}

function DescuentoForm({
    descuento,
    moduloId,
    onCreated,
    onClose,
}: DescuentoFormProps) {
    const createDescuento = useCreateDescuento();
    const updateDescuento = useUpdateDescuento();
    const [busqueda, setBusqueda] = useState("");

    const { data: modulosResponse, isLoading: loadingModulos } =
        useGetModulos(1, 100);

    const modulos = modulosResponse?.data ?? [];

    const form = useForm<DescuentoCreateType>({
        resolver: zodResolver(DescuentoCreateSchema),
        defaultValues: descuento
            ? {
                nombre: descuento.nombre,
                descripcion: descuento.descripcion ?? "",
                tipo: descuento.tipo,
                valor: descuento.valor,
                iniciaEn: toDatetimeLocal(descuento.iniciaEn),
                finalizaEn: toDatetimeLocal(descuento.finalizaEn),
                habilitado: descuento.habilitado,
                aplicarATodos: false,
                moduloIds: descuento.modulos.map((modulo) => modulo.id),
            }
            : {
                nombre: "",
                descripcion: "",
                tipo: "PORCENTAJE",
                valor: 0,
                iniciaEn: "",
                finalizaEn: "",
                habilitado: true,
                aplicarATodos: false,
                moduloIds: moduloId ? [moduloId] : [],
            },
    });

    const aplicarATodos =
        useWatch({
            control: form.control,
            name: "aplicarATodos",
        }) ?? false;

    const moduloIds =
        useWatch({
            control: form.control,
            name: "moduloIds",
        }) ?? [];

    const tipo =
        useWatch({
            control: form.control,
            name: "tipo",
        }) ?? "PORCENTAJE";

    const modulosFiltrados = useMemo(() => {
        const texto = normalizar(busqueda.trim());

        if (!texto) return modulos;

        return modulos.filter((modulo) => {
            const nombre = normalizar(modulo.nombre);
            const curso = normalizar(modulo.curso.nombre);
            const categoria = normalizar(modulo.curso.categoria.nombre);

            return (
                nombre.includes(texto) ||
                curso.includes(texto) ||
                categoria.includes(texto)
            );
        });
    }, [busqueda, modulos]);

    const toggleModulo = (id: string) => {
        const actuales = form.getValues("moduloIds") ?? [];

        form.setValue(
            "moduloIds",
            actuales.includes(id)
                ? actuales.filter((moduloId) => moduloId !== id)
                : [...actuales, id],
            { shouldDirty: true },
        );
    };

    const onSubmit = (values: DescuentoCreateType) => {
        const data: DescuentoCreateType = {
            ...values,
            iniciaEn: new Date(values.iniciaEn).toISOString(),
            finalizaEn: new Date(values.finalizaEn).toISOString(),
            moduloIds: values.aplicarATodos
                ? undefined
                : values.moduloIds,
        };

        if (descuento) {
            updateDescuento.mutate(
                {
                    id: descuento.id,
                    data,
                },
                {
                    onSuccess: onClose,
                },
            );

            return;
        }

        createDescuento.mutate(data, {
            onSuccess: (nuevoDescuento) => {
                onCreated?.(nuevoDescuento);
                onClose();
            },
        });
    };

    const guardando =
        createDescuento.isPending ||
        updateDescuento.isPending;

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-w-0 space-y-6 overflow-x-hidden"
        >
            <FormField
                control={form.control}
                name="nombre"
                label="Nombre"
                placeholder="Ej: Promo Septiembre"
            />

            <FormField
                type="textarea"
                control={form.control}
                name="descripcion"
                label="Descripción"
                placeholder="Descripción opcional"
                rows={3}
            />

            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="min-w-0">
                    <FormField
                        type="select"
                        control={form.control}
                        name="tipo"
                        label="Tipo de descuento"
                        options={[
                            {
                                value: "PORCENTAJE",
                                label: "Porcentaje",
                            },
                            {
                                value: "MONTO_FIJO",
                                label: "Monto fijo",
                            },
                        ]}
                    />
                </div>

                <div className="min-w-0">
                    <FormField
                        type="number"
                        control={form.control}
                        name="valor"
                        label={
                            tipo === "PORCENTAJE"
                                ? "Porcentaje"
                                : "Monto"
                        }
                        min={0}
                        max={
                            tipo === "PORCENTAJE"
                                ? 100
                                : undefined
                        }
                        allowEmpty
                        placeholder="0"
                    />
                </div>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                <Controller
                    control={form.control}
                    name="iniciaEn"
                    render={({ field, fieldState }) => (
                        <div className="min-w-0 space-y-2">
                            <Label>Inicio</Label>

                            <Input
                                type="datetime-local"
                                {...field}
                                className="w-full min-w-0"
                            />

                            {fieldState.error && (
                                <p className="text-xs text-destructive">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </div>
                    )}
                />

                <Controller
                    control={form.control}
                    name="finalizaEn"
                    render={({ field, fieldState }) => (
                        <div className="min-w-0 space-y-2">
                            <Label>Finalización</Label>

                            <Input
                                type="datetime-local"
                                {...field}
                                className="w-full min-w-0"
                            />

                            {fieldState.error && (
                                <p className="text-xs text-destructive">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </div>
                    )}
                />
            </div>

            <FormField
                type="checkbox"
                control={form.control}
                name="aplicarATodos"
                label="Aplicación"
                description="Aplicar a todos los módulos existentes"
            />

            {!aplicarATodos && (
                <div className="min-w-0 space-y-4">
                    <div>
                        <p className="text-sm font-medium">
                            Seleccionar módulos
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Busca por módulo, curso o categoría.
                        </p>
                    </div>

                    <div className="relative min-w-0">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            value={busqueda}
                            onChange={(event) =>
                                setBusqueda(event.target.value)
                            }
                            placeholder="Buscar módulo, curso o categoría..."
                            className="w-full min-w-0 pl-9 pr-9"
                        />

                        {busqueda && (
                            <button
                                type="button"
                                onClick={() => setBusqueda("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <X className="size-4" />
                            </button>
                        )}
                    </div>

                    <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                        <p className="text-xs text-muted-foreground">
                            {moduloIds.length} módulo(s) seleccionado(s)
                        </p>

                        {busqueda && (
                            <p className="text-xs text-muted-foreground">
                                {modulosFiltrados.length} resultado(s)
                            </p>
                        )}
                    </div>

                    <div className="max-h-72 min-w-0 overflow-y-auto overflow-x-hidden border-y">
                        {loadingModulos ? (
                            <p className="p-6 text-center text-sm text-muted-foreground">
                                Cargando módulos...
                            </p>
                        ) : modulosFiltrados.length === 0 ? (
                            <p className="p-6 text-center text-sm text-muted-foreground">
                                No se encontraron módulos.
                            </p>
                        ) : (
                            modulosFiltrados.map((modulo) => {
                                const seleccionado =
                                    moduloIds.includes(modulo.id);

                                return (
                                    <button
                                        key={modulo.id}
                                        type="button"
                                        onClick={() =>
                                            toggleModulo(modulo.id)
                                        }
                                        className="flex w-full min-w-0 items-center justify-between gap-3 border-b py-3 text-left transition-colors last:border-b-0 hover:bg-muted/40"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">
                                                {modulo.nombre}
                                            </p>

                                            <p className="mt-1 truncate text-xs text-muted-foreground">
                                                {modulo.curso.nombre}
                                                {" · "}
                                                {
                                                    modulo.curso.categoria
                                                        .nombre
                                                }
                                            </p>
                                        </div>

                                        <div
                                            className={`flex size-5 shrink-0 items-center justify-center rounded border ${seleccionado
                                                    ? "border-primary bg-primary text-primary-foreground"
                                                    : "border-border"
                                                }`}
                                        >
                                            {seleccionado && (
                                                <Check className="size-3.5" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            )}

            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="w-full sm:w-auto"
                >
                    Cancelar
                </Button>

                <Button
                    type="submit"
                    disabled={guardando}
                    className="w-full sm:w-auto"
                >
                    {guardando
                        ? "Guardando..."
                        : descuento
                            ? "Guardar cambios"
                            : "Crear descuento"}
                </Button>
            </div>
        </form>
    );
}

function normalizar(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function toDatetimeLocal(value: string) {
    const date = new Date(value);

    const localDate = new Date(
        date.getTime() -
        date.getTimezoneOffset() * 60000,
    );

    return localDate
        .toISOString()
        .slice(0, 16);
}