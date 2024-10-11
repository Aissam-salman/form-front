import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import React, {useState} from "react";

interface InputFormProps {
    label: string;
    type: string;
    placeholder?: string;
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
                                       onLabelChange,
                                   }: {
    label: string;
    type: string;
    placeholder: string;
    onLabelChange: (newLabel: string) => void;
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentLabel, setCurrentLabel] = useState(label);

    const handleLabelClick = () => {
        setIsEditing(true);
    };

    const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentLabel(e.target.value);
        onLabelChange(e.target.value); // Notify parent component of label change
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <input
                    type="text"
                    value={currentLabel}
                    onChange={handleLabelChange}
                    onBlur={handleBlur}
                    autoFocus
                />
            ) : (
                <label onClick={handleLabelClick}>{currentLabel || "Click to edit label"}</label>
            )}
            <input type={type} placeholder={placeholder} />
        </div>
    );
};


export const TextareaForm = ({label, placeholder}: InputFormProps) => {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Textarea placeholder={placeholder}/>
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
                     <Input id="file" type="file" />
                 </div>
             )
}

export const ImgForm = ({label}: InputFormProps) => {
            return (
                <div className="space-y-2">
                    <Label htmlFor="image">{label}</Label>
                    <Input id="image" type="file" accept="image/*" />
                </div>
            )
}

