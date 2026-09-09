import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { CourseCard } from "./Cursos/course-card";
import { Skeleton } from "@/components/ui/skeleton";

import { useCursos } from "./Cursos/service";

export const FeaturedCourses = () => {
    const { data, isLoading } = useCursos({
        page: 1,
        limit: 5,
    });

    if (isLoading) {
        return (
            <section
                id="cursos"
                className="relative scroll-mt-28 overflow-hidden py-16 sm:py-20 lg:py-24"
            >
                <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-[50px]">
                    <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl space-y-4">
                            <Skeleton className="h-3 w-28" />

                            <Skeleton className="h-9 w-full max-w-md" />

                            <Skeleton className="h-4 w-full max-w-xl" />

                            <Skeleton className="h-4 w-4/5 max-w-lg" />
                        </div>

                        <Skeleton className="h-10 w-40 rounded-full" />
                    </div>

                    <div className="flex gap-4 overflow-hidden lg:hidden">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-[390px] w-[82vw] max-w-[340px] shrink-0 rounded-3xl sm:w-[46vw]"
                            />
                        ))}
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="relative flex h-[440px] items-center justify-center xl:h-[480px] 2xl:h-[500px]">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="absolute h-[390px] w-[280px] rounded-3xl xl:h-[420px] xl:w-[300px]"
                                    style={{
                                        transform: `translateX(${(index - 2) * 45}px)`,
                                        zIndex: index,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 flex items-center gap-3 border-t border-border/70 pt-5 sm:mt-12">
                        <Skeleton className="h-px w-8" />
                        <Skeleton className="h-2.5 w-64" />
                    </div>
                </div>
            </section>
        );
    }

    const cursos = data?.data?.slice(0, 5) ?? [];

    if (cursos.length === 0) {
        return null;
    }

    return (
        <section
            id="cursos"
            className="relative scroll-mt-28 overflow-hidden py-16 sm:py-20 lg:py-24"
        >
            <div className="pointer-events-none absolute -left-40 top-24 size-[350px] rounded-full bg-primary/[0.04] blur-3xl sm:size-[450px]" />

            <div className="pointer-events-none absolute -right-40 bottom-10 size-[350px] rounded-full bg-secondary/30 blur-3xl sm:size-[450px]" />

            <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-[50px]">
                <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-primary" />

                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
                                Cursos destacados
                            </p>
                        </div>

                        <h2 className="mt-3 text-2xl font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-3xl lg:text-4xl">
                            Encuentra tu próxima formación
                        </h2>

                        <p className="mt-3 max-w-xl text-sm leading-[1.7] text-muted-foreground sm:text-base">
                            Explora nuestros cursos y continúa desarrollando
                            nuevas habilidades para avanzar en tu formación
                            profesional.
                        </p>
                    </div>

                    <div className="shrink-0">
                        <Button
                            variant="outline"
                            className="group rounded-full"
                            asChild
                        >
                            <Link to="/cursos">
                                Ver todos los cursos

                                <ArrowUpRight className="ml-2 size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="lg:hidden">
                    <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 scrollbar-none sm:-mx-8 sm:gap-5 sm:px-8">
                        {cursos.map((curso, index) => (
                            <div
                                key={curso.id}
                                className="w-[82vw] max-w-[340px] shrink-0 snap-center sm:w-[46vw] sm:max-w-[360px] md:w-[42vw] md:max-w-[390px]"
                            >
                                <CourseCard
                                    curso={curso}
                                    index={index}
                                    mobile
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-2 flex items-center justify-center gap-1.5">
                        {cursos.map((curso, index) => (
                            <span
                                key={curso.id}
                                className={
                                    index === 0
                                        ? "h-1 w-7 rounded-full bg-primary"
                                        : "h-1 w-2.5 rounded-full bg-primary/20"
                                }
                            />
                        ))}
                    </div>
                </div>

                <div className="relative hidden lg:block">
                    <div className="relative flex h-[440px] items-center justify-center xl:h-[480px] 2xl:h-[500px]">
                        {cursos.map((curso, index) => (
                            <CourseCard
                                key={curso.id}
                                curso={curso}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-10 flex items-center gap-3 border-t border-border/70 pt-5 sm:mt-12">
                    <span className="h-px w-8 bg-primary/40" />

                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-[10px]">
                        Aprende a tu ritmo · Avanza a tu manera
                    </p>
                </div>
            </div>
        </section>
    );
};
