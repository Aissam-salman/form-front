import {useEffect, useState} from "react";
import {BookIcon, BookOpenIcon, FileTextIcon, HomeIcon, UsersIcon,} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Tabs, TabsContent} from "@/components/ui/tabs.tsx";
import {Candidate} from "@/types/Candidate.ts";
import candidateService from "@/service/candidate.service.ts";
import {toast} from "sonner";
import {Toaster} from "@/components/ui/sonner.tsx";
import Sidebar from "@/components/dashboard-admin/Sidebar.tsx";
import HeaderDashboard from "@/components/dashboard-admin/header-dashboard.tsx";
import {GetCandidateColumns} from "@/components/dashboard-admin/columns-candidate.tsx";
import CandidatesTabContent from "@/components/dashboard-admin/candidate-tab-content.tsx";
import FormersTabContent from "@/components/dashboard-admin/former-tab-content.tsx";
import {Former} from "@/types/Former.ts";
import {GetFormerColumns} from "@/components/dashboard-admin/columns-former.tsx";
import formerService from "@/service/former.service.ts";

const DashboardAdminPage = () => {
    const menuItems = [
        {id: "candidates", label: "Candidats", icon: UsersIcon},
        {id: "classes", label: "Classes", icon: BookOpenIcon},
        {id: "formers", label: "Formateurs", icon: BookIcon},
        {id: "centers", label: "Centers", icon: HomeIcon},
        {id: "forms", label: "Forms", icon: FileTextIcon},
    ];

    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [formers, setFormers] = useState<Former[]>([]);

    const [created, setCreated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    const [activeTab, setActiveTab] = useState(menuItems[0].id);

    const candidateColumns = GetCandidateColumns({candidates, setCandidates});
    const formerColumns = GetFormerColumns({formers, setFormers});

    const fetchFormers = async () => {
        setIsLoading(true);
        try {
            const resp = await formerService.getAll();
            setFormers(resp.data)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchCandidate = async () => {
        setIsLoading(true);
        try {
            const resp = await candidateService.getAll();
            setCandidates(resp.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuccessCandidate = (isSuccess: boolean) => {
        if (isSuccess && !created) {

            toast.success("Nouveau candidat!.");
            fetchCandidate()
            setCreated(true);

            setTimeout(() => {
                setCreated(false);
            }, 10000);
        } else {
            toast.error("Erreur lors de la création du candidat");
            setCreated(false);
        }
    }

    const handleSuccessFormer = (isSuccess: boolean) => {
        if (isSuccess && !created) {

            toast.success("Nouveau formateur !");
            fetchFormers()
            setCreated(true);

            setTimeout(() => {
                setCreated(false);
            }, 10000);
        } else {
            toast.error("Erreur lors de la création du formateur");
            setCreated(false);
        }
    }


    useEffect(() => {
        if (created) {
            return;
        }

        const eventSource = new EventSource(
            "http://localhost:8081/api/v1/sse/events"
        );

        eventSource.addEventListener("update", (event) => {
            console.log("updated: " + event.data);
            setIsLoading(true);
            setTimeout(() => {
                console.log("update DB");
                switch (activeTab){
                    case menuItems[0].id:
                        fetchCandidate();
                        break;
                        case menuItems[1].id:
                            // classe
                        break;
                        case menuItems[2].id:
                            fetchFormers();
                            // formateurs
                        break;
                    case menuItems[3].id:
                        // centers
                        break;
                    case menuItems[4].id:
                        //forms
                        break;
                }
            }, 5000)
        });


        return () => {
            setIsLoading(false);
            eventSource.close();
        };
    }, [activeTab, created]);

    useEffect(() => {
        console.log(activeTab)
        switch (activeTab){
            case menuItems[0].id:
                fetchCandidate();
                break;
            case menuItems[1].id:
                // classe
                break;
            case menuItems[2].id:
                fetchFormers();
                // formateurs
                break;
            case menuItems[3].id:
                // centers
                break;
            case menuItems[4].id:
                //forms
                break;
        }
    }, [activeTab]);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} menuItems={menuItems}/>

            <main className="flex-1 overflow-y-auto">
                <HeaderDashboard menuItems={menuItems} activeTab={activeTab}/>

                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="space-y-4"
                    >
                        {/*TODO: need to add affected Path*/}
                        <CandidatesTabContent
                            columns={candidateColumns}
                            candidates={candidates}
                            isLoading={isLoading}
                            handleSuccess={handleSuccessCandidate}
                        />
                        <FormersTabContent
                            columns={formerColumns}
                            formers={formers}
                            isLoading={isLoading}
                            handleSuccess={handleSuccessFormer}
                        />

                        <TabsContent value="classes" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Classes</CardTitle>
                                    <CardDescription>Gérer les classes ici.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <Label htmlFor="search-classes">
                                            Rechercher une classe
                                        </Label>
                                        <Input
                                            id="search-classes"
                                            placeholder="Search by class name or ID..."
                                        />
                                    </div>
                                    {/* Add class list or table component here */}
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="centers" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Centres AFPA</CardTitle>
                                    <CardDescription>Gérer les centres AFPA ici.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <Label htmlFor="search-centers">
                                            Rechercher un centre AFPA
                                        </Label>
                                        <Input
                                            id="search-centers"
                                            placeholder="Search by center name or location..."
                                        />
                                    </div>
                                    {/* Add center list or table component here */}

                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="forms" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Formulaires</CardTitle>
                                    <CardDescription>Gérer les formulaires ici.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <Label htmlFor="search-forms">
                                            Rechercher un formulaire
                                        </Label>
                                        <Input
                                            id="search-forms"
                                            placeholder="Search by form name or type..."
                                        />
                                    </div>
                                    {/* Add form list or table component here */}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Toaster/>
        </div>
    );
};

export default DashboardAdminPage;
