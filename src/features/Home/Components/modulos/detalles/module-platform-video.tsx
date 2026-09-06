import { Play } from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

export const ModulePlatformVideo = () => {
    return (
        <Card className="overflow-hidden rounded-2xl sm:rounded-3xl">
            <div className="relative aspect-video overflow-hidden bg-muted">
                <video
                    controls
                    preload="metadata"
                    poster="/videos/plataforma-poster.webp"
                    className="h-full w-full object-cover"
                >
                    <source
                        src="/videos/como-funciona-plataforma.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>

            <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    <Play className="size-4" />

                    Conoce la plataforma
                </div>

                <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-foreground">
                    Aprende desde nuestra plataforma
                </h2>

                <p className="mt-2 text-sm leading-[1.65] text-muted-foreground">
                    Descubre cómo funciona el espacio donde podrás acceder a
                    tus lecciones, recursos y contenidos durante tu formación.
                </p>
            </CardContent>
        </Card>
    );
};