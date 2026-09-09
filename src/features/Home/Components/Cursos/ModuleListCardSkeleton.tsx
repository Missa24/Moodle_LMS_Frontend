import { Skeleton } from "@/components/ui/skeleton";

export const ModuleListCardSkeleton = () => {
    return (
        <div className="flex min-h-[105px] overflow-hidden rounded-2xl border border-border bg-card sm:min-h-[115px]">
            <Skeleton className="hidden w-1 shrink-0 rounded-none sm:block" />

            <div className="flex min-w-0 flex-1 items-center justify-between gap-4 p-5 sm:p-6">
                <div className="min-w-0 flex-1 space-y-3">
                    <Skeleton className="h-3 w-24" />

                    <Skeleton className="h-5 w-3/4 max-w-md" />

                    <Skeleton className="h-4 w-full max-w-xl" />
                </div>

                <Skeleton className="size-9 shrink-0 rounded-full" />
            </div>
        </div>
    );
};