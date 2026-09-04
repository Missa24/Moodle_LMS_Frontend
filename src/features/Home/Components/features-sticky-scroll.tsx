"use client";

import { useEffect, useRef, useState } from "react";


import { cn } from "@/lib/utils";
import { Image } from "@/components/ui/image";

type Feature = {
    palabraSuperior: string;
    palabraMedia: string;
    tituloCorto: string;
    titulo: string;
    descripcion: string;
    imagen: string;
    forma: "circulo" | "cuadrado" | "triangulo";
};

const FEATURES: Feature[] = [
    {
        palabraSuperior: "Acceso",
        palabraMedia: "Seguro",
        tituloCorto: "Ingresa fácilmente",
        titulo:
            "Accede a tu plataforma de formación de manera rápida, clara y segura",
        descripcion:
            "Inicia sesión y entra directamente a un espacio organizado para gestionar tu aprendizaje y continuar tu formación.",
        imagen: "/features/inicio.webp",
        forma: "circulo",
    },
    {
        palabraSuperior: "Organiza",
        palabraMedia: "Explora",
        tituloCorto: "Todo en un lugar",
        titulo:
            "Encuentra tus cursos, explora el catálogo y continúa exactamente donde lo dejaste",
        descripcion:
            "Consulta tus cursos disponibles y accede a una experiencia diseñada para que navegar y continuar aprendiendo sea sencillo.",
        imagen: "/features/cursos.webp",
        forma: "cuadrado",
    },
    {
        palabraSuperior: "Logros",
        palabraMedia: "Certifica",
        tituloCorto: "Tus certificados",
        titulo:
            "Consulta tus logros y descarga los certificados obtenidos dentro de la plataforma",
        descripcion:
            "Mantén tus certificados disponibles en un solo espacio y accede a ellos cuando necesites respaldar tu formación.",
        imagen: "/features/certificados.webp",
        forma: "triangulo",
    },
];

const Forma = ({
    tipo,
    className,
}: {
    tipo: Feature["forma"];
    className?: string;
}) => {
    if (tipo === "cuadrado") {
        return (
            <div
                className={cn(
                    "relative size-7 rotate-12 rounded-lg border-2 border-current",
                    "sm:size-8 md:size-9 lg:size-11 xl:size-12",
                    className
                )}
            >
                <div className="absolute -bottom-1.5 -right-1.5 size-3 rounded bg-current opacity-30 sm:size-3.5 lg:size-4" />
            </div>
        );
    }

    if (tipo === "triangulo") {
        return (
            <div
                className={cn(
                    "relative size-8 sm:size-9 md:size-10 lg:size-12 xl:size-14",
                    className
                )}
            >
                <div
                    className={cn(
                        "absolute left-1/2 top-1/2 h-0 w-0",
                        "-translate-x-1/2 -translate-y-1/2",
                        "border-b-[24px] border-l-[14px] border-r-[14px]",
                        "border-b-current border-l-transparent border-r-transparent",
                        "sm:border-b-[28px] sm:border-l-[16px] sm:border-r-[16px]",
                        "lg:border-b-[34px] lg:border-l-[20px] lg:border-r-[20px]",
                        "xl:border-b-[38px] xl:border-l-[22px] xl:border-r-[22px]"
                    )}
                />
            </div>
        );
    }

    return (
        <div
            className={cn(
                "relative size-8 rounded-full border-2 border-current",
                "sm:size-9 md:size-10 lg:size-12 xl:size-14",
                className
            )}
        >
            <div className="absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current sm:size-3 lg:size-3.5" />
        </div>
    );
};

const Progress = ({
    activeIndex,
}: {
    activeIndex: number;
}) => {
    return (
        <div className="flex items-center gap-1.5 sm:gap-2">
            {FEATURES.map((_, index) => (
                <span
                    key={index}
                    className={cn(
                        "h-1 rounded-full transition-all duration-500",
                        activeIndex === index
                            ? "w-7 bg-primary sm:w-9 lg:w-10"
                            : "w-2 bg-muted sm:w-3 lg:w-4"
                    )}
                />
            ))}
        </div>
    );
};

