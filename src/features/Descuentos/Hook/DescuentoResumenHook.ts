import { useQuery } from "@tanstack/react-query";

import { GetDescuentoResumen } from "../Service/DescuentoResumenService";

export function useDescuentoResumen() {
    return useQuery({
        queryKey: ["descuentos", "resumen",],
        queryFn: GetDescuentoResumen,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 1,
    });
}