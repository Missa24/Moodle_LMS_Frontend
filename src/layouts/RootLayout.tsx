import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/nav/ScrollToTop";

export default function RootLayout() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ScrollToTop />
            <Outlet />
            <Toaster />
        </ThemeProvider>
    );
}
