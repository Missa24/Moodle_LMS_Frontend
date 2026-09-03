import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Plus, GraduationCap, ArrowLeft, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Banner } from "@/components/common/Banner";
import { QueryState } from "@/components/common/QueryState";

import { useCursos, useCategoriasCursos, useSubcategoriasCursos } from "@/features/Curso/Hook/CursoHook";
import { usePermission } from "@/hooks/usePermission";
import { PERMISSIONS } from "@/utils/constants";
import { AppTitle } from "@/components/common/Apptittle";

export default function InicioPage() {
    const { can } = usePermission();
    const [searchParams, setSearchParams] = useSearchParams();

    const [categoriaIdSeleccionada, setCategoriaIdSeleccionada] = useState<string | null>(
        () => searchParams.get("cat") ?? null
    );
    const [categoriaActiva, setCategoriaActiva] = useState(
        () => searchParams.get("sub") ?? searchParams.get("cat") ?? ""
    );
    const [search, setSearch] = useState("");

    const { data: categorias = [] } = useCategoriasCursos();

    const categoriaSeleccionada = useMemo(
        () => (categoriaIdSeleccionada ? categorias.find((c) => c.id === categoriaIdSeleccionada) ?? null : null),
        [categoriaIdSeleccionada, categorias]
    );

    const { data: subcategorias = [] } = useSubcategoriasCursos(categoriaIdSeleccionada ?? "");
    const { data, isLoading, isError, error } = useCursos(1, 12, search, categoriaActiva);

    const cursos = data?.data ?? [];
    const totalCursos = data?.meta.total;

    const syncURL = (cat: string, sub: string) => {
        const params = new URLSearchParams();
        if (cat) params.set("cat", cat);
        if (sub) params.set("sub", sub);
        setSearchParams(params, { replace: true });
    };

    const handleCategoriaClick = (categoria: { id: string; nombre: string }) => {
        setCategoriaIdSeleccionada(categoria.id);
        setCategoriaActiva(categoria.id);
        syncURL(categoria.id, "");
    };

    const handleSubcategoriaClick = (sub: { id: string }) => {
        setCategoriaActiva(sub.id);
        syncURL(categoriaIdSeleccionada ?? "", sub.id);
    };

    const handleVerTodos = () => {
        if (categoriaIdSeleccionada) {
            setCategoriaActiva(categoriaIdSeleccionada);
            syncURL(categoriaIdSeleccionada, "");
        }
    };

    const handleVolver = () => {
        setCategoriaIdSeleccionada(null);
        setCategoriaActiva("");
        setSearchParams({}, { replace: true });
    };

    return (
        <div className="space-y-8 p-6">
            <Banner
                title="Sigue aprendiendo hoy"
                description="Explora el catálogo completo o retoma un curso donde lo dejaste."
                icon={<GraduationCap />}
                ctaLabel="Ver catálogo completo"
                ctaTo="/cursos"
            />

            <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <AppTitle
                            title={
                                categoriaSeleccionada
                                    ? categoriaSeleccionada.nombre
                                    : "Cursos disponibles"
                            }
                            subtitle={
                                totalCursos !== undefined
                                    ? `${totalCursos} cursos publicados`
                                    : undefined
                            }
                        />
                    </div>

                    {can(PERMISSIONS.CURSOS.CREAR) && (
                        <Link to="/cursos">
                            <Button type="button" variant="outline" size="sm" className="gap-1.5">
                                <Plus className="h-3.5 w-3.5" />
                                Nuevo curso
                            </Button>
                        </Link>
                    )}
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Buscar cursos..."
                        className="h-10 pl-9"
                    />
                </div>

                {!categoriaIdSeleccionada ? (
                    categorias.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setCategoriaActiva("");
                                    setSearchParams({}, { replace: true });
                                }}
                                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${categoriaActiva === ""
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
                                    }`}
                            >
                                Todas
                            </button>

                            {categorias.map((categoria) => (
                                <button
                                    key={categoria.slug}
                                    type="button"
                                    onClick={() => handleCategoriaClick(categoria)}
                                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${categoriaActiva === categoria.id
                                        ? "bg-primary text-primary-foreground shadow-md"
                                        : "border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
                                        }`}
                                >
                                    {categoria.nombre}
                                </button>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={handleVolver}
                            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver
                        </button>

                        <button
                            type="button"
                            onClick={handleVerTodos}
                            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${categoriaActiva === categoriaIdSeleccionada
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
                                }`}
                        >
                            Todos
                        </button>

                        {subcategorias.map((sub) => (
                            <button
                                key={sub.slug}
                                type="button"
                                onClick={() => handleSubcategoriaClick(sub)}
                                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${categoriaActiva === sub.id
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
                                    }`}
                            >
                                {sub.nombre}
                            </button>
                        ))}
                    </div>
                )}

                <QueryState isLoading={isLoading} isError={isError} error={error} minHeight="min-h-[200px]">
                    {cursos.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                            {cursos.map((curso) => (
                                <Link
                                    key={curso.id}
                                    to={`/cursos/${curso.id}`}
                                    className="group overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
                                >
                                    <div className="aspect-[3/4] w-full overflow-hidden bg-muted">
                                        {curso.rutaPortada ? (
                                            <img
                                                src={curso.rutaPortada}
                                                alt={curso.nombre}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center p-3 text-center text-xs text-muted-foreground">
                                                {curso.nombre}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-2.5">
                                        {curso.categoria?.nombre && (
                                            <p className="truncate text-[11px] font-medium text-primary">{curso.categoria.nombre}</p>
                                        )}
                                        <h3 className="mt-0.5 line-clamp-2 text-xs font-semibold leading-snug text-foreground">
                                            {curso.nombre}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-[200px] items-center justify-center rounded-xl border bg-muted/20">
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
    );
}
