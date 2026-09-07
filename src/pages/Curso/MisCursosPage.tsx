import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";

import { AppTitle } from "@/components/common/Apptittle";
import { QueryState } from "@/components/common/QueryState";
import { MascotNoEncontrado } from "@/components/common/mascots";

import { MisCursoCard } from "@/features/Curso/Components/MisCursoCard";
import { useGetMisCursosInscritos } from "@/features/Curso/Hook/CursoHook";
import { MisCursoModuloType } from "@/features/Curso/Schema/CursoSchema";

import { useAuthStore } from "@/store/authStore";
import { Banner } from "@/components/common/Banner";

export default function MisCursosPage() {
  const navigate = useNavigate();
  const { usuario } = useAuthStore();

  const {
    data: cursos,
    isLoading,
    isError,
    error,
  } = useGetMisCursosInscritos(
    usuario?.id ?? ""
  );

  const verModulo = (
    cursoId: string,
    _modulo: MisCursoModuloType
  ) => {
    navigate(
      `/panel/cursos/${cursoId}/modulos/${_modulo.id}`,
      {
        state: {
          from: "mis-cursos",
        },
      }
    );
  };

  return (
    <div className="space-y-6 p-6">
      <Banner
        title="Cursos que te puedan interesar"
        description="Explora nuestro catálogo de cursos y encuentra nuevas oportunidades de aprendizaje."
        icon={<GraduationCap />}
        ctaLabel="Ver Cursos"
        ctaTo="/cursos"
      />

      <div className="flex items-start justify-between gap-4">
        <AppTitle
          title="Mis Cursos"
          subtitle="Cursos en los que estás inscrito."
        />
      </div>

      <QueryState
        isLoading={isLoading}
        isError={isError}
        error={error}
        fallbackMessage="No se pudieron cargar tus cursos."
      >
        {cursos &&
          cursos.length === 0 && (
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 rounded-xl border bg-muted/20 p-6 text-center">
              <MascotNoEncontrado className="h-32 w-auto" />

              <p className="text-sm font-medium">
                No estás inscrito en ningún
                curso
              </p>

              <p className="text-xs text-muted-foreground">
                Contacta a un administrador
                para inscribirte.
              </p>
            </div>
          )}

        {cursos &&
          cursos.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cursos.map((curso) => (
                <MisCursoCard
                  key={curso.id}
                  curso={curso}
                  onVerModulo={
                    verModulo
                  }
                />
              ))}
            </div>
          )}
      </QueryState>
    </div>
  );
}
