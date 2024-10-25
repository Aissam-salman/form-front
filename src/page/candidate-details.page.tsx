import {useParams} from "react-router-dom";
import Navbar from "@/components/navbar.tsx";
import {useEffect, useState} from "react";
import candidateService from "@/service/candidate.service.ts";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trash2, UserPlus} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {Progress} from "@/components/ui/progress";

interface Candidate {
    id: number
    firstname: string
    lastname: string
    email: string
    phone_number: string
    role: string
    path: {
        id: number
        center: {
            id: number
            name: string
            address: string
            phone_number: string
        }
        former: {
            id: number
            firstname: string
            lastname: string
            email: string
        }
        date_start: string
        date_end: string
        adherence: boolean
    }
}

const CandidateDetailsPage = () => {
    const [progress, setProgress] = useState(80)
    const {candidateId} = useParams();

    const handleAssign = (value: string) => {
        console.log(`Assigning candidate to class: ${value}`)
        // Logique pour assigner le candidat à une classe
    }

    const handleDelete = () => {
        console.log('Deleting candidate')
        // Logique pour supprimer le candidat
    }

    const [candidate, setCandidate] = useState<Candidate>();

    const fetchCandidate = async () => {
        if (!candidateId) {
            return;
        }
        const resp = await candidateService.getDetail(candidateId);
        console.log(resp.data);
        setCandidate(resp.data);
    }

    useEffect(() => {
        fetchCandidate();
    }, [])

    return (
        <main>
            <Navbar/>
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Informations du Candidat</CardTitle>
                </CardHeader>
                {candidate ? (
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold">Nom</h3>
                                <p>{candidate.firstname} {candidate.lastname}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p>{candidate.email}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Téléphone</h3>
                                <p>{candidate.phone_number}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Rôle</h3>
                                <p>{candidate.role}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Classe n° </h3>
                                <p>{candidate.path.id}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold">Centre</h3>
                            <p>{candidate.path.center.name} - {candidate.path.center.address}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Formateur</h3>
                            <p>{candidate.path.former.firstname} {candidate.path.former.lastname}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Dates de formation</h3>
                            <p>Du {new Date(candidate.path.date_start).toLocaleDateString()} au {new Date(candidate.path.date_end).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Avancement du formulaire</h3>
                            <Progress value={progress} className="w-full"/>
                            <p className="text-sm text-gray-500 mt-1">{progress}% complété</p>
                        </div>
                    </CardContent>

                ) : (
                    <div>NotFound</div>
                )}
                <CardFooter className="flex justify-between">
                    <div className="flex items-center space-x-2">
                        <Select onValueChange={handleAssign}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Assigner à une classe"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="class1">Classe 1</SelectItem>
                                <SelectItem value="class2">Classe 2</SelectItem>
                                <SelectItem value="class3">Classe 3</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                            <UserPlus className="h-4 w-4"/>
                        </Button>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4"/>
                                Supprimer
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce candidat ?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Cette action ne peut pas être annulée. Cela supprimera définitivement le compte du
                                    candidat et toutes les données associées.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>Confirmer</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </main>
    );
};

export default CandidateDetailsPage;
