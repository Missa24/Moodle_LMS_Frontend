import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuthDialogStore } from "@/store/authDialogStore";
import { LoginForm } from "./FormLogin";

export function LoginDialog() {
    const navigate = useNavigate();
    const { isOpen, redirectTo, close } = useAuthDialogStore();

    const handleSuccess = () => {
        close();
        if (redirectTo) navigate(redirectTo);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Iniciar sesión</DialogTitle>
                </DialogHeader>
                <LoginForm onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
}