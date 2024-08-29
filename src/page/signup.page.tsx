import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Navbar from "@/components/navbar.tsx";
import afpa from "../../public/afpaLogo.svg"
import {useNavigate} from "react-router-dom";

export function SignupPage() {

    const navigate = useNavigate();

    // TODO: add event for signup

    const handleSubmit = async (): Promise<void> => {

    }

    // state for isConnected ??   redirect to page => candidatepage
    // state isConnected global, i need for all, and token register
    // zustand ?


    return (
        <div className="w-full min-h-screen flex flex-col relative">
            <Navbar />
            <div className="flex items-center justify-center py-12">
                <Card className="mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl">Inscription</CardTitle>
                    <CardDescription>
                        Remplir les informations afin de créer un compte sur Forme
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">Prénom</Label>
                                <Input id="first-name" placeholder="Max" required/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Nom</Label>
                                <Input id="last-name" placeholder="Robinson" required/>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input id="password" type="password"/>
                        </div>
                        <Button
                            onClick={() => navigate("/signup")}
                            type="submit"
                            className="w-full">
                            Créer un compte
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Déjà un compte?{" "}
                        <a href="/login" className="underline">
                            Connexion
                        </a>
                    </div>
                </CardContent>
            </Card>

            </div>
            <img className="absolute bottom-2 left-5" width={100} src={afpa} alt="Logo afpa"/>
        </div>
    )
}
