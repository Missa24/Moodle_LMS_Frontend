
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";

import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
  useGetNotificaciones,
  useContarNoLeidas,
  useMarcarComoLeida,
} from "@/features/Notificacion/Hook/NotificacionHook";

import { cn } from "@/lib/utils";

const formatearFecha = (fecha?: string) => {
  if (!fecha) {
    return "";
  }

  const date = new Date(fecha);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString("es-BO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const NotificationBell = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const {
    data: notificaciones,
    isLoading,
  } = useGetNotificaciones();

  const {
    data: noLeidas = 0,
  } = useContarNoLeidas();

  const marcarComoLeida = useMarcarComoLeida();

  const handleNotificacionClick = (
    id: string,
    leida: boolean
  ) => {
    // Si ya está leída, solo cerramos y navegamos
    if (leida) {
      setOpen(false);
      navigate("/panel/certificados");
      return;
    }

    // Si no está leída, primero la marcamos
    marcarComoLeida.mutate(id, {
      onSuccess: () => {
        setOpen(false);
        navigate("/panel/certificados");
      },
    });
  };

  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-xl hover:bg-muted/70"
        >
          <Bell className="h-4 w-4 text-muted-foreground" />

          {noLeidas > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px]"
            >
              {noLeidas > 99 ? "99+" : noLeidas}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-80 rounded-xl p-0"
      >
        <DropdownMenuLabel className="border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">
              Notificaciones
            </span>

            {noLeidas > 0 && (
              <Badge
                variant="secondary"
                className="text-xs"
              >
                {noLeidas} nuevas
              </Badge>
            )}
          </div>
        </DropdownMenuLabel>

        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
              Cargando...
            </div>
          ) : !notificaciones ||
            notificaciones.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Bell className="mb-2 h-8 w-8 opacity-50" />

              <p className="text-sm">
                No tienes notificaciones
              </p>
            </div>
          ) : (
            notificaciones.map((notificacion) => {
              const fecha = formatearFecha(
                notificacion.fechaCreacion
              );

              return (
                <DropdownMenuItem
                  key={notificacion.id}
                  className={cn(
                    "flex cursor-pointer flex-col items-start gap-1 px-4 py-3",
                    !notificacion.leida &&
                    "bg-muted/50"
                  )}
                  onClick={() =>
                    handleNotificacionClick(
                      notificacion.id,
                      notificacion.leida
                    )
                  }
                >
                  <div className="flex w-full items-start justify-between gap-2">
                    <span className="text-sm font-medium leading-tight">
                      {notificacion.titulo}
                    </span>

                    {!notificacion.leida && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>

                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {notificacion.mensaje}
                  </p>

                  {fecha && (
                    <span className="text-[10px] text-muted-foreground">
                      {fecha}
                    </span>
                  )}
                </DropdownMenuItem>
              );
            })
          )}
        </div>

        {notificaciones &&
          notificaciones.length > 0 && (
            <>
              <DropdownMenuSeparator />

              <div className="px-2 py-2">
                <DropdownMenuItem
                  className="cursor-pointer justify-center text-xs text-muted-foreground"
                  onClick={() => {
                    setOpen(false);
                    navigate("/panel/certificados");
                  }}
                >
                  Ver todas las notificaciones
                </DropdownMenuItem>
              </div>
            </>
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
