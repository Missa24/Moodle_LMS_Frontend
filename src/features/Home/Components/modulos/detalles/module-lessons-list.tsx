import {
    BookOpen,
    LockKeyhole,
} from "lucide-react";
import { Leccion } from "./service";


type ModuleLessonsListProps = {
    lecciones: Leccion[];
    isLoading: boolean;
    isError: boolean;
    onLessonClick: (nombre: string) => void;
};

export const ModuleLessonsList = ({
    lecciones,
    isLoading,
    isError,
    onLessonClick,
}: ModuleLessonsListProps) => {
    return (
        <section className="mt-10 sm:mt-12">
            <div className="flex items-end justify-between gap-5">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
                        Contenido
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-foreground sm:text-3xl">
                        Lecciones del módulo
                    </h2>
                </div>

                {!isLoading && !isError && (
                    <span className="hidden text-sm text-muted-foreground sm:block">
                        {lecciones.length}{" "}
                        {lecciones.length === 1
                            ? "lección"
                            : "lecciones"}
                    </span>
                )}
            </div>

            <div className="mt-6">
                {isLoading ? (
                    <div className="space-y-3">
                        {Array.from({
                            length: 5,
                        }).map((_, index) => (
                            <div
                                key={index}
                                className="h-[82px] animate-pulse rounded-2xl bg-muted"
                            />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="rounded-2xl border border-border bg-card p-6">
                        <p className="text-sm text-muted-foreground">
                            No pudimos cargar las lecciones.
                        </p>
                    </div>
                ) : lecciones.length === 0 ? (
                    <div className="rounded-2xl border border-border bg-card px-6 py-12 text-center">
                        <BookOpen className="mx-auto size-8 text-muted-foreground/40" />

                        <p className="mt-3 text-sm text-muted-foreground">
                            Este módulo todavía no tiene lecciones publicadas.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-border bg-card">
                        {lecciones.map((leccion) => (
                            <button
                                key={leccion.id}
                                type="button"
                                onClick={() =>
                                    onLessonClick(
                                        leccion.nombre
                                    )
                                }
                                className="group flex w-full items-center gap-4 border-b border-border px-4 py-4 text-left transition-colors last:border-b-0 hover:bg-secondary/40 sm:px-5 sm:py-5"
                            >
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-muted-foreground sm:size-11">
                                    {String(
                                        leccion.orden
                                    ).padStart(
                                        2,
                                        "0"
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold leading-snug text-foreground sm:text-base">
                                        {leccion.nombre}
                                    </p>

                                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:text-xs">
                                        <span>
                                            {leccion.tipoLeccion}
                                        </span>

                                        {leccion.recursos.length > 0 && (
                                            <>
                                                <span>
                                                    ·
                                                </span>

                                                <span>
                                                    {
                                                        leccion
                                                            .recursos
                                                            .length
                                                    }{" "}
                                                    {leccion.recursos
                                                        .length === 1
                                                        ? "recurso"
                                                        : "recursos"}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                                    <LockKeyhole className="size-4" />
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};