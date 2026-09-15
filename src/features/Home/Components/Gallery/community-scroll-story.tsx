import {
    motion,
} from "motion/react";

import { Image } from "@/components/ui/image";

const COMMUNITY_IMAGES = [
    {
        src: "/community/comunidad-1.webp",
        alt: "Estudiantes de Élite Academy",
    },
    {
        src: "/community/comunidad-2.webp",
        alt: "Clase en Élite Academy",
    },
    {
        src: "/community/comunidad-3.webp",
        alt: "Formación profesional",
    },
    {
        src: "/community/comunidad-4.webp",
        alt: "Experiencias educativas",
    },
    {
        src: "/community/comunidad-5.webp",
        alt: "Comunidad Élite",
    },
    {
        src: "/community/comunidad-6.webp",
        alt: "Estudiantes aprendiendo",
    },
    {
        src: "/community/comunidad-7.webp",
        alt: "Actividades académicas",
    },
];

const COMMUNITY_TEXTS = [
    {
        number: "01",
        title: "Aprender también es compartir",
        description:
            "Cada experiencia reúne conocimiento, práctica y acompañamiento para que el aprendizaje vaya más allá de una clase.",
    },
    {
        number: "02",
        title: "Crecer junto a otros",
        description:
            "Docentes y estudiantes forman parte de un entorno donde compartir experiencias también impulsa el crecimiento profesional.",
    },
    {
        number: "03",
        title: "Siempre hay un siguiente paso",
        description:
            "La formación continúa con nuevas experiencias, nuevos conocimientos y oportunidades para seguir avanzando.",
    },
];

