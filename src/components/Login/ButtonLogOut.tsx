import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLogout } from "@/features/Auth/Hook/AuthHook";

function ButtonLogOut() {
    const logoutMutation = useLogout();

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return (
        <TooltipProvider delayDuration={150}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleLogout}
                        disabled={logoutMutation.isPending}
                        className="
                            self-center
                            bg-muted
                            text-muted-foreground
                            hover:bg-destructive/10
                            hover:text-destructive
                            transition-all
                            duration-200
                            shadow-sm
                        "
                    >
                        <LogOut className="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
            </Tooltip>
        </TooltipProvider>
    );
}

export default ButtonLogOut;
