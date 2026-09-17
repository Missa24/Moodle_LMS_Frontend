import {
    BadgeCheck,
    EyeOff,
    Pencil,
    Trash2,
    ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type { ModuloType } from "../Schema/ModuloSchema";

interface ModuloItemProps {
    modulo: ModuloType;

    onVer?: (modulo: ModuloType) => void;
    onEditar?: (modulo: ModuloType) => void;
    onEliminar?: (modulo: ModuloType) => void;

    puedeEditar?: boolean;
    puedeEliminar?: boolean;
}

export function ModuloItem({
    modulo,
    onVer,
    onEditar,
    onEliminar,
    puedeEditar = false,
    puedeEliminar = false,
}: ModuloItemProps) {
    const mostrarAcciones =
        puedeEditar || puedeEliminar;

    return (
        <article
            onClick={() =>
                onVer?.(modulo)
            }
            className="group relative flex w-full min-w-0 max-w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-200 hover:border-primary/30 hover:bg-muted/20 hover:shadow-sm md:flex-row md:items-center md:gap-5 md:p-4"
        >
            {/* IMAGEN */}

            <div className="aspect-video w-full shrink-0 overflow-hidden bg-muted md:h-[90px] md:w-[130px] md:rounded-lg">
                {modulo.rutaImagen ? (
                    <img
                        src={
                            modulo.rutaImagen
                        }
                        alt={
                            modulo.nombre
                        }
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center px-4 text-center text-xs text-muted-foreground">
                        Sin imagen
                    </div>
                )}
            </div>

            {/* CONTENIDO */}

            <div className="min-w-0 flex-1 p-4 md:p-0">
                <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start">
                    <h3 className="min-w-0 flex-1 break-words text-base font-semibold leading-snug text-foreground sm:text-lg">
                        {modulo.nombre}
                    </h3>

                    <div className="flex flex-wrap gap-1.5">
                        {modulo.otorgaCertificacion && (
                            <span
                                title="Otorga certificación"
                                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary sm:text-xs"
                            >
                                <BadgeCheck className="size-3.5" />

                                Certifica
                            </span>
                        )}

                        {!modulo.estaPublicado && (
                            <span
                                title="No publicado"
                                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground sm:text-xs"
                            >
                                <EyeOff className="size-3.5" />

                                No publicado
                            </span>
                        )}
                    </div>
                </div>

                {modulo.fraseMotivacional && (
                    <p className="mt-2 line-clamp-1 break-words text-sm italic text-muted-foreground">
                        {
                            modulo.fraseMotivacional
                        }
                    </p>
                )}

                {modulo.descripcion && (
                    <p className="mt-2 line-clamp-2 max-w-3xl break-words text-sm leading-relaxed text-muted-foreground">
                        {
                            modulo.descripcion
                        }
                    </p>
                )}

                <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary">
                    Ver lecciones

                    <ChevronRight className="size-3.5 shrink-0" />
                </div>
            </div>

            {/* ACCIONES */}

            {mostrarAcciones && (
                <div
                    className="flex w-full shrink-0 items-center justify-end gap-1 border-t border-border/60 px-3 py-2 opacity-100 md:w-auto md:border-0 md:p-0 md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
                    onClick={(
                        event,
                    ) => {
                        event.stopPropagation();
                    }}
                >
                    {puedeEditar && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                onEditar?.(
                                    modulo,
                                )
                            }
                            className="size-9 shrink-0"
                            title="Editar módulo"
                            aria-label="Editar módulo"
                        >
                            <Pencil className="size-4" />
                        </Button>
                    )}

                    {puedeEliminar && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                onEliminar?.(
                                    modulo,
                                )
                            }
                            className="size-9 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            title="Dar de baja módulo"
                            aria-label="Dar de baja módulo"
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    )}
                </div>
            )}
        </article>
    );
}