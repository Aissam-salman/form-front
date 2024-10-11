import {forwardRef, HTMLAttributes, useState} from "react";

interface EditableTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    label: string;
}

export const Title = forwardRef<HTMLHeadingElement, EditableTitleProps>(({label, ...props}, ref) => {
    return (
        <h1 ref={ref} className="text-4xl font-bold mb-4" {...props}>
            {label}
        </h1>
    );
});

export const Title2 = ({label}: EditableTitleProps) => {
    const [isEditing, setIsEditing] = useState(true);
    const [title, setTitle] = useState(label);

    return (
        <>
            {isEditing ? (
                <input
                    className="text-2xl font-semibold mb-3 w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={() => setIsEditing(false)}
                    autoFocus
                />
            ) : (
                <h2 className="text-2xl font-semibold mb-3" onClick={() => setIsEditing(true)}>
                    {title}
                </h2>
            )}
        </>
    );
};

export const Title3 = ({label}: EditableTitleProps) => {
    const [isEditing, setIsEditing] = useState(true);
    const [title, setTitle] = useState(label);

    return (
        <>
            {isEditing ? (
                <input
                    className="text-xl font-semibold mb-2 w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={() => setIsEditing(false)}
                    autoFocus
                />
            ) : (
                <h3 className="text-xl font-semibold mb-2" onClick={() => setIsEditing(true)}>
                    {title}
                </h3>
            )}
        </>
    );
};
