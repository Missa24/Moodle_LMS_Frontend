import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { AppTitle } from "@/components/common/Apptittle";

import { CursosList } from "@/features/Curso/Components/CursosList";
import { CursosToolbar } from "@/features/Curso/Components/CursosToolbar";
import { DialogCurso } from "@/features/Curso/Components/DialogCurso";

import { CursoType } from "@/features/Curso/Schema/CursoSchema";

import { usePermission } from "@/hooks/usePermission";
import { PERMISSIONS } from "@/utils/constants";

export default function CursosPage() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [categoria, setCategoria] = useState("");

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [cursoSeleccionado, setCursoSeleccionado] = useState<CursoType | undefined>(undefined);

    const { can } = usePermission();

    const puedeCrear = can(PERMISSIONS.CURSOS.CREAR);
    const puedeEditar = can(PERMISSIONS.CURSOS.EDITAR);
    const puedeEliminar = can(PERMISSIONS.CURSOS.ELIMINAR);

    const limpiarFiltros = () => {
        setSearch("");
        setCategoria("");
    };

    const abrirCrear = () => {
        setCursoSeleccionado(undefined);
        setMode("create");
        setOpen(true);
    };

    const abrirEditar = (curso: CursoType) => {
        setCursoSeleccionado(curso);
        setMode("edit");
        setOpen(true);
    };

    const verCurso = (curso: CursoType) => {
        navigate(`/panel/cursos/${curso.id}`);
    };

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-start justify-between gap-4">
                <AppTitle title="Cursos" subtitle="Explora y administra los cursos disponibles." />

                {puedeCrear && (
                    <Button type="button" onClick={abrirCrear}>
                        Nuevo curso
                    </Button>
                )}
            </div>

            <CursosToolbar
                search={search}
                categoria={categoria}
                onSearchChange={setSearch}
                onCategoriaChange={setCategoria}
                onClear={limpiarFiltros}
            />

            <CursosList
                search={search}
                categoria={categoria}
                onVer={verCurso}
                onEditar={abrirEditar}
                puedeEditar={puedeEditar}
                puedeEliminar={puedeEliminar}
            />

            <DialogCurso open={open} onOpenChange={setOpen} mode={mode} initialData={cursoSeleccionado} />
        </div>
    );
}