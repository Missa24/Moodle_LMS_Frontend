import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCursos } from "./service";
import { useCategorias } from "../Categoria/service/category.service";
import { CourseListCard } from "./course-list-card";
import { CoursePagination } from "./course-pagination";

export default function CursosPageContent() {
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("q") ?? "";
    const categoriaId = searchParams.get("categoriaId") ?? "";
    const currentPage = Number(searchParams.get("page") ?? "1");
    const page = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;

    const [query, setQuery] = useState(search);

    useEffect(() => {
        setQuery(search);
    }, [search]);

    const { data: categorias = [], isLoading: isLoadingCategorias } = useCategorias();

    const { data: cursosResponse, isLoading, isFetching, isError } = useCursos({
        search: search || undefined,
        categoriaId: categoriaId || undefined,
        page,
        limit: 10,
    });

    const cursos = cursosResponse?.data ?? [];
    const meta = cursosResponse?.meta;

    const updateParams = (updates: Record<string, string | null>) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            Object.entries(updates).forEach(([key, value]) => {
                if (!value) {
                    params.delete(key);
                    return;
                }
                params.set(key, value);
            });
            return params;
        });
    };

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const value = query.trim();
        updateParams({ q: value || null, page: null });
    };

    const handleCategoria = (id: string | null) => {
        updateParams({ categoriaId: id, page: null });
    };

    const handlePageChange = (nextPage: number) => {
        if (nextPage < 1 || nextPage > (meta?.totalPages ?? 1)) return;
        updateParams({ page: nextPage === 1 ? null : String(nextPage) });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const clearFilters = () => {
        setQuery("");
        setSearchParams(new URLSearchParams());
    };

    const hasFilters = Boolean(search) || Boolean(categoriaId);

    return (
        <main className="min-h-screen pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-40">
            <section className="px-5 sm:px-8 lg:px-[50px]">
                <div className="mx-auto max-w-[1800px]">
                    <div className="max-w-4xl">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
                            Explora nuestra formación
                        </p>
                        <h1 className="mt-3 text-3xl font-medium leading-[1.02] tracking-[-0.045em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                            Encuentra el curso que quieres aprender
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-[1.6] text-muted-foreground sm:text-base">
                            Busca por nombre o explora nuestras áreas de aprendizaje.
                        </p>
                    </div>

                    <form onSubmit={handleSearch} className="mt-8 max-w-3xl">
                        <div className="group flex items-center rounded-2xl border border-border bg-background p-1.5 shadow-sm transition-all focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
                            <div className="flex size-10 shrink-0 items-center justify-center text-muted-foreground sm:size-11">
                                <Search className="size-4 sm:size-5" />
                            </div>
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                type="search"
                                placeholder="Buscar cursos..."
                                className="h-10 min-w-0 flex-1 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 sm:h-11 sm:text-base"
                            />
                            <button
                                type="submit"
                                className="h-10 shrink-0 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:h-11 sm:px-5"
                            >
                                Buscar
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <section className="mt-9 border-y border-border py-5 sm:mt-12 sm:py-6">
                <div className="px-5 sm:px-8 lg:px-[50px]">
                    <div className="mx-auto max-w-[1800px]">
                        <div className="flex items-center gap-3">
                            <div className="flex shrink-0 items-center gap-2 text-xs font-medium text-muted-foreground">
                                <SlidersHorizontal className="size-4" />
                                <span className="hidden sm:inline">Filtrar</span>
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                                <button
                                    type="button"
                                    onClick={() => handleCategoria(null)}
                                    className={cn(
                                        "shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors sm:text-sm",
                                        !categoriaId
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : "border-border bg-card text-muted-foreground hover:text-foreground",
                                    )}
                                >
                                    Todas
                                </button>

                                {!isLoadingCategorias &&
                                    categorias.map((categoria) => (
                                        <button
                                            key={categoria.id}
                                            type="button"
                                            onClick={() => handleCategoria(categoria.id)}
                                            className={cn(
                                                "shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors sm:text-sm",
                                                categoriaId === categoria.id
                                                    ? "border-primary bg-primary text-primary-foreground"
                                                    : "border-border bg-card text-muted-foreground hover:text-foreground",
                                            )}
                                        >
                                            {categoria.nombre}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-5 py-10 sm:px-8 sm:py-12 lg:px-[50px] lg:py-14">
                <div className="mx-auto max-w-[1800px]">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            {search ? (
                                <p className="text-sm text-muted-foreground">
                                    Resultados para{" "}
                                    <span className="font-semibold text-foreground">"{search}"</span>
                                </p>
                            ) : (
                                <p className="text-sm text-muted-foreground">Cursos disponibles</p>
                            )}

                            {meta && (
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {meta.total} {meta.total === 1 ? "curso encontrado" : "cursos encontrados"}
                                </p>
                            )}
                        </div>

                        {hasFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
                            >
                                <X className="size-4" />
                                Limpiar filtros
                            </button>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="space-y-4">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} className="h-[190px] animate-pulse rounded-2xl bg-muted" />
                            ))}
                        </div>
                    ) : isError ? (
                        <div className="rounded-2xl border border-border bg-card p-8 text-center">
                            <p className="text-sm text-muted-foreground">No pudimos cargar los cursos.</p>
                        </div>
                    ) : cursos.length === 0 ? (
                        <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
                            <Search className="mx-auto size-8 text-muted-foreground/50" />
                            <h2 className="mt-4 text-xl font-semibold text-foreground">No encontramos cursos</h2>
                            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                                Prueba con otra búsqueda o selecciona una categoría diferente.
                            </p>
                            <button type="button" onClick={clearFilters} className="mt-5 text-sm font-medium text-primary">
                                Ver todos los cursos
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className={cn("space-y-4 transition-opacity duration-200", isFetching && "opacity-60")}>
                                {cursos.map((curso) => (
                                    <CourseListCard key={curso.id} curso={curso} />
                                ))}
                            </div>

                            {meta && (
                                <CoursePagination page={meta.page} totalPages={meta.totalPages} onPageChange={handlePageChange} />
                            )}
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}