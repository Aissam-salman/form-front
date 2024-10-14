import Navbar from "@/components/navbar.tsx";
import {Title} from "@/components/form/ui/title-form.tsx";
import {SelectForm} from "@/components/form/ui/select-form.tsx";
import centerService from "@/service/center.service.ts";
import {useEffect, useState} from "react";
import {Center} from "@/types/Center.ts";
import {InputFormWithLabel, TextareaForm} from "@/components/form/ui/input-form.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {RadioForm, RadioGroupItem} from "@/components/form/ui/radio-form.tsx";
import {DateForm} from "@/components/form/ui/date-form.tsx";

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

    useEffect(() => {
        fetchCenters();
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar/>
            <div className="h-screen flex flex-col gap-10 pb-10">
                <Title
                    label={"Bilan 'Prépa Compétences'"}
                    className="text-center"
                />
                <Card className="mx-auto">
                    <CardContent>
                        <div className="flex gap-2 justify-items-center">
                            <SelectForm label={"Centre AFPA"} placeholder={"Selectionner un centre"} options={centers}/>
                            <InputFormWithLabel label={"Agence France Travail"} type={"text"} placeholder={""}/>
                        </div>
                    </CardContent>
                </Card>
                <hr/>
                <div className="flex gap-12 justify-center">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">
                                Référent AFPA
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2 items-start">
                                <InputFormWithLabel label={"Nom du référent AFPA"} type={"text"} placeholder={""}/>
                                <InputFormWithLabel label={"Téléphone"} type={"phone"} placeholder={""}/>
                                <InputFormWithLabel label={"Mail"} type={"email"} placeholder={""}/>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">
                                Bénéficiaire
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2 items-start">
                                <InputFormWithLabel label={"Nom"} type={"text"} placeholder={""}/>
                                <InputFormWithLabel label={"Prénom"} type={"text"} placeholder={""}/>
                                <InputFormWithLabel label={"Identifiant"} type={"text"} placeholder={""}/>
                                <InputFormWithLabel label={"Téléphone"} type={"phone"} placeholder={""}/>
                                <InputFormWithLabel label={"Mail"} type={"email"} placeholder={""}/>
                            </div>

                        </CardContent>
                    </Card>
                </div>
                <div className="flex gap-12 justify-center ">
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
                                <InputFormWithLabel label={"Nom du référent"} type={"text"}
                                                    placeholder={"autre que France" +
                                                        " Travail"}/>
                                <div>

                                <TextareaForm className={"min-w-80"}  label={"Objectif du bénéficiaire"} type={"text"}
                                              placeholder={"Ajouter les" +
                                                  " souhaits du bénéficiaire si écart avec la prescription du conseiller France Travail"}/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex gap-12 justify-center">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">
                                Adhésion suite au premier entretien
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex gap-5 flex-col">
                            <RadioForm options={radioOptionsAdhesion} />
                            <DateForm label={"Date d'entrée dans le dispositif"} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PrepaCompetencePage;
