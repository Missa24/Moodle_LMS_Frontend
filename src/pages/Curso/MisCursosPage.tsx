"use client";

import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { QueryState } from "@/components/common/QueryState";
import { MascotNoEncontrado } from "@/components/common/mascots";
import { Banner } from "@/components/common/Banner";

import { MisCursoCard } from "@/features/Curso/Components/MisCursoCard";
import { useGetMisCursosInscritos } from "@/features/Curso/Hook/CursoHook";
import type { MisCursoModuloType } from "@/features/Curso/Schema/CursoSchema";

import { useAuthStore } from "@/store/authStore";

export default function MisCursosPage() {
  const navigate = useNavigate();
  const { usuario } = useAuthStore();

  const { data: cursos, isLoading, isError, error } =
    useGetMisCursosInscritos(usuario?.id ?? "");

  const verModulo = (cursoId: string, modulo: MisCursoModuloType) => {
    navigate(`/panel/cursos/${cursoId}/modulos/${modulo.id}`, {
      state: { from: "mis-cursos" },
    });
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

      <PageHeader
        title="Mis Cursos"
        subtitle="Cursos en los que estás inscrito."
      />

      <QueryState
        isLoading={isLoading}
        isError={isError}
        error={error}
        fallbackMessage="No se pudieron cargar tus cursos."
      >
        {cursos?.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 rounded-xl border bg-muted/20 p-6 text-center">
            <MascotNoEncontrado className="h-32 w-auto" />

            <p className="text-sm font-medium">
              No estás inscrito en ningún curso
            </p>

            <p className="text-xs text-muted-foreground">
              Explora nuestro catálogo para encontrar nuevas formaciones.
            </p>
          </div>
        )}

        {!!cursos?.length && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cursos.map((curso) => (
              <MisCursoCard
                key={curso.id}
                curso={curso}
                onVerModulo={verModulo}
              />
            ))}
          </div>
        )}
      </QueryState>
    </div>
  );
}