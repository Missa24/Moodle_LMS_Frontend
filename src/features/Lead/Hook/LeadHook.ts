import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    CreateLead,
    GetLeads,
} from "../Service/LeadService";

import type {
    CreateLeadType,
} from "../Schema/LeadSchema";

export function useCreateLead() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            data: CreateLeadType,
        ) => CreateLead(data),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["leads", "list",],
            });
        },
    });
}

export function useGetLeads() {
    return useQuery({
        queryKey: ["leads", "list",],

        queryFn: GetLeads,

        staleTime: 1000 * 60 * 2,
    });
}