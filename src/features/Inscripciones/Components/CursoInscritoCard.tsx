import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart3,
    BookOpen,
    Calendar,
    Layers,
    Trash2,
} from "lucide-react";
import { CursoType, ModuloType } from "../Schema/InscripcionSchema";
import { formatearMoneda } from "@/utils/formatCurrency";

interface CursoInscritoCardProps {
    curso: CursoType;
    onEliminarCurso: (curso: { id: string; nombre: string }) => void;
    onEliminarModulo: (data: {
        inscripcionId: string;
        cursoId: string;
        cursoNombre: string;
        moduloId: string;
        moduloNombre: string;
    }) => void;
}

export function CursoInscritoCard({
    curso,
    onEliminarCurso,
    onEliminarModulo,
}: CursoInscritoCardProps) {
    const modulosOrdenados = [...curso.modulos].sort(
        (a, b) => a.orden - b.orden,
    );

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <BookOpen className="h-4 w-4 shrink-0 text-primary" />
                            <span className="truncate">{curso.nombre}</span>
                        </CardTitle>

                        <p className="mt-1 text-xs text-muted-foreground">
                            {curso.categoria.nombre}
                        </p>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="shrink-0 cursor-pointer text-destructive hover:text-destructive"
                        onClick={() =>
                            onEliminarCurso({
                                id: curso.id,
                                nombre: curso.nombre,
                            })
                        }
                    >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Eliminar curso
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-2">
                    <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                        <Layers className="h-3.5 w-3.5" />
                        Módulos ({curso.modulos.length})
                    </div>

                    <div className="space-y-2">
                        {modulosOrdenados.map((modulo) => (
                            <ModuloInscritoItem
                                key={modulo.id}
                                modulo={modulo}
                                cursoId={curso.id}
                                cursoNombre={curso.nombre}
                                onEliminar={onEliminarModulo}
                            />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

interface ModuloInscritoItemProps {
    modulo: ModuloType;
    cursoId: string;
    cursoNombre: string;
    onEliminar: (data: {
        inscripcionId: string;
        cursoId: string;
        cursoNombre: string;
        moduloId: string;
        moduloNombre: string;
    }) => void;
}

function ModuloInscritoItem({
    modulo,
    cursoId,
    cursoNombre,
    onEliminar,
}: ModuloInscritoItemProps) {
    const inscripcion = modulo.inscripcion;

    return (
        <div className="flex items-center justify-between gap-4 rounded-lg border bg-muted/20 p-3">
            <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">Módulo {modulo.orden}</Badge>

                    <span className="text-sm font-medium">
                        {modulo.nombre}
                    </span>
                </div>

                {inscripcion && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(
                                inscripcion.fechaInscripcion,
                            ).toLocaleDateString()}
                        </span>

                        <span className="flex items-center gap-1">
                            <BarChart3 className="h-3 w-3" />
                            {inscripcion.porcentajeAvance}% avance
                        </span>

                        <span className="flex items-center gap-1 font-medium text-foreground">
                            {formatearMoneda(inscripcion.monto)}
                        </span>

                        <Badge
                            variant={
                                inscripcion.estadoAcceso === "habilitado"
                                    ? "default"
                                    : "secondary"
                            }
                        >
                            {inscripcion.estadoAcceso}
                        </Badge>
                    </div>
                )}
            </div>

            {inscripcion && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 cursor-pointer hover:text-destructive"
                    onClick={() =>
                        onEliminar({
                            inscripcionId: inscripcion.id,
                            cursoId,
                            cursoNombre,
                            moduloId: modulo.id,
                            moduloNombre: modulo.nombre,
                        })
                    }
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}
