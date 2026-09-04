"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type RotatingWordProps = {
    words: string[];
    className?: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseTime?: number;
};

export const RotatingWord = ({
    words,
    className,
    typingSpeed = 75,
    deletingSpeed = 60,
    pauseTime = 3200,
}: RotatingWordProps) => {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];

        if (!currentWord) {
            return;
        }

        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting && text === currentWord) {
            timeout = setTimeout(() => {
                setIsDeleting(true);
            }, pauseTime);
        } else if (isDeleting && text.length === 0) {
            timeout = setTimeout(() => {
                setIsDeleting(false);
                setWordIndex((current) => (current + 1) % words.length);
            }, 200);
        } else {
            timeout = setTimeout(
                () => {
                    const nextLength = isDeleting
                        ? text.length - 1
                        : text.length + 1;

                    setText(currentWord.slice(0, nextLength));
                },
                isDeleting ? deletingSpeed : typingSpeed
            );
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [
        deletingSpeed,
        isDeleting,
        pauseTime,
        text,
        typingSpeed,
        wordIndex,
        words,
    ]);

    return (
        <span className={cn("inline-flex items-center", className)}>
            <span>{text}</span>

            <span className="ml-1 inline-block h-[0.9em] w-[2px] animate-pulse bg-current" />
        </span>
    );
};