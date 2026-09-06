import { useState } from "react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    ArrowLeft,
    BookOpen,
} from "lucide-react";

import { useAuthDialogStore } from "@/store/authDialogStore";
import { useAuthStore } from "@/store/authStore";

import { useModulo } from "./service";
import { useLecciones } from "./detalles/service";

import { ModuleLessonsList } from "./detalles/module-lessons-list";
import { ModulePlatformVideo } from "./detalles/module-platform-video";
import { ModulePriceCard } from "./detalles/module-price-card";
import { LessonPurchaseDialog } from "./detalles/lesson-purchase-dialog";





const POST_LOGIN_REDIRECT_KEY =
    "elite_post_login_redirect";

export default function ModuloPageContent() {
    const navigate = useNavigate();

    const {
        cursoId,
        moduloId,
    } = useParams<{
        cursoId: string;
        moduloId: string;
    }>();

    const token = useAuthStore(
        (state) => state.token
    );

    const openLoginDialog =
        useAuthDialogStore(
            (state) => state.open
        );

    const [
        purchaseOpen,
        setPurchaseOpen,
    ] = useState(false);

    const [
        selectedLesson,
        setSelectedLesson,
    ] = useState<string | null>(
        null
    );

    const {
        data: modulo,
        isLoading: isLoadingModulo,
        isError: isErrorModulo,
    } = useModulo(
        moduloId ?? ""
    );

    const {
        data: lecciones = [],
        isLoading:
        isLoadingLecciones,
        isError:
        isErrorLecciones,
    } = useLecciones(
        moduloId ?? "",
        {
            estaPublicada: true,
        }
    );

    const handleLessonClick = (
        nombre: string
    ) => {
        setSelectedLesson(
            nombre
        );

        setPurchaseOpen(true);
    };

    const handleAccessModule =
        () => {
            if (
                !cursoId ||
                !moduloId
            ) {
                return;
            }

            const privatePath =
                `/panel/cursos/${cursoId}/modulos/${moduloId}`;

            if (token) {
                setPurchaseOpen(
                    false
                );

                navigate(
                    privatePath
                );

                return;
            }
            sessionStorage.setItem(
                POST_LOGIN_REDIRECT_KEY,
                privatePath
            );
            setPurchaseOpen(
                false
            );

            setSelectedLesson(
                null
            );

            openLoginDialog();
        };

    if (isLoadingModulo) {
        return (
            <main className="min-h-screen px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:px-[50px] lg:pt-40">
                <div className="mx-auto max-w-[1600px]">
                    <div className="h-[600px] animate-pulse rounded-3xl bg-muted" />
                </div>
            </main>
        );
    }

    if (
        isErrorModulo ||
        !modulo
    ) {
        return (
            <main className="flex min-h-screen items-center justify-center px-5">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-foreground">
                        Módulo no
                        encontrado
                    </h1>

                    <Link
                        to={`/cursos/${cursoId ?? ""}`}
                        className="mt-4 inline-block text-sm font-medium text-primary"
                    >
                        Volver al curso
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <>
            <main className="min-h-screen pb-20 pt-24 sm:pt-28 lg:pb-28 lg:pt-32">
                <section className="px-5 sm:px-8 lg:px-[50px]">
                    <div className="mx-auto max-w-[1600px]">
                        <Link
                            to={`/cursos/${cursoId}`}
                            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="size-4" />

                            Volver a
                            módulos
                        </Link>

                        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-14">
                            <div className="min-w-0">
                                <div>
                                    {modulo
                                        .curso
                                        .categoria && (
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
                                                {
                                                    modulo
                                                        .curso
                                                        .categoria
                                                        .nombre
                                                }
                                            </p>
                                        )}

                                    <h1 className="mt-3 max-w-4xl text-3xl font-medium leading-[1.02] tracking-[-0.045em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                                        {
                                            modulo.nombre
                                        }
                                    </h1>

                                    <p className="mt-4 text-sm font-medium text-muted-foreground sm:text-base">
                                        {
                                            modulo
                                                .curso
                                                .nombre
                                        }
                                    </p>

                                    {modulo.descripcion && (
                                        <p className="mt-5 max-w-3xl text-sm leading-[1.7] text-muted-foreground sm:text-base">
                                            {
                                                modulo.descripcion
                                            }
                                        </p>
                                    )}

                                    <div className="mt-6 flex flex-wrap gap-2">
                                        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs text-muted-foreground sm:text-sm">
                                            <BookOpen className="size-4 text-primary" />

                                            {
                                                modulo
                                                    ._count
                                                    .lecciones
                                            }{" "}
                                            {modulo
                                                ._count
                                                .lecciones ===
                                                1
                                                ? "lección"
                                                : "lecciones"}
                                        </div>
                                    </div>
                                </div>

                                <ModuleLessonsList
                                    lecciones={
                                        lecciones
                                    }
                                    isLoading={
                                        isLoadingLecciones
                                    }
                                    isError={
                                        isErrorLecciones
                                    }
                                    onLessonClick={
                                        handleLessonClick
                                    }
                                />
                            </div>

                            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
                                <ModulePlatformVideo />

                                <ModulePriceCard

                                    cantidadLecciones={
                                        modulo
                                            ._count
                                            .lecciones
                                    }
                                    onBuy={
                                        handleAccessModule
                                    }
                                />
                            </aside>
                        </div>
                    </div>
                </section>
            </main>

            <LessonPurchaseDialog
                open={
                    purchaseOpen
                }
                onOpenChange={
                    setPurchaseOpen
                }
                leccionNombre={
                    selectedLesson
                }
                moduloNombre={
                    modulo.nombre
                }
                onBuy={
                    handleAccessModule
                }
            />
        </>
    );
}