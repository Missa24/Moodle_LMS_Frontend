"use client";

import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppTitle } from "@/components/common/Apptittle";
import { QueryState } from "@/components/common/QueryState";

import {
  useEliminarCurso,
  useEliminarModulo,
  useGetInscripcionesPorEstudiante,
} from "@/features/Inscripciones/Hook/InscripcionHook";

import type { CursoType } from "@/features/Inscripciones/Schema/InscripcionSchema";

import { CursoInscritoCard } from "@/features/Inscripciones/Components/CursoInscritoCard";
import { AgregarCursoForm } from "@/features/Inscripciones/Components/AgregarCursoForm";
import { DialogConfirmarEliminarModulo } from "@/features/Inscripciones/Components/DialogConfirmarEliminarModulo";

interface ModuloAEliminar {
  inscripcionId: string;
  cursoId: string;
  cursoNombre: string;
  moduloId: string;
  moduloNombre: string;
}

interface CursoAEliminar {
  id: string;
  nombre: string;
}

interface LocationState {
  nombreCompleto?: string;
}

type EliminacionSeleccionada =
  | { tipo: "modulo"; data: ModuloAEliminar }
  | { tipo: "curso"; data: CursoAEliminar }
  | null;

export default function EditarInscripcionPage() {
  const { estudianteId } = useParams<{ estudianteId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const nombreCompleto = (location.state as LocationState | null)?.nombreCompleto ?? "";

  const {
    data: cursosInscritos = [],
    isLoading,
    isError,
    error,
  } = useGetInscripcionesPorEstudiante(estudianteId ?? "");

  const eliminarModulo = useEliminarModulo();
  const eliminarCurso = useEliminarCurso();

  const [eliminacion, setEliminacion] = useState<EliminacionSeleccionada>(null);

  const cursosInscritosIds = cursosInscritos.map((curso: CursoType) => curso.id);

  const moduloAEliminar =
    eliminacion?.tipo === "modulo" ? eliminacion.data : null;

  const cursoAEliminar =
    eliminacion?.tipo === "curso" ? eliminacion.data : null;

  const handleConfirmEliminar = () => {
    if (!eliminacion) return;

    if (eliminacion.tipo === "modulo") {
      const modulo = eliminacion.data;

      eliminarModulo.mutate(
        {
          inscripcionId: modulo.inscripcionId,
          cursoId: modulo.cursoId,
          moduloId: modulo.moduloId,
        },
        {
          onSuccess: () => setEliminacion(null),
        },
      );

      return;
    }

    if (!estudianteId) return;

    eliminarCurso.mutate(
      {
        estudianteId,
        cursoId: eliminacion.data.id,
      },
      {
        onSuccess: () => setEliminacion(null),
      },
    );
  };

  const isPending =
    eliminacion?.tipo === "modulo"
      ? eliminarModulo.isPending
      : eliminarCurso.isPending;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/panel/inscripciones")}
          className="cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <AppTitle
          title="Editar inscripción"
          subtitle="Gestiona los cursos y módulos del estudiante."
        />
      </div>

      <QueryState
        isLoading={isLoading}
        isError={isError || !estudianteId}
        error={error}
        fallbackMessage="No se pudo cargar la inscripción."
      >
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-4 w-4 text-primary" />

                Cursos inscritos

                <span className="text-muted-foreground">
                  ({cursosInscritos.length})
                </span>
              </CardTitle>

              {nombreCompleto && (
                <p className="text-sm text-muted-foreground">
                  Estudiante:{" "}
                  <span className="font-medium text-foreground">
                    {nombreCompleto}
                  </span>
                </p>
              )}
            </CardHeader>

            <CardContent>
              {cursosInscritos.length === 0 ? (
                <div className="rounded-lg border border-dashed py-8 text-center">
                  <BookOpen className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />

                  <p className="text-sm font-medium">
                    No tiene cursos inscritos
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Puedes agregar un curso desde la sección inferior.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cursosInscritos.map((curso: CursoType) => (
                    <CursoInscritoCard
                      key={curso.id}
                      curso={curso}
                      onEliminarCurso={(curso) =>
                        setEliminacion({ tipo: "curso", data: curso, })
                      }
                      onEliminarModulo={(modulo) =>
                        setEliminacion({ tipo: "modulo", data: modulo, })
                      }
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {estudianteId && (
            <AgregarCursoForm
              estudianteId={estudianteId}
              cursosInscritosIds={cursosInscritosIds}
            />
          )}
        </div>
      </QueryState>

      <DialogConfirmarEliminarModulo
        open={!!eliminacion}
        onOpenChange={(open) => {
          if (!open) setEliminacion(null);
        }}
        cursoNombre={moduloAEliminar?.cursoNombre ?? cursoAEliminar?.nombre ?? ""}
        moduloNombre={moduloAEliminar?.moduloNombre ?? "todos sus módulos"}
        onConfirm={handleConfirmEliminar}
        isPending={isPending}
      />
    </div>
  );
}