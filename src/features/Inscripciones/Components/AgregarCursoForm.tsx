import { useState } from "react";
import Select, { SingleValue } from "react-select";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

import {
    useAgregarCurso,
    useCursos,
} from "../Hook/InscripcionHook";
import {
    CursoType,
    ModuloType,
} from "../Schema/InscripcionSchema";

interface AgregarCursoFormProps {
    cursosInscritosIds: string[];
    estudianteId: string;
}

interface SelectOption {
    value: string;
    label: string;
}

export function AgregarCursoForm({
    cursosInscritosIds,
    estudianteId,
}: AgregarCursoFormProps) {
    const {
        data: todosCursos = [],
        isLoading: loadingCursos,
    } = useCursos();

    const agregarCursoMutation = useAgregarCurso();

    const [cursoIdSeleccionado, setCursoIdSeleccionado] =
        useState<string | null>(null);

    const [moduloIdSeleccionado, setModuloIdSeleccionado] =
        useState<string | null>(null);

    const cursosDisponibles = todosCursos.filter(
        (curso: CursoType) =>
            !cursosInscritosIds.includes(curso.id),
    );

    const cursoSeleccionado = todosCursos.find(
        (curso: CursoType) =>
            curso.id === cursoIdSeleccionado,
    );

    const modulos: ModuloType[] =
        cursoSeleccionado?.modulos ?? [];

    const cursoOptions: SelectOption[] = cursosDisponibles.map(
        (curso) => ({
            value: curso.id,
            label: curso.nombre,
        }),
    );
    const moduloOptions: SelectOption[] =
        modulos.map((modulo) => ({
            value: modulo.id,
            label: modulo.nombre,
        }));

    const cursoValue =
        cursoOptions.find(
            (option) =>
                option.value === cursoIdSeleccionado,
        ) ?? null;

    const moduloValue =
        moduloOptions.find(
            (option) =>
                option.value === moduloIdSeleccionado,
        ) ?? null;

    const handleAgregarCurso = () => {
        if (
            !cursoIdSeleccionado ||
            !moduloIdSeleccionado
        ) {
            return;
        }

        agregarCursoMutation.mutate(
            {
                cursoId: cursoIdSeleccionado,
                moduloIds: [moduloIdSeleccionado],
                estudianteIds: [estudianteId],
                estadoAcceso: "habilitado",
            },
            {
                onSuccess: () => {
                    setCursoIdSeleccionado(null);
                    setModuloIdSeleccionado(null);
                },
            },
        );
    };

    const handleCursoChange = (
        option: SingleValue<SelectOption>,
    ) => {
        setCursoIdSeleccionado(option?.value ?? null);
        setModuloIdSeleccionado(null);
    };

    const handleModuloChange = (
        option: SingleValue<SelectOption>,
    ) => {
        setModuloIdSeleccionado(option?.value ?? null);
    };

    if (cursosDisponibles.length === 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Plus className="h-4 w-4 text-primary" />
                    Agregar curso
                </CardTitle>
            </CardHeader>

            <CardContent>
                <FieldGroup className="gap-4">
                    <Field>
                        <FieldLabel>Curso</FieldLabel>

                        <Select<SelectOption>
                            options={cursoOptions}
                            value={cursoValue}
                            onChange={handleCursoChange}
                            isLoading={loadingCursos}
                            placeholder="Selecciona un curso"
                            isClearable
                        />
                    </Field>

                    <Field>
                        <FieldLabel>Módulo</FieldLabel>

                        <Select<SelectOption>
                            options={moduloOptions}
                            value={moduloValue}
                            onChange={handleModuloChange}
                            isLoading={loadingCursos}
                            placeholder={
                                cursoSeleccionado
                                    ? "Selecciona un módulo"
                                    : "Selecciona un curso primero"
                            }
                            isDisabled={!cursoSeleccionado}
                            isClearable
                        />
                    </Field>

                    <Field>
                        <Button
                            type="button"
                            onClick={handleAgregarCurso}
                            disabled={
                                !cursoIdSeleccionado ||
                                !moduloIdSeleccionado ||
                                agregarCursoMutation.isPending
                            }
                        >
                            {agregarCursoMutation.isPending
                                ? "Agregando..."
                                : "Agregar curso"}
                        </Button>
                    </Field>
                </FieldGroup>
            </CardContent>
        </Card>
    );
}
