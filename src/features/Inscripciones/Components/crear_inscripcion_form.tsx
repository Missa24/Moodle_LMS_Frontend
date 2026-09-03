import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select, {
    MultiValue,
    SingleValue,
} from "react-select";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Plus } from "lucide-react";

import {
    CrearInscripcionSchema,
    CrearInscripcionSchemaType,
    CursoType,
    ModuloType,
} from "../Schema/InscripcionSchema";

import {
    useCrearInscripcion,
    useCursos,
    useEstudiantes,
} from "../Hook/InscripcionHook";

import { DialogEstudiante } from "./DialogEstudiante";
import { EstudianteType } from "../Schema/EstudianteSchema";

interface CrearInscripcionFormProps {
    onSuccess?: () => void;
    showHeader?: boolean;
}

interface SelectOption {
    value: string;
    label: string;
}

export function CrearInscripcionForm({
    onSuccess,
}: CrearInscripcionFormProps) {
    const crearInscripcionMutation =
        useCrearInscripcion(onSuccess);

    const {
        data: cursos = [],
        isLoading: loadingCursos,
    } = useCursos();

    const {
        data: estudiantes = [],
        isLoading: loadingEstudiantes,
    } = useEstudiantes();

    const [cursoId, setCursoId] =
        useState<string | null>(null);

    const [openDialog, setOpenDialog] =
        useState(false);

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<CrearInscripcionSchemaType>({
        resolver: zodResolver(CrearInscripcionSchema),
        defaultValues: {
            estadoAcceso: "pendiente",
            cursoId: "",
            moduloIds: [],
            estudianteIds: [],
        },
    });

    const cursoSeleccionado = cursos.find(
        (curso: CursoType) => curso.id === cursoId,
    );

    const modulos: ModuloType[] =
        cursoSeleccionado?.modulos ?? [];

    const cursoOptions: SelectOption[] =
        cursos.map((curso: CursoType) => ({
            value: curso.id,
            label: curso.nombre,
        }));

    const moduloOptions: SelectOption[] =
        modulos.map((modulo: ModuloType) => ({
            value: modulo.id,
            label: modulo.nombre,
        }));

    const estudianteOptions: SelectOption[] =
        estudiantes.map(
            (estudiante: EstudianteType) => ({
                value: estudiante.id,
                label: estudiante.username,
            }),
        );

    const onSubmit = (
        data: CrearInscripcionSchemaType,
    ) => {
        crearInscripcionMutation.mutate(data);
    };

    return (
        <div className="flex flex-col gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup className="gap-3">
                    <Field>
                        <FieldLabel htmlFor="cursoId">
                            Curso
                        </FieldLabel>

                        <Controller
                            name="cursoId"
                            control={control}
                            render={({ field }) => {
                                const value =
                                    cursoOptions.find(
                                        (option) =>
                                            option.value ===
                                            field.value,
                                    ) ?? null;

                                return (
                                    <Select<SelectOption>
                                        options={cursoOptions}
                                        value={value}
                                        onChange={(
                                            option: SingleValue<SelectOption>,
                                        ) => {
                                            const nuevoCursoId =
                                                option?.value ?? "";

                                            field.onChange(
                                                nuevoCursoId,
                                            );

                                            setCursoId(
                                                option?.value ?? null,
                                            );

                                            setValue(
                                                "moduloIds",
                                                [],
                                            );
                                        }}
                                        isLoading={
                                            loadingCursos
                                        }
                                        placeholder="Selecciona un curso"
                                        isClearable
                                    />
                                );
                            }}
                        />

                        {errors.cursoId && (
                            <span className="text-sm text-red-500">
                                {errors.cursoId.message}
                            </span>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="moduloIds">
                            Módulos
                        </FieldLabel>

                        <Controller
                            name="moduloIds"
                            control={control}
                            render={({ field }) => {
                                const value =
                                    moduloOptions.filter(
                                        (option) =>
                                            field.value.includes(
                                                option.value,
                                            ),
                                    );

                                return (
                                    <Select<SelectOption, true>
                                        options={moduloOptions}
                                        value={value}
                                        onChange={(
                                            option: MultiValue<SelectOption>,
                                        ) => {
                                            field.onChange(
                                                option.map(
                                                    (option) =>
                                                        option.value,
                                                ),
                                            );
                                        }}
                                        isLoading={
                                            loadingCursos
                                        }
                                        placeholder={
                                            cursoSeleccionado
                                                ? "Selecciona un módulo"
                                                : "Selecciona un curso primero"
                                        }
                                        isDisabled={
                                            !cursoSeleccionado
                                        }
                                        isMulti
                                        isClearable
                                    />
                                );
                            }}
                        />

                        {errors.moduloIds && (
                            <span className="text-sm text-red-500">
                                {errors.moduloIds.message}
                            </span>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="estudianteIds">
                            Estudiantes
                        </FieldLabel>

                        <div className="flex w-full gap-2">
                            <Controller
                                name="estudianteIds"
                                control={control}
                                render={({ field }) => {
                                    const value =
                                        estudianteOptions.filter(
                                            (option) =>
                                                field.value.includes(
                                                    option.value,
                                                ),
                                        );

                                    return (
                                        <Select<SelectOption, true>
                                            className="flex-1"
                                            options={
                                                estudianteOptions
                                            }
                                            value={value}
                                            onChange={(
                                                options: MultiValue<SelectOption>,
                                            ) => {
                                                field.onChange(
                                                    options.map(
                                                        (
                                                            option,
                                                        ) =>
                                                            option.value,
                                                    ),
                                                );
                                            }}
                                            isLoading={
                                                loadingEstudiantes
                                            }
                                            isMulti
                                            placeholder="Selecciona estudiantes"
                                        />
                                    );
                                }}
                            />

                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    setOpenDialog(true)
                                }
                                className="cursor-pointer"
                            >
                                <Plus className="size-4" />
                            </Button>
                        </div>

                        {errors.estudianteIds && (
                            <span className="text-sm text-red-500">
                                {
                                    errors.estudianteIds
                                        .message
                                }
                            </span>
                        )}
                    </Field>

                    <Field>
                        <Button
                            type="submit"
                            disabled={
                                crearInscripcionMutation.isPending
                            }
                        >
                            {crearInscripcionMutation.isPending
                                ? "Creando..."
                                : "Crear inscripción"}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>

            <DialogEstudiante
                open={openDialog}
                onOpenChange={setOpenDialog}
            />
        </div>
    );
}
