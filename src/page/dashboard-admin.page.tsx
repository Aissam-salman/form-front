import {useEffect, useState} from "react";
import {BellIcon, BookIcon, BookOpenIcon, FileTextIcon, HomeIcon, Settings2Icon, UsersIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Tabs, TabsContent} from "@/components/ui/tabs.tsx";
import Logo from "@/components/logo.tsx";
import DataTable from "@/components/data-table.tsx";
import {ColumnDef} from "@tanstack/react-table"
import {Candidate} from "@/types/Candidate.ts";
import {Client} from "@stomp/stompjs";

const DashboardAdminPage = () => {
    const [activeTab, setActiveTab] = useState("candidats")
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    const menuItems = [
        { id: "candidats", label: "Candidats", icon: UsersIcon },
        { id: "classes", label: "Classes", icon: BookOpenIcon },
        { id: "formateurs", label: "Formateurs", icon: BookIcon },
        { id: "centers", label: "Centers", icon: HomeIcon },
        { id: "forms", label: "Forms", icon: FileTextIcon },
    ]

    const columns: ColumnDef<Candidate>[] = [
        {
            accessorKey: "id",
            header: "Identifiant",
        },
        {
            accessorKey: "firstname",
            header: "First Name",
        },
        {
            accessorKey: "lastname",
            header: "Last Name",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phone_number",
            header: "Phone number",
        }
    ];

    useEffect(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:8081/ws',
            onConnect: () => {
                console.log("Connected to WebSocket");
                client.subscribe("/topic/candidates", (message) => {
                    const candidateList = JSON.parse(message.body);
                    setCandidates(candidateList);
                });

                client.publish({ destination: '/app/candidates' });
            },
            onDisconnect: () => {
                console.log("Disconnected from WebSocket");
            },
            debug: (str) => {
                console.log(str);
            },
        });

        client.activate();

        return () => { client.deactivate(); };
    }, []);


    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <Logo />
                <nav className="mt-6">
                    {menuItems.map((item) => (
                        <Button
                            key={item.id}
                            variant={activeTab === item.id ? "default" : "ghost"}
                            className="w-full justify-start text-left font-normal mb-1"
                            onClick={() => setActiveTab(item.id)}
                        >
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.label}
                        </Button>
                    ))}
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
                            {menuItems.find(item => item.id === activeTab)?.label}
                        </h2>
                        <div className="flex items-center">
                            <Button variant="ghost" size="icon" className="mr-2">
                                {/*TODO: add dropdown menu with notif*/}
                                <BellIcon className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="mr-4">
                                {/*TODO: add dropdown with logout, profile, */}
                                <Settings2Icon className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                        <TabsContent value="candidats" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Candidats</CardTitle>
                                    <CardDescription>Gérer les candidats ici.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <Label htmlFor="search-users">Rechercher un candidat</Label>
                                        <Input id="search-users" placeholder="Search by name or email..." />
                                    </div>
                                    <DataTable columns={columns} data={candidates} />
                                    {/* Add user list or table component here */}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="formateurs" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Formateurs</CardTitle>
                                    <CardDescription>Gérer les formateurs ici.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <Label htmlFor="search-users">Rechercher un formateur</Label>
                                        <Input id="search-users" placeholder="Search by name or email..." />
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
                                        <Label htmlFor="search-classes">Rechercher une classe</Label>
                                        <Input id="search-classes" placeholder="Search by class name or ID..." />
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
                                        <Label htmlFor="search-centers">Rechercher un centre AFPA</Label>
                                        <Input id="search-centers" placeholder="Search by center name or location..." />
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
                                        <Label htmlFor="search-forms">Rechercher un formulaire</Label>
                                        <Input id="search-forms" placeholder="Search by form name or type..." />
                                    </div>
                                    {/* Add form list or table component here */}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
};

export default DashboardAdminPage;
