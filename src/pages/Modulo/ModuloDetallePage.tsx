"use client";

import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BadgeCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AppTitle } from "@/components/common/Apptittle";
import { QueryState } from "@/components/common/QueryState";

import { LeccionesTimeline } from "@/features/Leccion/Components/LeccionesTimeline";
import { LeccionesToolbar } from "@/features/Leccion/Components/LeccionesToolbar";
import { LeccionesList } from "@/features/Leccion/Components/LeccionesList";
import { DialogLeccion } from "@/features/Leccion/Components/DialogLeccion";
import type { LeccionListItemType } from "@/features/Leccion/Schema/LeccionSchema";

import { useGetModulo } from "@/features/Modulo/Hook/ModuloHook";
import { useGetMiInscripcionModulo } from "@/features/Inscripciones/Hook/InscripcionHook";

import BuyModuleButton from "@/features/Lead/Components/BuyModuleButton";
import { PricingCard } from "@/features/Lead/Components/PricingCard";

import { useCrudDialog } from "@/hooks/useCrudDialog";
import { useModulePermissions } from "@/hooks/useModulePermissions";
import { PERMISSIONS } from "@/utils/constants";

export default function ModuloDetallePage() {
    const { id: cursoId, moduloId } = useParams<{ id: string; moduloId: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as { from?: string })?.from ?? "cursos";

    const [modoAdmin, setModoAdmin] = useState(false);
    const [search, setSearch] = useState("");

    const dialog = useCrudDialog<LeccionListItemType>();

    const { puedeCrear, puedeEditar, puedeEliminar } =
        useModulePermissions(PERMISSIONS.LECCIONES);

    const { data: modulo, isLoading, isError, error } = useGetModulo(moduloId!);

    const { data: accesoModulo, isLoading: isLoadingAcceso } =
        useGetMiInscripcionModulo(moduloId!, !!moduloId);

    const volver = () => {
        if (from === "mis-cursos") {
            navigate("/panel/mis-cursos");
            return;
        }

        navigate(`/panel/cursos/${cursoId}`, { state: { from } });
    };

    const inscrito = accesoModulo?.inscrito ?? false;
    const tieneAcceso = accesoModulo?.tieneAcceso ?? false;
    const porcentajeAvance = accesoModulo?.inscripcion?.porcentajeAvance ?? 0;

    return (
        <div className="space-y-6 p-4 sm:p-6">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={volver}
                className="gap-1 px-0"
            >
                <ArrowLeft className="h-4 w-4" />
                {from === "mis-cursos" ? "Volver a mis cursos" : "Volver al curso"}
            </Button>

            <QueryState
                isLoading={isLoading}
                isError={isError}
                error={error}
                fallbackMessage="No se pudo cargar el módulo."
            >
                {modulo && (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
                        <div className="min-w-0 space-y-6">
                            <AppTitle
                                title={modulo.nombre}
                                subtitle={modulo.fraseMotivacional ?? modulo.descripcion ?? undefined}
                                badge={
                                    modulo.otorgaCertificacion ? (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                            <BadgeCheck className="h-3.5 w-3.5" />
                                            Certifica
                                        </span>
                                    ) : undefined
                                }
                            />

                            {modulo.descripcion && modulo.fraseMotivacional && (
                                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                    {modulo.descripcion}
                                </p>
                            )}

                            <div className="space-y-4 border-t pt-6">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <h2 className="text-lg font-semibold tracking-tight">
                                        Lecciones
                                    </h2>

                                    {(puedeCrear || puedeEditar) && (
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setModoAdmin((prev) => !prev)}
                                            >
                                                {modoAdmin
                                                    ? "Ver como estudiante"
                                                    : "Administrar lecciones"}
                                            </Button>

                                            {modoAdmin && puedeCrear && (
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    onClick={dialog.openCreate}
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
                                            onSearchChange={setSearch}
                                            onClear={() => setSearch("")}
                                        />

                                        <LeccionesList
                                            moduloId={moduloId!}
                                            search={search}
                                            onEditar={dialog.openEdit}
                                            puedeEditar={puedeEditar}
                                            puedeEliminar={puedeEliminar}
                                        />
                                    </>
                                ) : (
                                    <LeccionesTimeline moduloId={moduloId!} />
                                )}
                            </div>
                        </div>

                        <aside className="min-w-0 lg:self-start">
                            <div className="lg:sticky lg:top-24 lg:h-fit">
                                {!isLoadingAcceso && !inscrito && (
                                    <PricingCard
                                        title="Acceso al módulo"
                                        subtitle="Desbloquea el contenido completo y continúa con tu formación."
                                        price="25"
                                        currency="USD"
                                        badge={modulo.otorgaCertificacion ? "Certifica" : undefined}
                                        highlight="Pago único"
                                        features={[
                                            "Acceso a todas las lecciones",
                                            "Material y recursos digitales",
                                            "Progreso guardado automáticamente",
                                            ...(modulo.otorgaCertificacion
                                                ? ["Acceso a certificación al cumplir los requisitos"]
                                                : []),
                                        ]}
                                        action={
                                            <BuyModuleButton
                                                moduloId={modulo.id}
                                                linkPago="https://facebook.com"
                                            />
                                        }
                                        footer="El acceso será habilitado una vez confirmado el pago."
                                    />
                                )}

                                {!isLoadingAcceso && inscrito && tieneAcceso && (
                                    <div className="overflow-hidden rounded-3xl border bg-background shadow-sm">
                                        <div className="h-1 bg-primary" />

                                        <div className="space-y-5 p-6">
                                            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                                <BadgeCheck className="size-6" />
                                            </div>

                                            <div>
                                                <h3 className="text-xl font-semibold tracking-tight">
                                                    Ya tienes acceso
                                                </h3>

                                                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                                    Este módulo ya forma parte de tus formaciones.
                                                </p>
                                            </div>

                                            <div className="space-y-2 border-t pt-5">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">
                                                        Progreso
                                                    </span>

                                                    <span className="font-semibold">
                                                        {Math.round(porcentajeAvance)}%
                                                    </span>
                                                </div>

                                                <div className="h-2 overflow-hidden rounded-full bg-muted">
                                                    <div
                                                        className="h-full rounded-full bg-primary transition-all"
                                                        style={{
                                                            width: `${Math.min(
                                                                Math.max(porcentajeAvance, 0),
                                                                100,
                                                            )}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="rounded-2xl bg-primary/5 p-4 text-sm text-primary">
                                                Continúa avanzando con las lecciones disponibles.
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {!isLoadingAcceso && inscrito && !tieneAcceso && (
                                    <div className="overflow-hidden rounded-3xl border bg-background shadow-sm">
                                        <div className="h-1 bg-muted-foreground/40" />

                                        <div className="space-y-4 p-6">
                                            <div>
                                                <h3 className="text-xl font-semibold tracking-tight">
                                                    Acceso no disponible
                                                </h3>

                                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                                    Ya existe una inscripción para este módulo,
                                                    pero el acceso se encuentra deshabilitado.
                                                </p>
                                            </div>

                                            <div className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
                                                Comunícate con administración para revisar
                                                el estado de tu acceso.
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </aside>
                    </div>
                )}
            </QueryState>

            <DialogLeccion
                open={dialog.open}
                onOpenChange={dialog.setOpen}
                mode={dialog.mode}
                moduloId={moduloId!}
                leccionId={dialog.selected?.id}
            />
        </div>
    );
}