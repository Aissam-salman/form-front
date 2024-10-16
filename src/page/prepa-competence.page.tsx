import Navbar from "@/components/navbar.tsx";
import {Title, Title2} from "@/components/form/ui/title-form.tsx";
import {SelectForm} from "@/components/form/ui/select-form.tsx";
import centerService from "@/service/center.service.ts";
import {useEffect, useState} from "react";
import {Center} from "@/types/Center.ts";
import {CheckboxForm, InputFormWithLabel, TextareaForm} from "@/components/form/ui/input-form.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {RadioForm, RadioGroupItem} from "@/components/form/ui/radio-form.tsx";
import {DateForm} from "@/components/form/ui/date-form.tsx";
import {Signature} from "@/components/form/ui/signature.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";

const PrepaCompetencePage = () => {

    const [centers, setCenters] = useState<Center[]>([]);

    const fetchCenters = async () => {
        const resp = await centerService.getAll();
        if (resp.data) {
            setCenters(resp.data);
        }
    }
    const radioOptionsAdhesion: RadioGroupItem[] = [
        {
            value: "OUI",
            displayName: "OUI",
        },
        {
            value: "NON",
            displayName: "NON",
        }
    ]

    const radioOptionsMotifOut: RadioGroupItem[] = [
        {
            value: "terme",
            displayName: "Terme du dispositif (avec projet de formation ou de retour à l'emploi)",
        },
        {
            value: "sortie",
            displayName: "Sortie anticipée positive (entrée en formation ou retour à l'emploi)",
        },
        {
            value: "abandon",
            displayName: "Abandon",
        }
    ];

    useEffect(() => {
        fetchCenters();
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar/>
            <section className="flex flex-col gap-10 pb-10">
                <Title className="text-center">
                    Bilan 'Prépa Compétences'
                </Title>
                <div className="flex justify-center">

                    <Card className="mx-auto">
                        <CardContent>
                            <div className="flex gap-2 justify-items-center">
                                <SelectForm label={"Centre AFPA"} placeholder={"Selectionner un centre"}
                                            options={centers}/>
                                <InputFormWithLabel label={"Agence France Travail"} type={"text"} placeholder={""}/>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <hr/>
                <div className="flex justify-center gap-24">
                    <Card className="w-2/5">
                        <CardHeader>
                            <CardTitle className="text-center">
                                Référent AFPA
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                <InputFormWithLabel label={"Nom du référent AFPA"} type={"text"} placeholder={""}/>
                                <InputFormWithLabel label={"Téléphone"} type={"phone"} placeholder={""}/>
                                <InputFormWithLabel label={"Mail"} type={"email"} placeholder={""}/>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-2/5">
                        <CardHeader>
                            <CardTitle className="text-center">
                                Bénéficiaire
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2 ">
                                <InputFormWithLabel label={"Nom"} type={"text"} placeholder={""}/>
                                <InputFormWithLabel label={"Prénom"} type={"text"} placeholder={""}/>
                                <InputFormWithLabel label={"Identifiant"} type={"text"} placeholder={""}/>
                                <InputFormWithLabel label={"Téléphone"} type={"phone"} placeholder={""}/>
                                <InputFormWithLabel label={"Mail"} type={"email"} placeholder={""}/>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex justify-center ">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Référent France Travail
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2 items-start">
                                <InputFormWithLabel label={"Nom du conseiller"} type={"text"} placeholder={""}/>
                                <InputFormWithLabel label={"Téléphone"} type={"phone"} placeholder={""}/>
                                <InputFormWithLabel label={"Mail"} type={"email"} placeholder={""}/>
                                <InputFormWithLabel
                                    label={"Nom du référent"}
                                    type={"text"}
                                    placeholder={"Autre que France Travail"}
                                />
                                <div>
                                    <TextareaForm
                                        className={"min-w-80 min-h-36"}
                                        label={"Objectif du bénéficiaire"}
                                        type={"text"}
                                        placeholder={"Ajouter les souhaits du bénéficiaire si écart avec la" +
                                            " prescription du conseiller France Travail"}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex justify-center">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">
                                Adhésion suite au premier entretien
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex gap-5 flex-col">
                            <RadioForm options={radioOptionsAdhesion}/>
                            <DateForm label={"Date d'entrée dans le dispositif"}/>
                            <TextareaForm
                                className={"min-w-80"}
                                label={"Si non-adhésion, quel en est le motif ?"}
                                type={"text"}
                            />
                            <Signature label={"Signature du bénéficiaire"}/>
                        </CardContent>
                    </Card>
                </div>
                <hr/>
                <div className="flex justify-center">
                    <Card>
                        <CardContent>
                            <TextareaForm
                                className={"min-w-80"}
                                label={"Métier(s) ou secteur(s) d'activité ciblé(s)"}
                                type={"text"}
                            />
                        </CardContent>
                    </Card>
                </div>
            </section>
            <section>
                <div className="space-y-8 p-6 bg-white border rounded-lg shadow">
                    <Title2 className="text-center">Bilan de sortie</Title2>

                    <div className=" flex justify-center">
                        <Card>
                            <CardContent className="space-y-4">
                                <DateForm label={"Date de réalisation du bilan"}/>
                                <TextareaForm
                                    label={"Synthèse du parcours et plan d'actions envisagé"}
                                    type={"text"}
                                    placeholder={"Ce qui reste à faire pour concrétiser le projet"}
                                    className={"min-w-96"}
                                />
                                <DateForm label={"RDV prise avec FT le"}/>
                                <TextareaForm
                                    label={"Points de vigilance"}
                                    placeholder={"Ce qui pourrait gêner ou retarder le projet"}
                                    type={"text"}
                                    className={"min-w-96"}
                                />
                                <TextareaForm
                                    label={"Commentaire du bénéficiaire"}
                                    type={"text"}
                                    className={"min-w-96"}
                                />
                            </CardContent>

                        </Card>
                    </div>

                    <div className="flex justify-center">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-center">
                                    Motif de sortie
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RadioForm options={radioOptionsMotifOut}/>
                                {/*TODO: add logic to disabled not, after checked motif*/}
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="club-prepa"/>
                                    <Label htmlFor="club-prepa">Nécessité d’un suivi (Atelier Club Prépa)</Label>
                                </div>
                                <div>
                                    <Label htmlFor="first-date">Si oui, première date proposée :</Label>
                                    <Input type="date" id="first-date"/>
                                </div>
                                <div>
                                    <Label>Date de sortie :</Label>
                                    <Input type="date"/>
                                </div>
                                <div>
                                    <Label>Motif :</Label>
                                    <Textarea/>
                                </div>
                                <div>
                                    <Label>Date d’abandon :</Label>
                                    <Input type="date"/>
                                </div>
                                <div>
                                    <Label>Motif :</Label>
                                    <Textarea/>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex justify-center gap-12">
                        <Card>
                            <CardContent className="space-y-8">
                                <InputFormWithLabel label={"Référent de parcours AFPA"} type={"text"}
                                                    placeholder={"Nom, prénom"}/>
                                <Signature label={"Signature"}/>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className={"space-y-4"}>
                                <InputFormWithLabel label={"Le bénéficiaire"} type={"text"} placeholder={"Nom," +
                                    " prénom"}/>
                                <CheckboxForm label={"J'autorise l'Afpa à transmettre ce bilan à mon conseiller" +
                                    " référent France Travail"}/>
                                <Signature label={"Signature"}/>
                            </CardContent>
                        </Card>
                    </div>
                        <Card>
                            <CardContent className={"space-y-4"}>
                                <InputFormWithLabel label={"A"} type={"text"} placeholder={"Brest"}/>
                                <DateForm label={"le"}/>
                            </CardContent>
                        </Card>

                </div>
            </section>

        </div>
    );
};

export default PrepaCompetencePage;
