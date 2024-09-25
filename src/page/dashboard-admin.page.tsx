import {useEffect, useState} from "react";
import {BookIcon, BookOpenIcon, FileTextIcon, HomeIcon, UsersIcon,} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Tabs, TabsContent} from "@/components/ui/tabs.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {Candidate} from "@/types/Candidate.ts";
import candidateService from "@/service/candidate.service.ts";
import {toast} from "sonner";
import {Toaster} from "@/components/ui/sonner.tsx";
import Sidebar from "@/components/Sidebar.tsx";
import HeaderDashboard from "@/components/header-dashboard.tsx";
import {GetCandidateColumns} from "@/components/dashboard-admin/columnsCandidate.tsx";
import CandidatesTabContent from "@/components/dashboard-admin/candidate-tab-content.tsx";

const DashboardAdminPage = () => {
    const menuItems = [
        {id: "candidats", label: "Candidats", icon: UsersIcon},
        {id: "classes", label: "Classes", icon: BookOpenIcon},
        {id: "formateurs", label: "Formateurs", icon: BookIcon},
        {id: "centers", label: "Centers", icon: HomeIcon},
        {id: "forms", label: "Forms", icon: FileTextIcon},
    ];


    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [created, setCreated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(menuItems[0].id);

    const columns: ColumnDef<Candidate>[] = GetCandidateColumns({ candidates, setCandidates})

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

    const handleSuccess = (isSuccess: boolean) => {
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



    useEffect(() => {
        if(created){
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
                fetchCandidate();
            }, 5000)
        });


        return () => {
            setIsLoading(false);
            eventSource.close();
        };
    }, [created]);

    useEffect(() => {
        fetchCandidate();
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar menuItems={menuItems} />

            <main className="flex-1 overflow-y-auto">
                <HeaderDashboard menuItems={menuItems} activeTab={activeTab} />

                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="space-y-4"
                    >
                        <CandidatesTabContent columns={columns} candidates={candidates} isLoading={isLoading} handleSuccess={handleSuccess} />
                        {/*<TabsContent value="candidats" className="space-y-4">*/}
                        {/*    <Card>*/}
                        {/*        <CardHeader>*/}
                        {/*            <CardTitle>Candidats</CardTitle>*/}
                        {/*            <CardDescription>Gérer les candidats ici.</CardDescription>*/}
                        {/*        </CardHeader>*/}
                        {/*        <CardContent>*/}
                        {/*            <div className="flex justify-between mb-2">*/}
                        {/*                <div>*/}
                        {/*                    <Label htmlFor="search-users">Rechercher un candidat</Label>*/}
                        {/*                    <Input*/}
                        {/*                        id="search-users"*/}
                        {/*                        placeholder="Par nom..."*/}
                        {/*                    />*/}
                        {/*                </div>*/}
                        {/*                <NewCandidateModal onSuccess={handleSuccess}>*/}
                        {/*                    <Button  className="self-end">*/}
                        {/*                        <SquarePlus className="h-5 w-5"/>*/}
                        {/*                    </Button>*/}
                        {/*                </NewCandidateModal>*/}
                        {/*            </div>*/}
                        {/*            {isLoading ? (*/}
                        {/*                <div>Loading...</div>*/}
                        {/*            ) : (*/}
                        {/*                <DataTable columns={columns} data={candidates}/>*/}
                        {/*            )}*/}
                        {/*        </CardContent>*/}
                        {/*    </Card>*/}
                        {/*</TabsContent>*/}

                        <TabsContent value="formateurs" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Formateurs</CardTitle>
                                    <CardDescription>Gérer les formateurs ici.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <Label htmlFor="search-users">
                                            Rechercher un formateur
                                        </Label>
                                        <Input
                                            id="search-users"
                                            placeholder="Search by name or email..."
                                        />
                                    </div>
                                    {/* Add user list or table component here */}
                                </CardContent>
                            </Card>
                        </TabsContent>
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
            <Toaster />
        </div>
    );
};

export default DashboardAdminPage;