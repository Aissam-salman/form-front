import {Label} from "@/components/ui/label.tsx";

interface LabelForm {
    label: string;
}

export const LabelForm = ({label}: LabelForm) => {

    return <Label className="mb-1">{label}</Label>
}
