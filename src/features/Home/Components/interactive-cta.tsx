import {
    useCallback,
    useRef,
    useState,
} from "react";

import { Link } from "react-router-dom";
import {
    ArrowRight,
    BookOpen,
    GraduationCap,
    Sparkles,
} from "lucide-react";
import {
    AnimatePresence,
    motion,
} from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TrailItem = {
    id: number;
    x: number;
    y: number;
    tipo: number;
    rotate: number;
};

const SHAPES = [
    "circle",
    "square",
    "triangle",
    "spark",
    "book",
    "graduation",
] as const;

type ShapeType = (typeof SHAPES)[number];

export const InteractiveCta = () => {
    const sectionRef =
        useRef<HTMLElement | null>(null);

    const lastCreatedRef = useRef(0);
    const idRef = useRef(0);

    const [trail, setTrail] = useState<TrailItem[]>(
        []
    );

    const createShape = useCallback(
        (clientX: number, clientY: number) => {
            const section = sectionRef.current;

            if (!section) {
                return;
            }

            const now = performance.now();

            // Limita la cantidad de elementos
            // creados mientras se mueve el cursor.
            if (
                now - lastCreatedRef.current <
                70
            ) {
                return;
            }

            lastCreatedRef.current = now;

            const rect =
                section.getBoundingClientRect();

            const item: TrailItem = {
                id: idRef.current++,
                x: clientX - rect.left,
                y: clientY - rect.top,
                tipo: Math.floor(
                    Math.random() *
                    SHAPES.length
                ),
                rotate:
                    Math.random() * 40 - 20,
            };

            setTrail((previous) => [
                ...previous.slice(-16),
                item,
            ]);

            window.setTimeout(() => {
                setTrail((previous) =>
                    previous.filter(
                        (current) =>
                            current.id !==
                            item.id
                    )
                );
            }, 950);
        },
        []
    );

    const handlePointerMove = (
        event: React.PointerEvent<HTMLElement>
    ) => {
        // No ejecutamos el efecto en dispositivos
        // táctiles.
        if (event.pointerType === "touch") {
            return;
        }

        createShape(
            event.clientX,
            event.clientY
        );
    };

    return (
        <section
            ref={sectionRef}
            onPointerMove={handlePointerMove}
            className="relative flex min-h-[480px] items-center overflow-hidden py-16 sm:min-h-[520px] sm:py-20 lg:min-h-[580px]"
        >
            {/* Decoración ambiental */}
            <div className="pointer-events-none absolute left-[10%] top-[15%] size-72 rounded-full" />

            <div className="pointer-events-none absolute bottom-[8%] right-[8%] size-80 rounded-full" />

            {/* Trail del cursor */}
            <AnimatePresence>
                {trail.map((item) => (
                    <TrailShape
                        key={item.id}
                        item={item}
                    />
                ))}
            </AnimatePresence>

            {/* Figuras estáticas - Desktop */}
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
                <StaticShape
                    className="left-[8%] top-[22%]"
                    type="circle"
                />

                <StaticShape
                    className="right-[10%] top-[20%]"
                    type="spark"
                />

                <StaticShape
                    className="bottom-[17%] left-[17%]"
                    type="square"
                />

                <StaticShape
                    className="bottom-[16%] right-[20%]"
                    type="triangle"
                />
            </div>

            {/* Figuras estáticas - Mobile */}
            <div className="pointer-events-none absolute inset-0 lg:hidden">
                <StaticShape
                    className="left-[5%] top-[14%] scale-75"
                    type="circle"
                />

                <StaticShape
                    className="right-[7%] top-[18%] scale-75"
                    type="spark"
                />

                <StaticShape
                    className="bottom-[10%] left-[12%] scale-75"
                    type="square"
                />
            </div>

            {/* Contenido */}
            <div className="relative z-20 w-full px-5 sm:px-8 lg:px-[50px]">
                <div className="mx-auto max-w-[1800px]">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-4xl font-medium leading-[0.98] tracking-[-0.055em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                            Comienza a convertir tus
                            metas en realidad
                            <span className="text-primary">
                                {" "}
                                desde hoy
                            </span>
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
                            Encuentra una formación que
                            acompañe tus objetivos y continúa
                            construyendo el futuro profesional
                            que quieres alcanzar.
                        </p>

                        <div className="mt-8 flex justify-center">
                            <Button
                                asChild
                                size="lg"
                                className="group rounded-full px-7"
                            >
                                <Link to="/cursos">
                                    Comenzar ahora

                                    <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const TrailShape = ({
    item,
}: {
    item: TrailItem;
}) => {
    const type: ShapeType =
        SHAPES[item.tipo % SHAPES.length];

    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.25,
                rotate: item.rotate - 20,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                rotate: item.rotate,
            }}
            exit={{
                opacity: 0,
                scale: 0.5,
                y: -25,
            }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}
            style={{
                left: item.x,
                top: item.y,
            }}
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
        >
            <Shape type={type} />
        </motion.div>
    );
};

const StaticShape = ({
    type,
    className,
}: {
    type: ShapeType;
    className?: string;
}) => {
    return (
        <motion.div
            animate={{
                y: [0, -8, 0],
                rotate: [0, 3, 0],
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className={cn(
                "absolute opacity-40",
                className
            )}
        >
            <Shape type={type} />
        </motion.div>
    );
};

const Shape = ({
    type,
}: {
    type: ShapeType;
}) => {
    if (type === "circle") {
        return (
            <div className="relative size-14 rounded-full sm:size-16">
                <div className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full" />
            </div>
        );
    }

    if (type === "square") {
        return (
            <div className="flex size-14 rotate-12 items-center justify-center rounded-[1rem] bg-secondary sm:size-16">
                <div className="size-6 -rotate-12 rounded-md border-2 border-secondary-foreground/60" />
            </div>
        );
    }

    if (type === "triangle") {
        return (
            <div
                className="h-16 w-16 bg-primary"
                style={{
                    clipPath:
                        "polygon(50% 0%, 100% 100%, 0% 100%)",
                }}
            />
        );
    }

    if (type === "spark") {
        return (
            <div className="flex size-14 items-center justify-center rounded-full sm:size-16">
                <Sparkles className="size-7 text-secondary-foreground" />
            </div>
        );
    }

    if (type === "book") {
        return (
            <div className="flex size-14 items-center justify-center rounded-[1.25rem] border border-border text-primary sm:size-16">
                <BookOpen className="size-7" />
            </div>
        );
    }

    return (
        <div className="flex size-14 items-center justify-center rounded-full text-primary sm:size-16">
            <GraduationCap className="size-8" />
        </div>
    );
};
