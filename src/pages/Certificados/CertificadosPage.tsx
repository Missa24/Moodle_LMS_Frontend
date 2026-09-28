"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    Search,
} from "lucide-react";

import {
    useNavigate,
} from "react-router-dom";

import { PageHeader } from "@/components/common/PageHeader";
import { QueryState } from "@/components/common/QueryState";
import { DataTable } from "@/components/data-table/data-table";
import { Input } from "@/components/ui/input";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";

import { useCertificadosAdmin } from "@/features/Certificado/Hook/CertificadoHook";
import { CertificadoColumns } from "@/features/Certificado/Components/certificado-columns";

export const CertificadosPage = () => {
    const navigate = useNavigate();

    const [page, setPage] =
        useState(1);

    const [search, setSearch] =
        useState("");

    const perPage = 10;

    const searchDebounced =
        useDebouncedValue(
            search,
            500,
        );

    const {
        data,
        isLoading,
        isError,
        error,
    } = useCertificadosAdmin(
        page,
        perPage,
        searchDebounced,
    );

    const certificados =
        data?.data ?? [];

    const totalPages =
        data?.meta.totalPages ?? 1;

    const currentPage =
        data?.meta.page ?? page;

    const totalCertificados =
        data?.meta.total ?? 0;

    const columns = useMemo(
        () =>
            CertificadoColumns({
                onView: (
                    certificado,
                ) => {
                    navigate(
                        `/panel/gestion-certificados/${certificado.id}`,
                    );
                },
            }),
        [navigate],
    );

    return (
        <div className="space-y-6 p-6">
            <PageHeader
                title="Certificados"
                subtitle="Gestiona los certificados emitidos a los estudiantes."
            />

            <div className="relative w-62">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    placeholder="Buscar certificado..."
                    value={search}
                    onChange={(event) => {
                        setSearch(
                            event.target.value,
                        );

                        setPage(1);
                    }}
                    className="pl-9"
                />
            </div>

            <QueryState
                isLoading={isLoading}
                isError={isError}
                error={error}
                fallbackMessage="No se pudieron cargar los certificados."
            >
                <DataTable
                    columns={columns}
                    data={certificados}
                    pageCount={
                        totalPages
                    }
                    pageIndex={
                        currentPage - 1
                    }
                    totalRows={
                        totalCertificados
                    }
                    onPaginationChange={(
                        newPage,
                    ) =>
                        setPage(
                            newPage + 1,
                        )
                    }
                />
            </QueryState>
        </div>
    );
};