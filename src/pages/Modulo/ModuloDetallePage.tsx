import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft, BadgeCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AppTitle } from "@/components/common/Apptittle";
import { QueryState } from "@/components/common/QueryState";

import { LeccionesTimeline } from "@/features/Leccion/Components/LeccionesTimeline";
import { LeccionesToolbar } from "@/features/Leccion/Components/LeccionesToolbar";
import { LeccionesList } from "@/features/Leccion/Components/LeccionesList";
import { DialogLeccion } from "@/features/Leccion/Components/DialogLeccion";
import { LeccionListItemType } from "@/features/Leccion/Schema/LeccionSchema";

import { usePermission } from "@/hooks/usePermission";
import { PERMISSIONS } from "@/utils/constants";
import { useGetModulo } from "@/features/Modulo/Hook/ModuloHook";

export default function ModuloDetallePage() {
    const {
        id: cursoId,
        moduloId,
    } = useParams<{
        id: string;
        moduloId: string;
    }>();

    const navigate = useNavigate();
    const location = useLocation();

    const from =
        (location.state as { from?: string })?.from ??
        "cursos";

    const {
        data: modulo,
        isLoading,
        isError,
        error,
    } = useGetModulo(moduloId!);

    const { can } = usePermission();

    const puedeCrear = can(
        PERMISSIONS.LECCIONES.CREAR
    );

    const puedeEditar = can(
        PERMISSIONS.LECCIONES.EDITAR
    );

    const puedeEliminar = can(
        PERMISSIONS.LECCIONES.ELIMINAR
    );

    const [modoAdmin, setModoAdmin] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [open, setOpen] =
        useState(false);

    const [mode, setMode] =
        useState<"create" | "edit">(
            "create"
        );

    const [
        leccionIdSeleccionada,
        setLeccionIdSeleccionada,
    ] = useState<string | undefined>(
        undefined
    );

    const abrirCrear = () => {
        setLeccionIdSeleccionada(
            undefined
        );

        setMode("create");
        setOpen(true);
    };

    const abrirEditar = (
        leccion: LeccionListItemType
    ) => {
        setLeccionIdSeleccionada(
            leccion.id
        );

        setMode("edit");
        setOpen(true);
    };

    const volver = () => {
        if (from === "mis-cursos") {
            navigate("/panel/mis-cursos");
            return;
        }

        navigate(
            `/panel/cursos/${cursoId}`,
            {
                state: { from },
            }
        );
    };

    return (
        <div className="space-y-6 p-6">
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
                    : "Volver al curso"}
            </Button>

            <QueryState
                isLoading={isLoading}
                isError={isError}
                error={error}
                fallbackMessage="No se pudo cargar el módulo."
            >
                {modulo && (
                    <>
                        <AppTitle
                            title={modulo.nombre}
                            subtitle={
                                modulo.fraseMotivacional ??
                                modulo.descripcion ??
                                undefined
                            }
                            badge={
                                modulo.otorgaCertificacion ? (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                        <BadgeCheck className="h-3.5 w-3.5" />
                                        Certifica
                                    </span>
                                ) : undefined
                            }
                        />

                        {modulo.descripcion &&
                            modulo.fraseMotivacional && (
                                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                    {
                                        modulo.descripcion
                                    }
                                </p>
                            )}

                        <div className="space-y-4 border-t pt-6">
                            <div className="flex items-start justify-between gap-4">
                                <h2 className="text-lg font-semibold tracking-tight">
                                    Lecciones
                                </h2>

                                {(puedeCrear ||
                                    puedeEditar) && (
                                        <div className="flex items-center gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    setModoAdmin(
                                                        (prev) =>
                                                            !prev
                                                    )
                                                }
                                            >
                                                {modoAdmin
                                                    ? "Ver como estudiante"
                                                    : "Administrar lecciones"}
                                            </Button>

                                            {modoAdmin &&
                                                puedeCrear && (
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        onClick={
                                                            abrirCrear
                                                        }
                                                    >
                                                        Nueva lección
                                                    </Button>
                                                )}
                                        </div>
                                    )}
                            </div>

                            {modoAdmin ? (
                                <>
                                    <LeccionesToolbar
                                        search={search}
                                        onSearchChange={
                                            setSearch
                                        }
                                        onClear={() =>
                                            setSearch("")
                                        }
                                    />

                                    <LeccionesList
                                        moduloId={moduloId!}
                                        search={search}
                                        onEditar={abrirEditar}
                                        puedeEditar={puedeEditar}
                                        puedeEliminar={puedeEliminar}
                                    />
                                </>
                            ) : (
                                <LeccionesTimeline
                                    moduloId={
                                        moduloId!
                                    }
                                />
                            )}
                        </div>
                    </>
                )}
            </QueryState>

            <DialogLeccion
                open={open}
                onOpenChange={setOpen}
                mode={mode}
                moduloId={moduloId!}
                leccionId={
                    leccionIdSeleccionada
                }
            />
        </div>
    );
}
