import Navbar from "@/components/navbar.tsx";
import {Title} from "@/components/form/ui/title-form.tsx";
import centerService from "@/service/center.service.ts";
import {useEffect, useState} from "react";
import {Center} from "@/types/Center.ts";
import {RadioGroupItem} from "@/components/form/ui/radio-form.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Former} from "@/types/Former.ts";
import formerService from "@/service/former.service.ts";
import {Input} from "@/components/ui/input.tsx";
import {useStore} from "@/store/use-store.ts";
import candidateService from "@/service/candidate.service.ts";
import {Candidate} from "@/types/Candidate.ts";

const PrepaCompetencePage = () => {

    const [centers, setCenters] = useState<Center[]>([]);
    const [formers, setFormers] = useState<Former[]>([]);
    const [user, setUser] = useState<Candidate>({
        email: "",
        firstname: "",
        id: "",
        lastname: "",
        phone_number: ""
    });

    const fetchFormers = async () => {
        const resp = await formerService.getAll();
        if (resp.data) {
            setFormers(resp.data)
        }
    }

    const userId = useStore((state) => state.id);

    console.log(userId)

    const fetchUser = async () => {
        const resp = await candidateService.getOne(userId);
        if (resp.data) {
            console.log(resp.data)
            setUser(resp.data)
        }
    }

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


    const prepaFormSchema = z.object({
        center: z.string().min(3, "Le centre est requis"),

    })

    type FormValues = z.infer<typeof prepaFormSchema>;

    const form = useForm<FormValues>({
        resolver: zodResolver(prepaFormSchema),
        //     TODO: ADD DEFAULT VALUES
    })

    const onSubmit = (data: FormValues) => {
        console.log(data);
    }

    useEffect(() => {
        fetchCenters();
        fetchFormers();
        fetchUser();
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar/>
            <section className="flex flex-col gap-10 pb-10">
                <Title className="text-center">
                    Bilan 'Prépa Compétences'
                </Title>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="flex justify-center">

                            <Card className="mx-auto">
                                <CardContent>
                                    <div className="flex gap-2 justify-items-center">
                                        <FormField
                                            control={form.control}
                                            name="center"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Centre AFPA</FormLabel>
                                                    <FormControl>
                                                        <Select {...field}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={"Choisir un centre"}/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {centers.map(center => (
                                                                    <SelectItem key={center.id}
                                                                                value={center.id.toString()}>
                                                                        {center.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormDescription>
                                                        Si votre centre n'est pas dans la liste, merci de le signaler à
                                                        votre formateur.
                                                    </FormDescription>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
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
                                        <FormField
                                            control={form.control}
                                            name="center"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Nom du référent AFPA</FormLabel>
                                                    <FormControl>
                                                        <Select {...field}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={"Choisir un référent"}/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {formers.map(former => (
                                                                    <SelectItem key={former.id}
                                                                                value={former.id.toString()}>
                                                                        {`${former.lastname} ${former.lastname}: ${former.phone_number}, ${former.email}`}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormDescription>
                                                        Si votre référent n'est pas dans la liste, merci de le signaler.
                                                    </FormDescription>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
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
                                    {user != null ? (
                                        <div>
                                            {user.firstname} {user.lastname} est déjà enregistré
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-2 ">
                                            <FormField
                                                control={form.control}
                                                name="center"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Nom</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                        </FormDescription>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="center"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Prénom</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                        </FormDescription>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="center"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Prénom</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                        </FormDescription>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="center"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Prénom</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                        </FormDescription>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="center"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Identifiant</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                        </FormDescription>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="center"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Téléphone</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                        </FormDescription>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            /> <FormField
                                            control={form.control}
                                            name="center"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Mail</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={"example@gmail.com"} {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                    </FormDescription>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </form>
                </Form>
                {/*    */}

                {/*    <div className="flex justify-center ">*/}
                {/*        <Card>*/}
                {/*            <CardHeader>*/}
                {/*                <CardTitle>*/}
                {/*                    Référent France Travail*/}
                {/*                </CardTitle>*/}
                {/*            </CardHeader>*/}
                {/*            <CardContent>*/}
                {/*                <div className="flex flex-col gap-2 items-start">*/}
                {/*                    <InputFormWithLabel label={"Nom du conseiller"} type={"text"} placeholder={""}/>*/}
                {/*                    <InputFormWithLabel label={"Téléphone"} type={"phone"} placeholder={""}/>*/}
                {/*                    <InputFormWithLabel label={"Mail"} type={"email"} placeholder={""}/>*/}
                {/*                    <InputFormWithLabel*/}
                {/*                        label={"Nom du référent"}*/}
                {/*                        type={"text"}*/}
                {/*                        placeholder={"Autre que France Travail"}*/}
                {/*                    />*/}
                {/*                    <div>*/}
                {/*                        <TextareaForm*/}
                {/*                            className={"min-w-80 min-h-36"}*/}
                {/*                            label={"Objectif du bénéficiaire"}*/}
                {/*                            type={"text"}*/}
                {/*                            placeholder={"Ajouter les souhaits du bénéficiaire si écart avec la" +*/}
                {/*                                " prescription du conseiller France Travail"}*/}
                {/*                        />*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </CardContent>*/}
                {/*        </Card>*/}
                {/*    </div>*/}
                {/*    <div className="flex justify-center">*/}
                {/*        <Card>*/}
                {/*            <CardHeader>*/}
                {/*                <CardTitle className="text-center">*/}
                {/*                    Adhésion suite au premier entretien*/}
                {/*                </CardTitle>*/}
                {/*            </CardHeader>*/}
                {/*            <CardContent className="flex gap-5 flex-col">*/}
                {/*                <RadioForm options={radioOptionsAdhesion}/>*/}
                {/*                <DateForm label={"Date d'entrée dans le dispositif"}/>*/}
                {/*                <TextareaForm*/}
                {/*                    className={"min-w-80"}*/}
                {/*                    label={"Si non-adhésion, quel en est le motif ?"}*/}
                {/*                    type={"text"}*/}
                {/*                />*/}
                {/*                <Signature label={"Signature du bénéficiaire"}/>*/}
                {/*            </CardContent>*/}
                {/*        </Card>*/}
                {/*    </div>*/}
                {/*    <hr/>*/}
                {/*    <div className="flex justify-center">*/}
                {/*        <Card>*/}
                {/*            <CardContent>*/}
                {/*                <TextareaForm*/}
                {/*                    className={"min-w-80"}*/}
                {/*                    label={"Métier(s) ou secteur(s) d'activité ciblé(s)"}*/}
                {/*                    type={"text"}*/}
                {/*                />*/}
                {/*            </CardContent>*/}
                {/*        </Card>*/}
                {/*    </div>*/}
                {/*</section>*/}
                {/*<section>*/}
                {/*    <div className="space-y-8 p-6 bg-white border rounded-lg shadow">*/}
                {/*        <Title2 className="text-center">Bilan de sortie</Title2>*/}

                {/*        <div className=" flex justify-center">*/}
                {/*            <Card>*/}
                {/*                <CardContent className="space-y-4">*/}
                {/*                    <DateForm label={"Date de réalisation du bilan"}/>*/}
                {/*                    <TextareaForm*/}
                {/*                        label={"Synthèse du parcours et plan d'actions envisagé"}*/}
                {/*                        type={"text"}*/}
                {/*                        placeholder={"Ce qui reste à faire pour concrétiser le projet"}*/}
                {/*                        className={"min-w-96"}*/}
                {/*                    />*/}
                {/*                    <DateForm label={"RDV prise avec FT le"}/>*/}
                {/*                    <TextareaForm*/}
                {/*                        label={"Points de vigilance"}*/}
                {/*                        placeholder={"Ce qui pourrait gêner ou retarder le projet"}*/}
                {/*                        type={"text"}*/}
                {/*                        className={"min-w-96"}*/}
                {/*                    />*/}
                {/*                    <TextareaForm*/}
                {/*                        label={"Commentaire du bénéficiaire"}*/}
                {/*                        type={"text"}*/}
                {/*                        className={"min-w-96"}*/}
                {/*                    />*/}
                {/*                </CardContent>*/}

                {/*            </Card>*/}
                {/*        </div>*/}

                {/*        <div className="flex justify-center">*/}
                {/*            <Card>*/}
                {/*                <CardHeader>*/}
                {/*                    <CardTitle className="text-center">*/}
                {/*                        Motif de sortie*/}
                {/*                    </CardTitle>*/}
                {/*                </CardHeader>*/}
                {/*                <CardContent>*/}
                {/*                    <RadioForm options={radioOptionsMotifOut}/>*/}
                {/*                    /!*TODO: add logic to disabled not, after checked motif*!/*/}
                {/*                    <div className="flex items-center space-x-2">*/}
                {/*                        <Checkbox id="club-prepa"/>*/}
                {/*                        <Label htmlFor="club-prepa">Nécessité d’un suivi (Atelier Club Prépa)</Label>*/}
                {/*                    </div>*/}
                {/*                    <div>*/}
                {/*                        <Label htmlFor="first-date">Si oui, première date proposée :</Label>*/}
                {/*                        <Input type="date" id="first-date"/>*/}
                {/*                    </div>*/}
                {/*                    <div>*/}
                {/*                        <Label>Date de sortie :</Label>*/}
                {/*                        <Input type="date"/>*/}
                {/*                    </div>*/}
                {/*                    <div>*/}
                {/*                        <Label>Motif :</Label>*/}
                {/*                        <Textarea/>*/}
                {/*                    </div>*/}
                {/*                    <div>*/}
                {/*                        <Label>Date d’abandon :</Label>*/}
                {/*                        <Input type="date"/>*/}
                {/*                    </div>*/}
                {/*                    <div>*/}
                {/*                        <Label>Motif :</Label>*/}
                {/*                        <Textarea/>*/}
                {/*                    </div>*/}
                {/*                </CardContent>*/}
                {/*            </Card>*/}
                {/*        </div>*/}

                {/*        <div className="flex justify-center gap-12">*/}
                {/*            <Card>*/}
                {/*                <CardContent className="space-y-8">*/}
                {/*                    <InputFormWithLabel label={"Référent de parcours AFPA"} type={"text"}*/}
                {/*                                        placeholder={"Nom, prénom"}/>*/}
                {/*                    <Signature label={"Signature"}/>*/}
                {/*                </CardContent>*/}
                {/*            </Card>*/}
                {/*            <Card>*/}
                {/*                <CardContent className={"space-y-4"}>*/}
                {/*                    <InputFormWithLabel label={"Le bénéficiaire"} type={"text"} placeholder={"Nom," +*/}
                {/*                        " prénom"}/>*/}
                {/*                    <CheckboxForm label={"J'autorise l'Afpa à transmettre ce bilan à mon conseiller" +*/}
                {/*                        " référent France Travail"}/>*/}
                {/*                    <Signature label={"Signature"}/>*/}
                {/*                </CardContent>*/}
                {/*            </Card>*/}
                {/*        </div>*/}
                {/*        <Card>*/}
                {/*            <CardContent className={"space-y-4"}>*/}
                {/*                <InputFormWithLabel label={"A"} type={"text"} placeholder={"Brest"}/>*/}
                {/*                <DateForm label={"le"}/>*/}
                {/*            </CardContent>*/}
                {/*        </Card>*/}

                {/*    </div>*/}
            </section>

        </div>
    );
};

export default PrepaCompetencePage;
