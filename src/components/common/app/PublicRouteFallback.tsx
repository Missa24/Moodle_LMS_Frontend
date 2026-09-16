export function PublicRouteFallback() {
    return (
        <main className="min-h-[70vh] bg-background px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-[50px] lg:pt-40">
            <div className="mx-auto max-w-[1800px]">
                <div className="max-w-3xl animate-pulse">
                    <div className="h-3 w-28 rounded-full bg-muted" />

                    <div className="mt-5 h-9 w-full max-w-2xl rounded-lg bg-muted sm:h-11" />

                    <div className="mt-3 h-9 w-[75%] max-w-xl rounded-lg bg-muted sm:h-11" />

                    <div className="mt-6 h-4 w-full max-w-xl rounded-full bg-muted/80" />

                    <div className="mt-2 h-4 w-[80%] max-w-lg rounded-full bg-muted/80" />
                </div>

                <div className="mt-10 space-y-3">
                    <div className="h-20 animate-pulse rounded-2xl bg-muted/60" />

                    <div className="h-20 animate-pulse rounded-2xl bg-muted/60" />

                    <div className="h-20 animate-pulse rounded-2xl bg-muted/60" />
                </div>
            </div>
        </main>
    );
}