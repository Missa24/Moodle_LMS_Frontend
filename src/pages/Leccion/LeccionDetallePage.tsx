import { useState } from "react";
import DOMPurify from "dompurify";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Trophy,
    Award,
    GraduationCap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { QueryState } from "@/components/common/QueryState";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

import { LeccionVideoPlayer } from "@/features/Leccion/Components/LeccionVideoPlayer";
import { RecursoViewer } from "@/features/Leccion/Components/RecursoViewer";
import { LeccionCheckpointForm } from "@/features/Leccion/Components/LeccionCheckpointForm";
import { LeccionesTimeline } from "@/features/Leccion/Components/LeccionesTimeline";
import { LeccionBloqueadaDialog } from "@/features/Leccion/Components/LeccionBloqueadaDialog";
import { ProgresoModulo } from "@/features/Progreso/Components/ProgresoModulo";

import {
    useGetLeccion,
    useGetLeccionesConProgreso,
} from "@/features/Leccion/Hook/LeccionHook";

export default function LeccionDetallePage() {
    const {
        id: cursoId,
        moduloId,
        leccionId,
    } = useParams<{
        id: string;
        moduloId: string;
        leccionId: string;
    }>();

    const navigate = useNavigate();

    const [
        showModuloDialog,
        setShowModuloDialog,
    ] = useState(false);

    const [
        showCursoDialog,
        setShowCursoDialog,
    ] = useState(false);

    const {
        data: leccion,
        isLoading,
        isError,
        error,
    } = useGetLeccion(leccionId!);

    const {
        data: leccionesProgreso,
    } = useGetLeccionesConProgreso(moduloId!);

    const linkPago =
        "https://www.paypal.com/invoice/p/#C3ZTFDS4KQX8CS2F";

    return (
        <div className="space-y-6 p-4 text-foreground sm:p-6">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                    navigate(
                        `/panel/cursos/${cursoId}/modulos/${moduloId}`
                    )
                }
                className="
                    gap-1
                    px-0
                    text-muted-foreground
                    hover:bg-accent
                    hover:text-accent-foreground
                "
            >
                <ArrowLeft className="h-4 w-4" />
                Volver al módulo
            </Button>

            <QueryState
                isLoading={isLoading}
                isError={isError}
                error={error}
                fallbackMessage="No se pudo cargar la lección."
            >
                {leccion &&
                    leccion.bloqueada ? (
                    <LeccionBloqueadaDialog
                        open
                        motivo={
                            leccion.motivoBloqueo
                        }
                        cursoId={cursoId!}
                        moduloId={moduloId!}
                        linkPago={linkPago}
                    />
                ) : leccion ? (
                    <LeccionContenido
                        leccion={leccion}
                        cursoId={cursoId!}
                        moduloId={moduloId!}
                        leccionesProgreso={
                            leccionesProgreso
                        }
                        onNavigateSiguiente={(
                            nuevaLeccionId
                        ) =>
                            navigate(
                                `/panel/cursos/${cursoId}/modulos/${moduloId}/lecciones/${nuevaLeccionId}`
                            )
                        }
                        onModuloCompletado={(
                            cursoCompletado
                        ) => {
                            setShowModuloDialog(true);

                            if (cursoCompletado) {
                                setShowCursoDialog(true);
                            }
                        }}
                    />
                ) : null}
            </QueryState>

            {/* =========================
                MODULO COMPLETADO
            ========================= */}

            <Dialog
                open={showModuloDialog}
                onOpenChange={setShowModuloDialog}
            >
                <DialogContent className="bg-background text-foreground sm:max-w-md">
                    <DialogHeader className="items-center text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <Trophy className="h-8 w-8 text-primary" />
                        </div>

                        <DialogTitle className="text-xl text-foreground">
                            ¡Felicitaciones!
                        </DialogTitle>

                        <DialogDescription className="text-muted-foreground">
                            Has completado todas las
                            lecciones del módulo. Se ha
                            generado tu certificado de
                            participación.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="flex-col gap-2 sm:flex-row">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                setShowModuloDialog(false)
                            }
                        >
                            Cerrar
                        </Button>

                        <Button
                            type="button"
                            className="gap-2"
                            onClick={() => {
                                setShowModuloDialog(false);

                                navigate(
                                    "/panel/certificados"
                                );
                            }}
                        >
                            <Award className="h-4 w-4" />
                            Ver mi certificado
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* =========================
                CURSO COMPLETADO
            ========================= */}

            <Dialog
                open={showCursoDialog}
                onOpenChange={setShowCursoDialog}
            >
                <DialogContent className="bg-background text-foreground sm:max-w-md">
                    <DialogHeader className="items-center text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                            <GraduationCap className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>

                        <DialogTitle className="text-xl text-foreground">
                            ¡Curso completado!
                        </DialogTitle>

                        <DialogDescription className="text-muted-foreground">
                            Has completado el curso. Se ha
                            generado tu certificado de
                            aprobación.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="flex-col gap-2 sm:flex-row">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                setShowCursoDialog(false)
                            }
                        >
                            Cerrar
                        </Button>

                        <Button
                            type="button"
                            className="gap-2"
                            onClick={() => {
                                setShowCursoDialog(false);

                                navigate(
                                    "/panel/certificados"
                                );
                            }}
                        >
                            <Award className="h-4 w-4" />
                            Ver mi certificado de curso
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

