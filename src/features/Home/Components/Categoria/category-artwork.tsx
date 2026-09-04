import {
    BarChart3,
    BookOpen,
    BriefcaseBusiness,
    Code2,
    Palette,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

type CategoryArtworkProps = {
    slug: string;
};

export const CategoryArtwork = ({
    slug,
}: CategoryArtworkProps) => {
    if (slug === "ciencia-y-datos") {
        return (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -bottom-14 -left-12 size-56 rounded-full bg-primary/15" />

                <div className="absolute bottom-14 right-8 flex size-36 items-center justify-center rounded-full border border-primary/20 bg-background/90">
                    <BarChart3 className="size-16 text-primary" />
                </div>

                <div className="absolute bottom-28 left-10 flex items-center gap-2">
                    <span className="size-3 rounded-full bg-primary" />
                    <span className="h-[2px] w-10 bg-primary/50" />
                    <span className="size-4 rounded-full border-2 border-primary" />
                    <span className="h-[2px] w-8 bg-primary/50" />
                    <span className="size-2 rounded-full bg-primary/50" />
                </div>

                <div className="absolute bottom-8 right-10 grid grid-cols-3 gap-2 opacity-40">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <span
                            key={index}
                            className="size-2 rounded-full bg-primary"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (slug === "diseno-y-creatividad") {
        return (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -bottom-16 right-0 size-56 rounded-full bg-secondary" />

                <div className="absolute bottom-20 left-8 size-32 rotate-6 rounded-[2rem] bg-primary/20" />

                <div className="absolute bottom-24 left-14 flex size-24 items-center justify-center rounded-[1.75rem] bg-background shadow-sm">
                    <Palette className="size-12 text-primary" />
                </div>

                <div className="absolute bottom-8 right-12">
                    <Sparkles className="size-16 text-primary/50" />
                </div>

                <div className="absolute bottom-36 right-10 size-12 rounded-full border-[8px] border-primary/30" />
            </div>
        );
    }

    if (slug === "negocios-y-profesiones") {
        return (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -bottom-10 -left-8 h-36 w-64 rounded-tr-[4rem] bg-primary/15" />

                <div className="absolute bottom-14 right-8 flex size-36 items-center justify-center rounded-[2rem] bg-primary text-primary-foreground">
                    <BriefcaseBusiness className="size-16" />
                </div>

                <div className="absolute bottom-20 left-10 flex items-end gap-2">
                    <span className="h-8 w-6 rounded-t-md bg-primary/30" />
                    <span className="h-14 w-6 rounded-t-md bg-primary/50" />
                    <span className="h-20 w-6 rounded-t-md bg-primary/70" />
                    <span className="h-28 w-6 rounded-t-md bg-primary" />
                </div>

                <div className="absolute bottom-48 left-12 rotate-[-12deg] text-3xl font-semibold text-primary/25">
                    +25%
                </div>
            </div>
        );
    }

    if (slug === "seguridad-y-operaciones") {
        return (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -bottom-20 left-1/2 size-64 -translate-x-1/2 rounded-full border-[35px] border-primary/10" />

                <div className="absolute bottom-16 left-1/2 flex size-40 -translate-x-1/2 items-center justify-center rounded-[2.5rem] border border-border bg-background">
                    <ShieldCheck className="size-20 text-primary" />
                </div>

                <div className="absolute bottom-12 left-10 h-[2px] w-24 bg-primary/30" />

                <div className="absolute bottom-10 left-8 size-3 rounded-full bg-primary" />

                <div className="absolute bottom-12 right-10 h-[2px] w-20 bg-primary/30" />

                <div className="absolute bottom-10 right-8 size-3 rounded-full bg-primary" />
            </div>
        );
    }

    if (slug === "tecnologia-y-desarrollo") {
        return (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -bottom-20 -right-16 size-64 rotate-12 rounded-[4rem] bg-primary/15" />

                <div className="absolute bottom-16 left-8 flex h-44 w-[70%] flex-col rounded-[1.75rem] border border-border bg-background/90 p-4">
                    <div className="flex gap-1.5">
                        <span className="size-2.5 rounded-full bg-primary" />
                        <span className="size-2.5 rounded-full bg-primary/50" />
                        <span className="size-2.5 rounded-full bg-primary/25" />
                    </div>

                    <div className="mt-5 space-y-3">
                        <span className="block h-2 w-[72%] rounded-full bg-primary/20" />
                        <span className="block h-2 w-[90%] rounded-full bg-primary/30" />
                        <span className="block h-2 w-[55%] rounded-full bg-primary/20" />
                    </div>

                    <Code2 className="absolute bottom-5 right-5 size-12 text-primary" />
                </div>
            </div>
        );
    }

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -bottom-16 -left-12 size-56 rounded-full bg-secondary" />

            <div className="absolute bottom-16 right-8 flex size-36 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <BookOpen className="size-16" />
            </div>

            <div className="absolute bottom-28 left-10 rotate-[-8deg]">
                <div className="h-24 w-32 rounded-xl border border-primary/20 bg-background" />
                <div className="absolute left-4 top-4 h-2 w-20 rounded-full bg-primary/20" />
                <div className="absolute left-4 top-9 h-2 w-14 rounded-full bg-primary/20" />
            </div>
        </div>
    );
};