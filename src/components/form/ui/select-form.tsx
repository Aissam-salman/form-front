import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

interface SelectFormProps<T> {
    label: string;
    placeholder: string;
    options: T[];
}


export const SelectForm = ({label, placeholder, options}: SelectFormProps<any>) => {

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Select >
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map(option => (
                        <SelectItem value={option.id.toString()}>{option.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
