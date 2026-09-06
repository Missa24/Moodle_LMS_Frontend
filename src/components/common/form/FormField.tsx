import {
    useState,
} from "react";

import {
    Controller,
    Control,
    FieldValues,
    Path,
} from "react-hook-form";

import {
    Eye,
    EyeOff,
} from "lucide-react";

import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";

import {
    Input,
} from "@/components/ui/input";

import {
    Textarea,
} from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    RichTextEditor,
} from "@/components/common/RichTextEditor";

type SelectOption = {
    value: string;
    label: string;
};

type BaseProps<
    T extends FieldValues,
> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    hint?: string;
};

type TextFieldProps<
    T extends FieldValues,
> = BaseProps<T> & {
    type?:
    | "text"
    | "email"
    | "date";
    placeholder?: string;
    autoComplete?: string;
};

type PasswordFieldProps<
    T extends FieldValues,
> = BaseProps<T> & {
    type: "password";
    placeholder?: string;
    autoComplete?: string;
};

type NumberFieldProps<
    T extends FieldValues,
> = BaseProps<T> & {
    type: "number";
    min?: number;
    max?: number;
    placeholder?: string;
    allowEmpty?: boolean;
};

type TextareaFieldProps<
    T extends FieldValues,
> = BaseProps<T> & {
    type: "textarea";
    placeholder?: string;
    rows?: number;
};

type SelectFieldProps<
    T extends FieldValues,
> = BaseProps<T> & {
    type: "select";
    placeholder?: string;
    options: SelectOption[];
    disabled?: boolean;
};

type CheckboxFieldProps<
    T extends FieldValues,
> = BaseProps<T> & {
    type: "checkbox";
    description: string;
    defaultChecked?: boolean;
};

type RichTextFieldProps<
    T extends FieldValues,
> = BaseProps<T> & {
    type: "richtext";
    minHeight?: string;
};

export type FormFieldProps<
    T extends FieldValues,
> =
    | TextFieldProps<T>
    | PasswordFieldProps<T>
    | NumberFieldProps<T>
    | TextareaFieldProps<T>
    | SelectFieldProps<T>
    | CheckboxFieldProps<T>
    | RichTextFieldProps<T>;

export function FormField<
    T extends FieldValues,
