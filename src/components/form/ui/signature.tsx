import {Label} from "@/components/ui/label.tsx";
import SignatureCanvas from "react-signature-canvas";
import {useEffect, useRef} from "react";
import {Controller} from "react-hook-form";
import {Button} from "@/components/ui/button.tsx";

interface SignatureProps {
    label: string;
    name: string;
    control: any;
    errors?: any;
}

export const Signature = ({ label, name, control, errors }: SignatureProps) => {
    const sigCanvas = useRef<SignatureCanvas | null>(null);

    const clearSignature = (onChange: (value: string | undefined) => void) => {
        sigCanvas.current?.clear();
        onChange(undefined);
    };

    useEffect(() => {
        if (sigCanvas.current) {
            sigCanvas.current.clear();
        }
    }, []);

    return (
        <div className="space-y-2">
            <Label>{label}</Label>

            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                            <SignatureCanvas
                                ref={sigCanvas}
                                penColor="black"
                                canvasProps={{ className: "w-full h-48" }}
                                onEnd={() => {
                                    onChange(sigCanvas.current?.toDataURL());
                                }}
                                backgroundColor="white"
                                clearOnResize={false}
                            />
                        </div>

                        <Button
                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                            onClick={() => clearSignature(onChange)}
                        >
                            Clear Signature
                        </Button>
                        {value && sigCanvas.current && sigCanvas.current.fromDataURL(value)}
                    </>
                )}
            />

            {errors?.[name] && <p className="text-red-500">{errors[name]?.message}</p>}
        </div>
    );
};
