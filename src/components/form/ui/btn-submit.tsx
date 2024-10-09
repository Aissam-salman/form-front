import {Button} from "@/components/ui/button.tsx";

interface BtnSubmitProps {
    label: string;
}

export const BtnSubmit = ({label}: BtnSubmitProps) => {
            return <Button type="submit">{label}</Button>
}