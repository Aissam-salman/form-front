import Navbar from "@/components/navbar.tsx";
import {Title} from "@/components/form/ui/title-form.tsx";
import {SelectForm} from "@/components/form/ui/select-form.tsx";
import centerService from "@/service/center.service.ts";
import {useEffect, useState} from "react";
import {Center} from "@/types/Center.ts";
import {InputFormWithLabel} from "@/components/form/ui/input-form.tsx";

const PrepaCompetencePage = () => {

    const [centers, setCenters] = useState<Center[]>([]);

    const fetchCenters = async () => {
        const resp = await centerService.getAll();
        if (resp.data) {
            setCenters(resp.data);
        }
    }

    useEffect(() => {
        fetchCenters();
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="p-5 h-screen flex flex-col gap-5">
                <Title
                    label={"Bilan 'Prépa Compétences'"}
                    className="text-center"
                />
                <div className="flex gap-2 justify-items-center">
                    <SelectForm label={"Centre AFPA"} placeholder={"Selectionner un centre"} options={centers} />
                    <InputFormWithLabel label={"Agence France Travail"} type={"text"} placeholder={""} />
                </div>
                <hr/>
                <div className="flex flex-col gap-2 items-start">
                    <InputFormWithLabel label={"Nom du référent AFPA"} type={"text"} placeholder={""} />
                    <InputFormWithLabel label={"Téléphone"} type={"phone"} placeholder={""} />
                    <InputFormWithLabel label={"Mail"} type={"email"} placeholder={""} />

                </div>

            </div>
        </div>
    );
};

export default PrepaCompetencePage;
