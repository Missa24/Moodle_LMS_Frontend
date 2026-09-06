import { create } from "zustand";

type AuthDialogStore = {
    isOpen: boolean;
    redirectTo: string | null;
    open: (redirectTo?: string) => void;
    close: () => void;
};

export const useAuthDialogStore = create<AuthDialogStore>((set) => ({
    isOpen: false,
    redirectTo: null,
    open: (redirectTo) => set({ isOpen: true, redirectTo: redirectTo ?? null }),
    close: () => set({ isOpen: false, redirectTo: null }),
}));