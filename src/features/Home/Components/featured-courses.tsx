import { useEffect, useState } from "react";

import { CourseCard } from "./Cursos/course-card";
import { getCursos } from "./Cursos/service";
import type { Curso } from "./Cursos/service";

export const FeaturedCourses = () => {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let activo = true;

        const cargarCursos = async () => {
            try {
                const cursosResponse = await getCursos({
                    page: 1,
                    limit: 5,
                });

                if (activo) {
                    setCursos(
                        cursosResponse.data.slice(0, 5)
                    );
                }
            } catch (error) {
                console.error(
                    "Error al cargar cursos destacados:",
                    error
                );

                if (activo) {
                    setCursos([]);
                }
            } finally {
                if (activo) {
                    setLoading(false);
                }
            }
        };

        cargarCursos();

        return () => {
            activo = false;
        };
    }, []);

    if (loading) {
        return (
            <section
                id="cursos"
                className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
            >
                <div className="relative w-full px-5 sm:px-8 lg:px-[50px]">
                    <div className="relative mx-auto h-[430px] max-w-[1600px] animate-pulse rounded-2xl bg-muted/30 xl:h-[460px]" />
                </div>
            </section>
        );
    }

    if (cursos.length === 0) {
        return null;
    }

    return (
        <section
            id="cursos"
            className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
        >
            <div className="relative w-full px-5 sm:px-8 lg:px-[50px]">
                <div className="relative mx-auto max-w-[1600px]">
                    {/* MOBILE */}
                    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-10 scrollbar-none lg:hidden">
                        {cursos.map((curso, index) => (
                            <div
                                key={curso.id}
                                className="w-[78vw] max-w-[340px] shrink-0 snap-center sm:w-[46vw]"
                            >
                                <CourseCard
                                    curso={curso}
                                    index={index}
                                    mobile
                                />
                            </div>
                        ))}
                    </div>

                    {/* DESKTOP */}
                    <div className="relative hidden h-[430px] items-center justify-center lg:flex xl:h-[460px]">
                        {cursos.map((curso, index) => (
                            <CourseCard
                                key={curso.id}
                                curso={curso}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
