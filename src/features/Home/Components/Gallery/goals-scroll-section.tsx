import {
    ArrowRight,
    GraduationCap,
} from "lucide-react";

const GOALS = [
    {
        number: "01",
        title: "Perfecciona tus técnicas",
        description:
            "Fortalece tus habilidades y mejora tu práctica con conocimientos aplicables a tu desarrollo profesional.",
    },
    {
        number: "02",
        title: "Mantente actualizado",
        description:
            "Conoce nuevos procedimientos, técnicas y tendencias dentro del área estética.",
    },
    {
        number: "03",
        title: "Impulsa tu emprendimiento",
        description:
            "Convierte lo aprendido en nuevas oportunidades y fortalece los servicios que puedes ofrecer.",
    },
    {
        number: "04",
        title: "Crece profesionalmente",
        description:
            "Amplía tus capacidades y construye un perfil profesional cada vez más completo.",
    },
    {
        number: "05",
        title: "Obtén tu certificación",
        description:
            "Completa tu formación y respalda los conocimientos adquiridos durante tu proceso de aprendizaje.",
    },
    {
        number: "06",
        title: "Explora nuevas especialidades",
        description:
            "Descubre nuevas áreas de la estética y continúa ampliando tus posibilidades de formación.",
    },
];

export const GoalsScrollSection = () => {
    return (
        <section
            id="metas"
            className="scroll-mt-28 py-16 sm:py-20 lg:py-28"
        >
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-[50px]">
                {/* ENCABEZADO */}
                <div className="grid gap-8 border-b border-border pb-10 md:grid-cols-[1.2fr_0.8fr] md:items-end lg:pb-14">
                    <div>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            Tu crecimiento continúa
                        </p>

                        <h2 className="max-w-3xl text-3xl font-medium leading-[1.04] tracking-[-0.045em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                            Una formación que acompaña tus próximos pasos
                        </h2>
                    </div>

                    <p className="max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                        Aprende según tus objetivos, desarrolla nuevas
                        habilidades y continúa construyendo tu camino dentro
                        del mundo de la estética.
                    </p>
                </div>

                {/* CERTIFICACIÓN */}
                <div className="grid items-center gap-10 border-b border-border py-14 md:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-20">
                    <div className="flex justify-center md:justify-start">
                        <div className="w-full max-w-[420px]">
                            <img
                                src="/certificado/certificado_preview.png"
                                alt="Vista previa de certificación Elaces Latam"
                                loading="lazy"
                                decoding="async"
                                className="h-auto w-full object-contain"
                            />
                        </div>
                    </div>

                    <div className="max-w-xl">
                        <GraduationCap className="mb-5 size-7 text-primary" />

                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                            Tu formación, respaldada
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.035em] text-foreground sm:text-3xl lg:text-4xl">
                            Cada etapa representa un nuevo logro
                        </h3>

                        <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                            La formación no termina en una clase. Cada técnica,
                            conocimiento y experiencia adquirida forma parte de
                            un proceso que fortalece tu desarrollo profesional.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                            Al completar tu proceso de formación podrás
                            respaldar los conocimientos adquiridos y continuar
                            avanzando hacia nuevos objetivos.
                        </p>
                    </div>
                </div>

                {/* OBJETIVOS */}
                <div className="py-14 lg:py-20">
                    <div className="mb-10 max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                            Lo que puedes alcanzar
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-foreground sm:text-3xl">
                            Sigue construyendo tu camino profesional
                        </h3>
                    </div>

                    <div className="grid border-t border-border md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
                        {GOALS.map((goal) => (
                            <div
                                key={goal.number}
                                className="grid grid-cols-[45px_1fr] gap-4 border-b border-border py-7 sm:grid-cols-[55px_1fr] sm:py-8"
                            >
                                <span className="pt-1 text-sm font-semibold text-primary">
                                    {goal.number}
                                </span>

                                <div>
                                    <h4 className="text-lg font-semibold tracking-[-0.025em] text-foreground sm:text-xl">
                                        {goal.title}
                                    </h4>

                                    <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
                                        {goal.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CIERRE */}
                <div className="border-t border-border pt-12 sm:pt-16">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                Tu próximo paso
                            </p>

                            <h3 className="mt-3 text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
                                Continúa aprendiendo y alcanza una nueva
                                certificación.
                            </h3>

                            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                                Explora nuestras opciones de formación y
                                encuentra la certificación que mejor se adapte
                                a tus próximos objetivos.
                            </p>
                        </div>

                        <a
                            href="/cursos"
                            className="inline-flex w-fit shrink-0 items-center gap-2 border-b border-primary pb-1 text-sm font-semibold text-primary transition-[gap] duration-200 hover:gap-3"
                        >
                            Explorar certificaciones
                            <ArrowRight className="size-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};