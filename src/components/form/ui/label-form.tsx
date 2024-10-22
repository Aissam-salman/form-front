import {Label} from "@/components/ui/label.tsx";

interface LabelForm {
    label: string;
    forHtml: string;
}

export const LabelForm = ({label, forHtml}: LabelForm) => {
    return <Label htmlFor={forHtml} className="mb-1">{label}</Label>
}
