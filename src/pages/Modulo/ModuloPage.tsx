import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AppTitle } from "@/components/common/Apptittle";
import { QueryState } from "@/components/common/QueryState";

import { ModulosList } from "@/features/Modulo/Components/ModulosList";
import { ModulosToolbar } from "@/features/Modulo/Components/ModulosToolbar";
import { DialogModulo } from "@/features/Modulo/Components/DialogModulo";
import { ModuloType } from "@/features/Modulo/Schema/ModuloSchema";

import { usePermission } from "@/hooks/usePermission";
import { PERMISSIONS } from "@/utils/constants";

export default function ModulosPage() {
    const { id: cursoId } =
        useParams<{ id: string }>();

    const navigate = useNavigate();

    const [search, setSearch] =
        useState("");

    const [
        incluirNoPublicados,
        setIncluirNoPublicados,
    ] = useState(false);

    const [open, setOpen] =
        useState(false);

    const [mode, setMode] =
        useState<"create" | "edit">(
            "create"
        );

    const [
        moduloIdSeleccionado,
        setModuloIdSeleccionado,
    ] = useState<string | undefined>(
        undefined
    );

    const { can } = usePermission();

    const puedeCrear = can(
        PERMISSIONS.MODULOS.CREAR
    );

    const puedeEditar = can(
        PERMISSIONS.MODULOS.EDITAR
    );

    const puedeEliminar = can(
        PERMISSIONS.MODULOS.ELIMINAR
    );

    const limpiarFiltros = () => {
        setSearch("");
        setIncluirNoPublicados(false);
    };

    const abrirCrear = () => {
        setModuloIdSeleccionado(undefined);
        setMode("create");
        setOpen(true);
    };

    const abrirEditar = (
        modulo: ModuloType
    ) => {
        setModuloIdSeleccionado(modulo.id);
        setMode("edit");
        setOpen(true);
    };

    const verModulo = (
        modulo: ModuloType
    ) => {
        navigate(
            `/panel/cursos/${cursoId}/modulos/${modulo.id}`
        );
    };

    return (
        <div className="space-y-6 p-6">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                    navigate(
                        `/panel/cursos/${cursoId}`
                    )
                }
                className="gap-1 px-0"
            >
                <ArrowLeft className="h-4 w-4" />
                Volver al curso
            </Button>

            <QueryState
                isLoading={false}
                isError={!cursoId}
                fallbackMessage="Curso no especificado."
            >
                <div className="flex items-start justify-between gap-4">
                    <AppTitle
                        title="Módulos"
                        subtitle="Módulos disponibles en este curso."
                    />

                    {puedeCrear && (
                        <Button
                            type="button"
                            onClick={abrirCrear}
                        >
                            Nuevo módulo
                        </Button>
                    )}
                </div>

                <ModulosToolbar
                    search={search}
                    onSearchChange={setSearch}
                    onClear={limpiarFiltros}
                    incluirNoPublicados={
                        puedeEditar
                            ? incluirNoPublicados
                            : undefined
                    }
                    onIncluirNoPublicadosChange={
                        puedeEditar
                            ? setIncluirNoPublicados
                            : undefined
                    }
                />

                <ModulosList
                    cursoId={cursoId!}
                    search={search}
                    incluirNoPublicados={
                        incluirNoPublicados
                    }
                    onVer={verModulo}
                    onEditar={abrirEditar}
                    puedeEditar={puedeEditar}
                    puedeEliminar={puedeEliminar}
                />
            </QueryState>

            <DialogModulo
                open={open}
                onOpenChange={setOpen}
                mode={mode}
                cursoId={cursoId!}
                moduloId={
                    moduloIdSeleccionado
                }
            />
        </div>
    );
}
