import { cn } from "@/lib/utils";

type ImageProps = {
    src: string;
    alt: string;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
    className?: string;
};

export function Image({
    src,
    alt,
    fill = false,
    priority = false,
    sizes,
    className,
}: ImageProps) {
    return (
        <img
            src={src}
            alt={alt}
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className={cn(
                fill && "absolute inset-0 h-full w-full object-cover",
                className
            )}
        />
    );
}
