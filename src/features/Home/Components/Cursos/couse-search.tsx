import {
    FormEvent,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
    ArrowRight,
    Search,
} from "lucide-react";

import { cn } from "@/lib/utils";

type CourseSearchProps = {
    variant?: "hero" | "navbar";
    className?: string;
    onSearchComplete?: () => void;
};

export const CourseSearch = ({
    variant = "hero",
    className,
    onSearchComplete,
}: CourseSearchProps) => {
    const navigate = useNavigate();

    const [query, setQuery] =
        useState("");

    const handleSearch = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const value =
            query.trim();

        if (!value) {
            navigate("/cursos");
            onSearchComplete?.();
            return;
        }

        navigate(
            `/cursos?q=${encodeURIComponent(
                value
            )}`
        );

        setQuery("");

        onSearchComplete?.();
    };

    if (variant === "navbar") {
        return (
            <form
                onSubmit={handleSearch}
                className={cn(
                    "w-full",
                    className
                )}
            >
                <div className="group flex h-10 items-center rounded-full border border-border bg-background/70 px-3 transition-all duration-200 hover:border-primary/30 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
                    <Search className="size-4 shrink-0 text-muted-foreground transition-colors group-focus-within:text-primary" />

                    <input
                        value={query}
                        onChange={(event) =>
                            setQuery(
                                event.target
                                    .value
                            )
                        }
                        type="search"
                        placeholder="Buscar cursos..."
                        className="min-w-0 flex-1 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
                    />

                    <button
                        type="submit"
                        aria-label="Buscar cursos"
                        className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                        <ArrowRight className="size-3.5" />
                    </button>
                </div>
            </form>
        );
    }

    return (
        <div
            className={cn(
                "mx-auto mt-9 w-full max-w-2xl sm:mt-11",
                className
            )}
        >
            <form
                onSubmit={
                    handleSearch
                }
            >
                <div className="group flex items-center rounded-2xl border border-border bg-background p-1.5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
                    <div className="flex size-11 shrink-0 items-center justify-center text-muted-foreground">
                        <Search className="size-5 transition-colors group-focus-within:text-primary" />
                    </div>

                    <input
                        value={query}
                        onChange={(event) =>
                            setQuery(
                                event.target
                                    .value
                            )
                        }
                        type="search"
                        placeholder="¿Qué quieres aprender?"
                        className="h-11 min-w-0 flex-1 border-0 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 sm:text-base"
                    />

                    <button
                        type="submit"
                        className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 active:scale-[0.97] sm:px-5"
                    >
                        <span>
                            Buscar
                        </span>

                        <ArrowRight className="size-4" />
                    </button>
                </div>
            </form>
        </div>
    );
};