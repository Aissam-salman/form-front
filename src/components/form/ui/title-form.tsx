import {cn} from "@/lib/utils.ts";

interface TitleProps {
    children?: React.ReactNode;
    className?: string;
}

export const Title = ({children, className}: TitleProps) => {
    return (
        <h1  className={cn("text-4xl font-bold mb-4", className)}>
            {children}
        </h1>
    );
};

export const Title2 = ({children, className}: TitleProps) => {

    return (
                <h2 className={cn("text-2xl font-semibold mb-3", className)}>
                    {children}
                </h2>
    );
};

export const Title3 = ({children, className}: TitleProps) => {

    return (
                <h3 className={cn("text-xl font-semibold mb-2", className)}>
                    {children}
                </h3>
    );
};
