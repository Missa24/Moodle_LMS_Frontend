import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/nav/ScrollToTop";
import { AuthSessionManager } from "@/features/Auth/components/AuthSessionManager";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";

export default function RootLayout() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ScrollToTop />
            <AuthSessionManager />

            <Outlet />

            <FloatingWhatsApp />
            <Toaster />
        </ThemeProvider>
    );
}