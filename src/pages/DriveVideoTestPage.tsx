import { useState } from "react";

export const DriveVideoTestPage = () => {
    const [fileId, setFileId] = useState("");

    const videoUrl = fileId
        ? `/api/videos/drive/${fileId}/stream`
        : "";

    return (
        <main className="min-h-screen bg-background px-5 py-12 text-foreground">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                        Prueba de video
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Google Drive Video Test
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                        Ingresa el ID del archivo almacenado en Google Drive.
                        El video será reproducido mediante el LMS.
                    </p>
                </div>

                <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium">
                        Google Drive File ID
                    </label>

                    <input
                        value={fileId}
                        onChange={(event) =>
                            setFileId(event.target.value.trim())
                        }
                        placeholder="Ej: 1AbCdEfGhIjKlMn..."
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
                    />
                </div>

                {videoUrl ? (
                    <div className="overflow-hidden rounded-2xl border border-border bg-black">
                        <div className="aspect-video">
                            <video
                                key={videoUrl}
                                controls
                                controlsList="nodownload"
                                disablePictureInPicture
                                playsInline
                                preload="metadata"
                                className="h-full w-full bg-black object-contain"
                            >
                                <source
                                    src={videoUrl}
                                    type="video/mp4"
                                />

                                Tu navegador no soporta la reproducción de video.
                            </video>
                        </div>
                    </div>
                ) : (
                    <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30">
                        <p className="text-sm text-muted-foreground">
                            Ingresa un File ID para cargar el video.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};