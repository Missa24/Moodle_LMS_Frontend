"use client";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/PageHeader";
import { QueryState } from "@/components/common/QueryState";

import { ModulosList } from "@/features/Modulo/Components/ModulosList";
import { ModulosToolbar } from "@/features/Modulo/Components/ModulosToolbar";
import { DialogModulo } from "@/features/Modulo/Components/DialogModulo";
import type { ModuloType } from "@/features/Modulo/Schema/ModuloSchema";

import { useCrudDialog } from "@/hooks/useCrudDialog";
import { useModulePermissions } from "@/hooks/useModulePermissions";
import { PERMISSIONS } from "@/utils/constants";

export default function ModulosPage() {
    const { id: cursoId } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [incluirNoPublicados, setIncluirNoPublicados] = useState(false);

    const dialog = useCrudDialog<ModuloType>();

    const { puedeCrear, puedeEditar, puedeEliminar } =
        useModulePermissions(PERMISSIONS.MODULOS);

    const limpiarFiltros = () => {
        setSearch("");
        setIncluirNoPublicados(false);
    };

    const verModulo = (modulo: ModuloType) => {
        navigate(`/panel/cursos/${cursoId}/modulos/${modulo.id}`);
    };

    return (
        <div className="space-y-6 p-6">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/panel/cursos/${cursoId}`)}
                className="gap-1 px-0"
            >
                <ArrowLeft className="h-4 w-4" />
                Volver al curso
            </Button>

            <PageHeader
                title="Módulos"
                subtitle="Módulos disponibles en este curso."
                action={
                    puedeCrear ? (
                        <Button type="button" onClick={dialog.openCreate}>
                            Nuevo módulo
                        </Button>
                    ) : undefined
                }
            />

            <QueryState
                isLoading={false}
                isError={!cursoId}
                fallbackMessage="Curso no especificado."
            >
                <>
                    <ModulosToolbar
                        search={search}
                        onSearchChange={setSearch}
                        onClear={limpiarFiltros}
                        incluirNoPublicados={puedeEditar ? incluirNoPublicados : undefined}
                        onIncluirNoPublicadosChange={
                            puedeEditar ? setIncluirNoPublicados : undefined
                        }
                    />

                    <ModulosList
                        cursoId={cursoId!}
                        search={search}
                        incluirNoPublicados={puedeEditar && incluirNoPublicados}
                        onVer={verModulo}
                        onEditar={dialog.openEdit}
                        puedeEditar={puedeEditar}
                        puedeEliminar={puedeEliminar}
                    />
                </>
            </QueryState>

            <DialogModulo
                open={dialog.open}
                onOpenChange={dialog.setOpen}
                mode={dialog.mode}
                cursoId={cursoId!}
                moduloId={dialog.selected?.id}
            />
        </div>
    );
}