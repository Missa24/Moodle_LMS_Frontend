import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/nav/navbar";

export default function RootLayout() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Navbar />
            <Outlet />
            <Toaster />
        </ThemeProvider>
    )
}