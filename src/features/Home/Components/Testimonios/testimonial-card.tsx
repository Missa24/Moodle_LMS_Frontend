"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { Image } from "@/components/ui/image";
import { Testimonio } from "./types/testimonio";

type TestimonialCardProps = {
    testimonio: Testimonio;
    destacado?: boolean;
    mediaSide?: "left" | "right";
};

export const TestimonialCard = ({
    testimonio,
    destacado = false,
    mediaSide = "right",
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
        } else {
            video.pause();
        }
    };

    const media = testimonio.media;
    const esVideo = media?.tipo === "video";
    const tieneMedia = Boolean(media);

    return (
        <article
            className={cn(
                "relative flex w-full overflow-hidden rounded-[1.75rem] border border-border bg-card",
                destacado
                    ? "min-h-[350px] lg:h-[370px]"
                    : esVideo
                        ? "h-[330px]"
                        : "min-h-[330px]",
            )}
        >
            <div
                className={cn(
                    "grid w-full min-w-0",

                    esVideo &&
                    destacado &&
                    "grid-cols-[minmax(0,1fr)_clamp(175px,31%,225px)]",

                    esVideo &&
                    !destacado &&
                    "grid-cols-[minmax(0,1fr)_clamp(125px,38%,165px)]",

                    !esVideo &&
                    tieneMedia &&
                    destacado &&
                    "md:grid-cols-[1.1fr_0.9fr]",

                    !esVideo &&
                    (!tieneMedia || !destacado) &&
                    "grid-cols-1",
                )}
            >
                {media?.tipo === "video" &&
                    mediaSide === "left" && (
                        <VideoMedia
                            testimonio={testimonio}
                            videoRef={videoRef}
                            isPlaying={isPlaying}
                            reproducirVideo={reproducirVideo}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            className="order-1 border-r border-border/60"
                        />
                    )}

                <div
                    className={cn(
                        "relative z-10 flex min-w-0 flex-col justify-between",
                        destacado ? "p-5 sm:p-6" : "p-5",
                        esVideo && mediaSide === "left"
                            ? "order-2"
                            : "order-1",
                    )}
                >
                    <div>
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <h3
                                className={cn(
                                    "font-semibold tracking-[-0.02em] text-foreground",
                                    destacado
                                        ? "text-base sm:text-lg"
                                        : "text-sm sm:text-base",
                                )}
                            >
                                {testimonio.nombre}
                            </h3>

                            {testimonio.pais && (
                                <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-primary sm:text-[10px]">
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
                                "font-medium leading-[1.22] tracking-[-0.035em] text-foreground",
                                destacado
                                    ? "mt-5 text-xl sm:text-2xl"
                                    : esVideo
                                        ? "mt-4 text-base sm:text-lg"
                                        : "mt-4 text-lg sm:text-xl",
                            )}
                        >
                            “{testimonio.testimonio}”
                        </blockquote>
                    </div>
                </div>

                {media?.tipo === "video" &&
                    mediaSide === "right" && (
                        <VideoMedia
                            testimonio={testimonio}
                            videoRef={videoRef}
                            isPlaying={isPlaying}
                            reproducirVideo={reproducirVideo}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            className="order-2 border-l border-border/60"
                        />
                    )}

                {destacado && media?.tipo === "imagen" && (
                    <div className="relative min-h-[210px] overflow-hidden md:min-h-0">
                        <Image
                            src={media.src}
                            alt={media.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>
                )}

                {!destacado && media?.tipo === "imagen" && (
                    <div className="relative mx-5 mb-5 h-[130px] overflow-hidden rounded-[1.25rem]">
                        <Image
                            src={media.src}
                            alt={media.alt}
                            fill
                            sizes="390px"
                            className="object-cover"
                        />
                    </div>
                )}
            </div>
        </article>
    );
};

type VideoMediaProps = {
    testimonio: Testimonio;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    isPlaying: boolean;
    reproducirVideo: () => Promise<void>;
    onPlay: () => void;
    onPause: () => void;
    className?: string;
};

function VideoMedia({
    testimonio,
    videoRef,
    isPlaying,
    reproducirVideo,
    onPlay,
    onPause,
    className,
}: VideoMediaProps) {
    const media = testimonio.media;

    if (media?.tipo !== "video") {
        return null;
    }

    return (
        <div
            className={cn(
                "relative h-full min-w-0 overflow-hidden bg-neutral-950",
                className,
            )}
        >
            <video
                ref={videoRef}
                src={media.src}
                poster={media.poster}
                preload="metadata"
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                onEnded={onPause}
                onPause={onPause}
                onPlay={onPlay}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />

            {!isPlaying && (
                <button
                    type="button"
                    onClick={reproducirVideo}
                    className="absolute left-1/2 top-1/2 z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/90 text-black shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-white"
                    aria-label={`Reproducir testimonio de ${testimonio.nombre}`}
                >
                    <Play className="ml-0.5 size-5 fill-current" />
                </button>
            )}

            {isPlaying && (
                <button
                    type="button"
                    onClick={reproducirVideo}
                    className="absolute inset-0 z-10 cursor-pointer"
                    aria-label={`Pausar testimonio de ${testimonio.nombre}`}
                />
            )}
        </div>
    );
}