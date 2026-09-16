import { Outlet } from "react-router-dom";

import AppSidebar from "@/components/dashboard/AppSidebar";
import { Headerbar } from "@/components/nav/headerbar";
import { CompleteProfileDialog } from "@/features/Auth/components/CompleteProfileDialog";
import { InscripcionNotificationDialog } from "@/features/Notificacion/Components/InscripcionNotificationDialog";

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-background">
            <AppSidebar />

            <div className="min-h-screen md:pl-24">
                <Headerbar />

                <CompleteProfileDialog />
                <InscripcionNotificationDialog />

                <main className="min-h-[calc(100vh-4rem)] pb-24 md:pb-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}