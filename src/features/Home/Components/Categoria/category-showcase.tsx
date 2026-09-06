"use client";

import { useRef } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCategorias } from "./service/category.service";
import { CategorySkeleton } from "./category-skeleton";
import { CategoryCard } from "./category-card";


export const CategoryShowcase = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const {
        data: categorias = [],
        isLoading,
        isError,
    } = useCategorias();

    const scroll = (
        direction: "left" | "right"
    ) => {
        const container = scrollRef.current;

        if (!container) {
            return;
        }

        container.scrollBy({
            left:
                direction === "right"
                    ? container.clientWidth * 0.8
                    : -container.clientWidth * 0.8,
            behavior: "smooth",
        });
    };

    if (isError) {
        return null;
    }

    return (
        <section id="categorias" className="overflow-hidden py-12 sm:py-14 md:py-16 lg:py-20">
            <div className="px-5 sm:px-8 lg:px-[50px]">
                <div className="mx-auto max-w-[1800px]">
                    <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9 md:mb-10 lg:mb-12">
                        <div className="max-w-4xl">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
                                Explora por áreas
                            </p>

                            <h2 className="mt-2.5 max-w-4xl text-2xl font-medium leading-[1.05] tracking-[-0.045em] text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                                ¿Qué quieres aprender hoy?
                            </h2>

                            <p className="mt-3 max-w-xl text-[13px] leading-[1.6] text-muted-foreground sm:text-sm md:mt-4 md:text-base">
                                Encuentra una ruta de aprendizaje y empieza a desarrollar nuevas habilidades.
                            </p>
                        </div>

                        <div className="hidden shrink-0 items-center gap-2 sm:flex">
                            <button
                                type="button"
                                onClick={() =>
                                    scroll("left")
                                }
                                className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary md:size-10 lg:size-11"
                                aria-label="Ver categorías anteriores"
                            >
                                <ArrowLeft className="size-4 md:size-[18px]" />
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    scroll("right")
                                }
                                className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 md:size-10 lg:size-11"
                                aria-label="Ver más categorías"
                            >
                                <ArrowRight className="size-4 md:size-[18px]" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={scrollRef}
                        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 scrollbar-none sm:-mx-8 sm:gap-5 sm:px-8 lg:-mx-[50px] lg:gap-6 lg:px-[50px]"
                    >
                        {isLoading
                            ? Array.from({
                                length: 4,
                            }).map((_, index) => (
                                <CategorySkeleton
                                    key={index}
                                />
                            ))
                            : categorias.map(
                                (categoria) => (
                                    <CategoryCard
                                        key={categoria.id}
                                        categoria={
                                            categoria
                                        }
                                    />
                                )
                            )}
                    </div>
                </div>
            </div>
        </section>
    );
};