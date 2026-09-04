import { FormEvent, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { CoursePagination } from "./course-pagination";
import { useModulos } from "../modulos/service";
import { ModuleListCard } from "../modulos/module-list-card";

export default function CursoPageContent() {
    const { cursoId } = useParams<{ cursoId: string }>();
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("q") ?? "";
    const currentPage = Number(searchParams.get("page") ?? "1");
    const page = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;

    const [query, setQuery] = useState(search);

    useEffect(() => {
        setQuery(search);
    }, [search]);

    const { data: modulosResponse, isLoading, isFetching, isError } = useModulos(cursoId!, {
        page,
        limit: 10,
        nombre: search || undefined,
        estaPublicado: true,
    });

    const modulos = modulosResponse?.data ?? [];
    const meta = modulosResponse?.meta;

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

    const handleClear = () => {
        setQuery("");
        updateParams({ q: null, page: null });
    };

    const handlePageChange = (nextPage: number) => {
        if (nextPage < 1 || nextPage > (meta?.totalPages ?? 1)) return;
        updateParams({ page: nextPage === 1 ? null : String(nextPage) });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <main className="min-h-screen pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-40">
            <section className="px-5 sm:px-8 lg:px-[50px]">
                <div className="mx-auto max-w-[1800px]">
                    <Link
                        to="/cursos"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="size-4" />
                        Volver a cursos
                    </Link>

                    <div className="mt-8 max-w-4xl">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
                            Módulos disponibles
                        </p>
                        <h1 className="mt-3 text-3xl font-medium leading-[1.02] tracking-[-0.045em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                            Explora los módulos de esta formación
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-[1.6] text-muted-foreground sm:text-base">
                            Encuentra el módulo que quieres aprender y continúa desarrollando tus conocimientos.
                        </p>
                    </div>

                    <form onSubmit={handleSearch} className="mt-8 max-w-2xl">
                        <div className="group flex items-center rounded-2xl border border-border bg-background p-1.5 shadow-sm transition-all focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
                            <div className="flex size-10 shrink-0 items-center justify-center text-muted-foreground sm:size-11">
                                <Search className="size-4 sm:size-5" />
                            </div>
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                type="search"
                                placeholder="Buscar un módulo..."
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

            <section className="px-5 py-10 sm:px-8 sm:py-12 lg:px-[50px] lg:py-14">
                <div className="mx-auto max-w-[1400px]">
                    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">
                                Contenido disponible
                            </h2>
                            {meta && (
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {meta.total} {meta.total === 1 ? "módulo disponible" : "módulos disponibles"}
                                </p>
                            )}
                        </div>

                        {search && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
                            >
                                <X className="size-4" />
                                Limpiar búsqueda
                            </button>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="space-y-3">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} className="h-[105px] animate-pulse rounded-2xl bg-muted sm:h-[115px]" />
                            ))}
                        </div>
                    ) : isError ? (
                        <div className="rounded-2xl border border-border bg-card p-8 text-center">
                            <p className="text-sm text-muted-foreground">No pudimos cargar los módulos.</p>
                        </div>
                    ) : modulos.length === 0 ? (
                        <div className="rounded-2xl border border-border bg-card px-6 py-14 text-center">
                            <Search className="mx-auto size-8 text-muted-foreground/50" />
                            <h2 className="mt-4 text-xl font-semibold text-foreground">No encontramos módulos</h2>
                            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                                No hay módulos publicados que coincidan con tu búsqueda.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className={cn("space-y-3 transition-opacity duration-200 sm:space-y-4", isFetching && "opacity-60")}>
                                {modulos.map((modulo) => (
                                    <ModuleListCard key={modulo.id} modulo={modulo} />
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