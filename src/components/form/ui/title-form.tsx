import {cn} from "@/lib/utils.ts";

interface TitleProps {
    label: string;
    className?: string;
}

export const Title = ({label, className}: TitleProps) => {
    return (
        <h1  className={cn("text-4xl font-bold mb-4", className)}>
            {label}
        </h1>
    );
};

export const Title2 = ({label, className}: TitleProps) => {

    return (
                <h2 className={cn("text-2xl font-semibold mb-3", className)}>
                    {label}
                </h2>
    );
};

export const Title3 = ({label, className}: TitleProps) => {

    return (
                <h3 className={cn("text-xl font-semibold mb-2", className)}>
                    {label}
                </h3>
    );
};
