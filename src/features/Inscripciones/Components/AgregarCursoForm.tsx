import { useState } from "react";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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

export function AgregarCursoForm({
    cursosInscritosIds,
    estudianteId,
}: AgregarCursoFormProps) {
    const {
        data: todosCursos = [],
        isLoading: loadingCursos,
    } = useCursos();

    const agregarCursoMutation =
        useAgregarCurso();

    const [
        cursoIdSeleccionado,
        setCursoIdSeleccionado,
    ] = useState<string>("");

    const [
        moduloIdSeleccionado,
        setModuloIdSeleccionado,
    ] = useState<string>("");

    const cursosDisponibles =
        todosCursos.filter(
            (curso: CursoType) =>
                !cursosInscritosIds.includes(
                    curso.id,
                ),
        );

    const cursoSeleccionado =
        todosCursos.find(
            (curso: CursoType) =>
                curso.id ===
                cursoIdSeleccionado,
        );

    const modulos: ModuloType[] =
        cursoSeleccionado?.modulos ?? [];

    const handleCursoChange = (
        value: string,
    ) => {
        setCursoIdSeleccionado(value);
        setModuloIdSeleccionado("");
    };

    const handleModuloChange = (
        value: string,
    ) => {
        setModuloIdSeleccionado(value);
    };

    const handleAgregarCurso = () => {
        if (
            !cursoIdSeleccionado ||
            !moduloIdSeleccionado
        ) {
            return;
        }

        agregarCursoMutation.mutate(
            {
                cursoId:
                    cursoIdSeleccionado,
                moduloIds: [
                    moduloIdSeleccionado,
                ],
                estudianteIds: [
                    estudianteId,
                ],
                estadoAcceso:
                    "habilitado",
            },
            {
                onSuccess: () => {
                    setCursoIdSeleccionado("");
                    setModuloIdSeleccionado("");
                },
            },
        );
    };

    if (
        cursosDisponibles.length ===
        0
    ) {
        return null;
    }

    return (
        <Card className="text-foreground">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Plus className="h-4 w-4 text-primary" />
                    Agregar curso
                </CardTitle>
            </CardHeader>

            <CardContent>
                <FieldGroup className="gap-4">
                    {/* CURSO */}
                    <Field>
                        <FieldLabel>
                            Curso
                        </FieldLabel>

                        <Select
                            value={
                                cursoIdSeleccionado
                            }
                            onValueChange={
                                handleCursoChange
                            }
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
                                {cursosDisponibles.map(
                                    (
                                        curso,
                                    ) => (
                                        <SelectItem
                                            key={
                                                curso.id
                                            }
                                            value={
                                                curso.id
                                            }
                                        >
                                            {
                                                curso.nombre
                                            }
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>
                    </Field>

                    {/* MODULO */}
                    <Field>
                        <FieldLabel>
                            Módulo
                        </FieldLabel>

                        <Select
                            value={
                                moduloIdSeleccionado
                            }
                            onValueChange={
                                handleModuloChange
                            }
                            disabled={
                                !cursoSeleccionado ||
                                loadingCursos
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue
                                    placeholder={
                                        cursoSeleccionado
                                            ? "Selecciona un módulo"
                                            : "Selecciona un curso primero"
                                    }
                                />
                            </SelectTrigger>

                            <SelectContent className="z-[220]">
                                {modulos.map(
                                    (
                                        modulo,
                                    ) => (
                                        <SelectItem
                                            key={
                                                modulo.id
                                            }
                                            value={
                                                modulo.id
                                            }
                                        >
                                            {
                                                modulo.nombre
                                            }
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>
                    </Field>

                    <Field>
                        <Button
                            type="button"
                            onClick={
                                handleAgregarCurso
                            }
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
