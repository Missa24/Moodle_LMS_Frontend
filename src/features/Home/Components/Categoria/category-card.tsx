import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Categoria } from "./service/category.service";
import { CategoryArtwork } from "./category-artwork";

type CategoryCardProps = {
    categoria: Categoria;
};

export const CategoryCard = ({
    categoria,
}: CategoryCardProps) => {
    const rutaCategoria = `/cursos?categoriaId=${categoria.id}`;

    return (
        <Link
            to={rutaCategoria}
            className="group block w-[78vw] max-w-[390px] shrink-0 snap-start sm:w-[46vw] lg:w-[350px] xl:w-[390px]"
        >
            <article
                className={cn(
                    "relative h-[430px] overflow-hidden rounded-[2rem]",
                    "border border-border bg-card",
                    "transition-all duration-300",
                    "hover:border-primary/40",
                    "hover:-translate-y-1",
                    "hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.35)]"
                )}
            >
                {/* Contenido */}
                <div className="relative z-20 flex h-full flex-col justify-between p-7">
                    {/* Información */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                            Área de aprendizaje
                        </p>

                        <h3 className="mt-3 max-w-[280px] text-3xl font-semibold leading-[1.02] tracking-[-0.05em] text-foreground">
                            {categoria.nombre}
                        </h3>

                        {categoria.subcategorias?.length > 0 && (
                            <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
                                {categoria.subcategorias
                                    .slice(0, 3)
                                    .map((subcategoria) => (
                                        <span
                                            key={subcategoria.id}
                                            className="text-xs text-muted-foreground"
                                        >
                                            {subcategoria.nombre}
                                        </span>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* Botón */}
                    <div className="relative z-30">
                        <span
                            className={cn(
                                "flex size-11 items-center justify-center",
                                "rounded-full border border-border",
                                "bg-background text-foreground",
                                "transition-all duration-300",
                                "group-hover:border-primary",
                                "group-hover:bg-primary",
                                "group-hover:text-primary-foreground",
                                "group-hover:translate-x-1"
                            )}
                        >
                            <ArrowRight className="size-5" />
                        </span>
                    </div>
                </div>

                {/* Ilustración */}
                <CategoryArtwork slug={categoria.slug} />

                {/* Overlay sutil */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background/20 via-transparent to-transparent" />

                {/* Borde interior */}
                <div className="pointer-events-none absolute inset-0 z-40 rounded-[2rem] ring-1 ring-inset ring-white/10" />
            </article>
        </Link>
    );
};
