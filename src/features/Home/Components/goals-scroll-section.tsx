"use client";

import { useRef } from "react";

import {
    motion,
    MotionValue,
    useScroll,
    useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

type Goal = {
    texto: string;
    posicion: string;
    variante: "primary" | "secondary" | "card";
    entrada: number;
};

const GOALS: Goal[] = [
    {
        texto: "Perfeccionar mis técnicas",
        posicion:
            "left-[2%] top-[17%] sm:left-[7%] sm:top-[18%] lg:left-[13%] lg:top-[22%]",
        variante: "secondary",
        entrada: 0.26,
    },
    {
        texto: "Emprender",
        posicion:
            "right-[3%] top-[14%] sm:right-[9%] sm:top-[16%] lg:right-[18%] lg:top-[18%]",
        variante: "primary",
        entrada: 0.34,
    },
    {
        texto: "Obtener mi certificación",
        posicion:
            "left-[2%] bottom-[18%] sm:left-[7%] sm:bottom-[20%] lg:left-[7%] lg:bottom-[22%]",
        variante: "card",
        entrada: 0.42,
    },
    {
        texto: "Actualizar mis conocimientos",
        posicion:
            "right-[1%] bottom-[20%] sm:right-[5%] sm:bottom-[22%] lg:right-[8%] lg:bottom-[24%]",
        variante: "secondary",
        entrada: 0.5,
    },
    {
        texto: "Crecer profesionalmente",
        posicion:
            "left-[18%] bottom-[5%] sm:left-[26%] sm:bottom-[7%] lg:left-[27%] lg:bottom-[8%]",
        variante: "primary",
        entrada: 0.58,
    },
    {
        texto: "Aprender nuevas especialidades",
        posicion:
            "right-[14%] top-[5%] sm:right-[25%] sm:top-[6%] lg:right-[34%] lg:top-[7%]",
        variante: "card",
        entrada: 0.66,
    },
];

type GoalBubbleProps = {
    goal: Goal;
    progress: MotionValue<number>;
    index: number;
};

const GoalBubble = ({
    goal,
    progress,
    index,
}: GoalBubbleProps) => {
    const opacity = useTransform(
        progress,
        [
            goal.entrada,
            goal.entrada + 0.08,
            0.92,
            1,
        ],
        [0, 1, 1, 0]
    );

    const scale = useTransform(
        progress,
        [
            goal.entrada,
            goal.entrada + 0.09,
        ],
        [0.65, 1]
    );

    const y = useTransform(
        progress,
        [
            goal.entrada,
            goal.entrada + 0.09,
        ],
        [25, 0]
    );

    const rotate = useTransform(
        progress,
        [
            goal.entrada,
            goal.entrada + 0.1,
        ],
        [
            index % 2 === 0 ? -4 : 4,
            index % 2 === 0 ? -1 : 1,
        ]
    );

    return (
        <motion.div
            style={{
                opacity,
                scale,
                y,
                rotate,
            }}
            className={cn(
                "absolute z-20",
                goal.posicion
            )}
        >
            <div
                className={cn(
                    "relative flex items-center justify-center",
                    "max-w-[125px] rounded-[1.1rem]",
                    "px-3 py-2.5 text-center",
                    "text-[10px] font-semibold leading-[1.2]",
                    "tracking-[-0.02em]",
                    "shadow-sm",
                    "sm:max-w-[170px]",
                    "sm:rounded-[1.25rem]",
                    "sm:px-4 sm:py-3",
                    "sm:text-xs",
                    "md:max-w-none",
                    "md:text-sm",
                    "lg:rounded-[1.4rem]",
                    "lg:px-6 lg:py-3.5",
                    "lg:text-base",
                    goal.variante === "primary" &&
                    "bg-primary text-primary-foreground",
                    goal.variante === "secondary" &&
                    "bg-secondary text-secondary-foreground",
                    goal.variante === "card" &&
                    "border border-border bg-card text-foreground"
                )}
            >
                {goal.texto}

                <span
                    className={cn(
                        "absolute -bottom-1.5 left-1/2",
                        "size-2.5 -translate-x-1/2 rotate-45",
                        "sm:-bottom-2 sm:size-3",
                        goal.variante === "primary" &&
                        "bg-primary",
                        goal.variante === "secondary" &&
                        "bg-secondary",
                        goal.variante === "card" &&
                        "border-b border-r border-border bg-card"
                    )}
                />

                <span
                    className={cn(
                        "absolute -bottom-5 left-[54%]",
                        "size-1.5 rounded-full sm:-bottom-6 sm:size-2",
                        goal.variante === "primary" &&
                        "bg-primary/60",
                        goal.variante === "secondary" &&
                        "bg-secondary/80",
                        goal.variante === "card" &&
                        "bg-primary/40"
                    )}
                />
            </div>
        </motion.div>
    );
};

export const GoalsScrollSection = () => {
    const sectionRef = useRef<HTMLElement | null>(
        null
    );

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const titleOpacity = useTransform(
        scrollYProgress,
        [0.05, 0.16, 0.88, 0.98],
        [0, 1, 1, 0]
    );

    const titleScale = useTransform(
        scrollYProgress,
        [0.05, 0.18],
        [0.92, 1]
    );

    const titleY = useTransform(
        scrollYProgress,
        [0.05, 0.18],
        [30, 0]
    );

    const footerOpacity = useTransform(
        scrollYProgress,
        [0.76, 0.87],
        [0, 1]
    );

    return (
        <section
            ref={sectionRef}
            className="relative h-[300svh] overflow-visible sm:h-[290svh] lg:h-[280svh]"
        >
            <div className="sticky top-0 h-[100svh] overflow-hidden">
                <div className="absolute inset-0 px-4 sm:px-8 lg:px-[50px]">
                    <div className="relative mx-auto h-full max-w-[1800px]">
                        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:size-[450px] lg:size-[600px]" />

                        <motion.div
                            style={{
                                opacity: titleOpacity,
                                scale: titleScale,
                                y: titleY,
                            }}
                            className="absolute inset-0 z-10 flex items-center justify-center"
                        >
                            <div className="mx-auto max-w-[900px] px-10 text-center sm:px-14 lg:px-8">
                                <h2 className="text-[28px] font-medium leading-[1.02] tracking-[-0.045em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                                    Convierte tus metas en crecimiento profesional
                                </h2>

                                <p className="mx-auto mt-4 hidden max-w-xl text-sm leading-[1.6] text-muted-foreground sm:block md:text-base">
                                    Elige hacia dónde quieres avanzar y construye
                                    tu camino con formación práctica y
                                    especializada.
                                </p>
                            </div>
                        </motion.div>

                        {GOALS.map((goal, index) => (
                            <GoalBubble
                                key={goal.texto}
                                goal={goal}
                                progress={
                                    scrollYProgress
                                }
                                index={index}
                            />
                        ))}

                        <motion.div
                            style={{
                                opacity: footerOpacity,
                            }}
                            className="absolute bottom-[3%] left-1/2 z-20 -translate-x-1/2 sm:bottom-[4%]"
                        >
                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <span className="h-px w-4 bg-border sm:w-5" />

                                <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-[10px]">
                                    Aprende · Crece · Evoluciona
                                </span>

                                <span className="h-px w-4 bg-border sm:w-5" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};