interface LeccionContenidoProps {
    leccion: NonNullable<
        ReturnType<typeof useGetLeccion>["data"]
    >;

    cursoId: string;
    moduloId: string;

    linkPago?: string | null;

    leccionesProgreso: ReturnType<
        typeof useGetLeccionesConProgreso
    >["data"];

    onNavigateSiguiente: (
        leccionId: string
    ) => void;

    onModuloCompletado: (
        cursoCompletado: boolean
    ) => void;
}

function LeccionContenido({
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
            (l) => l.id === leccion.id
        ) ?? -1;

    const estaCompletada =
        indexActual >= 0
            ? leccionesProgreso![indexActual].completada
            : false;

    const esUltimaLeccion =
        indexActual >= 0 &&
        indexActual ===
        (leccionesProgreso?.length ?? 0) - 1;

    const siguienteLeccionId =
        indexActual >= 0 &&
            indexActual <
            (leccionesProgreso?.length ?? 0) - 1
            ? leccionesProgreso![indexActual + 1].id
            : undefined;

    const contenidoSeguro =
        leccion.contenidoHtml
            ? DOMPurify.sanitize(
                leccion.contenidoHtml
            )
            : null;

    return (
        <div className="flex flex-col gap-6 text-foreground lg:min-h-[calc(100vh-200px)] lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1 space-y-6">
                <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    {leccion.nombre}
                </h1>

                {leccion.urlVideo && (
                    <LeccionVideoPlayer
                        urlVideo={leccion.urlVideo}
                        proveedorVideo={
                            leccion.proveedorVideo
                        }
                    />
                )}

                {contenidoSeguro && (
                    <article
                        className="
                            prose
                            prose-sm
                            max-w-none
                            text-foreground
                            prose-headings:text-foreground
                            prose-p:text-foreground
                            prose-li:text-foreground
                            prose-strong:text-foreground
                            prose-a:text-primary
                            prose-a:no-underline
                            hover:prose-a:underline
                            prose-blockquote:text-muted-foreground
                            prose-code:text-foreground
                            prose-pre:bg-muted
                            prose-pre:text-foreground
                            prose-hr:border-border
                            sm:prose-base
                            dark:prose-invert
                        "
                        dangerouslySetInnerHTML={{
                            __html: contenidoSeguro,
                        }}
                    />
                )}

                {leccion.recursos.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                            Recursos
                        </p>

                        <div className="space-y-3">
                            {leccion.recursos.map(
                                (recurso) => (
                                    <RecursoViewer
                                        key={recurso.id}
                                        recurso={recurso}
                                    />
                                )
                            )}
                        </div>
                    </div>
                )}

                <LeccionCheckpointForm
                    leccionId={leccion.id}
                    cursoId={cursoId}
                    moduloId={moduloId}
                    linkPago={linkPago}
                    estaCompletada={estaCompletada}
                    siguienteLeccionId={
                        siguienteLeccionId
                    }
                    onNavigateSiguiente={
                        onNavigateSiguiente
                    }
                    onCompletada={(data) => {
                        if (
                            !estaCompletada &&
                            esUltimaLeccion
                        ) {
                            onModuloCompletado(
                                data.cursoCompletado
                            );
                        }
                    }}
                />
            </div>

            <aside
                className="
                    w-full
                    shrink-0
                    lg:sticky
                    lg:top-6
                    lg:w-80
                    lg:self-start
                    lg:max-h-[calc(100vh-100px)]
                    lg:overflow-y-auto
                "
            >
                <div className="space-y-4">
                    <LeccionesTimeline
                        moduloId={moduloId}
                    />

                    <ProgresoModulo
                        moduloId={moduloId}
                    />
                </div>
            </aside>
        </div>
    );
}