import { useState } from "react";
import DOMPurify from "dompurify";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LeccionBloqueadaDialog } from "./LeccionBloqueadaDialog";
import { getApiErrorCode } from "@/utils/apiError";
import { useGetFormularioLeccion, useMarcarLeccionCompletada } from "../Hook/LeccionHook";
import { QueryState } from "@/components/common/QueryState";

interface LeccionCheckpointFormProps {
    leccionId: string;
    cursoId: string;
    moduloId: string;
    estaCompletada: boolean;
    siguienteLeccionId?: string;
    onNavigateSiguiente: (leccionId: string) => void;
    onCompletada?: (data: { moduloCompletado: boolean; cursoCompletado: boolean }) => void;
}

type MotivoBloqueo = "no_inscrito" | "leccion_anterior_pendiente";

export function LeccionCheckpointForm({
    leccionId,
    cursoId,
    moduloId,
    estaCompletada,
    siguienteLeccionId,
    onNavigateSiguiente,
    onCompletada,
}: LeccionCheckpointFormProps) {
    const { data: formulario, isLoading, isError, error } = useGetFormularioLeccion(leccionId);
    const { mutate: completar, isPending } = useMarcarLeccionCompletada();

    const [respuestas, setRespuestas] = useState<Record<string, string>>({});
    const [dialogBloqueo, setDialogBloqueo] = useState<{ open: boolean; motivo: MotivoBloqueo | null }>({
        open: false,
        motivo: null,
    });

    const handleExito = (data: { moduloCompletado: boolean; cursoCompletado: boolean }) => {
        toast.success("¡Lección completada!");
        if (siguienteLeccionId) {
            onNavigateSiguiente(siguienteLeccionId);
        }
        onCompletada?.(data);
    };

    const handleError = (error: unknown) => {
        const code = getApiErrorCode(error);
        if (code === "no_inscrito" || code === "leccion_anterior_pendiente") {
            setDialogBloqueo({ open: true, motivo: code });
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
                <div className="flex flex-col items-start gap-3 rounded-lg border bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <CheckCircle2 className="h-4 w-4" />
                        Lección completada
                    </div>

                    {siguienteLeccionId && (
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="gap-1.5"
                            onClick={() => onNavigateSiguiente(siguienteLeccionId)}
                        >
                            Ir a la siguiente lección
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
                        onClick={() => completar({ id: leccionId }, { onSuccess: (data) => handleExito(data), onError: handleError })}
                        disabled={isPending}
                        className="w-full gap-2 sm:w-auto"
                    >
                        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                        Marcar como completada
                    </Button>

                    <LeccionBloqueadaDialog
                        open={dialogBloqueo.open}
                        motivo={dialogBloqueo.motivo}
                        cursoId={cursoId}
                        moduloId={moduloId}
                    />
                </>
            </QueryState>
        );
    }

    const todasRespondidas = formulario.preguntas.every((p) => respuestas[p.id]);

    const handleSubmit = () => {
        const payload = formulario.preguntas.map((p) => ({
            preguntaFormularioId: p.id,
            opcionFormularioId: respuestas[p.id],
        }));

        completar({ id: leccionId, respuestas: payload }, { onSuccess: (data) => handleExito(data), onError: handleError });
    };

    return (
        <QueryState
            isLoading={isLoading}
            isError={isError}
            error={error}
            minHeight="min-h-[100px]"
        >
            <>
                <div className="space-y-5 rounded-lg border bg-muted/10 p-4">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <p className="text-sm font-medium">{formulario.titulo}</p>
                    </div>

                    {formulario.preguntas.map((pregunta, index) => (
                        <div key={pregunta.id} className="space-y-2">
                            <div className="flex gap-1 text-sm font-medium">
                                <span>{index + 1}.</span>
                                <span
                                    className="prose prose-sm max-w-none [&>p]:m-0"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pregunta.enunciado) }}
                                />
                            </div>

                            <div className="space-y-1.5">
                                {pregunta.opciones.map((opcion) => (
                                    <label
                                        key={opcion.id}
                                        className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted/40 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                                    >
                                        <input
                                            type="radio"
                                            name={pregunta.id}
                                            value={opcion.id}
                                            checked={respuestas[pregunta.id] === opcion.id}
                                            onChange={() => setRespuestas((prev) => ({ ...prev, [pregunta.id]: opcion.id }))}
                                            className="h-4 w-4"
                                        />
                                        {opcion.texto}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}

                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!todasRespondidas || isPending}
                        className="w-full gap-2 sm:w-auto"
                    >
                        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                        Enviar y completar lección
                    </Button>
                </div>

                <LeccionBloqueadaDialog
                    open={dialogBloqueo.open}
                    motivo={dialogBloqueo.motivo}
                    cursoId={cursoId}
                    moduloId={moduloId}
                />
            </>
        </QueryState>
    );
}