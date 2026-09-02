import { CheckCircle2, Circle } from "lucide-react";

import { MisCursoInscritoType, MisCursoModuloType } from "../Schema/CursoSchema";

interface MisCursoCardProps {
    curso: MisCursoInscritoType;
    onVerModulo?: (cursoId: string, modulo: MisCursoModuloType) => void;
}

export function MisCursoCard({ curso, onVerModulo }: MisCursoCardProps) {
    return (
        <article
            className="rounded-xl border border-border/60 bg-card p-5"
        >
            <div className="mb-3 flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                    {curso.categoria && (
                        <p className="text-xs font-medium text-primary">
                            {curso.categoria.nombre ?? ""}
                        </p>
                    )}
                    <h2 className="mt-1 line-clamp-2 text-base font-semibold leading-snug text-foreground">
                        {curso.nombre}
                    </h2>
                </div>
            </div>

            <div className="space-y-2">
                {curso.modulos.map((modulo) => (
                    <div
                        key={modulo.id}
                        onClick={() => onVerModulo?.(curso.id, modulo)}
                        className="flex cursor-pointer items-center gap-3 rounded-lg bg-muted/40 px-3 py-2 transition-colors hover:bg-muted/70"
                    >
                        <div className="shrink-0">
                            {modulo.estado === "completada" ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                                <Circle className="h-4 w-4 text-muted-foreground" />
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-medium text-foreground">
                                {modulo.nombre}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                                {modulo.numeroInscripcion}
                            </p>
                        </div>

                        <div className="shrink-0 text-right">
                            {/* <p className="text-xs font-semibold text-foreground">
                                {modulo.porcentajeAvance}%
                            </p> */}
                            <div className="mt-0.5 h-1 w-14 overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-primary transition-all duration-300"
                                    style={{ width: `${modulo.porcentajeAvance}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </article>
    );
}
