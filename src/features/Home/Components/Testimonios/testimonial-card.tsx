"use client";

import { useRef, useState } from "react";


import { Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { Image } from "@/components/ui/image";
import { Testimonio } from "./types/testimonio";

type TestimonialCardProps = {
    testimonio: Testimonio;
    destacado?: boolean;
};

export const TestimonialCard = ({
    testimonio,
    destacado = false,
}: TestimonialCardProps) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const reproducirVideo = async () => {
        const video = videoRef.current;

        if (!video) {
            return;
        }

        if (video.paused) {
            await video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const tieneMedia = Boolean(testimonio.media);

    return (
        <article
            className={cn(
                "relative flex w-full overflow-hidden rounded-[1.75rem]",
                "border border-border bg-card",
                destacado
                    ? "min-h-[350px] lg:h-[370px]"
                    : "min-h-[330px]"
            )}
        >
            <div
                className={cn(
                    "grid w-full min-w-0",
                    tieneMedia && destacado
                        ? "md:grid-cols-[1.1fr_0.9fr]"
                        : "grid-cols-1"
                )}
            >
                <div
                    className={cn(
                        "relative z-10 flex min-w-0 flex-col justify-between",
                        destacado
                            ? "p-5 sm:p-6"
                            : "p-5"
                    )}
                >
                    <div>
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <h3 className="text-base font-semibold tracking-[-0.02em] text-foreground sm:text-lg">
                                {testimonio.nombre}
                            </h3>

                            {testimonio.pais && (
                                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-primary">
                                    {testimonio.pais}
                                </span>
                            )}
                        </div>

                        {testimonio.profesion && (
                            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                                {testimonio.profesion}
                            </p>
                        )}

                        <blockquote
                            className={cn(
                                "font-medium leading-[1.2] tracking-[-0.035em] text-foreground",
                                destacado
                                    ? "mt-5 text-xl sm:text-2xl"
                                    : "mt-4 text-lg sm:text-xl"
                            )}
                        >
                            “{testimonio.testimonio}”
                        </blockquote>
                    </div>
                </div>

                {destacado &&
                    testimonio.media?.tipo === "imagen" && (
                        <div className="relative min-h-[210px] overflow-hidden md:min-h-0">
                            <Image
                                src={testimonio.media.src}
                                alt={testimonio.media.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 40vw"
                                className="object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                        </div>
                    )}

                {destacado &&
                    testimonio.media?.tipo === "video" && (
                        <div className="relative min-h-[210px] overflow-hidden bg-black md:min-h-0">
                            <video
                                ref={videoRef}
                                src={testimonio.media.src}
                                poster={testimonio.media.poster}
                                preload="metadata"
                                playsInline
                                className="absolute inset-0 h-full w-full object-cover"
                                onEnded={() => setIsPlaying(false)}
                                onPause={() => setIsPlaying(false)}
                                onPlay={() => setIsPlaying(true)}
                            />

                            {!isPlaying && (
                                <button
                                    type="button"
                                    onClick={reproducirVideo}
                                    className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur-xl"
                                    aria-label={`Reproducir testimonio de ${testimonio.nombre}`}
                                >
                                    <Play className="ml-0.5 size-5 fill-current" />
                                </button>
                            )}

                            {isPlaying && (
                                <button
                                    type="button"
                                    onClick={reproducirVideo}
                                    className="absolute inset-0 cursor-pointer"
                                    aria-label={`Pausar testimonio de ${testimonio.nombre}`}
                                />
                            )}
                        </div>
                    )}

                {!destacado &&
                    testimonio.media?.tipo === "imagen" && (
                        <div className="relative mx-5 mb-5 h-[130px] overflow-hidden rounded-[1.25rem]">
                            <Image
                                src={testimonio.media.src}
                                alt={testimonio.media.alt}
                                fill
                                sizes="390px"
                                className="object-cover"
                            />
                        </div>
                    )}

                {!destacado &&
                    testimonio.media?.tipo === "video" && (
                        <div className="relative mx-5 mb-5 h-[130px] overflow-hidden rounded-[1.25rem] bg-black">
                            <video
                                ref={videoRef}
                                src={testimonio.media.src}
                                poster={testimonio.media.poster}
                                preload="metadata"
                                playsInline
                                className="absolute inset-0 h-full w-full object-cover"
                                onEnded={() => setIsPlaying(false)}
                                onPause={() => setIsPlaying(false)}
                                onPlay={() => setIsPlaying(true)}
                            />

                            {!isPlaying && (
                                <button
                                    type="button"
                                    onClick={reproducirVideo}
                                    className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur-xl"
                                    aria-label={`Reproducir testimonio de ${testimonio.nombre}`}
                                >
                                    <Play className="ml-0.5 size-5 fill-current" />
                                </button>
                            )}
                        </div>
                    )}
            </div>
        </article>
    );
};