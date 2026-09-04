import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Image } from "@/components/ui/image";
import { Curso } from "./service";

type CourseListCardProps = {
    curso: Curso;
};

export const CourseListCard = ({
    curso,
}: CourseListCardProps) => {
    const imagen =
        curso.rutaPortada?.trim() ||
        "/cursos/curso-default.webp";

    const rutaCurso = `/cursos/${curso.id}`;

    return (
        <Link
            to={rutaCurso}
            className="group block"
        >
            <article className="grid overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg sm:grid-cols-[220px_1fr] lg:grid-cols-[270px_1fr]">
                <div className="relative aspect-[16/9] overflow-hidden bg-muted sm:aspect-auto sm:min-h-[180px]">
                    <Image
                        src={imagen}
                        alt={curso.nombre}
                        fill
                        sizes="(max-width: 640px) 100vw, 270px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                </div>

                <div className="flex min-w-0 items-center justify-between gap-5 p-5 sm:p-6 lg:p-7">
                    <div className="min-w-0">
                        {curso.categoria?.nombre && (
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
                                {curso.categoria.nombre}
                            </p>
                        )}

                        <h2 className="mt-2 text-xl font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-2xl lg:text-3xl">
                            {curso.nombre}
                        </h2>

                        <p className="mt-3 text-sm text-muted-foreground">
                            Explora el contenido del curso y
                            conoce todos los detalles de esta
                            formación.
                        </p>
                    </div>

                    <span className="hidden size-11 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground sm:flex">
                        <ArrowUpRight className="size-4" />
                    </span>
                </div>
            </article>
        </Link>
    );
};
