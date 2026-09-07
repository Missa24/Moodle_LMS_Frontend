import { useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppTitle } from "@/components/common/Apptittle";
import { QueryState } from "@/components/common/QueryState";

import {
  useEliminarCurso,
  useEliminarModulo,
  useGetInscripcionesPorEstudiante,
} from "@/features/Inscripciones/Hook/InscripcionHook";

import { CursoType } from "@/features/Inscripciones/Schema/InscripcionSchema";

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

export default function EditarInscripcionPage() {
  const { estudianteId } =
    useParams<{ estudianteId: string }>();

  const navigate = useNavigate();
  const location = useLocation();

  const state =
    location.state as LocationState | null;

  const nombreCompleto =
    state?.nombreCompleto ?? "";

  const {
    data: cursosInscritos = [],
    isLoading,
    isError,
    error,
  } = useGetInscripcionesPorEstudiante(
    estudianteId ?? ""
  );

  const eliminarModuloMutation =
    useEliminarModulo();

  const eliminarCursoMutation =
    useEliminarCurso();

  const [
    moduloAEliminar,
    setModuloAEliminar,
  ] = useState<ModuloAEliminar | null>(null);

  const [
    cursoAEliminar,
    setCursoAEliminar,
  ] = useState<CursoAEliminar | null>(null);

  const cursosInscritosIds =
    cursosInscritos.map(
      (curso: CursoType) => curso.id
    );

  const handleEliminarModulo = (
    modulo: ModuloAEliminar
  ) => {
    setModuloAEliminar(modulo);
  };

  const handleConfirmEliminarModulo = () => {
    if (!moduloAEliminar) {
      return;
    }

    eliminarModuloMutation.mutate(
      {
        inscripcionId:
          moduloAEliminar.inscripcionId,
        cursoId:
          moduloAEliminar.cursoId,
        moduloId:
          moduloAEliminar.moduloId,
      },
      {
        onSuccess: () => {
          setModuloAEliminar(null);
        },
      }
    );
  };

  const handleConfirmEliminarCurso = () => {
    if (
      !cursoAEliminar ||
      !estudianteId
    ) {
      return;
    }

    eliminarCursoMutation.mutate(
      {
        estudianteId,
        cursoId:
          cursoAEliminar.id,
      },
      {
        onSuccess: () => {
          setCursoAEliminar(null);
        },
      }
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            navigate(
              "/panel/inscripciones"
            )
          }
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
        isError={isError}
        error={error}
      >
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-4 w-4 text-primary" />
                Cursos inscritos

                <span className="text-muted-foreground">
                  (
                  {
                    cursosInscritos.length
                  }
                  )
                </span>
              </CardTitle>

              {nombreCompleto && (
                <p className="text-sm text-muted-foreground">
                  Estudiante:{" "}
                  <span className="font-medium text-foreground">
                    {
                      nombreCompleto
                    }
                  </span>
                </p>
              )}
            </CardHeader>

            <CardContent>
              {cursosInscritos.length ===
                0 ? (
                <div className="rounded-lg border border-dashed py-8 text-center">
                  <BookOpen className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />

                  <p className="text-sm font-medium">
                    No tiene cursos
                    inscritos
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Puedes agregar un
                    curso desde la
                    sección inferior.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cursosInscritos.map(
                    (
                      curso: CursoType
                    ) => (
                      <CursoInscritoCard
                        key={
                          curso.id
                        }
                        curso={
                          curso
                        }
                        onEliminarCurso={
                          setCursoAEliminar
                        }
                        onEliminarModulo={
                          handleEliminarModulo
                        }
                      />
                    )
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {estudianteId && (
            <AgregarCursoForm
              estudianteId={
                estudianteId
              }
              cursosInscritosIds={
                cursosInscritosIds
              }
            />
          )}
        </div>
      </QueryState>

      <DialogConfirmarEliminarModulo
        open={
          !!moduloAEliminar
        }
        onOpenChange={(open) => {
          if (!open) {
            setModuloAEliminar(
              null
            );
          }
        }}
        cursoNombre={
          moduloAEliminar?.cursoNombre ??
          ""
        }
        moduloNombre={
          moduloAEliminar?.moduloNombre ??
          ""
        }
        onConfirm={
          handleConfirmEliminarModulo
        }
        isPending={
          eliminarModuloMutation.isPending
        }
      />

      <DialogConfirmarEliminarModulo
        open={
          !!cursoAEliminar
        }
        onOpenChange={(open) => {
          if (!open) {
            setCursoAEliminar(
              null
            );
          }
        }}
        cursoNombre={
          cursoAEliminar?.nombre ??
          ""
        }
        moduloNombre="todos sus módulos"
        onConfirm={
          handleConfirmEliminarCurso
        }
        isPending={
          eliminarCursoMutation.isPending
        }
      />
    </div>
  );
}