import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { menuItems } from "@/lib/menus";
import { usePermission } from "@/hooks/usePermission";

export default function AppSidebar() {
    const { pathname } = useLocation();
    const { can } = usePermission();

    const visibleMenuItems = menuItems.filter(
        (item) => !item.permission || can(item.permission),
    );

    const isActive = (url: string) => {
        if (pathname === url) {
            return true;
        }

        if (
            url === "/panel/inicio" ||
            url === "/panel/cursos"
        ) {
            return false;
        }

        return pathname.startsWith(`${url}/`);
    };

    return (
        <>
            <aside className="group/sidebar fixed left-4 top-[43%] z-40 hidden -translate-y-1/2 md:block">
                <div className="flex w-[60px] flex-col gap-1.5 overflow-hidden rounded-[2rem] border border-border/70 bg-background/95 p-2 shadow-xl backdrop-blur-xl transition-[width] duration-300 ease-out group-hover/sidebar:w-52">
                    <div className="flex h-11 items-center overflow-hidden rounded-full bg-primary text-primary-foreground">
                        <div className="flex h-11 min-w-11 items-center justify-center text-xs font-bold">
                            EA
                        </div>

                        <span className="max-w-0 whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover/sidebar:max-w-36 group-hover/sidebar:opacity-100">
                            Elite Academy
                        </span>
                    </div>

                    <div className="mx-2 my-1 h-px bg-border" />

                    {visibleMenuItems.map((item) => {
                        const active = isActive(item.url);

                        return (
                            <Link
                                key={item.url}
                                to={item.url}
                                title={item.title}
                                className={[
                                    "flex h-11 w-full items-center overflow-hidden rounded-full transition-all duration-200",
                                    active
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                ].join(" ")}
                            >
                                <span className="flex h-11 min-w-11 items-center justify-center">
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        className="h-[17px] w-[17px]"
                                    />
                                </span>

                                <span className="max-w-0 whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover/sidebar:max-w-36 group-hover/sidebar:opacity-100">
                                    {item.title}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </aside>

            <nav className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-1.25rem)] max-w-md -translate-x-1/2 md:hidden">
                <div
                    className="grid w-full items-center rounded-[1.75rem] border border-border/70 bg-background/95 p-1.5 shadow-xl backdrop-blur-xl"
                    style={{
                        gridTemplateColumns: `repeat(${Math.max(
                            visibleMenuItems.length,
                            1,
                        )}, minmax(0, 1fr))`,
                    }}
                >
                    {visibleMenuItems.map((item) => {
                        const active = isActive(item.url);

                        return (
                            <Link
                                key={item.url}
                                to={item.url}
                                title={item.title}
                                aria-label={item.title}
                                className="flex h-12 min-w-0 items-center justify-center"
                            >
                                <span
                                    className={[
                                        "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200",
                                        active
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-muted-foreground active:bg-muted active:text-foreground",
                                    ].join(" ")}
                                >
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        className="h-[17px] w-[17px]"
                                    />
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}