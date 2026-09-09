"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/PageHeader";

import { CursosList } from "@/features/Curso/Components/CursosList";
import { CursosToolbar } from "@/features/Curso/Components/CursosToolbar";
import { DialogCurso } from "@/features/Curso/Components/DialogCurso";

import type { CursoType } from "@/features/Curso/Schema/CursoSchema";

import { useCrudDialog } from "@/hooks/useCrudDialog";
import { useModulePermissions } from "@/hooks/useModulePermissions";
import { PERMISSIONS } from "@/utils/constants";

export default function CursosPage() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [categoria, setCategoria] = useState("");

    const dialog = useCrudDialog<CursoType>();

    const { puedeCrear, puedeEditar, puedeEliminar } =
        useModulePermissions(PERMISSIONS.CURSOS);

    const limpiarFiltros = () => {
        setSearch("");
        setCategoria("");
    };

    const verCurso = (curso: CursoType) => {
        navigate(`/panel/cursos/${curso.id}`);
    };

    return (
        <div className="space-y-6 p-6">
            <PageHeader
                title="Cursos"
                subtitle="Explora y administra los cursos disponibles."
                action={
                    puedeCrear ? (
                        <Button type="button" onClick={dialog.openCreate}>
                            Nuevo curso
                        </Button>
                    ) : undefined
                }
            />

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
                onEditar={dialog.openEdit}
                puedeEditar={puedeEditar}
                puedeEliminar={puedeEliminar}
            />

            <DialogCurso
                open={dialog.open}
                onOpenChange={dialog.setOpen}
                mode={dialog.mode}
                initialData={dialog.selected}
            />
        </div>
    );
}