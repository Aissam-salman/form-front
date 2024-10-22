import {Button} from "@/components/ui/button.tsx";

interface BtnSubmitProps {
    label: string;
    className?: string;
}

export const BtnSubmit = ({label, className}: BtnSubmitProps) => {
            return <Button className={className} type="submit">{label}</Button>
}