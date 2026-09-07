import { useState, useEffect } from "react";
import { QueryState } from "@/components/common/QueryState";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppTitle } from "@/components/common/Apptittle";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Search } from "lucide-react";

import { InscripcionColumns } from "@/features/Inscripciones/Components/inscripcion-columns";
import { DialogCursos } from "@/features/Inscripciones/Components/DialogCursos";
import { DialogEliminarInscripcion } from "@/features/Inscripciones/Components/DialogEliminarInscripcion";
import { DialogVerInscripcion } from "@/features/Inscripciones/Components/DialogVerInscripcion";
import { CrearInscripcionForm } from "@/features/Inscripciones/Components/crear_inscripcion_form";

import {
  useGetInscripciones,
} from "@/features/Inscripciones/Hook/InscripcionHook";

import {
  InscripcionIndexType,
} from "@/features/Inscripciones/Schema/InscripcionSchema";

import { usePermission } from "@/hooks/usePermission";
import { useNavigate } from "react-router-dom";
import { PERMISSIONS } from "@/utils/constants";

export const InscripcionesPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchDebounced, setSearchDebounced] =
    useState("");

  const perPage = 10;

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetInscripciones(
    page,
    perPage,
    searchDebounced
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounced(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const navigate = useNavigate();

  const [
    openDialogCursos,
    setOpenDialogCursos,
  ] = useState(false);

  const [
    openDialogEliminar,
    setOpenDialogEliminar,
  ] = useState(false);

  const [
    openDialogCrear,
    setOpenDialogCrear,
  ] = useState(false);

  const [
    openDialogVer,
    setOpenDialogVer,
  ] = useState(false);

  const [
    inscripcionSeleccionada,
    setInscripcionSeleccionada,
  ] = useState<InscripcionIndexType | null>(
    null
  );

  const { can } = usePermission();

  const puedeCrear = can(
    PERMISSIONS.INSCRIPCIONES.CREAR
  );

  const puedeEditar = can(
    PERMISSIONS.INSCRIPCIONES.EDITAR
  );

  const puedeEliminar = can(
    PERMISSIONS.INSCRIPCIONES.ELIMINAR
  );

  const handleViewCursos = (
    inscripcion: InscripcionIndexType
  ) => {
    setInscripcionSeleccionada(
      inscripcion
    );
    setOpenDialogCursos(true);
  };

  const handleView = (
    inscripcion: InscripcionIndexType
  ) => {
    setInscripcionSeleccionada(
      inscripcion
    );
    setOpenDialogVer(true);
  };

  const handleEdit = (
    inscripcion: InscripcionIndexType
  ) => {
    navigate(
      `/panel/inscripciones/estudiante/${inscripcion.id}`,
      {
        state: {
          nombreCompleto: `${inscripcion.nombre} ${inscripcion.apellidoPaterno} ${inscripcion.apellidoMaterno}`,
        },
      }
    );
  };

  const handleDelete = (
    inscripcion: InscripcionIndexType
  ) => {
    setInscripcionSeleccionada(
      inscripcion
    );
    setOpenDialogEliminar(true);
  };

  const columns = InscripcionColumns({
    onView: handleView,
    onEdit: handleEdit,
    onViewCursos: handleViewCursos,
    onDelete: handleDelete,
    canEdit: puedeEditar,
    canDelete: puedeEliminar,
  });

  const inscripciones =
    data?.data ?? [];

  const totalPages =
    data?.meta.totalPages ?? 1;

  const currentPage =
    data?.meta.page ?? page;

  const totalInscripciones =
    data?.meta.total ?? 0;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-start justify-between gap-4">
        <AppTitle
          title="Inscripciones"
          subtitle="Gestiona las inscripciones de los estudiantes."
        />

        {puedeCrear && (
          <Button
            type="button"
            onClick={() =>
              setOpenDialogCrear(true)
            }
          >
            Crear inscripción
          </Button>
        )}
      </div>

      <div className="relative w-62">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Buscar por nombre ..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="pl-9"
        />
      </div>

      <QueryState
        isLoading={isLoading}
        isError={isError}
        error={error}
      >
        <DataTable
          columns={columns}
          data={inscripciones}
          filterColumn="correo"
          filterPlaceholder="Buscar por correo ..."
          pageCount={totalPages}
          pageIndex={currentPage - 1}
          totalRows={totalInscripciones}
          onPaginationChange={(newPage) =>
            setPage(newPage + 1)
          }
        />
      </QueryState>

      <DialogCursos
        open={openDialogCursos}
        onOpenChange={
          setOpenDialogCursos
        }
        initialData={
          inscripcionSeleccionada
        }
      />

      <DialogEliminarInscripcion
        open={openDialogEliminar}
        onOpenChange={
          setOpenDialogEliminar
        }
        inscripcion={
          inscripcionSeleccionada
        }
      />

      <DialogVerInscripcion
        open={openDialogVer}
        onOpenChange={setOpenDialogVer}
        inscripcion={
          inscripcionSeleccionada
        }
      />

      <Dialog
        open={openDialogCrear}
        onOpenChange={
          setOpenDialogCrear
        }
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              Crear Inscripción
            </DialogTitle>
          </DialogHeader>

          <CrearInscripcionForm
            onSuccess={() =>
              setOpenDialogCrear(false)
            }
            showHeader={false}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};