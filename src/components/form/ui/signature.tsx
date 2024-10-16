import {Label} from "@/components/ui/label.tsx";
import SignatureCanvas from "react-signature-canvas";
import {useRef} from "react";

interface SignatureProps {
    label: string;
}

export const Signature = ({ label }: SignatureProps) => {
    const sigCanvas = useRef<SignatureCanvas | null>(null);

    const clearSignature = () => {
        sigCanvas.current?.clear();
    };

    return (
        <div className="space-y-2">
            <Label>{label}</Label>

            <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                <SignatureCanvas
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{ className: "w-full h-48" }}
                />
            </div>

            <button
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                onClick={clearSignature}
            >
                Clear Signature
            </button>
        </div>
    );
};
