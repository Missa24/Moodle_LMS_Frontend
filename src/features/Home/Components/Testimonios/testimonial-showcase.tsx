import { useRef } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { TESTIMONIOS } from "./mocks/testimonio.mock";
import { TestimonialCard } from "./testimonial-card";


export const TestimonialShowcase = () => {
    const scrollRef = useRef<HTMLDivElement | null>(
        null
    );

    const scroll = (
        direction: "left" | "right"
    ) => {
        const container = scrollRef.current;

        if (!container) {
            return;
        }

        container.scrollBy({
            left:
                direction === "right"
                    ? container.clientWidth * 0.75
                    : -container.clientWidth * 0.75,
            behavior: "smooth",
        });
    };

    return (
        <section className="overflow-hidden py-14 sm:py-16 lg:py-20">
            <div className="px-5 sm:px-8 lg:px-[50px]">
                <div className="mx-auto max-w-[1800px]">
                    <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10 lg:mb-12">
                        <div>
                            <h2 className="max-w-4xl text-3xl font-medium leading-[1.04] tracking-[-0.045em] text-foreground sm:text-4xl md:text-5xl lg:text-[3.5rem]">
                                Historias que inspiran a seguir aprendiendo
                            </h2>
                        </div>

                        <div className="hidden shrink-0 items-center gap-2 sm:flex">
                            <button
                                type="button"
                                onClick={() =>
                                    scroll("left")
                                }
                                className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary md:size-11 lg:size-12"
                                aria-label="Ver testimonios anteriores"
                            >
                                <ArrowLeft className="size-4 md:size-5" />
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    scroll("right")
                                }
                                className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 md:size-11 lg:size-12"
                                aria-label="Ver más testimonios"
                            >
                                <ArrowRight className="size-4 md:size-5" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={scrollRef}
                        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 scrollbar-none sm:gap-5 lg:gap-6"
                    >
                        {TESTIMONIOS.map(
                            (testimonio, index) => {
                                const destacado =
                                    index % 4 === 0 &&
                                    Boolean(
                                        testimonio.media
                                    );

                                return (
                                    <div
                                        key={testimonio.id}
                                        className={
                                            destacado
                                                ? "w-[88vw] max-w-[760px] shrink-0 snap-start sm:w-[75vw] lg:w-[720px]"
                                                : "w-[82vw] max-w-[430px] shrink-0 snap-start sm:w-[48vw] lg:w-[410px]"
                                        }
                                    >
                                        <TestimonialCard
                                            testimonio={
                                                testimonio
                                            }
                                            destacado={
                                                destacado
                                            }
                                        />
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};