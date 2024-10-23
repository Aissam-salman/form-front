import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Workshop} from "@/types/Workshop.ts";

interface Workshop2CardProps {
    workshop: Workshop;
    onSave: (workshop: Workshop) => void;
    onChange: (workshop: Workshop) => void;
}

interface Phase2Data {
    atelier2: {
        structureAccueil: string;
        metier: string;
        dateDebut: string;
        dateFin: string;
        heures: string;
        moyenDecouverte: string;
        entreprise: string;
        choixMetierConfirme: string;
        competences: string[];
        immersion: boolean;
        plateauTechnique: boolean;
        autre: boolean;
        choixConfirme: string;
    };
    commentairesReferentAFPA: string;
    ceQueJeRetiens: string;
}

const Workshop2Card: React.FC<Workshop2CardProps> = ({workshop, onSave}) => {
    const [phase2Data, setPhase2Data] = useState<Phase2Data>({
        atelier2: {
            structureAccueil: "",
            metier: "",
            dateDebut: "",
            dateFin: "",
            heures: "",
            moyenDecouverte: "",
            entreprise: "",
            choixMetierConfirme: "",
            competences: [],
            immersion: false,
            plateauTechnique: false,
            autre: false,
            choixConfirme: ""
        },
        commentairesReferentAFPA: "",
        ceQueJeRetiens: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | boolean,
        section: string,
        field: string
    ) => {
        if (typeof e === 'boolean') {
            setPhase2Data(prev => ({
                ...prev,
                [section]: {
                    ...prev[section as keyof Phase2Data],
                    [field]: e,
                },
            }));
        } else {
            const {value, type} = e.target;
            setPhase2Data(prev => ({
                ...prev,
                [section]: {
                    ...prev[section as keyof Phase2Data],
                    [field]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
                },
            }));
        }
    };

    return (
        <div className="p-12 max-w-[80%] mx-auto">
            <div className="p-12 max-w-6xl mx-auto bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">
                    Atelier 2 : Découvrir son métier et consolider son projet professionnel
                </h2>
                <div className="space-y-4">
                    <h2 className="font-semibold"> Mise en situation </h2>
                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label htmlFor="dateDebut">Date de début :</label>
                            <input
                                type="date"
                                id="dateDebut"
                                className="w-full p-2 border rounded"
                                value={phase2Data.atelier2.dateDebut}
                                onChange={(e) => handleInputChange(e, "atelier2", "dateDebut")}
                            />
                        </div>
                        <div>
                            <label htmlFor="dateFin">Date de fin :</label>
                            <input
                                type="date"
                                id="dateFin"
                                className="w-full p-2 border rounded"
                                value={phase2Data.atelier2.dateFin}
                                onChange={(e) => handleInputChange(e, "atelier2", "dateFin")}
                            />
                        </div>
                        {/*<div>*/}
                        {/*  <Label htmlFor="heures">de ... heures à ... heures :</Label>*/}
                        {/*  <Input*/}
                        {/*    id="heures"*/}
                        {/*    value={phase2Data.atelier2.heures}*/}
                        {/*    onChange={(e) => handleInputChange(e, "atelier2", "heures")}*/}
                        {/*  />*/}
                        {/*</div>*/}
                        <div className="w-full  col-span-2 mb-12">
                            <label htmlFor="metier">Je découvre le métier de :</label>
                            <input
                                id="metier"
                                className="w-full p-2 border rounded"
                                value={phase2Data.atelier2.metier}
                                onChange={(e) => handleInputChange(e, "atelier2", "metier")}

                            />

                        </div>
                    </div>
                </div>
                <h2 className="font-semibold mb-2"> Mise en situation </h2>
                <div className="flex flex-col gap-2">
                    <div>
                        <Checkbox

                            className={"mx-4"}
                            id="immersion"
                            checked={phase2Data.atelier2.immersion}
                            onCheckedChange={(checked) => handleInputChange(!!checked, "atelier2", "immersion")}
                        />
                        <Label htmlFor="immersion">
                            Immersion (PMSMP) Entreprise / Structure d’accueil :
                        </Label>
                        {phase2Data.atelier2.immersion && (
                            <Input
                                id="structureAccueil"
                                name="structureAccueil"
                                value={phase2Data.atelier2.structureAccueil || ""}
                                onChange={(e) => handleInputChange(e, "atelier2", "structureAccueil")}
                                placeholder="Nom de la structure d'accueil"
                            />
                        )}
                    </div>
                    <div>
                        <Checkbox

                            className={"mx-4"}
                            id="plateauTechnique"
                            checked={phase2Data.atelier2.plateauTechnique}
                            onCheckedChange={(checked) => handleInputChange(!!checked, "atelier2", "plateauTechnique")}
                        />
                        <Label htmlFor="plateauTechnique">
                            Plateau technique DWWM Afpa
                        </Label>
                    </div>
                    <div>
                        <Checkbox

                            className={"mx-4"}
                            id="autre"
                            checked={phase2Data.atelier2.autre}
                            onCheckedChange={(checked) => handleInputChange(!!checked, "atelier2", "autre")}
                        />
                        <Label htmlFor="autre">
                            Autre : enquête métier/prépa recherche PMSMP
                        </Label>
                    </div>
                </div>
               <div>
    <h2 className="font-semibold mt-4">Choix du métier confirmé</h2>
    <div>
        <input
            type="radio"
            className={"mx-4"}
            id="choixConfirmeOui"
            checked={phase2Data.atelier2.choixConfirme === "oui"}
            onChange={(e) => handleInputChange(e.target.value === "oui", "atelier2", "choixConfirme")}
            value="oui"
        />
        <label htmlFor="choixConfirmeOui">Oui</label>
    </div>
    <div>
        <input
            type="radio"
            className={"mx-4"}
            id="choixConfirmeNon"
            checked={phase2Data.atelier2.choixConfirme === "non"}
            onChange={(e) => handleInputChange(e.target.value === "non", "atelier2", "choixConfirme")}
            value="non"
        />
        <label htmlFor="choixConfirmeNon">Non</label>
    </div>
    <div>
        <input
            type="radio"
            className={"mx-4"}
            id="choixConfirmeNeSaitPas"
            checked={phase2Data.atelier2.choixConfirme === "neSaitPas"}
            onChange={(e) => handleInputChange(e.target.value === "neSaitPas", "atelier2", "choixConfirme")}
            value="neSaitPas"
        />
        <label htmlFor="choixConfirmeNeSaitPas">Ne sait pas encore</label>
    </div>
</div>
                <div>
                    <h2 className="font-semibold mt-4"> Compétences</h2>
                    <div>
                        <Checkbox

                            className={"mx-4"}
                            id="competencesAcquises"
                            checked={phase2Data.atelier2.competences.includes("acquises")}
                            onChange={(e) => handleInputChange(e.target.checked, "atelier2", "competences")}
                            value="acquises"
                        />
                        <Label htmlFor="competencesAcquises">Acquises</Label>
                    </div>
                    <div>
                        <Checkbox

                            className={"mx-4"}
                            id="competencesEnCours"
                            checked={phase2Data.atelier2.competences.includes("enCours")}
                            onChange={(e) => handleInputChange(e.target.checked, "atelier2", "competences")}
                            value="enCours"
                        />
                        <Label htmlFor="competencesEnCours">en cours d’acquisition</Label>
                    </div>
                    <div>
                        <Checkbox

                            className={"mx-4"}
                            id="competencesNonAcquises"
                            checked={phase2Data.atelier2.competences.includes("nonAcquises")}
                            onChange={(e) => handleInputChange(e.target.checked, "atelier2", "competences")}
                            value="nonAcquises"
                        />
                        <Label htmlFor="competencesNonAcquises">non acquises</Label>
                    </div>
                </div>
                <div className=" p-4 rounded-md">
                <Label htmlFor="ceQueJeRetiens">
                        « Ce que je retiens de cette phase » (par le bénéficiaire) :
                    </Label>
                    <Textarea
                        id="ceQueJeRetiens"
                        value={phase2Data.ceQueJeRetiens}
                        onChange={(e) => handleInputChange(e, "", "ceQueJeRetiens")}
                    />
                </div>
                <div className=" p-4 rounded-md">
                    <Label htmlFor="commentairesReferentAFPA">
                        Commentaires du référent AFPA :
                    </Label>
                    <Textarea
                        id="commentairesReferentAFPA"
                        disabled={true}
                        value={phase2Data.commentairesReferentAFPA}
                        onChange={(e) =>
                            handleInputChange(e, "", "commentairesReferentAFPA")
                        }
                    />
                </div>


                <Button onClick={() => onSave(workshop)} className="w-full">
                    Enregistrer
                </Button>
            </div>
        </div>
    );
};

export default Workshop2Card;