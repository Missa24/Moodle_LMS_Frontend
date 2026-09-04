import {
    Award,
    BookOpenCheck,
    GraduationCap,
    Rocket,
    Sparkles,
    TrendingUp,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

type Goal = {
    number: string;
    title: string;
    description: string;
    icon: LucideIcon;
};

const GOALS: Goal[] = [
    {
        number: "01",
        title: "Perfeccionar mis técnicas",
        description:
            "Fortalece tus habilidades y mejora tu práctica profesional.",
        icon: Sparkles,
    },
    {
        number: "02",
        title: "Emprender",
        description:
            "Convierte tus conocimientos en nuevas oportunidades.",
        icon: Rocket,
    },
    {
        number: "03",
        title: "Obtener mi certificación",
        description:
            "Respalda tu formación y continúa avanzando.",
        icon: GraduationCap,
    },
    {
        number: "04",
        title: "Actualizar mis conocimientos",
        description:
            "Mantente al día y descubre nuevas técnicas.",
        icon: BookOpenCheck,
    },
    {
        number: "05",
        title: "Crecer profesionalmente",
        description:
            "Amplía tus capacidades y alcanza nuevos objetivos.",
        icon: TrendingUp,
    },
    {
        number: "06",
        title: "Aprender nuevas especialidades",
        description:
            "Explora nuevas áreas y continúa ampliando tu formación.",
        icon: Award,
    },
];

const GoalItem = ({
    goal,
    align = "left",
}: {
    goal: Goal;
    align?: "left" | "right";
}) => {
    const Icon = goal.icon;

    return (
        <div
            className={`group flex items-center gap-4 ${align === "right"
                    ? "md:flex-row-reverse md:text-right"
                    : ""
                }`}
        >
            <div className="relative shrink-0">
                <div className="flex size-11 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground sm:size-12">
                    <Icon className="size-[18px] sm:size-5" />
                </div>

                <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-background text-[7px] font-bold text-primary ring-1 ring-border">
                    {goal.number}
                </span>
            </div>

            <div className="min-w-0">
                <h3 className="text-sm font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-base lg:text-[17px]">
                    {goal.title}
                </h3>

                <p className="mt-1 max-w-[280px] text-xs leading-[1.55] text-muted-foreground sm:text-[13px]">
                    {goal.description}
                </p>
            </div>
        </div>
    );
};

export const GoalsScrollSection = () => {
    return (
        <section
            id="metas"
            className="relative scroll-mt-28 overflow-hidden bg-background py-16 sm:py-20 lg:py-24"
        >
            {/* Decoración de fondo */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.035] blur-3xl sm:size-[600px] lg:size-[760px]" />

            <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-[50px]">
                {/* Encabezado */}
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5">
                        <span className="size-1.5 rounded-full bg-primary" />

                        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-[10px]">
                            Tus objetivos importan
                        </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-3xl lg:text-4xl">
                        ¿Cuál es tu próxima meta?
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-[1.65] text-muted-foreground sm:text-base">
                        Cada estudiante tiene un objetivo diferente.
                        Encuentra el tuyo y sigue construyendo tu camino.
                    </p>
                </div>

                {/* DESKTOP / TABLET */}
                <div className="relative mt-14 hidden min-h-[520px] md:block lg:mt-16 lg:min-h-[570px]">
                    {/* Órbita exterior */}
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[390px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-border lg:h-[430px] lg:w-[760px]" />

                    {/* Órbita interior */}
                    <div className="pointer-events-none absolute left-1/2 top-1/2 size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 lg:size-[300px]" />

                    {/* Centro */}
                    <div className="absolute left-1/2 top-1/2 z-10 flex size-[190px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-border bg-background text-center shadow-sm lg:size-[220px]">
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <TrendingUp className="size-[18px]" />
                        </div>

                        <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-primary">
                            Tu crecimiento
                        </p>

                        <p className="mt-1.5 max-w-[145px] text-base font-semibold leading-[1.15] tracking-[-0.025em] text-foreground lg:text-lg">
                            Aprende a tu ritmo y avanza
                        </p>
                    </div>

                    {/* Izquierda arriba */}
                    <div className="absolute left-[3%] top-[5%] lg:left-[7%]">
                        <GoalItem
                            goal={GOALS[0]}
                            align="left"
                        />
                    </div>

                    {/* Derecha arriba */}
                    <div className="absolute right-[3%] top-[5%] lg:right-[7%]">
                        <GoalItem
                            goal={GOALS[1]}
                            align="right"
                        />
                    </div>

                    {/* Izquierda centro */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 lg:left-[2%]">
                        <GoalItem
                            goal={GOALS[2]}
                            align="left"
                        />
                    </div>

                    {/* Derecha centro */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 lg:right-[2%]">
                        <GoalItem
                            goal={GOALS[3]}
                            align="right"
                        />
                    </div>

                    {/* Izquierda abajo */}
                    <div className="absolute bottom-[4%] left-[7%] lg:left-[12%]">
                        <GoalItem
                            goal={GOALS[4]}
                            align="left"
                        />
                    </div>

                    {/* Derecha abajo */}
                    <div className="absolute bottom-[4%] right-[7%] lg:right-[12%]">
                        <GoalItem
                            goal={GOALS[5]}
                            align="right"
                        />
                    </div>
                </div>

                {/* MOBILE */}
                <div className="relative mt-10 md:hidden">
                    <div className="absolute bottom-6 left-[21px] top-6 w-px bg-border" />

                    <div className="space-y-7">
                        {GOALS.map((goal) => {
                            const Icon = goal.icon;

                            return (
                                <div
                                    key={goal.number}
                                    className="relative flex gap-4"
                                >
                                    <div className="relative z-10 flex size-[43px] shrink-0 items-center justify-center rounded-full border border-primary/20 bg-background text-primary">
                                        <Icon className="size-[17px]" />
                                    </div>

                                    <div className="min-w-0 pb-1 pt-0.5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-bold tracking-[0.12em] text-primary">
                                                {goal.number}
                                            </span>

                                            <div className="h-px w-5 bg-primary/30" />
                                        </div>

                                        <h3 className="mt-1.5 text-[15px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-base">
                                            {goal.title}
                                        </h3>

                                        <p className="mt-1.5 max-w-sm text-xs leading-[1.55] text-muted-foreground sm:text-sm">
                                            {goal.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Cierre */}
                <div className="mx-auto mt-12 flex max-w-xl items-center justify-center gap-3 border-t border-border pt-7 text-center sm:mt-14">
                    <div className="h-px w-6 bg-primary/40 sm:w-9" />

                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-[10px]">
                        Aprende · Crece · Evoluciona
                    </p>

                    <div className="h-px w-6 bg-primary/40 sm:w-9" />
                </div>
            </div>
        </section>
    );
};