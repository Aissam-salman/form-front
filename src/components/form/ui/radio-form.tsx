import {Label} from "@/components/ui/label.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";

interface RadioFormProps {
    options: RadioGroupItem[];
}

export type RadioGroupItem = {
    value: string;
    displayName: string;
}

export const RadioForm = ({options}: RadioFormProps) => {
    return (
        <RadioGroup>
            {options.map(option => (
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.displayName}</Label>
                </div>
            ))}
        </RadioGroup>
    )
}