export const CommunityScrollStory = () => {
    return (
        <section
            id="comunidad"
            className="scroll-mt-28 overflow-hidden bg-background py-16 sm:py-20 md:py-24 lg:py-28"
        >
            <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-[50px]">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
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
                        duration: 0.65,
                        ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                        ],
                    }}
                    className="mx-auto max-w-5xl text-center"
                >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
                        Nuestra comunidad
                    </p>

                    <h2 className="mt-3 text-3xl font-medium leading-[1.02] tracking-[-0.045em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                        Juntos crecemos,
                        aprendemos y avanzamos
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-[1.75] text-muted-foreground sm:text-base lg:text-lg">
                        Una comunidad que conecta experiencias,
                        conocimiento y personas con el deseo de
                        seguir creciendo.
                    </p>
                </motion.div>

                <div className="relative mt-12 sm:mt-16 md:mt-20">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden">
                        {COMMUNITY_IMAGES
                            .slice(0, 5)
                            .map(
                                (
                                    image,
                                    index
                                ) => (
                                    <motion.div
                                        key={
                                            image.src
                                        }
                                        initial={{
                                            opacity: 0,
                                            scale: 0.96,
                                            y: 20,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            scale: 1,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                            amount: 0.15,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay:
                                                index *
                                                0.05,
                                        }}
                                        className={
                                            index ===
                                                0
                                                ? "relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl"
                                                : "relative aspect-[4/3] overflow-hidden rounded-2xl"
                                        }
                                    >
                                        <Image
                                            src={
                                                image.src
                                            }
                                            alt={
                                                image.alt
                                            }
                                            fill
                                            sizes={
                                                index ===
                                                    0
                                                    ? "100vw"
                                                    : "50vw"
                                            }
                                            className="object-cover"
                                        />
                                    </motion.div>
                                )
                            )}
                    </div>

                    <div className="relative hidden h-[620px] md:block lg:h-[720px] xl:h-[780px]">
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.94,
                                y: 25,
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            transition={{
                                duration: 0.7,
                            }}
                            className="absolute left-[4%] top-[13%] h-[170px] w-[230px] rotate-[-5deg] overflow-hidden rounded-[1.5rem] lg:h-[210px] lg:w-[290px] xl:h-[230px] xl:w-[320px]"
                        >
                            <Image
                                src={
                                    COMMUNITY_IMAGES[0]
                                        .src
                                }
                                alt={
                                    COMMUNITY_IMAGES[0]
                                        .alt
                                }
                                fill
                                sizes="320px"
                                className="object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.94,
                                y: 25,
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            transition={{
                                duration: 0.7,
                                delay: 0.08,
                            }}
                            className="absolute left-[31%] top-[2%] h-[145px] w-[205px] rotate-[3deg] overflow-hidden rounded-[1.5rem] lg:h-[180px] lg:w-[250px] xl:h-[200px] xl:w-[280px]"
                        >
                            <Image
                                src={
                                    COMMUNITY_IMAGES[1]
                                        .src
                                }
                                alt={
                                    COMMUNITY_IMAGES[1]
                                        .alt
                                }
                                fill
                                sizes="280px"
                                className="object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.94,
                                y: 25,
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            transition={{
                                duration: 0.7,
                                delay: 0.16,
                            }}
                            className="absolute right-[6%] top-[10%] h-[160px] w-[220px] rotate-[-4deg] overflow-hidden rounded-[1.5rem] lg:h-[200px] lg:w-[280px] xl:h-[220px] xl:w-[310px]"
                        >
                            <Image
                                src={
                                    COMMUNITY_IMAGES[3]
                                        .src
                                }
                                alt={
                                    COMMUNITY_IMAGES[3]
                                        .alt
                                }
                                fill
                                sizes="310px"
                                className="object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.94,
                                y: 25,
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            transition={{
                                duration: 0.7,
                                delay: 0.22,
                            }}
                            className="absolute left-[13%] bottom-[5%] h-[170px] w-[235px] rotate-[4deg] overflow-hidden rounded-[1.5rem] lg:h-[210px] lg:w-[290px] xl:h-[230px] xl:w-[320px]"
                        >
                            <Image
                                src={
                                    COMMUNITY_IMAGES[4]
                                        .src
                                }
                                alt={
                                    COMMUNITY_IMAGES[4]
                                        .alt
                                }
                                fill
                                sizes="320px"
                                className="object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.94,
                                y: 25,
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            transition={{
                                duration: 0.7,
                                delay: 0.3,
                            }}
                            className="absolute right-[16%] bottom-[3%] h-[165px] w-[230px] rotate-[-3deg] overflow-hidden rounded-[1.5rem] lg:h-[205px] lg:w-[285px] xl:h-[225px] xl:w-[315px]"
                        >
                            <Image
                                src={
                                    COMMUNITY_IMAGES[6]
                                        .src
                                }
                                alt={
                                    COMMUNITY_IMAGES[6]
                                        .alt
                                }
                                fill
                                sizes="315px"
                                className="object-cover"
                            />
                        </motion.div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.96,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.3,
                                }}
                                transition={{
                                    duration: 0.7,
                                    delay: 0.15,
                                }}
                                className="max-w-lg text-center lg:max-w-xl"
                            >
                                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary lg:text-xs">
                                    Élite Academy
                                </p>

                                <p className="mt-4 text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-foreground lg:text-5xl xl:text-6xl">
                                    Una comunidad para seguir
                                    creciendo
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-border sm:mt-20 lg:mt-24">
                    {COMMUNITY_TEXTS.map(
                        (
                            item,
                            index
                        ) => (
                            <motion.div
                                key={
                                    item.number
                                }
                                initial={{
                                    opacity: 0,
                                    y: 30,
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
                                    duration: 0.55,
                                    delay:
                                        index *
                                        0.06,
                                }}
                                className="grid gap-4 border-b border-border py-7 sm:py-9 md:grid-cols-[100px_1fr_1fr] md:items-start md:gap-8 lg:grid-cols-[140px_0.85fr_1.15fr] lg:py-11"
                            >
                                <div>
                                    <span className="text-sm font-semibold text-primary sm:text-base">
                                        {
                                            item.number
                                        }
                                    </span>
                                </div>

                                <h3 className="max-w-md text-xl font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-2xl lg:text-3xl">
                                    {
                                        item.title
                                    }
                                </h3>

                                <p className="max-w-xl text-sm leading-[1.7] text-muted-foreground sm:text-base">
                                    {
                                        item.description
                                    }
                                </p>
                            </motion.div>
                        )
                    )}
                </div>

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 25,
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
                    }}
                    className="pt-14 text-center sm:pt-16 lg:pt-20"
                >
                    <p className="mx-auto max-w-4xl text-3xl font-medium leading-[1.03] tracking-[-0.045em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                        Siempre hay un lugar para seguir creciendo
                    </p>

                    <div className="mx-auto mt-6 h-1 w-14 rounded-full bg-primary sm:w-16" />
                </motion.div>
            </div>
        </section>
    );
};