import DOMPurify from "dompurify";

import { LeccionVideoPlayer } from "./LeccionVideoPlayer";
import { RecursoViewer } from "./RecursoViewer";
import { LeccionCheckpointForm } from "./LeccionCheckpointForm";
import { LeccionesTimeline } from "./LeccionesTimeline";

import { ProgresoModulo } from "@/features/Progreso/Components/ProgresoModulo";

import {
    useGetLeccion,
    useGetLeccionesConProgreso,
} from "../Hook/LeccionHook";

interface LeccionContenidoProps {
    leccion: NonNullable<
        ReturnType<
            typeof useGetLeccion
        >["data"]
    >;
    cursoId: string;
    moduloId: string;
    linkPago?: string | null;
    leccionesProgreso: ReturnType<
        typeof useGetLeccionesConProgreso
    >["data"];
    onNavigateSiguiente: (
        leccionId: string,
    ) => void;
    onModuloCompletado: (
        cursoCompletado: boolean,
    ) => void;
}

export function LeccionContenido({
    leccion,
    cursoId,
    moduloId,
    linkPago,
    leccionesProgreso,
    onNavigateSiguiente,
    onModuloCompletado,
}: LeccionContenidoProps) {
    const indexActual =
        leccionesProgreso?.findIndex(
            (item) =>
                item.id ===
                leccion.id,
        ) ?? -1;

    const estaCompletada =
        indexActual >= 0
            ? leccionesProgreso?.[
                indexActual
            ]?.completada ??
            false
            : false;

    const siguienteLeccionId =
        indexActual >= 0 &&
            indexActual <
            (leccionesProgreso
                ?.length ?? 0) -
            1
            ? leccionesProgreso?.[
                indexActual + 1
            ]?.id
            : undefined;

    const contenidoSeguro =
        leccion.contenidoHtml
            ? DOMPurify.sanitize(
                leccion.contenidoHtml,
            )
            : null;

    return (
        <div className="flex flex-col gap-6 text-foreground lg:min-h-[calc(100vh-200px)] lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1 space-y-6">
                <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                    {leccion.nombre}
                </h1>

                {leccion.urlVideo && (
                    <LeccionVideoPlayer
                        urlVideo={
                            leccion.urlVideo
                        }
                        proveedorVideo={
                            leccion.proveedorVideo
                        }
                    />
                )}

                {contenidoSeguro && (
                    <article
                        className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:text-muted-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground prose-hr:border-border sm:prose-base dark:prose-invert"
                        dangerouslySetInnerHTML={{
                            __html: contenidoSeguro,
                        }}
                    />
                )}

                {leccion.recursos.length >
                    0 && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">
                                Recursos
                            </p>

                            <div className="space-y-3">
                                {leccion.recursos.map(
                                    (
                                        recurso,
                                    ) => (
                                        <RecursoViewer
                                            key={
                                                recurso.id
                                            }
                                            recurso={
                                                recurso
                                            }
                                        />
                                    ),
                                )}
                            </div>
                        </div>
                    )}

                <LeccionCheckpointForm
                    leccionId={
                        leccion.id
                    }
                    cursoId={
                        cursoId
                    }
                    moduloId={
                        moduloId
                    }
                    linkPago={
                        linkPago
                    }
                    estaCompletada={
                        estaCompletada
                    }
                    siguienteLeccionId={
                        siguienteLeccionId
                    }
                    onNavigateSiguiente={
                        onNavigateSiguiente
                    }
                    onCompletada={(
                        data,
                    ) => {
                        if (
                            !estaCompletada &&
                            data.moduloCompletado
                        ) {
                            onModuloCompletado(
                                data.cursoCompletado,
                            );
                        }
                    }}
                />
            </div>

            <aside className="w-full shrink-0 lg:sticky lg:top-6 lg:max-h-[calc(100vh-100px)] lg:w-80 lg:self-start lg:overflow-y-auto">
                <div className="space-y-4">
                    <LeccionesTimeline
                        moduloId={
                            moduloId
                        }
                    />

                    <ProgresoModulo
                        moduloId={
                            moduloId
                        }
                    />
                </div>
            </aside>
        </div>
    );
}