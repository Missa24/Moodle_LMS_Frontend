"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const PHONE = "59164152202";
const MESSAGE = "Hola, quisiera información por favor";

export default function FloatingWhatsApp() {
    const [showMessage, setShowMessage] = useState(false);

    const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(
        MESSAGE,
    )}`;

    useEffect(() => {
        let hideTimer: number | undefined;

        const show = () => {
            setShowMessage(true);

            hideTimer = window.setTimeout(() => {
                setShowMessage(false);
            }, 6000);
        };

        const initialTimer = window.setTimeout(() => {
            show();
        }, 2500);

        const interval = window.setInterval(() => {
            show();
        }, 15000);

        return () => {
            window.clearTimeout(initialTimer);
            window.clearTimeout(hideTimer);
            window.clearInterval(interval);
        };
    }, []);

    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex items-end gap-3 sm:bottom-6 sm:right-6">
            <div
                className={`
                    relative hidden sm:block
                    origin-bottom-right
                    transition-all duration-500 ease-out
                    ${showMessage
                        ? "translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none translate-y-3 scale-90 opacity-0"
                    }
                `}
            >
                <div className="absolute -top-3 left-5 flex gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5">
                        <span
                            className={`
                                h-1.5 w-1.5 rounded-full bg-slate-800
                                transition-transform duration-300
                                ${showMessage
                                    ? "animate-pulse"
                                    : ""
                                }
                            `}
                        />
                    </span>

                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5">
                        <span
                            className={`
                                h-1.5 w-1.5 rounded-full bg-slate-800
                                transition-transform duration-300
                                ${showMessage
                                    ? "animate-pulse"
                                    : ""
                                }
                            `}
                        />
                    </span>
                </div>

                <div className="relative max-w-[240px] rounded-2xl rounded-br-md bg-white px-4 py-3 pr-5 text-sm font-medium text-slate-700 shadow-2xl ring-1 ring-black/5">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">
                            👋
                        </span>

                        <span>
                            ¿Podemos ayudarte en algo?
                        </span>
                    </div>

                    <div className="absolute -bottom-1 right-4 h-3 w-3 rotate-45 bg-white" />
                </div>
            </div>

            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                    group
                    relative
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-[#25D366]
                    text-white
                    shadow-2xl
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:bg-[#20bd5a]
                    active:scale-95
                "
                aria-label="Contactar por WhatsApp"
            >
                <span
                    className="
                        absolute
                        inset-0
                        rounded-full
                        bg-[#25D366]
                        opacity-30
                        animate-ping
                    "
                />

                <FaWhatsapp
                    className="
                        relative
                        z-10
                        h-8
                        w-8
                        transition-transform
                        duration-300
                        group-hover:rotate-6
                    "
                />

                <span
                    className="
                        absolute
                        right-0.5
                        top-0.5
                        z-20
                        h-3.5
                        w-3.5
                        rounded-full
                        border-2
                        border-white
                        bg-green-400
                    "
                />
            </a>
        </div>
    );
}