>(
    props: FormFieldProps<T>,
) {
    const {
        control,
        name,
        label,
        hint,
    } = props;

    const [
        showPassword,
        setShowPassword,
    ] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field,
                fieldState,
            }) => {
                switch (
                props.type
                ) {
                    case "password": {
                        return (
                            <Field
                                data-invalid={
                                    fieldState.invalid
                                }
                            >
                                <FieldLabel>
                                    {
                                        label
                                    }
                                </FieldLabel>

                                <div className="relative">
                                    <Input
                                        {...field}
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={
                                            field.value ??
                                            ""
                                        }
                                        placeholder={
                                            props.placeholder
                                        }
                                        autoComplete={
                                            props.autoComplete
                                        }
                                        className="pr-10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (
                                                    current,
                                                ) =>
                                                    !current,
                                            )
                                        }
                                        className="
                                            absolute
                                            right-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-muted-foreground
                                            transition-colors
                                            hover:text-foreground
                                        "
                                        aria-label={
                                            showPassword
                                                ? "Ocultar contraseña"
                                                : "Mostrar contraseña"
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff className="size-4" />
                                        ) : (
                                            <Eye className="size-4" />
                                        )}
                                    </button>
                                </div>

                                {hint && (
                                    <p className="text-xs text-muted-foreground">
                                        {
                                            hint
                                        }
                                    </p>
                                )}

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[
                                            fieldState.error,
                                        ]}
                                    />
                                )}
                            </Field>
                        );
                    }

                    case "number": {
                        return (
                            <Field
                                data-invalid={
                                    fieldState.invalid
                                }
                            >
                                <FieldLabel>
                                    {
                                        label
                                    }
                                </FieldLabel>

                                <Input
                                    type="number"
                                    min={
                                        props.min
                                    }
                                    max={
                                        props.max
                                    }
                                    placeholder={
                                        props.placeholder
                                    }
                                    value={
                                        props.allowEmpty
                                            ? field.value ??
                                            ""
                                            : field.value ??
                                            0
                                    }
                                    onChange={(
                                        e,
                                    ) => {
                                        const raw =
                                            e
                                                .target
                                                .value;

                                        if (
                                            props.allowEmpty
                                        ) {
                                            field.onChange(
                                                raw ===
                                                    ""
                                                    ? undefined
                                                    : Number(
                                                        raw,
                                                    ),
                                            );
                                        } else {
                                            field.onChange(
                                                Number(
                                                    raw,
                                                ),
                                            );
                                        }
                                    }}
                                />

                                {hint && (
                                    <p className="text-xs text-muted-foreground">
                                        {
                                            hint
                                        }
                                    </p>
                                )}

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[
                                            fieldState.error,
                                        ]}
                                    />
                                )}
                            </Field>
                        );
                    }

                    case "textarea": {
                        return (
                            <Field
                                data-invalid={
                                    fieldState.invalid
                                }
                            >
                                <FieldLabel>
                                    {
                                        label
                                    }
                                </FieldLabel>

                                <Textarea
                                    {...field}
                                    value={
                                        field.value ??
                                        ""
                                    }
                                    placeholder={
                                        props.placeholder
                                    }
                                    rows={
                                        props.rows ??
                                        3
                                    }
                                />

                                {hint && (
                                    <p className="text-xs text-muted-foreground">
                                        {
                                            hint
                                        }
                                    </p>
                                )}

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[
                                            fieldState.error,
                                        ]}
                                    />
                                )}
                            </Field>
                        );
                    }

                    case "select": {
                        return (
                            <Field
                                data-invalid={
                                    fieldState.invalid
                                }
                            >
                                <FieldLabel>
                                    {
                                        label
                                    }
                                </FieldLabel>

                                <Select
                                    value={
                                        field.value ??
                                        ""
                                    }
                                    onValueChange={
                                        field.onChange
                                    }
                                    disabled={
                                        props.disabled
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={
                                                props.placeholder
                                            }
                                        />
                                    </SelectTrigger>

                                    <SelectContent className="z-[220]">
                                        {props.options.map(
                                            (
                                                opcion,
                                            ) => (
                                                <SelectItem
                                                    key={
                                                        opcion.value
                                                    }
                                                    value={
                                                        opcion.value
                                                    }
                                                >
                                                    {
                                                        opcion.label
                                                    }
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>

                                {hint && (
                                    <p className="text-xs text-muted-foreground">
                                        {
                                            hint
                                        }
                                    </p>
                                )}

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[
                                            fieldState.error,
                                        ]}
                                    />
                                )}
                            </Field>
                        );
                    }

                    case "checkbox": {
                        return (
                            <Field>
                                <FieldLabel>
                                    {
                                        label
                                    }
                                </FieldLabel>

                                <label className="flex h-9 items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={
                                            field.value ??
                                            props.defaultChecked ??
                                            false
                                        }
                                        onChange={(
                                            e,
                                        ) =>
                                            field.onChange(
                                                e
                                                    .target
                                                    .checked,
                                            )
                                        }
                                        className="h-4 w-4 rounded border-border"
                                    />

                                    {
                                        props.description
                                    }
                                </label>

                                {hint && (
                                    <p className="text-xs text-muted-foreground">
                                        {
                                            hint
                                        }
                                    </p>
                                )}
                            </Field>
                        );
                    }

                    case "richtext": {
                        return (
                            <Field
                                data-invalid={
                                    fieldState.invalid
                                }
                            >
                                <FieldLabel>
                                    {
                                        label
                                    }
                                </FieldLabel>

                                <RichTextEditor
                                    value={
                                        field.value ??
                                        ""
                                    }
                                    onChange={
                                        field.onChange
                                    }
                                    minHeight={
                                        props.minHeight
                                    }
                                />

                                {hint && (
                                    <p className="text-xs text-muted-foreground">
                                        {
                                            hint
                                        }
                                    </p>
                                )}

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[
                                            fieldState.error,
                                        ]}
                                    />
                                )}
                            </Field>
                        );
                    }

                    default: {
                        return (
                            <Field
                                data-invalid={
                                    fieldState.invalid
                                }
                            >
                                <FieldLabel>
                                    {
                                        label
                                    }
                                </FieldLabel>

                                <Input
                                    {...field}
                                    type={
                                        props.type ??
                                        "text"
                                    }
                                    value={
                                        field.value ??
                                        ""
                                    }
                                    placeholder={
                                        props.placeholder
                                    }
                                    autoComplete={
                                        props.autoComplete
                                    }
                                />

                                {hint && (
                                    <p className="text-xs text-muted-foreground">
                                        {
                                            hint
                                        }
                                    </p>
                                )}

                                {fieldState.invalid && (
                                    <FieldError
                                        errors={[
                                            fieldState.error,
                                        ]}
                                    />
                                )}
                            </Field>
                        );
                    }
                }
            }}
        />
    );
}