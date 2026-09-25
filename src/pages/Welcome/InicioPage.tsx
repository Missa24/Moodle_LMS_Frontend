import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
    ArrowLeft,
    GraduationCap,
    Plus,
    Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Banner } from "@/components/common/Banner";
import { QueryState } from "@/components/common/QueryState";
import { AppTitle } from "@/components/common/Apptittle";

import { DialogCurso } from "@/features/Curso/Components/DialogCurso";

import {
    useCategoriasCursos,
    useCursos,
    useSubcategoriasCursos,
} from "@/features/Curso/Hook/CursoHook";

import type { CursoType } from "@/features/Curso/Schema/CursoSchema";

import { useCrudDialog } from "@/hooks/useCrudDialog";
import { useModulePermissions } from "@/hooks/useModulePermissions";

import { PERMISSIONS } from "@/utils/constants";

export default function InicioPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [categoriaIdSeleccionada, setCategoriaIdSeleccionada] =
        useState<string | null>(
            () => searchParams.get("cat") ?? null,
        );

    const [categoriaActiva, setCategoriaActiva] = useState(
        () =>
            searchParams.get("sub") ??
            searchParams.get("cat") ??
            "",
    );

    const [search, setSearch] = useState("");

    const dialog = useCrudDialog<CursoType>();

    const { puedeCrear } = useModulePermissions(
        PERMISSIONS.CURSOS,
    );

    const { data: categorias = [] } =
        useCategoriasCursos();

    const categoriaSeleccionada = useMemo(
        () =>
            categoriaIdSeleccionada
                ? categorias.find(
                    (categoria) =>
                        categoria.id ===
                        categoriaIdSeleccionada,
                ) ?? null
                : null,
        [categoriaIdSeleccionada, categorias],
    );

    const { data: subcategorias = [] } =
        useSubcategoriasCursos(
            categoriaIdSeleccionada ?? "",
        );

    const {
        data,
        isLoading,
        isError,
        error,
    } = useCursos(
        1,
        12,
        search,
        categoriaActiva,
    );

    const cursos = data?.data ?? [];
    const totalCursos = data?.meta.total;

    const syncURL = (
        cat: string,
        sub: string,
    ) => {
        const params = new URLSearchParams();

        if (cat) {
            params.set("cat", cat);
        }

        if (sub) {
            params.set("sub", sub);
        }

        setSearchParams(params, {
            replace: true,
        });
    };

    const handleCategoriaClick = (
        categoria: {
            id: string;
            nombre: string;
        },
    ) => {
        setCategoriaIdSeleccionada(
            categoria.id,
        );
        setCategoriaActiva(
            categoria.id,
        );

        syncURL(
            categoria.id,
            "",
        );
    };

    const handleSubcategoriaClick = (
        sub: {
            id: string;
        },
    ) => {
        setCategoriaActiva(
            sub.id,
        );

        syncURL(
            categoriaIdSeleccionada ?? "",
            sub.id,
        );
    };

    const handleVerTodos = () => {
        if (!categoriaIdSeleccionada) {
            return;
        }

        setCategoriaActiva(
            categoriaIdSeleccionada,
        );

        syncURL(
            categoriaIdSeleccionada,
            "",
        );
    };

    const handleVolver = () => {
        setCategoriaIdSeleccionada(
            null,
        );
        setCategoriaActiva("");

        setSearchParams(
            {},
            {
                replace: true,
            },
        );
    };

    const handleTodas = () => {
        setCategoriaIdSeleccionada(
            null,
        );
        setCategoriaActiva("");

        setSearchParams(
            {},
            {
                replace: true,
            },
        );
    };

    return (
        <div className="w-full min-w-0 max-w-full overflow-x-hidden p-3 sm:p-4 md:p-6">
            <div className="space-y-6 md:space-y-8">
                <Banner
                    title="Sigue aprendiendo hoy"
                    description="Explora el catálogo completo o retoma un curso donde lo dejaste."
                    icon={
                        <GraduationCap />
                    }
                    ctaLabel="Ver catálogo completo"
                    ctaTo="/panel/cursos"
                />

                <div className="min-w-0 space-y-4">
                    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                            <AppTitle
                                title={
                                    categoriaSeleccionada
                                        ? categoriaSeleccionada.nombre
                                        : "Cursos disponibles"
                                }
                                subtitle={
                                    totalCursos !==
                                        undefined
                                        ? `${totalCursos} cursos publicados`
                                        : undefined
                                }
                            />
                        </div>

                        {puedeCrear && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={
                                    dialog.openCreate
                                }
                                className="w-full gap-1.5 sm:w-auto"
                            >
                                <Plus className="size-3.5" />

                                Nuevo curso
                            </Button>
                        )}
                    </div>

                    <div className="relative min-w-0">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            value={
                                search
                            }
                            onChange={(
                                event,
                            ) =>
                                setSearch(
                                    event
                                        .target
                                        .value,
                                )
                            }
                            placeholder="Buscar cursos..."
                            className="h-10 w-full pl-9"
                        />
                    </div>

                    {!categoriaIdSeleccionada ? (
                        categorias.length >
                        0 && (
                            <div className="w-full min-w-0 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                <div className="flex w-max min-w-full gap-2 md:w-full md:flex-wrap">
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant={
                                            categoriaActiva ===
                                                ""
                                                ? "default"
                                                : "outline"
                                        }
                                        onClick={
                                            handleTodas
                                        }
                                        className="shrink-0 rounded-full"
                                    >
                                        Todas
                                    </Button>

                                    {categorias.map(
                                        (
                                            categoria,
                                        ) => (
                                            <Button
                                                key={
                                                    categoria.slug
                                                }
                                                type="button"
                                                size="sm"
                                                variant={
                                                    categoriaActiva ===
                                                        categoria.id
                                                        ? "default"
                                                        : "outline"
                                                }
                                                onClick={() =>
                                                    handleCategoriaClick(
                                                        categoria,
                                                    )
                                                }
                                                className="shrink-0 rounded-full whitespace-nowrap"
                                            >
                                                {
                                                    categoria.nombre
                                                }
                                            </Button>
                                        ),
                                    )}
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="w-full min-w-0 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            <div className="flex w-max min-w-full gap-2 md:w-full md:flex-wrap">
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={
                                        handleVolver
                                    }
                                    className="shrink-0 rounded-full"
                                >
                                    <ArrowLeft className="size-4" />

                                    Volver
                                </Button>

                                <Button
                                    type="button"
                                    size="sm"
                                    variant={
                                        categoriaActiva ===
                                            categoriaIdSeleccionada
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={
                                        handleVerTodos
                                    }
                                    className="shrink-0 rounded-full"
                                >
                                    Todos
                                </Button>

                                {subcategorias.map(
                                    (sub) => (
                                        <Button
                                            key={
                                                sub.slug
                                            }
                                            type="button"
                                            size="sm"
                                            variant={
                                                categoriaActiva ===
                                                    sub.id
                                                    ? "default"
                                                    : "outline"
                                            }
                                            onClick={() =>
                                                handleSubcategoriaClick(
                                                    sub,
                                                )
                                            }
                                            className="shrink-0 rounded-full whitespace-nowrap"
                                        >
                                            {
                                                sub.nombre
                                            }
                                        </Button>
                                    ),
                                )}
                            </div>
                        </div>
                    )}

                    <QueryState
                        isLoading={
                            isLoading
                        }
                        isError={
                            isError
                        }
                        error={
                            error
                        }
                        minHeight="min-h-[200px]"
                    >
                        {cursos.length >
                            0 ? (
                            <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
                                {cursos.map(
                                    (
                                        curso,
                                    ) => (
                                        <Link
                                            key={
                                                curso.id
                                            }
                                            to={`/panel/cursos/${curso.id}`}
                                            className="group min-w-0 overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
                                        >
                                            <div className="aspect-[3/4] w-full overflow-hidden bg-muted">
                                                {curso.rutaPortada ? (
                                                    <img
                                                        src={
                                                            curso.rutaPortada
                                                        }
                                                        alt={
                                                            curso.nombre
                                                        }
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center p-3 text-center text-xs text-muted-foreground">
                                                        {
                                                            curso.nombre
                                                        }
                                                    </div>
                                                )}
                                            </div>

                                            <div className="min-w-0 p-2.5">
                                                {curso
                                                    .categoria
                                                    ?.nombre && (
                                                        <p className="truncate text-[11px] font-medium text-primary">
                                                            {
                                                                curso
                                                                    .categoria
                                                                    .nombre
                                                            }
                                                        </p>
                                                    )}

                                                <h3 className="mt-0.5 line-clamp-2 break-words text-xs font-semibold leading-snug text-foreground">
                                                    {
                                                        curso.nombre
                                                    }
                                                </h3>
                                            </div>
                                        </Link>
                                    ),
                                )}
                            </div>
                        ) : (
                            <div className="flex min-h-[200px] w-full items-center justify-center rounded-xl border bg-muted/20 px-4 text-center">
                                <p className="text-sm text-muted-foreground">
                                    {search.trim()
                                        ? "No se encontraron cursos con ese término de búsqueda."
                                        : "No hay cursos en esta categoría."}
                                </p>
                            </div>
                        )}
                    </QueryState>
                </div>
            </div>

            <DialogCurso
                open={dialog.open}
                onOpenChange={
                    dialog.setOpen
                }
                mode={dialog.mode}
                initialData={
                    dialog.selected
                }
            />
        </div>
    );
}