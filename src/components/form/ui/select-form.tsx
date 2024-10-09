import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

interface SelectFormProps {
    label: string;
    placeholder: string;
    options: Option[];
}

type Option = {
    value: string,
    displayName: string,
}

export const SelectForm = ({label, placeholder, options}: SelectFormProps) => {

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map(option => (
                        <SelectItem value={option.value.toString()}>{option.displayName}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
