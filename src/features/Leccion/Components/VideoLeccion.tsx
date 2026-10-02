"use client";

import { useEffect } from "react";

import {
    useGetVideoLeccion,
} from "../Hook/LeccionHook";

type Props = {
    urlVideo: string;
};

export function VideoLeccion({
    urlVideo,
}: Props) {
    const {
        data: videoSrc,
        isLoading,
        isError,
        error,
    } = useGetVideoLeccion(
        urlVideo,
        !!urlVideo
    );

    useEffect(() => {
        return () => {
            if (
                videoSrc &&
                videoSrc.startsWith(
                    "blob:"
                )
            ) {
                URL.revokeObjectURL(
                    videoSrc
                );
            }
        };
    }, [videoSrc]);

    if (isLoading) {
        return (
            <div
                className="
                    flex
                    min-h-52
                    items-center
                    justify-center
                    rounded-lg
                    bg-black
                    text-sm
                    text-white
                "
            >
                Cargando video...
            </div>
        );
    }

    if (
        isError ||
        !videoSrc
    ) {
        console.error(
            "Error cargando video",
            error
        );

        return (
            <div
                className="
                    flex
                    min-h-52
                    items-center
                    justify-center
                    rounded-lg
                    border
                    text-sm
                    text-destructive
                "
            >
                No se pudo cargar el video.
            </div>
        );
    }

    return (
        <video
            src={videoSrc}
            controls
            preload="metadata"
            className="
                w-full
                rounded-lg
                bg-black
            "
        />
    );
}