import type { ReactNode } from "react";

import {
    Award,
    BookOpen,
    LogIn,
} from "lucide-react";

import { motion } from "motion/react";

type Feature = {
    number: string;
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    alt: string;
    icon: ReactNode;
    topWord: string;
    bottomWord: string;
};

const FEATURES: Feature[] = [
    {
        number: "01",
        eyebrow: "Acceso seguro",
        title: "Ingresa fácilmente",
        description:
            "Accede a tu plataforma de formación de manera rápida, clara y segura. Inicia sesión y entra directamente a un espacio organizado para continuar tu aprendizaje.",
        image: "/features/inicio.webp",
        alt: "Inicio de la plataforma de Élite Academy",
        icon: <LogIn className="size-4" />,
        topWord: "Acceso",
        bottomWord: "Seguro",
    },
    {
        number: "02",
        eyebrow: "Organiza y explora",
        title: "Todo en un lugar",
        description:
            "Encuentra tus cursos, explora el catálogo y continúa exactamente donde lo dejaste. Todo el contenido se mantiene organizado para que aprender sea más sencillo.",
        image: "/features/cursos.webp",
        alt: "Cursos dentro de la plataforma de Élite Academy",
        icon: <BookOpen className="size-4" />,
        topWord: "Organiza",
        bottomWord: "Explora",
    },
    {
        number: "03",
        eyebrow: "Logros y certificación",
        title: "Tus certificados",
        description:
            "Consulta tus logros y accede a los certificados obtenidos dentro de la plataforma para mantener tu formación disponible cuando la necesites.",
        image: "/features/certificados.webp",
        alt: "Certificados disponibles en Élite Academy",
        icon: <Award className="size-4" />,
        topWord: "Logros",
        bottomWord: "Certifica",
    },
];

type FeatureImageProps = {
    feature: Feature;
};

const FeatureImage = ({
    feature,
}: FeatureImageProps) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-black/5 sm:rounded-3xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {feature.icon}
                    </div>

                    <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            Élite Academy
                        </p>

                        <p className="text-xs font-medium text-foreground sm:text-sm">
                            Tu plataforma
                        </p>
                    </div>
                </div>

                <span className="text-3xl font-semibold tracking-[-0.06em] text-primary/15 sm:text-4xl">
                    {feature.number}
                </span>
            </div>

            <div className="bg-muted/30 p-3 sm:p-4 lg:p-5">
                <div className="overflow-hidden rounded-xl border border-border bg-background sm:rounded-2xl">
                    <div className="aspect-[16/9]">
                        <img
                            src={feature.image}
                            alt={feature.alt}
                            className="h-full w-full object-contain p-2 sm:p-3"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 border-t border-border">
                <div className="border-r border-border p-4 sm:p-5">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Paso
                    </p>

                    <p className="mt-1.5 text-base font-semibold tracking-[-0.03em] text-foreground sm:text-lg">
                        {feature.topWord}
                    </p>
                </div>

                <div className="bg-primary p-4 text-primary-foreground sm:p-5">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] opacity-70">
                        Resultado
                    </p>

                    <p className="mt-1.5 text-base font-semibold tracking-[-0.03em] sm:text-lg">
                        {feature.bottomWord}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const FeaturesStickyScroll = () => {
    return (
        <section
            id="como-funciona"
            className="scroll-mt-28 overflow-hidden py-14 sm:py-16 md:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-[50px]">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
                        Tu experiencia de aprendizaje
                    </p>

                    <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-medium leading-[1.03] tracking-[-0.045em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                        Una plataforma diseñada para acompañar tu formación
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-[1.7] text-muted-foreground sm:text-base">
                        Accede a tus cursos, continúa aprendiendo y mantén tus
                        logros organizados desde un solo lugar.
                    </p>
                </div>

                <div className="relative mt-14 sm:mt-16 lg:mt-20">
                    <div className="absolute bottom-0 left-[21px] top-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

                    <div className="space-y-14 sm:space-y-16 lg:space-y-24">
                        {FEATURES.map(
                            (
                                feature,
                                index
                            ) => {
                                const reverse =
                                    index % 2 === 1;

                                return (
                                    <motion.article
                                        key={
                                            feature.number
                                        }
                                        initial={{
                                            opacity: 0,
                                            y: 35,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                            amount: 0.2,
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            ease: [
                                                0.22,
                                                1,
                                                0.36,
                                                1,
                                            ],
                                        }}
                                        className="relative pl-16 md:pl-0"
                                    >
                                        <div className="absolute left-0 top-0 z-10 flex size-[43px] items-center justify-center rounded-full border border-primary/30 bg-background shadow-sm md:left-1/2 md:-translate-x-1/2">
                                            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                                {
                                                    feature.icon
                                                }
                                            </div>
                                        </div>

                                        <div className="md:grid md:grid-cols-[1fr_90px_1fr] md:items-center lg:grid-cols-[1fr_120px_1fr]">
                                            <div
                                                className={
                                                    reverse
                                                        ? "md:col-start-3"
                                                        : "md:col-start-1"
                                                }
                                            >
                                                <div
                                                    className={
                                                        reverse
                                                            ? "md:text-left"
                                                            : "md:text-right"
                                                    }
                                                >
                                                    <div
                                                        className={`flex items-center gap-3 ${reverse
                                                            ? "md:justify-start"
                                                            : "md:justify-end"
                                                            }`}
                                                    >
                                                        <span className="text-xs font-semibold text-primary">
                                                            {
                                                                feature.number
                                                            }
                                                        </span>

                                                        <div className="h-px w-10 bg-primary/40" />
                                                    </div>

                                                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
                                                        {
                                                            feature.eyebrow
                                                        }
                                                    </p>

                                                    <h3 className="mt-2 text-2xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-3xl lg:text-4xl">
                                                        {
                                                            feature.title
                                                        }
                                                    </h3>

                                                    <p
                                                        className={`mt-4 text-sm leading-[1.75] text-muted-foreground sm:text-base ${reverse
                                                            ? "md:mr-auto md:max-w-xl"
                                                            : "md:ml-auto md:max-w-xl"
                                                            }`}
                                                    >
                                                        {
                                                            feature.description
                                                        }
                                                    </p>

                                                    <div
                                                        className={`mt-5 flex flex-wrap gap-2 ${reverse
                                                            ? "md:justify-start"
                                                            : "md:justify-end"
                                                            }`}
                                                    >
                                                        <span className="rounded-full border border-border bg-card px-3 py-1.5 text-[10px] font-medium text-muted-foreground sm:text-xs">
                                                            {
                                                                feature.topWord
                                                            }
                                                        </span>

                                                        <span className="rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-medium text-primary sm:text-xs">
                                                            {
                                                                feature.bottomWord
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="hidden md:block" />

                                            <div
                                                className={`mt-6 md:mt-0 ${reverse
                                                    ? "md:col-start-1 md:row-start-1"
                                                    : "md:col-start-3"
                                                    }`}
                                            >
                                                <FeatureImage
                                                    feature={
                                                        feature
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};