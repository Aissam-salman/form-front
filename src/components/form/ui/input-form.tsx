import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Control, Controller, FieldErrors, FieldValues} from "react-hook-form";
import {FormMessage} from "@/components/ui/form.tsx";

interface InputFormProps<
    TFieldValues extends FieldValues = FieldValues,
    TContext = unknown
> {
    label: string;
    type?: string;
    name: string;
    control: Control<TFieldValues, TContext>;
    errors?: FieldErrors<TFieldValues>;
    placeholder?: string;
    className?: string;
}


export const InputForm = ({type, placeholder, name, control, errors}: InputFormProps) => {
    return (
        <>
            <Controller
                name={name}
                render={({field}) => (
                    <Input id={name} type={type} placeholder={placeholder} {...field}/>
                )}
                control={control}
            />
            {errors && errors[name] && <FormMessage>{errors[name]?.message?.toString()}</FormMessage>}
        </>
    )
}


export const InputFormWithLabel = ({label,type, name, control, errors, placeholder}: InputFormProps) => {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={name}>{label}</Label>
            <Controller
                name={name}
                control={control}
                render={({field}) => (
                    <Input id={name} type={type} placeholder={placeholder} {...field} />
                )}
            />
            {errors && errors[name] && <FormMessage>{errors[name]?.message?.toString()}</FormMessage>}
        </div>
    );
};


export const TextareaForm = ({label, placeholder, className, name, control, errors}: InputFormProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={label.toLowerCase()}>{label}</Label>
            <Controller
                name={name}
                control={control}
                render={({field}) => (
                    <Textarea className={className} placeholder={placeholder} id={name} {...field}/>
                )}
            />
            {errors && errors[name] && <FormMessage>{errors[name]?.message?.toString()}</FormMessage>}
        </div>
    )
}

export const CheckboxForm = ({label, name, control, errors}: InputFormProps) => {
    return (
        <div className="flex items-center space-x-2">
            <Controller
                name={name}
                control={control}
                render={({field}) => (
                    <Checkbox id={name} {...field} />
                )}
            />
            <Label htmlFor={label}>{label}</Label>
            {errors && errors[name] && <FormMessage>{errors[name]?.message?.toString()}</FormMessage>}
        </div>
    )
}

export const FileForm = ({label, name, control, errors}: InputFormProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor="file">{label}</Label>
            <Controller
                name={name}
                control={control}
                render={({field}) => (
                    <Input id={name} type="file" {...field}/>
                )}
            />
            {errors && errors[name] && <FormMessage>{errors[name]?.message?.toString()}</FormMessage>}
        </div>
    )
}

export const ImgForm = ({label,name, control, errors}: InputFormProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor="image">{label}</Label>
            <Controller
                name={name}
                control={control}
                render={({field}) => (
                    <Input id={name} type="file" accept="image/*" {...field}/>

                )}
            />
            {errors && errors[name] && <FormMessage>{errors[name]?.message?.toString()}</FormMessage>}
        </div>
    )
}

