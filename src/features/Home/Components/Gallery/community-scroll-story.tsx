const COMMUNITY_IMAGES = [
    {
        src: "/comunidad/1.webp",
        alt: "Estudiantes de Elaces",
    },
    {
        src: "/comunidad/2.webp",
        alt: "Clase en Elaces",
    },
    {
        src: "/comunidad/3.webp",
        alt: "Formación profesional",
    },
    {
        src: "/comunidad/4.webp",
        alt: "Experiencias educativas",
    },
    {
        src: "/comunidad/5.webp",
        alt: "Comunidad Élite",
    },
    {
        src: "/comunidad/6.webp",
        alt: "Estudiantes aprendiendo",
    },
    {
        src: "/comunidad/7.webp",
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
            className="bg-background py-16 sm:py-20 lg:py-28"
        >
            <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
                {/* CABECERA */}
                <div className="mx-auto max-w-4xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                        Nuestra comunidad
                    </p>

                    <h2 className="mt-4 text-3xl font-medium leading-[1.05] tracking-[-0.04em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                        Juntos crecemos,
                        <br />
                        aprendemos y avanzamos
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                        Una comunidad que conecta experiencias, conocimiento y
                        personas con el deseo de seguir creciendo.
                    </p>
                </div>

                {/* GALERÍA */}
                <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:mt-16 md:grid-cols-4 lg:gap-5">
                    {/* FOTO PRINCIPAL */}
                    <div className="col-span-2 row-span-2 overflow-hidden rounded-3xl bg-muted">
                        <img
                            src={COMMUNITY_IMAGES[0].src}
                            alt={COMMUNITY_IMAGES[0].alt}
                            loading="lazy"
                            decoding="async"
                            className="aspect-[4/3] h-full w-full object-cover"
                        />
                    </div>

                    {COMMUNITY_IMAGES.slice(1).map((image, index) => (
                        <div
                            key={image.src}
                            className={`overflow-hidden rounded-2xl bg-muted ${index === 4
                                ? "hidden md:block"
                                : ""
                                }`}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                loading="lazy"
                                decoding="async"
                                className="aspect-[4/3] h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                            />
                        </div>
                    ))}
                </div>

                {/* TEXTO CENTRAL */}
                <div className="mx-auto mt-16 max-w-4xl text-center sm:mt-20">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                        Elaces
                    </p>

                    <h3 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
                        Una comunidad para seguir creciendo
                    </h3>
                </div>

                {/* INFORMACIÓN */}
                <div className="mt-16 border-t border-border sm:mt-20">
                    {COMMUNITY_TEXTS.map((item) => (
                        <div
                            key={item.number}
                            className="grid gap-4 border-b border-border py-7 sm:py-9 md:grid-cols-[80px_1fr_1.2fr] md:gap-8 lg:py-10"
                        >
                            <span className="text-sm font-semibold text-primary">
                                {item.number}
                            </span>

                            <h3 className="text-xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-2xl">
                                {item.title}
                            </h3>

                            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CIERRE */}
                <div className="pt-14 text-center sm:pt-20">
                    <p className="mx-auto max-w-4xl text-3xl font-medium leading-[1.05] tracking-[-0.04em] text-foreground sm:text-4xl md:text-5xl">
                        Siempre hay un lugar para seguir creciendo
                    </p>

                    <div className="mx-auto mt-6 h-1 w-14 rounded-full bg-primary" />
                </div>
            </div>
        </section>
    );
};