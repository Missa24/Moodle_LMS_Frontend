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

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-12 sm:mt-16"
                >
                    <div className="overflow-hidden rounded-[2rem] border border-border bg-muted/20 p-4 sm:p-6 lg:p-8">
                        <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-[1.5rem] bg-background sm:aspect-[16/8]">
                            <img
                                src="/certificado/certificado_preview.png"
                                alt="Vista previa de certificación"
                                className="h-full w-full object-contain"
                            />
                        </div>

                        <div className="flex flex-col gap-3 px-1 pb-1 pt-6 sm:flex-row sm:items-end sm:justify-between sm:px-2">
                            <div>
                                <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">
                                    Tu formación también representa un logro
                                </h3>

                                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                                    Cada etapa de aprendizaje suma nuevas
                                    herramientas, conocimientos y experiencias
                                    para continuar avanzando profesionalmente.
                                </p>
                            </div>

                            <GraduationCap className="hidden size-8 shrink-0 text-primary sm:block" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                        duration: 0.65,
                        delay: 0.05,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
                >
                    {GOALS.map((goal) => {
                        const Icon = goal.icon;

                        return (
                            <div
                                key={goal.title}
                                className="border-b border-border py-8"
                            >
                                <Icon className="mb-5 size-6 text-primary" />

                                <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">
                                    {goal.title}
                                </h3>

                                <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">
                                    {goal.description}
                                </p>
                            </div>
                        );
                    })}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-12 rounded-[1.75rem] bg-muted/60 p-6 sm:p-8 lg:mt-16 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:p-10"
                >
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                            Tu próximo paso
                        </p>

                        <h3 className="mt-3 max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.035em] text-foreground sm:text-3xl lg:text-4xl">
                            Continúa aprendiendo y alcanza una nueva
                            certificación.
                        </h3>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                            Explora nuestras opciones de formación y elige la
                            que mejor se adapte a tus objetivos profesionales.
                        </p>
                    </div>

                    <a
                        href="#cursos"
                        className="mt-7 inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3 hover:opacity-90 lg:mt-0"
                    >
                        Explora nuestras certificaciones
                        <ArrowRight className="size-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};