import { Play } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Image } from "@/components/ui/image";
import { Curso } from "./service";

type CourseCardProps = {
    curso: Curso;
    index?: number;
    mobile?: boolean;
};

const CARD_POSITIONS = [
    {
        position:
            "lg:absolute lg:left-[1%] lg:z-10 lg:w-[270px] xl:left-[1%] xl:w-[300px]",
        transform:
            "lg:-rotate-2 lg:translate-y-5 lg:scale-[0.94]",
    },
    {
        position:
            "lg:absolute lg:left-[22%] lg:z-20 lg:w-[290px] xl:left-[21%] xl:w-[320px]",
        transform:
            "lg:-rotate-1 lg:translate-y-1 lg:scale-[0.98]",
    },
    {
        position:
            "lg:absolute lg:left-1/2 lg:z-30 lg:w-[320px] lg:-translate-x-1/2 xl:w-[350px]",
        transform:
            "lg:rotate-0 lg:-translate-y-3 lg:scale-[1.02]",
    },
    {
        position:
            "lg:absolute lg:right-[22%] lg:z-20 lg:w-[290px] xl:right-[21%] xl:w-[320px]",
        transform:
            "lg:rotate-1 lg:translate-y-1 lg:scale-[0.98]",
    },
    {
        position:
            "lg:absolute lg:right-[1%] lg:z-10 lg:w-[270px] xl:right-[1%] xl:w-[300px]",
        transform:
            "lg:rotate-2 lg:translate-y-5 lg:scale-[0.94]",
    },
];

export const CourseCard = ({
    curso,
    index = 0,
    mobile = false,
}: CourseCardProps) => {
    const position =
        CARD_POSITIONS[index] ?? CARD_POSITIONS[2];

    const imagen =
        curso.rutaPortada?.trim() ||
        "/cursos/curso-default.webp";

    const rutaCurso = `/cursos/${curso.categoria?.slug ?? "general"}/${curso.id}`;

    return (
        <article
            className={cn(
                "group w-full transition-all duration-500 ease-out",
                !mobile && position.position,
                !mobile && position.transform,
                !mobile &&
                "hover:z-50 hover:-translate-y-5 hover:rotate-0 hover:scale-[1.03]"
            )}
        >
            <Link
                to={rutaCurso}
                className="block"
                aria-label={`Ver curso ${curso.nombre}`}
            >
                <div
                    className={cn(
                        "relative h-[330px] overflow-hidden rounded-[1.75rem]",
                        "border border-border/50 bg-card",
                        "shadow-[0_18px_45px_-20px_rgba(0,0,0,0.45)]",
                        "transition-all duration-500 ease-out",
                        "sm:h-[345px]",
                        "lg:h-[355px]",
                        "xl:h-[375px]",
                        "group-hover:border-primary/40",
                        "group-hover:shadow-[0_28px_65px_-22px_rgba(0,0,0,0.55)]"
                    )}
                >
                    <Image
                        src={imagen}
                        alt={curso.nombre}
                        fill
                        sizes="        (max-width: 640px) 80vw,        (max-width: 1024px) 48vw,        350px    "
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />


                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/25 to-transparent" />

                    <div
                        className={cn(
                            "absolute right-4 top-4",
                            "flex size-10 items-center justify-center",
                            "rounded-full border border-white/20",
                            "bg-black/30 text-white backdrop-blur-xl",
                            "transition-all duration-300",
                            "group-hover:scale-110",
                            "group-hover:border-primary/60",
                            "group-hover:bg-primary",
                            "group-hover:text-primary-foreground"
                        )}
                    >
                        <Play
                            className="ml-0.5 size-4 fill-current"
                            strokeWidth={1.5}
                        />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex justify-center p-5">
                        <div className="w-full max-w-[260px] px-3 text-center">
                            {curso.categoria?.nombre && (
                                <span
                                    className={cn(
                                        "mb-3 inline-flex",
                                        "rounded-full border border-white/10",
                                        "bg-primary/90 px-3 py-1",
                                        "text-[10px] font-semibold uppercase",
                                        "tracking-[0.13em]",
                                        "text-primary-foreground",
                                        "backdrop-blur-md"
                                    )}
                                >
                                    {curso.categoria.nombre}
                                </span>
                            )}

                            <h3
                                className={cn(
                                    "mx-auto font-bold",
                                    "leading-[1.12]",
                                    "tracking-[-0.025em]",
                                    "text-white",
                                    "drop-shadow-sm",
                                    index === 2 && !mobile
                                        ? "text-2xl xl:text-[26px]"
                                        : "text-xl xl:text-[22px]"
                                )}
                            >
                                {curso.nombre}
                            </h3>

                            <div className="mx-auto mt-4 h-[2px] w-8 rounded-full bg-primary transition-all duration-300 group-hover:w-14" />
                        </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />
                </div>
            </Link>
        </article>
    );
};