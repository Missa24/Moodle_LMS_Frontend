"use client";

import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AppTitle } from "@/components/common/Apptittle";
import { PageHeader } from "@/components/common/PageHeader";
import { QueryState } from "@/components/common/QueryState";

import { useGetCurso, useCursoPrecio } from "@/features/Curso/Hook/CursoHook";
import { ConfiguracionVentaCurso } from "@/features/Curso/Components/ConfiguracionVentaCurso";

import { ModulosList } from "@/features/Modulo/Components/ModulosList";
import { ModulosToolbar } from "@/features/Modulo/Components/ModulosToolbar";
import { DialogModulo } from "@/features/Modulo/Components/DialogModulo";
import type { ModuloType } from "@/features/Modulo/Schema/ModuloSchema";

import { PricingCard } from "@/features/Lead/Components/PricingCard";
import BuyCourseButton from "@/features/Lead/Components/BuyCourseButton";
import { useEstadoCompraCurso } from "@/features/Lead/Hook/LeadHook";

import { useCrudDialog } from "@/hooks/useCrudDialog";
import { useModulePermissions } from "@/hooks/useModulePermissions";
import { PERMISSIONS } from "@/utils/constants";

export default function CursoDetallePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as { from?: string })?.from ?? "cursos";

    const [searchModulos, setSearchModulos] = useState("");
    const [incluirNoPublicados, setIncluirNoPublicados] = useState(false);

    const dialog = useCrudDialog<ModuloType>();

    const {
        puedeCrear: puedeCrearModulo,
        puedeEditar: puedeEditarModulo,
        puedeEliminar: puedeEliminarModulo,
    } = useModulePermissions(PERMISSIONS.MODULOS);

    const { puedeEditar: puedeEditarCurso } =
        useModulePermissions(PERMISSIONS.CURSOS);

    const {
        data: curso,
        isLoading,
        isError,
        error,
    } = useGetCurso(id!, !!id);

    const {
        data: precioCurso,
        isLoading: cargandoPrecio,
        isError: errorPrecio,
    } = useCursoPrecio(id!, !!id);

    const {
        data: estadoCompra,
        isLoading: cargandoEstadoCompra,
    } = useEstadoCompraCurso(id!, !!id);

    const limpiarFiltros = () => {
        setSearchModulos("");
        setIncluirNoPublicados(false);
    };

    const verModulo = (modulo: ModuloType) => {
        navigate(`/panel/cursos/${id}/modulos/${modulo.id}`, {
            state: { from },
        });
    };

    const volver = () => {
        if (from === "mis-cursos") {
            navigate("/panel/mis-cursos");
            return;
        }

        navigate("/panel/cursos");
    };

    const descuentoLabel =
        precioCurso?.descuento?.tipo === "PORCENTAJE"
            ? `${precioCurso.descuento.porcentaje}% de descuento`
            : precioCurso?.descuento?.tipo === "MODULO_GRATIS"
                ? `Ahorras el módulo ${precioCurso.descuento.modulo.nombre}`
                : undefined;

    const tieneDescuento = Boolean(
        precioCurso && precioCurso.montoDescuento > 0,
    );

    const mostrarCompraCurso = Boolean(
        !cargandoPrecio &&
        !errorPrecio &&
        !cargandoEstadoCompra &&
        precioCurso?.habilitado &&
        (estadoCompra?.puedeComprarCurso ?? true),
    );

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
                        {from === "mis-cursos"
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

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="min-w-0 flex-1">
                                            <AppTitle
                                                title={curso.nombre}
                                                subtitle={
                                                    curso.categoria?.slug ??
                                                    undefined
                                                }
                                            />

                                            {curso.descripcionCompleta && (
                                                <p className="mt-3 max-w-3xl break-words text-sm leading-relaxed text-muted-foreground">
                                                    {curso.descripcionCompleta}
                                                </p>
                                            )}
                                        </div>

                                        {puedeEditarCurso && (
                                            <div className="shrink-0 sm:pt-1">
                                                <ConfiguracionVentaCurso
                                                    cursoId={id!}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {puedeEditarCurso && errorPrecio && (
                                        <div className="mt-4 flex max-w-xl items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                                            <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />

                                            <div>
                                                <p className="text-sm font-medium text-destructive">
                                                    No se pudo calcular el
                                                    precio del curso.
                                                </p>

                                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                                    Revisa que los módulos
                                                    publicados tengan un
                                                    precio configurado.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>

                            <div
                                className={
                                    mostrarCompraCurso
                                        ? "grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_400px]"
                                        : "grid min-w-0 grid-cols-1"
                                }
                            >
                                <section className="order-2 w-full min-w-0 space-y-4 border-t pt-5 sm:pt-6 lg:order-1">
                                    <PageHeader
                                        title="Módulos"
                                        subtitle="Módulos disponibles en este curso."
                                        action={
                                            puedeCrearModulo ? (
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
                                            incluirNoPublicados={
                                                puedeEditarModulo
                                                    ? incluirNoPublicados
                                                    : undefined
                                            }
                                            onIncluirNoPublicadosChange={
                                                puedeEditarModulo
                                                    ? setIncluirNoPublicados
                                                    : undefined
                                            }
                                        />
                                    </div>

                                    <div className="w-full min-w-0 max-w-full">
                                        <ModulosList
                                            cursoId={id!}
                                            search={searchModulos}
                                            incluirNoPublicados={
                                                puedeEditarModulo &&
                                                incluirNoPublicados
                                            }
                                            onVer={verModulo}
                                            onEditar={dialog.openEdit}
                                            puedeEditar={puedeEditarModulo}
                                            puedeEliminar={puedeEliminarModulo}
                                        />
                                    </div>
                                </section>

                                {mostrarCompraCurso && precioCurso && (
                                    <aside className="order-1 min-w-0 lg:order-2 lg:self-start">
                                        <div className="lg:sticky lg:top-24">
                                            <PricingCard
                                                title="Curso completo"
                                                subtitle="Obtén acceso a todos los módulos publicados mediante una sola compra."
                                                price={
                                                    precioCurso.precioFinal
                                                }
                                                originalPrice={
                                                    tieneDescuento
                                                        ? precioCurso.precioBase
                                                        : null
                                                }
                                                currency="USD"
                                                currencySymbol="$"
                                                badge={`${precioCurso.modulos.length} ${precioCurso.modulos
                                                        .length === 1
                                                        ? "módulo"
                                                        : "módulos"
                                                    }`}
                                                discountLabel={descuentoLabel}
                                                highlight={
                                                    tieneDescuento
                                                        ? `Ahorras $${precioCurso.montoDescuento.toFixed(2)}`
                                                        : "Pago único por el curso completo"
                                                }
                                                features={[
                                                    `Acceso a ${precioCurso.modulos.length} módulos publicados`,
                                                    ...precioCurso.modulos.map(
                                                        (modulo) =>
                                                            modulo.nombre,
                                                    ),
                                                    "Progreso guardado automáticamente",
                                                    "Acceso a las certificaciones correspondientes al cumplir los requisitos",
                                                ]}
                                                action={
                                                    <BuyCourseButton
                                                        cursoId={curso.id}
                                                        linkPago={
                                                            precioCurso.pago
                                                                .urlPago
                                                        }
                                                        qrPagoBolivia={
                                                            precioCurso.pago
                                                                .urlPagoBolivia
                                                        }
                                                        precio={
                                                            precioCurso.precioFinal
                                                        }
                                                    />
                                                }
                                                footer="Una vez confirmado el pago, administración habilitará el acceso a los módulos del curso."
                                            />
                                        </div>
                                    </aside>
                                )}
                            </div>
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