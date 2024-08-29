import {cn} from "@/lib/utils.ts";

interface LogoProps {
    className?: string;
}

const Logo = ({className}: LogoProps) => {
    return (
        <div className={cn("font-jim-logo text-6xl p-4", className)}>
            L
        </div>
    );
};

export default Logo;
