import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Control, FieldErrors, FieldValues} from "react-hook-form";

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


export const InputForm = ({type, placeholder}: InputFormProps) => {
    return (
        <Input type={type} placeholder={placeholder}/>
    )
}


export const InputFormWithLabel = ({
                                       label,
                                       type,
                                       placeholder,
                                   }: {
    label: string;
    type: string;
    placeholder: string;
}) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={label.toLowerCase()}>{label}</Label>
            <Input type={type} id={label.toLowerCase()} placeholder={placeholder}/>
        </div>
    );
};


export const TextareaForm = ({label, placeholder, className}: InputFormProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={label.toLowerCase()}>{label}</Label>
            <Textarea className={className} placeholder={placeholder} id={label.toLowerCase()}/>
        </div>
    )
}

export const CheckboxForm = ({label}: InputFormProps) => {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox id={label}/>
            <Label htmlFor={label}>{label}</Label>
        </div>
    )
}

export const FileForm = ({label}: InputFormProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor="file">{label}</Label>
            <Input id="file" type="file"/>
        </div>
    )
}

export const ImgForm = ({label}: InputFormProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor="image">{label}</Label>
            <Input id="image" type="file" accept="image/*"/>
        </div>
    )
}

