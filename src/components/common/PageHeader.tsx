import type { ReactNode } from "react";

import { AppTitle } from "@/components/common/Apptittle";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    badge?: ReactNode;
    action?: ReactNode;
}

export function PageHeader({
    title,
    subtitle,
    badge,
    action,
}: PageHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <AppTitle
                title={title}
                subtitle={subtitle}
                badge={badge}
            />

            {action && (
                <div className="shrink-0">
                    {action}
                </div>
            )}
        </div>
    );
}