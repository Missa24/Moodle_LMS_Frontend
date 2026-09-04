import { Outlet } from "react-router-dom";

import { Navbar } from "@/components/nav/navbar";
import { LoginDialog } from "@/features/Auth/components/LoginDialog";
import { Footer } from "@/components/nav/footer";

export default function PublicLayout() {
    return (
        <>
            <Navbar />

            <Outlet />

            <LoginDialog />

            <Footer />
        </>
    );
}