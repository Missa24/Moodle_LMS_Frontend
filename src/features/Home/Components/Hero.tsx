"use client";

import { Image } from "@/components/ui/image";

import { RotatingWord } from "../ui/rotating-word";
import { CourseSearch } from "./Cursos/couse-search";

const ROTATING_WORDS = [
    "aprendizaje",
    "conocimiento",
    "progreso",
    "crecimiento",
];

export const Hero = () => {
    return (
        <section className="relative flex min-h-[82svh] items-center overflow-hidden pb-12 pt-24 sm:min-h-[86svh] sm:pb-16 sm:pt-28 lg:min-h-[82svh] lg:pb-20 lg:pt-36">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2200&auto=format&fit=crop"
                    alt="Personas aprendiendo"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-background/88 sm:bg-background/84" />

                <div className="absolute inset-0 bg-gradient-to-b from-background/45 via-background/80 to-background" />
            </div>

            <div className="pointer-events-none absolute left-1/2 top-[35%] -z-10 size-[280px] -translate-x-1/2 rounded-full bg-primary/15 blur-[110px] sm:size-[420px] lg:size-[560px]" />

            <div className="w-full px-5 sm:px-8 lg:px-[50px]">
                <div className="mx-auto max-w-[1800px]">
                    <div className="mx-auto max-w-[1100px] text-center">
                        <h1 className="mx-auto mt-4 max-w-[1050px] text-[clamp(2.6rem,11vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em] text-foreground sm:mt-5 sm:text-[clamp(3.8rem,8vw,5.5rem)] lg:text-[clamp(5rem,6.7vw,7rem)]">
                            El{" "}
                            <span className="block text-primary sm:inline">
                                <RotatingWord
                                    words={ROTATING_WORDS}
                                    className="min-h-[1em]"
                                />
                            </span>{" "}
                            <span className="block sm:inline">
                                transforma tu futuro
                            </span>
                        </h1>

                        <p className="mx-auto mt-5 max-w-[620px] text-sm leading-[1.65] text-muted-foreground sm:mt-7 sm:text-base md:max-w-[700px] md:text-lg lg:mt-8">
                            Descubre cursos, desarrolla nuevas habilidades y aprende de
                            profesionales que convierten su experiencia en conocimiento.
                        </p>

                        <div className="mx-auto mt-7 max-w-2xl sm:mt-9 lg:mt-10">
                            <CourseSearch />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};