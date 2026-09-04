"use client";

import { useRef } from "react";


import {
    motion,
    useScroll,
    useTransform,
} from "motion/react";
import { Image } from "@/components/ui/image";

const COMMUNITY_IMAGES = [
    {
        src: "/community/comunidad-1.webp",
        alt: "Estudiantes de Élite Academy",
        className:
            "left-[3%] top-[18%] h-[130px] w-[180px] lg:h-[160px] lg:w-[220px] xl:h-[175px] xl:w-[240px]",
        rotate: -5,
    },
    {
        src: "/community/comunidad-2.webp",
        alt: "Clase en Élite Academy",
        className:
            "left-[29%] top-[7%] h-[115px] w-[165px] lg:h-[140px] lg:w-[195px] xl:h-[150px] xl:w-[210px]",
        rotate: 3,
    },
    {
        src: "/community/comunidad-3.webp",
        alt: "Formación profesional",
        className:
            "right-[29%] top-[15%] h-[125px] w-[160px] lg:h-[150px] lg:w-[185px] xl:h-[165px] xl:w-[200px]",
        rotate: 4,
    },
    {
        src: "/community/comunidad-4.webp",
        alt: "Experiencias educativas",
        className:
            "right-[5%] top-[9%] h-[115px] w-[165px] lg:h-[145px] lg:w-[195px] xl:h-[155px] xl:w-[210px]",
        rotate: -4,
    },
    {
        src: "/community/comunidad-5.webp",
        alt: "Comunidad Élite",
        className:
            "left-[10%] bottom-[10%] h-[140px] w-[180px] lg:h-[170px] lg:w-[215px] xl:h-[185px] xl:w-[230px]",
        rotate: 4,
    },
    {
        src: "/community/comunidad-6.webp",
        alt: "Estudiantes aprendiendo",
        className:
            "left-[39%] bottom-[5%] h-[120px] w-[155px] lg:h-[145px] lg:w-[180px] xl:h-[155px] xl:w-[195px]",
        rotate: -3,
    },
    {
        src: "/community/comunidad-7.webp",
        alt: "Actividades académicas",
        className:
            "right-[10%] bottom-[9%] h-[135px] w-[185px] lg:h-[170px] lg:w-[220px] xl:h-[180px] xl:w-[235px]",
        rotate: 5,
    },
];

const COMMUNITY_CARDS = [
    {
        titulo: "Clases que conectan",
        descripcion:
            "Aprende junto a docentes y estudiantes en experiencias que combinan conocimiento, práctica y acompañamiento.",
        imagen: "/community/clases.webp",
    },
    {
        titulo: "Experiencias en comunidad",
        descripcion:
            "Participa en actividades, encuentros y espacios donde aprender también significa compartir y crecer.",
        imagen: "/community/experiencias.webp",
    },
    {
        titulo: "Un espacio para avanzar",
        descripcion:
            "Forma parte de una comunidad que acompaña tu crecimiento académico y profesional en cada etapa.",
        imagen: "/community/comunidad.webp",
    },
];

