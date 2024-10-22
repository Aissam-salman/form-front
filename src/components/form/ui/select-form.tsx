import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Control, Controller, FieldErrors, FieldValues} from "react-hook-form";
import {FormMessage} from "@/components/ui/form.tsx";

interface SelectFormProps<T, TFieldValues extends FieldValues = FieldValues, TContext = unknown> {
    label: string;
    placeholder?: string;
    options: T[];
    name: string;
    control: Control<TFieldValues, TContext>;
    errors?: FieldErrors<TFieldValues>;
    className?: string;
}


export const SelectForm = ({label, placeholder, options, name, control, errors}: SelectFormProps<any>) => {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                )}
            />
            {errors?.[name] && <FormMessage className="text-red-500">{errors[name]?.message?.toString()}</FormMessage>}
        </div>
    );
}

