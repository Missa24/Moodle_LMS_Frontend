import { useState } from "react";

type CrudDialogMode = "create" | "edit";

export function useCrudDialog<T>() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<CrudDialogMode>("create");
    const [selected, setSelected] = useState<T | undefined>();

    const openCreate = () => {
        setSelected(undefined);
        setMode("create");
        setOpen(true);
    };

    const openEdit = (item: T) => {
        setSelected(item);
        setMode("edit");
        setOpen(true);
    };

    const close = () => {
        setOpen(false);
    };

    return {
        open,
        setOpen,
        mode,
        selected,
        openCreate,
        openEdit,
        close,
    };
}