export const CommunityScrollStory = () => {
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const introOpacity = useTransform(
        scrollYProgress,
        [0.04, 0.13, 0.26, 0.34],
        [0, 1, 1, 0]
    );

    const introScale = useTransform(
        scrollYProgress,
        [0.04, 0.17],
        [0.92, 1]
    );

    const introY = useTransform(
        scrollYProgress,
        [0.04, 0.24],
        [30, 0]
    );

    const galleryOpacity = useTransform(
        scrollYProgress,
        [0.18, 0.3, 0.52, 0.63],
        [0, 1, 1, 0]
    );

    const galleryScale = useTransform(
        scrollYProgress,
        [0.18, 0.43],
        [0.65, 1]
    );

    const galleryY = useTransform(
        scrollYProgress,
        [0.2, 0.55],
        [70, 0]
    );

    const secondTitleOpacity = useTransform(
        scrollYProgress,
        [0.6, 0.7, 0.96],
        [0, 1, 1]
    );

    const secondTitleY = useTransform(
        scrollYProgress,
        [0.6, 0.72],
        [40, 0]
    );

    const cardOneOpacity = useTransform(
        scrollYProgress,
        [0.68, 0.76],
        [0, 1]
    );

    const cardOneY = useTransform(
        scrollYProgress,
        [0.68, 0.78],
        [80, 0]
    );

    const cardTwoOpacity = useTransform(
        scrollYProgress,
        [0.74, 0.82],
        [0, 1]
    );

    const cardTwoY = useTransform(
        scrollYProgress,
        [0.74, 0.84],
        [90, 0]
    );

    const cardThreeOpacity = useTransform(
        scrollYProgress,
        [0.8, 0.88],
        [0, 1]
    );

    const cardThreeY = useTransform(
        scrollYProgress,
        [0.8, 0.9],
        [100, 0]
    );

    const cardAnimations = [
        {
            opacity: cardOneOpacity,
            y: cardOneY,
            rotate: -1,
        },
        {
            opacity: cardTwoOpacity,
            y: cardTwoY,
            rotate: 0.7,
        },
        {
            opacity: cardThreeOpacity,
            y: cardThreeY,
            rotate: -0.5,
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative h-[460svh] bg-background sm:h-[440svh] lg:h-[420svh]"
        >
            <div className="sticky top-0 h-[100svh] overflow-hidden">
                <div className="absolute inset-0 px-4 sm:px-8 lg:px-[50px]">
                    <div className="relative mx-auto h-full max-w-[1800px]">
                        <motion.div
                            style={{
                                opacity: introOpacity,
                                scale: introScale,
                                y: introY,
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <h2 className="max-w-[320px] text-center text-3xl font-medium leading-[1.02] tracking-[-0.045em] text-foreground sm:max-w-2xl sm:text-4xl md:text-5xl lg:max-w-4xl lg:text-6xl xl:text-7xl">
                                Juntos crecemos en comunidad
                            </h2>
                        </motion.div>

                        <motion.div
                            style={{
                                opacity: galleryOpacity,
                                scale: galleryScale,
                                y: galleryY,
                            }}
                            className="absolute inset-0 hidden md:block"
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="max-w-2xl text-center text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-foreground lg:text-5xl xl:text-6xl">
                                    Juntos crecemos en comunidad
                                </h2>
                            </div>

                            {COMMUNITY_IMAGES.map((imagen) => (
                                <motion.div
                                    key={imagen.src}
                                    initial={false}
                                    style={{
                                        rotate: imagen.rotate,
                                    }}
                                    className={`absolute overflow-hidden rounded-2xl border border-border bg-card shadow-xl lg:rounded-[1.5rem] ${imagen.className}`}
                                >
                                    <Image
                                        src={imagen.src}
                                        alt={imagen.alt}
                                        fill
                                        sizes="250px"
                                        className="object-cover"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            style={{
                                opacity: galleryOpacity,
                                scale: galleryScale,
                                y: galleryY,
                            }}
                            className="absolute inset-0 md:hidden"
                        >
                            <div className="absolute inset-x-0 top-[31%] z-20 text-center">
                                <h2 className="mx-auto max-w-[270px] text-2xl font-medium leading-[1.04] tracking-[-0.04em] text-foreground sm:max-w-sm sm:text-3xl">
                                    Juntos crecemos en comunidad
                                </h2>
                            </div>

                            {COMMUNITY_IMAGES
                                .slice(0, 5)
                                .map((imagen, index) => {
                                    const positions = [
                                        "left-[1%] top-[10%] h-[90px] w-[118px] sm:h-[105px] sm:w-[135px]",
                                        "right-[1%] top-[14%] h-[80px] w-[105px] sm:h-[95px] sm:w-[120px]",
                                        "left-[2%] bottom-[18%] h-[95px] w-[120px] sm:h-[110px] sm:w-[140px]",
                                        "right-[2%] bottom-[14%] h-[90px] w-[115px] sm:h-[105px] sm:w-[130px]",
                                        "left-1/2 bottom-[3%] h-[78px] w-[105px] -translate-x-1/2 sm:h-[90px] sm:w-[125px]",
                                    ];

                                    return (
                                        <div
                                            key={imagen.src}
                                            className={`absolute overflow-hidden rounded-xl border border-border bg-card shadow-md sm:rounded-2xl ${positions[index]}`}
                                        >
                                            <Image
                                                src={imagen.src}
                                                alt={imagen.alt}
                                                fill
                                                sizes="140px"
                                                className="object-cover"
                                            />
                                        </div>
                                    );
                                })}
                        </motion.div>

                        <motion.div
                            style={{
                                opacity: secondTitleOpacity,
                                y: secondTitleY,
                            }}
                            className="absolute inset-0 flex items-center"
                        >
                            <div className="mx-auto w-full max-w-[1450px] pt-16 sm:pt-20 md:pt-24 lg:pt-28">
                                <div className="mb-4 text-center sm:mb-5 lg:mb-6">
                                    <h2 className="mx-auto max-w-[320px] text-2xl font-medium leading-[1.03] tracking-[-0.045em] text-foreground sm:max-w-2xl sm:text-3xl md:max-w-4xl md:text-4xl lg:text-5xl xl:text-6xl">
                                        Siempre hay un lugar para seguir creciendo
                                    </h2>
                                </div>

                                <div className="grid gap-2.5 sm:gap-3 md:grid-cols-3 md:gap-4 lg:gap-5 xl:gap-6">
                                    {COMMUNITY_CARDS.map(
                                        (card, index) => (
                                            <motion.article
                                                key={card.titulo}
                                                style={{
                                                    opacity:
                                                        cardAnimations[index]
                                                            .opacity,
                                                    y:
                                                        cardAnimations[index]
                                                            .y,
                                                    rotate:
                                                        cardAnimations[index]
                                                            .rotate,
                                                }}
                                                className="grid min-h-[92px] grid-cols-[90px_1fr] overflow-hidden rounded-xl border border-border bg-card sm:min-h-[105px] sm:grid-cols-[105px_1fr] sm:rounded-2xl md:block md:min-h-0 lg:rounded-[1.5rem]"
                                            >
                                                <div className="relative h-full min-h-[92px] overflow-hidden sm:min-h-[105px] md:h-auto md:min-h-0 md:aspect-[16/9]">
                                                    <Image
                                                        src={card.imagen}
                                                        alt={card.titulo}
                                                        fill
                                                        sizes="(max-width: 640px) 90px, (max-width: 768px) 105px, 30vw"
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div className="flex min-w-0 flex-col justify-center p-2.5 sm:p-3 md:block md:p-3.5 lg:p-4 xl:p-5">
                                                    <h3 className="text-[13px] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-sm md:text-base lg:text-lg xl:text-xl">
                                                        {card.titulo}
                                                    </h3>

                                                    <p className="mt-1.5 line-clamp-2 text-[9px] leading-[1.45] text-muted-foreground sm:text-[10px] md:mt-2 md:line-clamp-3 md:text-xs lg:text-sm">
                                                        {card.descripcion}
                                                    </p>

                                                    <div className="mt-2 h-[3px] w-6 rounded-full bg-primary sm:w-7 md:mt-3 md:w-8 lg:w-9" />
                                                </div>
                                            </motion.article>
                                        )
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};