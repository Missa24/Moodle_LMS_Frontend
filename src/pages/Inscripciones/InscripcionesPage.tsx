"use client";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { QueryState } from "@/components/common/QueryState";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { InscripcionColumns } from "@/features/Inscripciones/Components/inscripcion-columns";
import { DialogCursos } from "@/features/Inscripciones/Components/DialogCursos";
import { DialogEliminarInscripcion } from "@/features/Inscripciones/Components/DialogEliminarInscripcion";
import { DialogVerInscripcion } from "@/features/Inscripciones/Components/DialogVerInscripcion";
import { CrearInscripcionForm } from "@/features/Inscripciones/Components/crear_inscripcion_form";

import { useGetInscripciones } from "@/features/Inscripciones/Hook/InscripcionHook";
import type { InscripcionIndexType } from "@/features/Inscripciones/Schema/InscripcionSchema";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useModulePermissions } from "@/hooks/useModulePermissions";
import { PERMISSIONS } from "@/utils/constants";

type DialogActivo = "cursos" | "eliminar" | "ver" | "crear" | null;

export const InscripcionesPage = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [dialogActivo, setDialogActivo] = useState<DialogActivo>(null);
  const [inscripcionSeleccionada, setInscripcionSeleccionada] =
    useState<InscripcionIndexType | null>(null);

  const perPage = 10;
  const searchDebounced = useDebouncedValue(search, 500);

  const { puedeCrear, puedeEditar, puedeEliminar } =
    useModulePermissions(PERMISSIONS.INSCRIPCIONES);

  const { data, isLoading, isError, error } = useGetInscripciones(
    page,
    perPage,
    searchDebounced,
  );

  const abrirDialog = (
    tipo: Exclude<DialogActivo, "crear" | null>,
    inscripcion: InscripcionIndexType,
  ) => {
    setInscripcionSeleccionada(inscripcion);
    setDialogActivo(tipo);
  };

  const cerrarDialog = () => {
    setDialogActivo(null);
    setInscripcionSeleccionada(null);
  };

  const handleEdit = (inscripcion: InscripcionIndexType) => {
    navigate(`/panel/inscripciones/estudiante/${inscripcion.id}`, {
      state: {
        nombreCompleto: `${inscripcion.nombre} ${inscripcion.apellidoPaterno} ${inscripcion.apellidoMaterno}`,
      },
    });
  };

  const columns = useMemo(
    () =>
      InscripcionColumns({
        onView: (inscripcion) => abrirDialog("ver", inscripcion),
        onEdit: handleEdit,
        onViewCursos: (inscripcion) => abrirDialog("cursos", inscripcion),
        onDelete: (inscripcion) => abrirDialog("eliminar", inscripcion),
        canEdit: puedeEditar,
        canDelete: puedeEliminar,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [puedeEditar, puedeEliminar],
  );

  const inscripciones = data?.data ?? [];
  const totalPages = data?.meta.totalPages ?? 1;
  const currentPage = data?.meta.page ?? page;
  const totalInscripciones = data?.meta.total ?? 0;

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Inscripciones"
        subtitle="Gestiona las inscripciones de los estudiantes."
        action={
          puedeCrear ? (
            <Button type="button" onClick={() => setDialogActivo("crear")}>
              Crear inscripción
            </Button>
          ) : undefined
        }
      />

      <div className="relative w-62">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Buscar por nombre ..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="pl-9"
        />
      </div>

      <QueryState isLoading={isLoading} isError={isError} error={error}>
        <DataTable
          columns={columns}
          data={inscripciones}
          filterColumn="correo"
          filterPlaceholder="Buscar por correo ..."
          pageCount={totalPages}
          pageIndex={currentPage - 1}
          totalRows={totalInscripciones}
          onPaginationChange={(newPage) => setPage(newPage + 1)}
        />
      </QueryState>

      <DialogCursos
        open={dialogActivo === "cursos"}
        onOpenChange={(open) => !open && cerrarDialog()}
        initialData={inscripcionSeleccionada}
      />

      <DialogEliminarInscripcion
        open={dialogActivo === "eliminar"}
        onOpenChange={(open) => !open && cerrarDialog()}
        inscripcion={inscripcionSeleccionada}
      />

      <DialogVerInscripcion
        open={dialogActivo === "ver"}
        onOpenChange={(open) => !open && cerrarDialog()}
        inscripcion={inscripcionSeleccionada}
      />

      <Dialog
        open={dialogActivo === "crear"}
        onOpenChange={(open) => !open && cerrarDialog()}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-auto">
          <DialogHeader>
            <DialogTitle>Crear Inscripción</DialogTitle>
          </DialogHeader>

          <CrearInscripcionForm
            onSuccess={cerrarDialog}
            showHeader={false}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};