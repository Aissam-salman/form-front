import {Label} from "@/components/ui/label.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Control, Controller, FieldErrors, FieldValues} from "react-hook-form";
import {FormMessage} from "@/components/ui/form.tsx";

interface RadioFormProps<TFieldValues extends FieldValues = FieldValues, TContext = unknown> {
    options: RadioGroupItem[];
    name: string;
    control: Control<TFieldValues, TContext>;
    errors?: FieldErrors<TFieldValues>;
    className?: string;
}

export type RadioGroupItem = {
    value: string;
    displayName: string;
}


export const RadioForm = ({ options, name, control, errors }: RadioFormProps) => {
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <RadioGroup {...field}>
                        {options.map(option => (
                            <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={option.value} />
                                <Label htmlFor={option.value}>{option.displayName}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                )}
            />
            {errors && errors[name] && <FormMessage>{errors[name]?.message?.toString()}</FormMessage>}
        </>
    );
};