export const FeaturesStickyScroll = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const updateActiveFeature = () => {
            const section = sectionRef.current;

            if (!section) {
                return;
            }

            const rect = section.getBoundingClientRect();

            const scrollableHeight =
                section.offsetHeight - window.innerHeight;

            if (scrollableHeight <= 0) {
                return;
            }

            const scrolled = Math.min(
                Math.max(-rect.top, 0),
                scrollableHeight
            );

            const progress = scrolled / scrollableHeight;

            const nextIndex = Math.min(
                FEATURES.length - 1,
                Math.floor(progress * FEATURES.length)
            );

            setActiveIndex(nextIndex);
        };

        updateActiveFeature();

        window.addEventListener(
            "scroll",
            updateActiveFeature,
            {
                passive: true,
            }
        );

        window.addEventListener(
            "resize",
            updateActiveFeature
        );

        return () => {
            window.removeEventListener(
                "scroll",
                updateActiveFeature
            );

            window.removeEventListener(
                "resize",
                updateActiveFeature
            );
        };
    }, []);

    const activeFeature = FEATURES[activeIndex];

    return (
        <section
            ref={sectionRef}
            className="relative h-[300svh]"
        >
            <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden py-5 sm:py-7 md:py-9 lg:py-10">
                <div className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-primary/10 blur-[140px]" />

                <div className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-secondary/50 blur-[150px]" />

                <div className="relative mx-auto w-full max-w-[1800px] px-4 sm:px-6 md:px-8 lg:px-[50px]">
                    <div className="grid grid-cols-[0.78fr_1.42fr] gap-3 sm:gap-4 md:hidden">
                        <div className="grid h-[68svh] min-h-[400px] max-h-[500px] grid-rows-[0.72fr_0.72fr_1.56fr] gap-3">
                            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-secondary p-3 sm:p-4">
                                <Forma
                                    tipo={activeFeature.forma}
                                    className="self-end text-primary opacity-80"
                                />

                                <span
                                    key={`mobile-superior-${activeIndex}`}
                                    className="inline-block -rotate-2 text-sm font-semibold leading-none tracking-[-0.035em] text-secondary-foreground sm:text-base"
                                >
                                    {activeFeature.palabraSuperior}
                                </span>

                                <span className="absolute right-2.5 top-2.5 text-[10px] font-semibold text-muted-foreground/50">
                                    0{activeIndex + 1}
                                </span>
                            </div>

                            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary/20 bg-card p-3 sm:p-4">
                                <span
                                    key={`mobile-medio-${activeIndex}`}
                                    className="inline-block rotate-1 text-sm font-medium tracking-[-0.035em] text-foreground sm:text-base"
                                >
                                    {activeFeature.palabraMedia}
                                </span>

                                <Forma
                                    tipo={
                                        activeIndex === 0
                                            ? "cuadrado"
                                            : activeIndex === 1
                                                ? "triangulo"
                                                : "circulo"
                                    }
                                    className="self-end text-primary/35"
                                />

                                <div className="absolute bottom-0 left-0 h-1 w-[55%] bg-primary" />
                            </div>

                            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-primary p-3.5 text-primary-foreground sm:p-4">
                                <p
                                    key={`mobile-corto-${activeIndex}`}
                                    className="animate-in fade-in slide-in-from-bottom-2 text-base font-semibold leading-[1.05] tracking-[-0.04em] duration-500 sm:text-xl"
                                >
                                    {activeFeature.tituloCorto}
                                </p>

                                <div>
                                    <span className="text-[9px] font-semibold uppercase tracking-[0.14em] opacity-70 sm:text-[10px]">
                                        Élite Academy
                                    </span>

                                    <div className="mt-2.5 flex gap-1.5">
                                        <span className="size-2.5 rounded-full bg-primary-foreground/70" />

                                        <span className="size-3 rotate-12 rounded-[2px] border border-primary-foreground/60" />

                                        <span className="h-0 w-0 border-b-[11px] border-l-[6px] border-r-[6px] border-b-primary-foreground/40 border-l-transparent border-r-transparent" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex h-[68svh] min-h-[400px] max-h-[500px] min-w-0 flex-col gap-3">
                            <div
                                key={`mobile-image-${activeIndex}`}
                                className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-muted/20 shadow-lg"
                            >
                                <Image
                                    src={activeFeature.imagen}
                                    alt={activeFeature.tituloCorto}
                                    fill
                                    sizes="65vw"
                                    className="animate-in fade-in object-contain p-1.5 duration-500"
                                    priority={activeIndex === 0}
                                />

                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent" />
                            </div>

                            <div className="flex min-h-0 flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-3.5 sm:p-4">
                                <div
                                    key={`mobile-content-${activeIndex}`}
                                    className="animate-in fade-in slide-in-from-bottom-2 duration-500"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-[10px]">
                                            Tu plataforma
                                        </p>

                                        <span className="text-[11px] font-semibold text-primary/25">
                                            0{activeIndex + 1}
                                        </span>
                                    </div>

                                    <h3 className="mt-2.5 text-[13px] font-semibold leading-[1.15] tracking-[-0.03em] text-foreground sm:text-base">
                                        {activeFeature.titulo}
                                    </h3>

                                    <p className="mt-2.5 line-clamp-4 text-[10px] leading-[1.55] text-muted-foreground sm:text-xs">
                                        {activeFeature.descripcion}
                                    </p>
                                </div>

                                <div className="mt-3">
                                    <Progress
                                        activeIndex={activeIndex}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden h-[68svh] min-h-[460px] max-h-[580px] grid-cols-[0.62fr_1.5fr_0.88fr] items-stretch gap-4 md:grid lg:grid-cols-[0.58fr_1.9fr_0.82fr] lg:gap-6 xl:gap-8">
                        <div className="grid min-h-0 grid-rows-[0.7fr_0.7fr_1.6fr] gap-4 lg:gap-5">
                            <div className="relative flex items-center justify-between overflow-hidden rounded-2xl border border-border bg-secondary p-4 lg:rounded-[1.75rem] lg:p-5 xl:p-6">
                                <span
                                    key={`superior-${activeIndex}`}
                                    className="inline-block -rotate-3 text-lg font-semibold tracking-[-0.035em] text-secondary-foreground lg:text-xl xl:text-2xl"
                                >
                                    {activeFeature.palabraSuperior}
                                </span>

                                <Forma
                                    tipo={activeFeature.forma}
                                    className="shrink-0 text-primary opacity-80"
                                />
                            </div>

                            <div className="relative flex items-center justify-between overflow-hidden rounded-2xl border border-primary/20 bg-card p-4 lg:rounded-[1.75rem] lg:p-5 xl:p-6">
                                <Forma
                                    tipo={
                                        activeIndex === 0
                                            ? "cuadrado"
                                            : activeIndex === 1
                                                ? "triangulo"
                                                : "circulo"
                                    }
                                    className="shrink-0 text-primary/40"
                                />

                                <span
                                    key={`medio-${activeIndex}`}
                                    className="inline-block rotate-2 text-right text-base font-medium tracking-[-0.035em] text-foreground lg:text-lg xl:text-xl"
                                >
                                    {activeFeature.palabraMedia}
                                </span>

                                <div className="absolute bottom-0 left-0 h-1.5 w-[55%] bg-primary" />
                            </div>

                            <div className="relative flex min-h-0 flex-col justify-between overflow-hidden rounded-2xl bg-primary p-5 text-primary-foreground lg:rounded-[1.75rem] lg:p-6 xl:p-7">
                                <p
                                    key={`corto-${activeIndex}`}
                                    className="animate-in fade-in slide-in-from-bottom-2 max-w-[260px] text-xl font-semibold leading-[1.03] tracking-[-0.045em] duration-500 lg:text-2xl xl:text-3xl"
                                >
                                    {activeFeature.tituloCorto}
                                </p>

                                <div className="flex items-end justify-between gap-2">
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] opacity-75 lg:text-[11px] xl:text-xs">
                                        Élite Academy
                                    </span>

                                    <div className="flex items-end gap-2">
                                        <span className="size-3 rounded-full bg-primary-foreground/70 lg:size-3.5" />

                                        <span className="size-4 rotate-12 rounded-[3px] border-2 border-primary-foreground/60 lg:size-[18px]" />

                                        <span className="h-0 w-0 border-b-[16px] border-l-[9px] border-r-[9px] border-b-primary-foreground/40 border-l-transparent border-r-transparent lg:border-b-[18px] lg:border-l-[10px] lg:border-r-[10px]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex min-h-0 items-center">
                            <div
                                key={`imagen-${activeIndex}`}
                                className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/60 bg-muted/20 shadow-xl shadow-black/5 lg:rounded-[1.75rem]"
                            >
                                <Image
                                    src={activeFeature.imagen}
                                    alt={activeFeature.tituloCorto}
                                    fill
                                    sizes="(max-width: 1024px) 54vw, 62vw"
                                    className="animate-in fade-in object-contain p-2 duration-500 lg:p-3"
                                    priority={activeIndex === 0}
                                />

                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent" />

                                <div className="absolute bottom-3 left-3 flex items-center gap-2 lg:bottom-4 lg:left-4">
                                    <span className="size-2 rounded-full bg-primary lg:size-2.5" />

                                    <span className="size-2 rotate-45 border border-primary lg:size-2.5" />

                                    <span className="h-0 w-0 border-b-[9px] border-l-[5px] border-r-[5px] border-b-primary border-l-transparent border-r-transparent opacity-70 lg:border-b-[11px] lg:border-l-[6px] lg:border-r-[6px]" />
                                </div>
                            </div>
                        </div>

                        <div className="relative flex min-h-0 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 lg:rounded-[1.75rem] lg:p-6 xl:p-7">
                            <div
                                key={`derecha-${activeIndex}`}
                                className="animate-in fade-in slide-in-from-bottom-2 duration-500"
                            >
                                <div className="mb-4 flex items-center justify-between gap-2 lg:mb-5">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary lg:text-[11px] xl:text-xs">
                                        Tu plataforma
                                    </p>

                                    <Forma
                                        tipo={activeFeature.forma}
                                        className="scale-75 text-primary opacity-30"
                                    />
                                </div>

                                <h3 className="text-lg font-medium leading-[1.1] tracking-[-0.035em] text-foreground lg:text-xl xl:text-2xl">
                                    {activeFeature.titulo}
                                </h3>

                                <p className="mt-4 line-clamp-6 text-xs leading-[1.6] text-muted-foreground lg:text-sm xl:text-base">
                                    {activeFeature.descripcion}
                                </p>
                            </div>

                            <div>
                                <div className="mb-4 lg:mb-5">
                                    <Progress
                                        activeIndex={activeIndex}
                                    />
                                </div>

                                <div className="border-t border-border pt-4 lg:pt-5">
                                    <div className="flex items-end justify-between gap-3">
                                        <span className="max-w-[110px] text-[10px] uppercase leading-[1.5] tracking-[0.1em] text-muted-foreground lg:text-[11px] xl:text-xs">
                                            Diseñado para acompañar tu formación
                                        </span>

                                        <span className="text-4xl font-semibold leading-none tracking-[-0.07em] text-primary/15 lg:text-5xl xl:text-6xl">
                                            0{activeIndex + 1}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};