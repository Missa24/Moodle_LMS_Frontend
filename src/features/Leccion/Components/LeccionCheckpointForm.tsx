"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import {
    Loader2,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { QueryState } from "@/components/common/QueryState";
import { getApiErrorCode } from "@/utils/apiError";

import { LeccionBloqueadaDialog } from "./LeccionBloqueadaDialog";

import {
    useGetFormularioLeccion,
    useMarcarLeccionCompletada,
} from "../Hook/LeccionHook";

interface LeccionCheckpointFormProps {
    leccionId: string;
    cursoId: string;
    moduloId: string;
    estaCompletada: boolean;
    siguienteLeccionId?: string;
    linkPago?: string | null;
    onNavigateSiguiente: (
        leccionId: string
    ) => void;
    onCompletada?: (data: {
        moduloCompletado: boolean;
        cursoCompletado: boolean;
    }) => void;
}

type MotivoBloqueo =
    | "no_inscrito"
    | "leccion_anterior_pendiente";

export function LeccionCheckpointForm({
    leccionId,
    cursoId,
    moduloId,
    estaCompletada,
    siguienteLeccionId,
    linkPago,
    onNavigateSiguiente,
    onCompletada,
}: LeccionCheckpointFormProps) {
    const queryClient =
        useQueryClient();

    const {
        data: formulario,
        isLoading,
        isError,
        error,
    } = useGetFormularioLeccion(
        leccionId
    );

    const {
        mutate: completar,
        isPending,
    } =
        useMarcarLeccionCompletada();

    const [
        respuestas,
        setRespuestas,
    ] = useState<
        Record<string, string>
    >({});

    const [
        dialogBloqueo,
        setDialogBloqueo,
    ] = useState<{
        open: boolean;
        motivo:
        | MotivoBloqueo
        | null;
    }>({
        open: false,
        motivo: null,
    });

    const handleExito =
        async (data: {
            moduloCompletado: boolean;
            cursoCompletado: boolean;
        }) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [
                        "lecciones",
                    ],
                }),

                queryClient.invalidateQueries({
                    queryKey: [
                        "progreso",
                    ],
                }),

                queryClient.invalidateQueries({
                    queryKey: [
                        "inscripciones",
                    ],
                }),

                queryClient.invalidateQueries({
                    queryKey: [
                        "certificados",
                    ],
                }),
            ]);

            toast.success(
                "¡Lección completada!"
            );

            onCompletada?.(data);

            if (
                siguienteLeccionId &&
                !data.moduloCompletado
            ) {
                onNavigateSiguiente(
                    siguienteLeccionId
                );
            }
        };

    const handleError = (
        error: unknown
    ) => {
        const code =
            getApiErrorCode(error);

        if (
            code === "no_inscrito" ||
            code ===
            "leccion_anterior_pendiente"
        ) {
            setDialogBloqueo({
                open: true,
                motivo: code,
            });
        }
    };

    if (estaCompletada) {
        return (
            <QueryState
                isLoading={isLoading}
                isError={isError}
                error={error}
                minHeight="min-h-[100px]"
            >
                <div className="flex flex-col items-start gap-3 rounded-lg border bg-primary/5 p-4 text-foreground sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-sm font-normal text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-foreground" />

                        <span className="font-normal text-foreground">
                            Lección completada
                        </span>
                    </div>

                    {siguienteLeccionId && (
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="gap-1.5"
                            onClick={() =>
                                onNavigateSiguiente(
                                    siguienteLeccionId
                                )
                            }
                        >
                            Ir a la siguiente
                            lección

                            <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                    )}
                </div>
            </QueryState>
        );
    }

    if (!formulario) {
        return (
            <QueryState
                isLoading={isLoading}
                isError={isError}
                error={error}
                minHeight="min-h-[100px]"
            >
                <>
                    <Button
                        type="button"
                        disabled={isPending}
                        className="w-full gap-2 sm:w-auto"
                        onClick={() =>
                            completar(
                                {
                                    id: leccionId,
                                },
                                {
                                    onSuccess: (
                                        data
                                    ) => {
                                        void handleExito(
                                            data
                                        );
                                    },

                                    onError:
                                        handleError,
                                }
                            )
                        }
                    >
                        {isPending && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}

                        Marcar como
                        completada
                    </Button>

                    <LeccionBloqueadaDialog
                        open={
                            dialogBloqueo.open
                        }
                        motivo={
                            dialogBloqueo.motivo
                        }
                        cursoId={cursoId}
                        moduloId={moduloId}
                        linkPago={linkPago}
                    />
                </>
            </QueryState>
        );
    }

    const todasRespondidas =
        formulario.preguntas.every(
            (pregunta) =>
                respuestas[
                pregunta.id
                ]
        );

    const handleSubmit = () => {
        const payload =
            formulario.preguntas.map(
                (pregunta) => ({
                    preguntaFormularioId:
                        pregunta.id,

                    opcionFormularioId:
                        respuestas[
                        pregunta.id
                        ],
                })
            );

        completar(
            {
                id: leccionId,
                respuestas: payload,
            },
            {
                onSuccess: (data) => {
                    void handleExito(
                        data
                    );
                },

                onError: handleError,
            }
        );
    };

    return (
        <QueryState
            isLoading={isLoading}
            isError={isError}
            error={error}
            minHeight="min-h-[100px]"
        >
            <>
                <div className="space-y-5 rounded-lg border bg-muted/10 p-4 font-normal text-foreground">
                    <div className="flex items-center gap-2 text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-foreground" />

                        <p className="text-sm font-normal text-foreground">
                            {
                                formulario.titulo
                            }
                        </p>
                    </div>

                    {formulario.preguntas.map(
                        (
                            pregunta,
                            index
                        ) => (
                            <div
                                key={
                                    pregunta.id
                                }
                                className="space-y-2 text-foreground"
                            >
                                <div className="flex gap-1 text-sm font-normal text-foreground">
                                    <span className="font-normal text-foreground">
                                        {index +
                                            1}
                                        .
                                    </span>

                                    <span
                                        className="
                                            prose
                                            prose-sm
                                            max-w-none
                                            font-normal
                                            text-foreground
                                            dark:prose-invert
                                            prose-p:text-foreground
                                            prose-strong:font-normal
                                            prose-strong:text-foreground
                                            prose-em:text-foreground
                                            prose-li:text-foreground
                                            prose-headings:text-foreground
                                            [&>p]:m-0
                                        "
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                DOMPurify.sanitize(
                                                    pregunta.enunciado
                                                ),
                                        }}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    {pregunta.opciones.map(
                                        (
                                            opcion
                                        ) => (
                                            <label
                                                key={
                                                    opcion.id
                                                }
                                                className="
                                                    flex
                                                    cursor-pointer
                                                    items-center
                                                    gap-2
                                                    rounded-md
                                                    border
                                                    px-3
                                                    py-2
                                                    text-sm
                                                    font-normal
                                                    text-foreground
                                                    hover:bg-muted/40
                                                    has-[:checked]:border-primary
                                                    has-[:checked]:bg-primary/5
                                                "
                                            >
                                                <input
                                                    type="radio"
                                                    name={
                                                        pregunta.id
                                                    }
                                                    value={
                                                        opcion.id
                                                    }
                                                    checked={
                                                        respuestas[
                                                        pregunta
                                                            .id
                                                        ] ===
                                                        opcion.id
                                                    }
                                                    onChange={() =>
                                                        setRespuestas(
                                                            (
                                                                prev
                                                            ) => ({
                                                                ...prev,

                                                                [pregunta.id]:
                                                                    opcion.id,
                                                            })
                                                        )
                                                    }
                                                    className="h-4 w-4"
                                                />

                                                <span className="font-normal text-foreground">
                                                    {
                                                        opcion.texto
                                                    }
                                                </span>
                                            </label>
                                        )
                                    )}
                                </div>
                            </div>
                        )
                    )}

                    <Button
                        type="button"
                        onClick={
                            handleSubmit
                        }
                        disabled={
                            !todasRespondidas ||
                            isPending
                        }
                        className="w-full gap-2 sm:w-auto"
                    >
                        {isPending && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}

                        Enviar y completar
                        lección
                    </Button>
                </div>

                <LeccionBloqueadaDialog
                    open={
                        dialogBloqueo.open
                    }
                    motivo={
                        dialogBloqueo.motivo
                    }
                    cursoId={cursoId}
                    moduloId={moduloId}
                    linkPago={linkPago}
                />
            </>
        </QueryState>
    );
}