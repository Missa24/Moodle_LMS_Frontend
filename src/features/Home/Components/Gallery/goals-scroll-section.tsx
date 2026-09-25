"use client";

import {
    ArrowRight,
    Award,
    BookOpenCheck,
    GraduationCap,
    Rocket,
    Sparkles,
    TrendingUp,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

type Goal = {
    title: string;
    description: string;
    icon: LucideIcon;
};

const GOALS: Goal[] = [
    {
        title: "Perfecciona tus técnicas",
        description:
            "Fortalece tus habilidades y mejora tu práctica con conocimientos que puedes aplicar en tu desarrollo profesional.",
        icon: Sparkles,
    },
    {
        title: "Mantente actualizado",
        description:
            "Conoce nuevos procedimientos, técnicas y tendencias para continuar evolucionando dentro del área estética.",
        icon: BookOpenCheck,
    },
    {
        title: "Impulsa tu emprendimiento",
        description:
            "Convierte lo que aprendes en nuevas oportunidades y fortalece los servicios que puedes ofrecer.",
        icon: Rocket,
    },
    {
        title: "Crece profesionalmente",
        description:
            "Amplía tus capacidades, desarrolla nuevas habilidades y construye un perfil profesional más completo.",
        icon: TrendingUp,
    },
    {
        title: "Obtén tu certificación",
        description:
            "Completa tu formación y respalda los conocimientos adquiridos a lo largo de tu proceso de aprendizaje.",
        icon: GraduationCap,
    },
    {
        title: "Explora nuevas especialidades",
        description:
            "Descubre otras áreas de la estética y continúa ampliando tus posibilidades de formación.",
        icon: Award,
    },
];

export const GoalsScrollSection = () => {
    return (
        <section
            id="metas"
            className="scroll-mt-28 overflow-hidden py-16 sm:py-20 lg:py-28"
        >
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-[50px]">
                <div className="grid gap-6 border-b border-border pb-10 md:grid-cols-[1.1fr_0.7fr] md:items-end lg:pb-14">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl text-3xl font-medium leading-[1.04] tracking-[-0.045em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
                    >
                        Una formación que acompaña tus próximos pasos
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="max-w-lg text-sm leading-7 text-muted-foreground sm:text-base"
                    >
                        Aprende según tus objetivos, desarrolla nuevas
                        habilidades y continúa construyendo tu camino dentro
                        del mundo de la estética.
                    </motion.p>
                </div>

                <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16 xl:gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.65,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="lg:sticky lg:top-28"
                    >
                        <div className="group relative overflow-hidden rounded-[2rem] bg-muted">
                            <div className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
                                <img
                                    src="/certificado/certificado_preview.png"
                                    alt="Estudiante de estética obteniendo su certificación"
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                                />
                            </div>

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
                                <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
                                    <GraduationCap className="size-5" />
                                </div>

                                <p className="max-w-sm text-xl font-semibold leading-tight tracking-[-0.03em] sm:text-2xl">
                                    Convierte tu aprendizaje en un nuevo logro
                                    profesional.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                            duration: 0.65,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <div className="grid gap-x-8 sm:grid-cols-2">
                            {GOALS.map((goal) => {
                                const Icon = goal.icon;

                                return (
                                    <div
                                        key={goal.title}
                                        className="border-b border-border py-7 sm:py-8"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                <Icon className="size-5" />
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground sm:text-xl">
                                                    {goal.title}
                                                </h3>

                                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                                    {goal.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-10 rounded-[1.75rem] bg-muted/60 p-6 sm:p-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                                Tu próximo paso
                            </p>

                            <h3 className="mt-3 max-w-xl text-2xl font-semibold leading-tight tracking-[-0.035em] text-foreground sm:text-3xl">
                                Continúa aprendiendo y alcanza una nueva
                                certificación.
                            </h3>

                            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                                Explora nuestras opciones de formación y elige
                                la que mejor se adapte a tus objetivos
                                profesionales.
                            </p>

                            <a
                                href="#cursos"
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3 hover:opacity-90"
                            >
                                Explora nuestras certificaciones
                                <ArrowRight className="size-4" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};