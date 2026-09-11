import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { MultiSelect } from "@/components/common/form/MultiSelect";

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
        useState<string>("");

    const [openDialog, setOpenDialog] =
        useState(false);

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<CrearInscripcionSchemaType>({
        resolver: zodResolver(
            CrearInscripcionSchema,
        ),

        defaultValues: {
            estadoAcceso: "pendiente",
            cursoId: "",
            moduloIds: [],
            estudianteIds: [],
        },
    });

    const cursoSeleccionado =
        cursos.find(
            (curso: CursoType) =>
                curso.id === cursoId,
        );

    const modulos: ModuloType[] =
        cursoSeleccionado?.modulos ?? [];

    const cursoOptions: SelectOption[] =
        cursos.map(
            (curso: CursoType) => ({
                value: curso.id,
                label: curso.nombre,
            }),
        );

    const moduloOptions: SelectOption[] =
        modulos.map(
            (modulo: ModuloType) => ({
                value: modulo.id,
                label: modulo.nombre,
            }),
        );

    const estudianteOptions: SelectOption[] =
        estudiantes.map(
            (
                estudiante: EstudianteType,
            ) => ({
                value: estudiante.id,
                label: estudiante.username,
            }),
        );

    const onSubmit = (
        data: CrearInscripcionSchemaType,
    ) => {
        crearInscripcionMutation.mutate(
            data,
        );
    };

    return (
        <div className="flex flex-col gap-6">
            <form
                onSubmit={handleSubmit(
                    onSubmit,
                )}
            >
                <FieldGroup className="gap-3">
                    {/* CURSO */}
                    <Field>
                        <FieldLabel>
                            Curso
                        </FieldLabel>

                        <Controller
                            name="cursoId"
                            control={control}
                            render={({
                                field,
                            }) => (
                                <Select
                                    value={
                                        field.value ||
                                        ""
                                    }
                                    onValueChange={(
                                        value,
                                    ) => {
                                        field.onChange(
                                            value,
                                        );

                                        setCursoId(
                                            value,
                                        );

                                        setValue(
                                            "moduloIds",
                                            [],
                                        );
                                    }}
                                    disabled={
                                        loadingCursos
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue
                                            placeholder={
                                                loadingCursos
                                                    ? "Cargando cursos..."
                                                    : "Selecciona un curso"
                                            }
                                        />
                                    </SelectTrigger>

                                    <SelectContent className="z-[220]">
                                        {cursoOptions.map(
                                            (
                                                option,
                                            ) => (
                                                <SelectItem
                                                    key={
                                                        option.value
                                                    }
                                                    value={
                                                        option.value
                                                    }
                                                >
                                                    {
                                                        option.label
                                                    }
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        {errors.cursoId && (
                            <span className="text-sm text-destructive">
                                {
                                    errors
                                        .cursoId
                                        .message
                                }
                            </span>
                        )}
                    </Field>

                    {/* MÓDULOS */}
                    <Field>
                        <FieldLabel>
                            Módulos
                        </FieldLabel>

                        <Controller
                            name="moduloIds"
                            control={control}
                            render={({
                                field,
                            }) => (
                                <MultiSelect
                                    options={
                                        moduloOptions
                                    }
                                    value={
                                        field.value ??
                                        []
                                    }
                                    onChange={
                                        field.onChange
                                    }
                                    loading={
                                        loadingCursos
                                    }
                                    disabled={
                                        !cursoSeleccionado
                                    }
                                    placeholder={
                                        cursoSeleccionado
                                            ? "Selecciona módulos"
                                            : "Selecciona un curso primero"
                                    }
                                />
                            )}
                        />

                        {errors.moduloIds && (
                            <span className="text-sm text-destructive">
                                {
                                    errors
                                        .moduloIds
                                        .message
                                }
                            </span>
                        )}
                    </Field>

                    {/* ESTUDIANTES */}
                    <Field>
                        <FieldLabel>
                            Estudiantes
                        </FieldLabel>

                        <div className="flex w-full gap-2">
                            <Controller
                                name="estudianteIds"
                                control={
                                    control
                                }
                                render={({
                                    field,
                                }) => (
                                    <MultiSelect
                                        className="flex-1"
                                        options={
                                            estudianteOptions
                                        }
                                        value={
                                            field.value ??
                                            []
                                        }
                                        onChange={
                                            field.onChange
                                        }
                                        loading={
                                            loadingEstudiantes
                                        }
                                        placeholder="Selecciona estudiantes"
                                    />
                                )}
                            />

                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    setOpenDialog(
                                        true,
                                    )
                                }
                                className="shrink-0"
                            >
                                <Plus className="size-4" />
                            </Button>
                        </div>

                        {errors.estudianteIds && (
                            <span className="text-sm text-destructive">
                                {
                                    errors
                                        .estudianteIds
                                        .message
                                }
                            </span>
                        )}
                    </Field>

                    {/* SUBMIT */}
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
                onOpenChange={
                    setOpenDialog
                }
            />
        </div>
    );
}
