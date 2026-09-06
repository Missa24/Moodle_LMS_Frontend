"use client";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";

type CoursePaginationProps = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export const CoursePagination = ({
    page,
    totalPages,
    onPageChange,
}: CoursePaginationProps) => {
    if (totalPages <= 1) {
        return null;
    }

    const getPages = () => {
        const pages: number[] = [];

        const start = Math.max(
            1,
            Math.min(
                page - 2,
                totalPages - 4
            )
        );

        const end = Math.min(
            totalPages,
            Math.max(page + 2, 5)
        );

        for (
            let current = start;
            current <= end;
            current++
        ) {
            pages.push(current);
        }

        return pages;
    };

    const pages = getPages();

    return (
        <nav className="mt-10 flex items-center justify-center gap-2 sm:mt-12">
            <button
                type="button"
                disabled={page <= 1}
                onClick={() =>
                    onPageChange(page - 1)
                }
                className={cn(
                    "flex size-10 items-center justify-center rounded-full border border-border bg-card",
                    "text-foreground transition-colors",
                    "hover:border-primary/40 hover:bg-secondary",
                    "disabled:pointer-events-none disabled:opacity-40",
                    "sm:size-11"
                )}
                aria-label="Página anterior"
            >
                <ChevronLeft className="size-4" />
            </button>

            {pages.map((pageNumber) => (
                <button
                    key={pageNumber}
                    type="button"
                    onClick={() =>
                        onPageChange(
                            pageNumber
                        )
                    }
                    className={cn(
                        "flex size-10 items-center justify-center rounded-full",
                        "text-sm font-medium transition-all",
                        "sm:size-11",
                        page === pageNumber
                            ? "bg-primary text-primary-foreground"
                            : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    )}
                    aria-current={
                        page === pageNumber
                            ? "page"
                            : undefined
                    }
                >
                    {pageNumber}
                </button>
            ))}

            <button
                type="button"
                disabled={page >= totalPages}
                onClick={() =>
                    onPageChange(page + 1)
                }
                className={cn(
                    "flex size-10 items-center justify-center rounded-full border border-border bg-card",
                    "text-foreground transition-colors",
                    "hover:border-primary/40 hover:bg-secondary",
                    "disabled:pointer-events-none disabled:opacity-40",
                    "sm:size-11"
                )}
                aria-label="Página siguiente"
            >
                <ChevronRight className="size-4" />
            </button>
        </nav>
    );
};