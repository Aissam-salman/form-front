interface TitleProps {
    label: string;
}

export const Title = ({label}: TitleProps) => {
    return <h1 className="text-4xl font-bold mb-4">{label}</h1>
}

export const Title2 = ({label}: TitleProps) => {
    return <h2 className="text-2xl font-semibold mb-3">{label}</h2>
}

export const Title3 = ({label}: TitleProps) => {
    return <h3 className="text-xl font-semibold mb-2">{label}</h3>
}

