import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Image } from "@/components/ui/image";
import { Modulo } from "./service";

type ModuleListCardProps = {
    modulo: Modulo;
};

export const ModuleListCard = ({
    modulo,
}: ModuleListCardProps) => {
    const imagen =
        modulo.rutaImagen?.trim() ||
        "/modulos/modulo-default.webp";

    const rutaModulo = `/cursos/${modulo.cursoId}/modulos/${modulo.id}`;

    return (
        <Link
            to={rutaModulo}
            className="group block"
        >
            <article className="grid overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-md sm:grid-cols-[180px_1fr] md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr]">
                <div className="relative aspect-[16/9] overflow-hidden bg-muted sm:aspect-auto sm:min-h-[150px]">
                    <Image
                        src={imagen}
                        alt={modulo.nombre}
                        fill
                        sizes="(max-width: 640px) 100vw, 250px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                </div>

                <div className="flex min-w-0 items-center justify-between gap-4 p-4 sm:p-5 lg:p-6">
                    <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
                            Módulo{" "}
                            {String(modulo.orden).padStart(
                                2,
                                "0"
                            )}
                        </p>

                        <h2 className="mt-2 text-lg font-semibold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-xl md:text-2xl">
                            {modulo.nombre}
                        </h2>
                    </div>

                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground sm:size-11">
                        <ArrowRight className="size-4" />
                    </span>
                </div>
            </article>
        </Link>
    );
};
