import { Skeleton } from "@/components/ui/skeleton";

export const CourseListCardSkeleton = () => {
    return (
        <div className="flex min-h-[190px] overflow-hidden rounded-2xl border border-border bg-card">
            <Skeleton className="hidden h-full w-[280px] shrink-0 rounded-none sm:block" />

            <div className="flex min-w-0 flex-1 flex-col justify-between p-5 sm:p-6">
                <div className="space-y-3">
                    <Skeleton className="h-3 w-24" />

                    <Skeleton className="h-6 w-3/4 max-w-md" />

                    <Skeleton className="h-4 w-full max-w-xl" />
                    <Skeleton className="h-4 w-5/6 max-w-lg" />
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                    <Skeleton className="h-4 w-28" />

                    <Skeleton className="h-9 w-24 rounded-full" />
                </div>
            </div>
        </div>
    );
};
