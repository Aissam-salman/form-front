import {Label} from "@/components/ui/label.tsx";

interface SignatureProps {
    label: string;

}

export const Signature = ({label}: SignatureProps) => {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>

            {/*TODO: handle signature for component*/}
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                <p className="text-muted-foreground">Click here to sign</p>
            </div>
        </div>
    )
}