import {
    Loader2,
    UserPlus,
} from "lucide-react";

import {
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    Button,
} from "@/components/ui/button";

import {
    useRegister,
} from "../Hook/AuthHook";

import {
    registerSchema,
} from "../Schema/RegisterSchema";

import type {
    RegisterFormValues,
} from "../Schema/RegisterSchema";
import { FormField } from "@/components/common/form/FormField";

type RegisterFormProps = {
    onSuccess?: () => void;
};

const PAISES = [
    {
        value: "BO",
        label: "Bolivia",
    },
    {
        value: "AR",
        label: "Argentina",
    },
    {
        value: "BR",
        label: "Brasil",
    },
    {
        value: "CL",
        label: "Chile",
    },
    {
        value: "CO",
        label: "Colombia",
    },
    {
        value: "EC",
        label: "Ecuador",
    },
    {
        value: "PE",
        label: "Perú",
    },
    {
        value: "PY",
        label: "Paraguay",
    },
    {
        value: "UY",
        label: "Uruguay",
    },
    {
        value: "VE",
        label: "Venezuela",
    },
    {
        value: "MX",
        label: "México",
    },
    {
        value: "ES",
        label: "España",
    },
    {
        value: "US",
        label:
            "Estados Unidos",
    },
];

export function RegisterForm({
    onSuccess,
}: RegisterFormProps) {
    const registerMutation =
        useRegister();

    const {
        control,
        handleSubmit,
    } =
        useForm<RegisterFormValues>(
            {
                resolver:
                    zodResolver(
                        registerSchema,
                    ),

                defaultValues: {
                    nombre: "",
                    apellidoPaterno:
                        "",
                    apellidoMaterno:
                        "",
                    correo: "",
                    paisCodigo: "",
                    contrasena: "",
                    confirmarContrasena:
                        "",
                },
            },
        );

    const onSubmit = (
        values:
            RegisterFormValues,
    ) => {
        registerMutation.mutate(
            {
                nombre:
                    values.nombre,

                apellidoPaterno:
                    values.apellidoPaterno ||
                    undefined,

                apellidoMaterno:
                    values.apellidoMaterno ||
                    undefined,

                correo:
                    values.correo,

                paisCodigo:
                    values.paisCodigo,

                contrasena:
                    values.contrasena,
            },
            {
                onSuccess: () => {
                    onSuccess?.();
                },
            },
        );
    };

    return (
        <form
            onSubmit={handleSubmit(
                onSubmit,
            )}
            className="space-y-4"
        >
            <FormField
                control={control}
                name="nombre"
                label="Nombre"
                placeholder="Tu nombre"
                autoComplete="given-name"
            />

            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    control={
                        control
                    }
                    name="apellidoPaterno"
                    label="Apellido paterno"
                    placeholder="Apellido"
                    autoComplete="family-name"
                />

                <FormField
                    control={
                        control
                    }
                    name="apellidoMaterno"
                    label="Apellido materno"
                    placeholder="Apellido"
                />
            </div>

            <FormField
                control={control}
                name="correo"
                type="email"
                label="Correo electrónico"
                placeholder="correo@ejemplo.com"
                autoComplete="email"
            />

            <FormField
                control={control}
                name="paisCodigo"
                type="select"
                label="País de residencia"
                placeholder="Selecciona tu país"
                options={PAISES}
                hint="Utilizaremos este dato para mostrarte los métodos de pago disponibles en tu país."
            />

            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    control={
                        control
                    }
                    name="contrasena"
                    type="password"
                    label="Contraseña"
                    placeholder="Mínimo 8 caracteres"
                    autoComplete="new-password"
                />

                <FormField
                    control={
                        control
                    }
                    name="confirmarContrasena"
                    type="password"
                    label="Confirmar"
                    placeholder="Repite tu contraseña"
                    autoComplete="new-password"
                />
            </div>

            <Button
                type="submit"
                size="lg"
                disabled={
                    registerMutation.isPending
                }
                className="w-full rounded-xl"
            >
                {registerMutation.isPending ? (
                    <>
                        <Loader2 className="mr-2 size-4 animate-spin" />

                        Creando cuenta...
                    </>
                ) : (
                    <>
                        <UserPlus className="mr-2 size-4" />

                        Crear cuenta
                    </>
                )}
            </Button>
        </form>
    );
}