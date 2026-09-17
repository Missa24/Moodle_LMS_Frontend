import { useState } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AppTitle } from "@/components/common/Apptittle";
import { PageHeader } from "@/components/common/PageHeader";
import { QueryState } from "@/components/common/QueryState";

import { useGetCurso } from "@/features/Curso/Hook/CursoHook";

import { ModulosList } from "@/features/Modulo/Components/ModulosList";
import { ModulosToolbar } from "@/features/Modulo/Components/ModulosToolbar";
import { DialogModulo } from "@/features/Modulo/Components/DialogModulo";
import type { ModuloType } from "@/features/Modulo/Schema/ModuloSchema";

import { useCrudDialog } from "@/hooks/useCrudDialog";
import { useModulePermissions } from "@/hooks/useModulePermissions";
import { PERMISSIONS } from "@/utils/constants";

export default function CursoDetallePage() {
    const { id } = useParams<{
        id: string;
    }>();

    const navigate =
        useNavigate();

    const location =
        useLocation();

    const from =
        (
            location.state as {
                from?: string;
            }
        )?.from ?? "cursos";

    const [
        searchModulos,
        setSearchModulos,
    ] = useState("");

    const [
        incluirNoPublicados,
        setIncluirNoPublicados,
    ] = useState(false);

    const dialog =
        useCrudDialog<ModuloType>();

    const {
        puedeCrear,
        puedeEditar,
        puedeEliminar,
    } =
        useModulePermissions(
            PERMISSIONS.MODULOS,
        );

    const {
        data: curso,
        isLoading,
        isError,
        error,
    } =
        useGetCurso(
            id!,
            !!id,
        );

    const limpiarFiltros = () => {
        setSearchModulos("");
        setIncluirNoPublicados(
            false,
        );
    };

    const verModulo = (
        modulo: ModuloType,
    ) => {
        navigate(`/panel/cursos/${id}/modulos/${modulo.id}`, {
            state: { from, },
        },
        );
    };

    const volver = () => {
        if (from === "mis-cursos") {
            navigate("/panel/mis-cursos",);
            return;
        }
        navigate("/panel/cursos",);
    };

    return (
        <div className="w-full min-w-0 max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6">
            <div className="mx-auto w-full min-w-0 max-w-full space-y-6 sm:space-y-8">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={volver}
                    className="max-w-full gap-1 px-0 text-xs sm:text-sm"
                >
                    <ArrowLeft className="size-4 shrink-0" />

                    <span className="truncate">
                        {from ===
                            "mis-cursos"
                            ? "Volver a mis cursos"
                            : "Volver a cursos"}
                    </span>
                </Button>

                <QueryState
                    isLoading={isLoading}
                    isError={isError || !id}
                    error={error}
                    fallbackMessage="No se pudo cargar el curso."
                >
                    {curso && (
                        <div className="w-full min-w-0 space-y-6 sm:space-y-8">
                            <section className="flex min-w-0 flex-col gap-4 sm:gap-5 md:flex-row md:items-start">
                                <div className="aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-muted md:aspect-auto md:h-[180px] md:w-[240px] lg:w-[280px]">
                                    {curso.rutaPortada ? (
                                        <img
                                            src={curso.rutaPortada}
                                            alt={curso.nombre}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center px-4 text-center text-xs text-muted-foreground">
                                            Sin imagen
                                        </div>
                                    )}
                                </div>

                                <div className="w-full min-w-0 flex-1">
                                    <AppTitle
                                        title={curso.nombre}
                                        subtitle={curso.categoria?.slug ?? undefined}
                                    />

                                    {curso.descripcionCompleta && (
                                        <p className="mt-3 max-w-3xl break-words text-sm leading-relaxed text-muted-foreground">
                                            {
                                                curso.descripcionCompleta
                                            }
                                        </p>
                                    )}
                                </div>
                            </section>

                            <section className="w-full min-w-0 space-y-4 border-t pt-5 sm:pt-6">
                                <PageHeader
                                    title="Módulos"
                                    subtitle="Módulos disponibles en este curso."
                                    action={
                                        puedeCrear ? (
                                            <Button
                                                type="button"
                                                onClick={dialog.openCreate}
                                                className="w-full sm:w-auto"
                                            >
                                                Nuevo módulo
                                            </Button>
                                        ) : undefined
                                    }
                                />

                                <div className="w-full min-w-0 max-w-full">
                                    <ModulosToolbar
                                        search={searchModulos}
                                        onSearchChange={setSearchModulos}
                                        onClear={limpiarFiltros}
                                        incluirNoPublicados={puedeEditar ? incluirNoPublicados : undefined}
                                        onIncluirNoPublicadosChange={puedeEditar ? setIncluirNoPublicados : undefined}
                                    />
                                </div>

                                <div className="w-full min-w-0 max-w-full">
                                    <ModulosList
                                        cursoId={id!}
                                        search={searchModulos}
                                        incluirNoPublicados={puedeEditar && incluirNoPublicados}
                                        onVer={verModulo}
                                        onEditar={dialog.openEdit}
                                        puedeEditar={puedeEditar}
                                        puedeEliminar={puedeEliminar}
                                    />
                                </div>
                            </section>
                        </div>
                    )}
                </QueryState>

                <DialogModulo
                    open={dialog.open}
                    onOpenChange={dialog.setOpen}
                    mode={dialog.mode}
                    cursoId={id!}
                    moduloId={dialog.selected?.id}
                />
            </div>
        </div>
    );
}