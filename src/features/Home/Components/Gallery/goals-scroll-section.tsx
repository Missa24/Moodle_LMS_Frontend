"use client";

import {
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

type GoalGroup = {
    image: string;
    alt: string;
    goals: Goal[];
};

const GROUPS: GoalGroup[] = [
    {
        image: "/goals/tecnicas.webp",
        alt: "Estudiante perfeccionando técnicas de estética",
        goals: [
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
        ],
    },
    {
        image: "/goals/emprendimiento.webp",
        alt: "Profesional desarrollando su emprendimiento en estética",
        goals: [
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
        ],
    },
    {
        image: "/goals/certificacion.webp",
        alt: "Estudiante de estética obteniendo una certificación",
        goals: [
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
        ],
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
                        Aprende según tus objetivos y continúa construyendo tu
                        camino dentro del mundo de la estética.
                    </motion.p>
                </div>

                <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-20 lg:space-y-28">
                    {GROUPS.map((group, index) => {
                        const reverse = index % 2 === 1;

                        return (
                            <motion.article
                                key={group.image}
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.65,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20"
                            >
                                <div
                                    className={
                                        reverse
                                            ? "md:order-2"
                                            : ""
                                    }
                                >
                                    <div className="group relative overflow-hidden rounded-[2rem] bg-muted">
                                        <div className="aspect-[4/3] sm:aspect-[16/11]">
                                            <img
                                                src={group.image}
                                                alt={group.alt}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                                            />
                                        </div>

                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                                    </div>
                                </div>

                                <div
                                    className={
                                        reverse
                                            ? "md:order-1"
                                            : ""
                                    }
                                >
                                    <div className="space-y-0">
                                        {group.goals.map((goal, goalIndex) => {
                                            const Icon = goal.icon;

                                            return (
                                                <div
                                                    key={goal.title}
                                                    className={
                                                        goalIndex > 0
                                                            ? "border-t border-border pt-8 sm:pt-10"
                                                            : "pb-8 sm:pb-10"
                                                    }
                                                >
                                                    <div className="flex items-start gap-4 sm:gap-5">
                                                        <div className="mt-1 shrink-0 text-primary">
                                                            <Icon className="size-5" />
                                                        </div>

                                                        <div className="max-w-lg">
                                                            <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl lg:text-[28px]">
                                                                {goal.title}
                                                            </h3>

                                                            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                                                                {goal.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};