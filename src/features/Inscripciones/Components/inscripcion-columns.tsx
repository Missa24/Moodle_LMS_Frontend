import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { InscripcionIndexType } from "../Schema/InscripcionSchema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface InscripcionColumnsProps {
  onDelete: (inscripcion: InscripcionIndexType) => void;
  onView: (inscripcion: InscripcionIndexType) => void;
  onEdit: (inscripcion: InscripcionIndexType) => void;
  onViewCursos: (inscripcion: InscripcionIndexType) => void;
  canEdit: boolean;
  canDelete: boolean;
}

export function InscripcionColumns({
  onDelete,
  onView,
  onEdit,
  onViewCursos,
  canDelete,
  canEdit,
}: InscripcionColumnsProps): ColumnDef<InscripcionIndexType>[] {
  return [
    {
      id: "id",
      header: "Estudiante",
      cell: ({ row }) => {
        const inscripcion = row.original;
        const nombreCompleto = `${inscripcion.nombre} ${inscripcion.apellidoPaterno} ${inscripcion.apellidoMaterno}`;
        return (
          <div>
            {nombreCompleto}
          </div>
        );
      }
    },

    {
      accessorKey: "correo",
      header: "Correo",
    },

    {
      id: "cursos",
      header: "Cursos inscritos",
      cell: ({ row }) => {
        const inscripcion = row.original;
        const cantidadCursos = inscripcion.cursos.length;
        return (
          <div className="flex items-center gap-2">
            {cantidadCursos} {cantidadCursos === 1 ? "curso" : "cursos"}
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer"
              onClick={() => onViewCursos(row.original)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },

    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => {
        const estado = row.original.estado.toLowerCase();

        return (
          <Badge
            variant={
              estado === "activo"
                ? "default"
                : estado === "pendiente"
                  ? "secondary"
                  : "destructive"
            }
          >
            {row.original.estado}
          </Badge>
        );
      },
    },

    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(row.original)}>
              Ver
            </DropdownMenuItem>
            {canEdit && (
              <DropdownMenuItem onClick={() => onEdit(row.original)}>
                Editar
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => onViewCursos(row.original)}>
              Ver cursos
            </DropdownMenuItem>
            {canDelete && (
              <DropdownMenuItem onClick={() => onDelete(row.original)}>
                Eliminar
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  ];
}
