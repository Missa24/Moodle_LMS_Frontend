import { ArrowRight } from "lucide-react";

import {
    motion,
    useReducedMotion,
} from "motion/react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { useDescuentoResumen } from "@/features/Descuentos/Hook/DescuentoResumenHook";

type RibbonProps = {
    items: string[];
    direction?: "left" | "right";
    variant?: "default" | "primary";
};

function Ribbon({
    items,
    direction = "left",
    variant = "default",
}: RibbonProps) {
    const reduceMotion =
        useReducedMotion();

    const content = (
        <div className="flex shrink-0 items-center">
            {items.map(
                (item, index) => (
                    <div
                        key={`${item}-${index}`}
                        className="flex shrink-0 items-center"
                    >
                        <span className="whitespace-nowrap px-5 text-xs font-semibold uppercase tracking-[0.18em] sm:px-8 sm:text-sm">
                            {item}
                        </span>

                        <span
                            className={
                                variant ===
                                    "primary"
                                    ? "size-1.5 shrink-0 rounded-full bg-primary-foreground/50"
                                    : "size-1.5 shrink-0 rounded-full bg-primary"
                            }
                        />
                    </div>
                ),
            )}
        </div>
    );

    return (
        <div
            className={
                variant ===
                    "primary"
                    ? "overflow-hidden border-y border-primary bg-primary py-4 text-primary-foreground"
                    : "overflow-hidden border-y border-border bg-background py-4 text-foreground"
            }
        >
            <motion.div
                className="flex w-max"
                animate={
                    reduceMotion
                        ? undefined
                        : {
                            x:
                                direction ===
                                    "left"
                                    ? [
                                        "0%",
                                        "-50%",
                                    ]
                                    : [
                                        "-50%",
                                        "0%",
                                    ],
                        }
                }
                transition={
                    reduceMotion
                        ? undefined
                        : {
                            duration: 26,
                            repeat: Infinity,
                            ease: "linear",
                        }
                }
            >
                {content}

                <div aria-hidden>
                    {content}
                </div>
            </motion.div>
        </div>
    );
}

export function PromoRibbon() {
    const {
        data,
        isError,
    } = useDescuentoResumen();

    const hayDescuentos =
        !isError &&
        data?.hayDescuentos ===
        true;

    const cantidadModulos =
        data?.cantidadModulosConDescuento ??
        0;

    const itemsPlataforma = [
        "Primera lección gratis",
        "Explora antes de inscribirte",
        "Aprende a tu ritmo",
        "Formación profesional",
        "Conoce nuestra plataforma",
    ];

    const itemsDescuentos = [
        "Descuentos activos",

        cantidadModulos === 1
            ? "1 módulo con descuento"
            : `${cantidadModulos} módulos con descuento`,

        "Promociones disponibles",
        "Aprovecha nuestras ofertas",
        "Módulos seleccionados",
    ];

    const botonTexto =
        hayDescuentos
            ? "Ver cursos con promociones"
            : "Explorar cursos";

    const botonRuta =
        hayDescuentos
            ? "/cursos?conDescuento=true"
            : "/cursos";

    return (
        <section className="overflow-hidden py-16 sm:py-20">

            <div>
                <div className="-mx-8 rotate-[-1deg]">
                    <Ribbon
                        items={
                            itemsPlataforma
                        }
                        direction="left"
                    />
                </div>

                {hayDescuentos && (
                    <div className="-mx-8 mt-2 rotate-[1deg]">
                        <Ribbon
                            items={
                                itemsDescuentos
                            }
                            direction="right"
                            variant="primary"
                        />
                    </div>
                )}
            </div>

            <div className="px-5 py-16 sm:px-8 sm:py-20 lg:px-[50px]">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Empieza explorando
                    </p>

                    <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] text-foreground sm:text-4xl lg:text-5xl">
                        Conoce una clase antes de elegir tu formación
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                        La primera lección de cada módulo está disponible gratis para que conozcas nuestra forma de enseñar y explores la plataforma antes de continuar.

                        {hayDescuentos &&
                            " Además, actualmente contamos con descuentos especiales en módulos seleccionados."}
                    </p>

                    {hayDescuentos &&
                        cantidadModulos >
                        0 && (
                            <p className="mt-4 text-sm font-medium text-foreground">
                                {cantidadModulos ===
                                    1
                                    ? "Actualmente tenemos 1 módulo con descuento."
                                    : `Actualmente tenemos ${cantidadModulos} módulos con descuentos activos.`}
                            </p>
                        )}

                    <div className="mt-8 flex justify-center">
                        <Button
                            asChild
                            size="lg"
                            className="w-full gap-2 rounded-full px-7 sm:w-auto"
                        >
                            <Link
                                to={botonRuta}
                            >
                                {botonTexto}

                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>


            <div>
                {hayDescuentos && (
                    <div className="-mx-8 rotate-[-1deg]">
                        <Ribbon
                            items={
                                itemsDescuentos
                            }
                            direction="left"
                            variant="primary"
                        />
                    </div>
                )}

                <div
                    className={
                        hayDescuentos
                            ? "-mx-8 mt-2 rotate-[1deg]"
                            : "-mx-8 rotate-[1deg]"
                    }
                >
                    <Ribbon
                        items={itemsPlataforma}
                        direction="right"
                    />
                </div>
            </div>
        </section>
    );
}