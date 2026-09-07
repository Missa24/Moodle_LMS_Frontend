import { useState } from "react";
import {
    useNavigate,
    useParams,
    useLocation,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AppTitle } from "@/components/common/Apptittle";
import { QueryState } from "@/components/common/QueryState";
import { useGetCurso } from "@/features/Curso/Hook/CursoHook";

import { ModulosList } from "@/features/Modulo/Components/ModulosList";
import { ModulosToolbar } from "@/features/Modulo/Components/ModulosToolbar";
import { DialogModulo } from "@/features/Modulo/Components/DialogModulo";
import { ModuloType } from "@/features/Modulo/Schema/ModuloSchema";

import { usePermission } from "@/hooks/usePermission";
import { PERMISSIONS } from "@/utils/constants";

export default function CursoDetallePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const from =
        (location.state as { from?: string })?.from ??
        "cursos";

    const { data: curso, isLoading, isError, error } =
        useGetCurso(id!);

    const [searchModulos, setSearchModulos] =
        useState("");

    const [incluirNoPublicados, setIncluirNoPublicados] =
        useState(false);

    const [open, setOpen] = useState(false);

    const [mode, setMode] =
        useState<"create" | "edit">("create");

    const [moduloIdSeleccionado, setModuloIdSeleccionado] =
        useState<string | undefined>(undefined);

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

    const abrirCrear = () => {
        setModuloIdSeleccionado(undefined);
        setMode("create");
        setOpen(true);
    };

    const abrirEditar = (modulo: ModuloType) => {
        setModuloIdSeleccionado(modulo.id);
        setMode("edit");
        setOpen(true);
    };

    const verModulo = (modulo: ModuloType) => {
        navigate(
            `/panel/cursos/${id}/modulos/${modulo.id}`,
            {
                state: {
                    from,
                },
            }
        );
    };

    const volver = () => {
        if (from === "mis-cursos") {
            navigate("/panel/mis-cursos");
            return;
        }

        navigate("/panel/cursos");
    };

    return (
        <div className="space-y-8 p-6">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={volver}
                className="gap-1 px-0"
            >
                <ArrowLeft className="h-4 w-4" />

                {from === "mis-cursos"
                    ? "Volver a mis cursos"
                    : "Volver a cursos"}
            </Button>

            <QueryState
                isLoading={isLoading}
                isError={isError}
                error={error}
                fallbackMessage="No se pudo cargar el curso."
            >
                {curso && (
                    <>
                        <div className="flex flex-col gap-5 sm:flex-row">
                            <div className="h-[180px] w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:w-[280px]">
                                {curso.rutaPortada ? (
                                    <img
                                        src={curso.rutaPortada}
                                        alt={curso.nombre}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                                        Sin imagen
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <AppTitle
                                    title={curso.nombre}
                                    subtitle={
                                        curso.categoria?.slug ??
                                        undefined
                                    }
                                />

                                {curso.descripcionCompleta && (
                                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                        {
                                            curso.descripcionCompleta
                                        }
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4 border-t pt-6">
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
                                search={searchModulos}
                                onSearchChange={
                                    setSearchModulos
                                }
                                onClear={() => {
                                    setSearchModulos("");
                                    setIncluirNoPublicados(
                                        false
                                    );
                                }}
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
                                cursoId={id!}
                                search={searchModulos}
                                incluirNoPublicados={
                                    incluirNoPublicados
                                }
                                onVer={verModulo}
                                onEditar={abrirEditar}
                                puedeEditar={puedeEditar}
                                puedeEliminar={
                                    puedeEliminar
                                }
                            />
                        </div>
                    </>
                )}
            </QueryState>

            <DialogModulo
                open={open}
                onOpenChange={setOpen}
                mode={mode}
                cursoId={id!}
                moduloId={moduloIdSeleccionado}
            />
        </div>
    );
}