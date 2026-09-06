import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { FormField } from "@/components/common/form/FormField";
import { AuthSchema, AuthSchemaType } from "../Schema/AuthSchema";
import { useLogin } from "../Hook/AuthHook";

type LoginFormProps = {
    onSuccess?: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
    const loginMutation = useLogin();

    const { control, handleSubmit } = useForm<AuthSchemaType>({
        resolver: zodResolver(AuthSchema),
    });

    const onSubmit = (data: AuthSchemaType) => {
        loginMutation.mutate(data, {
            onSuccess: () => onSuccess?.(), 
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-3">
                <FormField
                    type="email"
                    control={control}
                    name="correo"
                    label="Correo"
                    placeholder="correo@gmail.com"
                />

                <FormField
                    type="password"
                    control={control}
                    name="password"
                    label="Contraseña"
                    placeholder="********"
                />

                <Field>
                    <Button type="submit" disabled={loginMutation.isPending} className="w-full">
                        {loginMutation.isPending ? "Ingresando..." : "Ingresar"}
                    </Button>

                    <FieldDescription className="text-center">
                        ¿Te olvidaste tu contraseña?{" "}
                        <a href="#" className="underline">Escribe a soporte</a>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}