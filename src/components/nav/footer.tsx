import { Link } from "react-router-dom";

import {
    ArrowUpRight,
    Facebook,
    Instagram,
    Music2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuthDialogStore } from "@/store/authDialogStore";

export function Footer() {
    const openLoginDialog =
        useAuthDialogStore(
            (state) => state.open
        );

    const navigation = [
        {
            name: "Inicio",
            href: "/",
        },
        {
            name: "Explorar cursos",
            href: "/cursos",
        },
        {
            name: "Áreas de aprendizaje",
            href: "/#categorias",
        },
        {
            name: "Nuestra comunidad",
            href: "/#comunidad",
        },
        {
            name: "Docentes",
            href: "/#docentes",
        },
        {
            name: "Preguntas frecuentes",
            href: "/#faq",
        },
    ];

    const social = [
        {
            name: "Facebook",
            href: "https://www.facebook.com/elitelacademybolivia/",
            icon: Facebook,
        },
        {
            name: "Instagram",
            href: "https://www.instagram.com/eliteacademybo/",
            icon: Instagram,
        },
        {
            name: "TikTok",
            href: "https://www.tiktok.com/@eliteacademy.bo",
            icon: Music2,
        },
    ];

    const legal = [
        {
            name: "Política de privacidad",
            href: "/privacy",
        },
    ];

    return (
        <footer className="relative border-t border-border bg-background">
            <div className="px-5 pb-8 pt-16 sm:px-8 sm:pb-10 sm:pt-20 lg:px-[50px] lg:pb-12 lg:pt-24">
                <div className="mx-auto w-full max-w-[1800px]">

                    {/* CTA SUPERIOR */}
                    <div className="grid gap-10 border-b border-border pb-12 sm:gap-12 sm:pb-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-20 lg:pb-16">
                        <div className="max-w-4xl">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:text-xs">
                                Aprende · Crea · Evoluciona
                            </p>

                            <h2 className="mt-4 max-w-3xl text-3xl font-medium leading-[1] tracking-[-0.05em] text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
                                Tu siguiente aprendizaje puede comenzar hoy
                            </h2>

                            <p className="mt-5 max-w-2xl text-sm leading-[1.7] text-muted-foreground sm:text-base">
                                Explora nuevas áreas, desarrolla tus habilidades
                                y continúa construyendo tu camino profesional
                                junto a Élite Academy.
                            </p>
                        </div>

                        <div className="flex flex-col items-start gap-4 lg:items-end">
                            <Button
                                size="lg"
                                asChild
                                className="group rounded-full px-7"
                            >
                                <Link to="/cursos">
                                    Explorar cursos

                                    <ArrowUpRight className="ml-2 size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </Link>
                            </Button>

                            <a
                                href="https://wa.me/59164152202?text=Hola%2C%20estoy%20interesado%2Fa%20en%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20cursos%20de%20Elite%20Academy."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                            >
                                ¿Necesitas orientación? Escríbenos
                            </a>
                        </div>
                    </div>

                    {/* NAVEGACIÓN */}
                    <div className="grid gap-10 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.7fr] lg:gap-12 lg:py-14">

                        {/* MARCA */}
                        <div className="max-w-sm sm:col-span-2 lg:col-span-1">
                            <Link
                                to="/"
                                className="inline-flex items-center"
                            >
                                <span className="text-xl font-bold tracking-[-0.04em] text-primary sm:text-2xl">
                                    ÉLITE ACADEMY
                                </span>
                            </Link>

                            <p className="mt-4 max-w-sm text-sm leading-[1.7] text-muted-foreground">
                                Una plataforma creada para acompañar tu
                                aprendizaje, fortalecer tus conocimientos y
                                ayudarte a avanzar hacia nuevas oportunidades.
                            </p>

                            <div className="mt-5 flex items-center gap-2">
                                <span className="h-1 w-7 rounded-full bg-primary" />

                                <span className="h-1 w-2 rounded-full bg-primary/30" />

                                <span className="h-1 w-2 rounded-full bg-primary/15" />
                            </div>

                            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                                Formación sin fronteras
                            </p>
                        </div>

                        {/* EXPLORA */}
                        <div>
                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
                                Explora
                            </p>

                            <ul className="space-y-3">
                                {navigation.map(
                                    (item) => (
                                        <li key={item.name}>
                                            <Link
                                                to={item.href}
                                                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        {/* PLATAFORMA */}
                        <div>
                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
                                Plataforma
                            </p>

                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        to="/cursos"
                                        className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                                    >
                                        Todos los cursos
                                    </Link>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openLoginDialog()
                                        }
                                        className="text-left text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                                    >
                                        Iniciar sesión
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* REDES */}
                        <div>
                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
                                Síguenos
                            </p>

                            <div className="flex flex-wrap items-center gap-2.5">
                                {social.map(
                                    (item) => {
                                        const Icon =
                                            item.icon;

                                        return (
                                            <a
                                                key={
                                                    item.name
                                                }
                                                href={
                                                    item.href
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={
                                                    item.name
                                                }
                                                className="
                                                    flex size-10
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    border border-border
                                                    bg-card
                                                    text-muted-foreground
                                                    transition-all
                                                    duration-300
                                                    hover:-translate-y-0.5
                                                    hover:border-primary/40
                                                    hover:bg-primary
                                                    hover:text-primary-foreground
                                                "
                                            >
                                                <Icon className="size-4" />
                                            </a>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>

                    {/* PARTE INFERIOR */}
                    <div className="flex flex-col gap-4 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            ©{" "}
                            {new Date().getFullYear()}{" "}
                            Élite Academy. Todos los
                            derechos reservados.
                        </p>

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:justify-end lg:gap-x-6">
                            {legal.map(
                                (item) => (
                                    <Link
                                        key={
                                            item.name
                                        }
                                        to={
                                            item.href
                                        }
                                        className="transition-colors hover:text-foreground"
                                    >
                                        {item.name}
                                    </Link>
                                )
                            )}

                            <span>
                                La Paz · Bolivia
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}