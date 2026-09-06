import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Outlet />
            <Toaster />
        </ThemeProvider>
    )
}