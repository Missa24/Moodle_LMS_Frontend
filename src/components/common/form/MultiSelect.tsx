import { Check, ChevronsUpDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface MultiSelectOption {
    value: string;
    label: string;
}

interface MultiSelectProps {
    options: MultiSelectOption[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
}

export function MultiSelect({
    options,
    value,
    onChange,
    placeholder = "Selecciona opciones",
    disabled = false,
    loading = false,
    className,
}: MultiSelectProps) {
    const toggleOption = (optionValue: string) => {
        if (value.includes(optionValue)) {
            onChange(
                value.filter(
                    (item) => item !== optionValue,
                ),
            );
        } else {
            onChange([
                ...value,
                optionValue,
            ]);
        }
    };

    const removeOption = (
        optionValue: string,
    ) => {
        onChange(
            value.filter(
                (item) => item !== optionValue,
            ),
        );
    };

    const selectedOptions = options.filter(
        (option) =>
            value.includes(option.value),
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    disabled={disabled || loading}
                    className={cn(
                        "min-h-10 w-full justify-between px-3 font-normal",
                        !value.length &&
                        "text-muted-foreground",
                        className,
                    )}
                >
                    <div className="flex min-w-0 flex-1 flex-wrap gap-1">
                        {selectedOptions.length >
                            0 ? (
                            selectedOptions.map(
                                (option) => (
                                    <span
                                        key={
                                            option.value
                                        }
                                        className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-xs text-accent-foreground"
                                        onClick={(
                                            event,
                                        ) => {
                                            event.stopPropagation();
                                        }}
                                    >
                                        {
                                            option.label
                                        }

                                        <span
                                            role="button"
                                            tabIndex={
                                                0
                                            }
                                            className="cursor-pointer rounded-sm hover:bg-destructive hover:text-destructive-foreground"
                                            onClick={(
                                                event,
                                            ) => {
                                                event.stopPropagation();

                                                removeOption(
                                                    option.value,
                                                );
                                            }}
                                            onKeyDown={(
                                                event,
                                            ) => {
                                                if (
                                                    event.key ===
                                                    "Enter" ||
                                                    event.key ===
                                                    " "
                                                ) {
                                                    event.preventDefault();

                                                    removeOption(
                                                        option.value,
                                                    );
                                                }
                                            }}
                                        >
                                            <X className="size-3" />
                                        </span>
                                    </span>
                                )
                            )
                        ) : (
                            <span>
                                {loading
                                    ? "Cargando..."
                                    : placeholder}
                            </span>
                        )}
                    </div>

                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-0"
                align="start"
            >
                <Command>
                    <CommandInput
                        placeholder="Buscar..."
                    />

                    <CommandList>
                        <CommandEmpty>
                            No se encontraron
                            opciones.
                        </CommandEmpty>

                        <CommandGroup>
                            {options.map(
                                (option) => {
                                    const selected =
                                        value.includes(
                                            option.value,
                                        );

                                    return (
                                        <CommandItem
                                            key={
                                                option.value
                                            }
                                            value={
                                                option.label
                                            }
                                            onSelect={() =>
                                                toggleOption(
                                                    option.value,
                                                )
                                            }
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 size-4",
                                                    selected
                                                        ? "opacity-100"
                                                        : "opacity-0",
                                                )}
                                            />

                                            {
                                                option.label
                                            }
                                        </CommandItem>
                                    );
                                },
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
