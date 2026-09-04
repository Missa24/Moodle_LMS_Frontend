import { FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom"

import { Search, ArrowRight } from "lucide-react";

export const CourseSearch = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = query.trim();
        if (!value) return;
        navigate(`/cursos?q=${encodeURIComponent(value)}`); 
    };


    return (
        <div className="mx-auto mt-9 w-full max-w-2xl sm:mt-11">
            <form onSubmit={handleSearch}>
                <div
                    className="
                        group flex items-center
                        rounded-2xl border border-border
                        bg-background
                        p-1.5
                        shadow-sm
                        transition-all duration-200
                        hover:border-primary/30
                        hover:shadow-md
                        focus-within:border-primary/50
                        focus-within:ring-4
                        focus-within:ring-primary/10
                    "
                >
                    <div className="flex size-11 shrink-0 items-center justify-center text-muted-foreground">
                        <Search className="size-5 transition-colors group-focus-within:text-primary" />
                    </div>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="search"
                        placeholder="¿Qué quieres aprender?"
                        className="
                            h-11 min-w-0 flex-1
                            border-0 bg-transparent
                            px-2
                            text-sm text-foreground
                            outline-none
                            placeholder:text-muted-foreground/70
                            sm:text-base
                        "
                    />

                    <button
                        type="submit"
                        className="
                            flex h-11 shrink-0 items-center gap-2
                            rounded-xl
                            bg-primary px-4
                            text-sm font-medium
                            text-primary-foreground
                            shadow-sm
                            transition-all duration-200
                            hover:bg-primary/90
                            active:scale-[0.97]
                            sm:px-5
                        "
                    >
                        <span>Buscar</span>
                        <ArrowRight className="size-4" />
                    </button>
                </div>
            </form>
        </div>
    );
};
