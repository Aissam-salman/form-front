import {Card, CardContent} from "@/components/ui/card"
import {ReactNode} from "react";
import appImageHero from "../../public/illu.jpg";
import {Button} from "@/components/ui/button.tsx";


interface FeatureProps {
    title: string;
    description?: string;
    children?: ReactNode;
}

const Feature = ({title, description, children}: FeatureProps) => {
    return (
        <div className="flex flex-col gap-1 p-2">
            <span className="font-medium text-lg">{title}</span>
            <span className="text-secondary w-[227px]" >
                {description}
                {children}
            </span>
        </div>
    )
}


const Hero = () => {


    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <h1 className="font-extrabold text-5xl pt-20 pb-16">Remplie ton formulaire simplement</h1>
            <Card className="p-6">
                <CardContent className="flex flex-row gap-6">
                    <div className="relative overflow-hidden bg-white rounded-lg">
                        <img className="w-64" src={appImageHero} alt="illustration app"/>
                    </div>
                    <div className="flex flex-col gap-3 relative">
                        <Feature title={"Simple et Rapide"}>
                            Utilise la commande <kbd className="pointer-events-none items-center h-5 select-none
                            rounded border bg-muted mx-1 align-middle px-1.5 py-0.5 font-mono text-xs font-bold text-muted-foreground
                            opacity-100">/</kbd>pour créer des composants
                        </Feature>
                        <Feature title={"Notification"} description={"Avoir l’esprit tranquille n’a pas de prix," +
                            " Forme vous rappel au bon moment"}/>
                        <Feature title={"Génèration de PDF"} description={"Partage simplement tes documents"}/>
                    </div>
                </CardContent>

            </Card>

            <Button
                size="lg"
                //login or signup
                onClick={() => {}}
            >
                Créer un formulaire
            </Button>
        </div>
    );
};

export default Hero;
