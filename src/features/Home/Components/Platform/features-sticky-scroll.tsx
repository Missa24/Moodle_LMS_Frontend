"use client";

import {
    Award,
    BookOpen,
    MonitorSmartphone,
} from "lucide-react";

import { motion } from "motion/react";

const FEATURES = [
    {
        icon: BookOpen,
        title: "Aprende a tu ritmo",
        description:
            "Accede a tus cursos, módulos y lecciones desde un solo lugar.",
    },
    {
        icon: MonitorSmartphone,
        title: "Desde cualquier dispositivo",
        description:
            "Continúa tu formación desde computadora, tablet o celular.",
    },
    {
        icon: Award,
        title: "Progreso y certificación",
        description:
            "Consulta tu avance y accede a tus certificados cuando los necesites.",
    },
];

export const FeaturesStickyScroll = () => {
    return (
        <section
            id="como-funciona"
            className="scroll-mt-28 overflow-hidden py-14 sm:py-16 md:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-[50px]">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
                        Tu experiencia de aprendizaje
                    </p>

                    <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-medium leading-[1.03] tracking-[-0.045em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                        Tu formación, estés donde estés
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-[1.7] text-muted-foreground sm:text-base">
                        Accede a tus cursos, continúa aprendiendo y consulta tu
                        progreso desde una plataforma pensada para acompañarte.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                        duration: 0.75,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative mx-auto mt-12 max-w-6xl sm:mt-16 lg:mt-20"
                >
                    <div className="relative mx-auto max-w-5xl">
                        <img
                            src="/features/laptop.png"
                            alt="Plataforma Élite Academy en computadora"
                            className="h-auto w-full object-contain"
                        />

                        <motion.div
                            initial={{ opacity: 0, x: 35, y: 25 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.7,
                                delay: 0.2,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="absolute -bottom-10 right-[2%] hidden w-[21%] min-w-[180px] max-w-[255px] lg:block"
                        >
                            <img
                                src="/features/mobile.png"
                                alt="Plataforma Élite Academy en celular"
                                className="h-auto w-full object-contain drop-shadow-2xl"
                            />
                        </motion.div>
                    </div>

                    <div className="mt-4 flex justify-center lg:hidden">
                        <img
                            src="/features/mobile.png"
                            alt="Plataforma Élite Academy en celular"
                            className="h-auto w-[55%] max-w-[250px] object-contain drop-shadow-xl sm:w-[36%]"
                        />
                    </div>
                </motion.div>

                <div className="mx-auto mt-14 grid max-w-5xl gap-8 sm:mt-16 md:grid-cols-3 md:gap-10 lg:mt-20">
                    {FEATURES.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className="text-center md:text-left"
                            >
                                <div className="mx-auto flex size-9 items-center justify-center text-primary md:mx-0">
                                    <Icon className="size-5" />
                                </div>

                                <h3 className="mt-3 text-base font-semibold tracking-[-0.025em] text-foreground sm:text-lg">
                                    {feature.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};