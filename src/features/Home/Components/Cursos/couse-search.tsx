import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCursos } from "./service";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

type CourseSearchProps = {
    variant?: "hero" | "navbar";
    className?: string;
    onSearchComplete?: () => void;
};

export const CourseSearch = ({ variant = "hero", className, onSearchComplete }: CourseSearchProps) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [showResults, setShowResults] = useState(false);

    const { data, isLoading, isFetching, isError } = useCursos({
        search: query.trim() || undefined,
        limit: 5,
    });

    const cursos = data?.data ?? [];
    const hasQuery = query.trim().length > 0;

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const value = query.trim();
        setShowResults(false);

        if (!value) {
            navigate("/cursos");
            onSearchComplete?.();
            return;
        }

        navigate(`/cursos?q=${encodeURIComponent(value)}`);
        setQuery("");
        onSearchComplete?.();
    };

    const handleSelectCourse = (slug: string) => {
        const value = query.trim();

        setShowResults(false);
        setQuery("");

        if (slug) {
            navigate(`/cursos/${slug}`);
        } else {
            navigate(`/cursos?q=${encodeURIComponent(value)}`);
        }

        onSearchComplete?.();
    };

    const handleChange = (value: string) => {
        setQuery(value);
        setShowResults(value.trim().length > 0);
    };

    const results = showResults && hasQuery && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl shadow-black/10">
            <Command shouldFilter={false} className="bg-transparent">
                <CommandList className="max-h-[360px]">
                    {isLoading || isFetching ? (
                        <div className="flex items-center justify-center gap-2 px-4 py-8 text-sm text-muted-foreground">
                            <Loader2 className="size-4 animate-spin" />
                            <span>Buscando cursos...</span>
                        </div>
                    ) : isError ? (
                        <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                            No se pudieron cargar los cursos.
                        </div>
                    ) : cursos.length === 0 ? (
                        <CommandEmpty className="py-8">
                            <div className="flex flex-col items-center gap-2">
                                <Search className="size-5 text-muted-foreground/50" />
                                <span>No encontramos cursos</span>
                                <span className="text-xs text-muted-foreground">
                                    Intenta con otro término de búsqueda.
                                </span>
                            </div>
                        </CommandEmpty>
                    ) : (
                        <>
                            <CommandGroup heading="Cursos">
                                {cursos.map((curso) => (
                                    <CommandItem
                                        key={curso.id}
                                        value={curso.id}
                                        onSelect={() => handleSelectCourse(curso.slug)}
                                        className="mx-1 my-1 cursor-pointer rounded-xl px-3 py-2.5"
                                    >
                                        <div className="flex w-full items-center gap-3">
                                            <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                                                {curso.rutaPortada ? (
                                                    <img
                                                        src={curso.rutaPortada}
                                                        alt=""
                                                        className="size-full object-cover"
                                                    />
                                                ) : (
                                                    <BookOpen className="size-5 text-muted-foreground" />
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-foreground">
                                                    {curso.nombre}
                                                </p>

                                                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                                    {curso.categoria?.nombre ?? "Curso"}
                                                </p>
                                            </div>

                                            <ArrowRight className="size-4 shrink-0 text-muted-foreground/50" />
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>

                            {cursos.length >= 5 && (
                                <CommandGroup>
                                    <CommandItem
                                        value="ver-todos"
                                        onSelect={() => handleSelectCourse("")}
                                        className="mx-1 mb-1 cursor-pointer justify-center rounded-xl py-2.5 text-xs font-medium text-muted-foreground"
                                    >
                                        Ver todos los resultados
                                    </CommandItem>
                                </CommandGroup>
                            )}
                        </>
                    )}
                </CommandList>
            </Command>
        </div>
    );

    if (variant === "navbar") {
        return (
            <div className={cn("relative w-full", className)}>
                <form onSubmit={handleSearch} className="w-full">
                    <div className="group flex h-10 items-center rounded-full border border-border bg-background/70 px-3 transition-all hover:border-primary/30 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
                        <Search className="size-4 shrink-0 text-muted-foreground transition-colors group-focus-within:text-primary" />

                        <input
                            value={query}
                            onChange={(e) => handleChange(e.target.value)}
                            onFocus={() => hasQuery && setShowResults(true)}
                            type="search"
                            placeholder="Buscar cursos..."
                            className="min-w-0 flex-1 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
                        />

                        {isFetching && hasQuery ? (
                            <Loader2 className="mr-1 size-4 animate-spin text-muted-foreground" />
                        ) : (
                            <button
                                type="submit"
                                aria-label="Buscar cursos"
                                className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground"
                            >
                                <ArrowRight className="size-3.5" />
                            </button>
                        )}
                    </div>
                </form>

                {results}
            </div>
        );
    }

    return (
        <div className={cn("relative mx-auto mt-9 w-full max-w-2xl sm:mt-11", className)}>
            <form onSubmit={handleSearch}>
                <div className="group flex items-center rounded-2xl border border-border bg-background p-1.5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
                    <div className="flex size-11 shrink-0 items-center justify-center text-muted-foreground">
                        <Search className="size-5 transition-colors group-focus-within:text-primary" />
                    </div>

                    <input
                        value={query}
                        onChange={(e) => handleChange(e.target.value)}
                        onFocus={() => hasQuery && setShowResults(true)}
                        type="search"
                        placeholder="¿Qué quieres aprender?"
                        className="h-11 min-w-0 flex-1 border-0 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 sm:text-base"
                    />

                    {isFetching && hasQuery ? (
                        <div className="mr-2 flex size-11 shrink-0 items-center justify-center">
                            <Loader2 className="size-4 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.97] sm:px-5"
                        >
                            <span>Buscar</span>
                            <ArrowRight className="size-4" />
                        </button>
                    )}
                </div>
            </form>

            {results}
        </div>
    );
};
