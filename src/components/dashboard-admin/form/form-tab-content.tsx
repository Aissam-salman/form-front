import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {TabsContent} from "@/components/ui/tabs.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {SquarePlus} from "lucide-react";
import {useState} from "react";
import DataTable from "@/components/data-table.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {Form} from "@/types/Form.ts";
import {useNavigate} from "react-router-dom";

interface FormTabContentProps {
    columns: ColumnDef<Form>[],
    forms: Form[],
    isLoading: boolean,
}


const FormTabContent: React.FC<FormTabContentProps> = ({columns, forms, isLoading}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredForms = forms.filter((form) =>
        `${form.title}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

                const navigate = useNavigate();

    return (
        <TabsContent value="forms" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Formulaires</CardTitle>
                    <CardDescription>Gérer les formulaires ici.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-2">
                        <div>
                            <Label htmlFor="search">Rechercher un formulaire</Label>
                            <Input
                                id="search"
                                placeholder="Par titre..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                            <Button className="self-end" onClick={() => navigate("/forms/prepa-competence")}>
                                <SquarePlus className="h-5 w-5"/>
                            </Button>
                    </div>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <DataTable key={filteredForms.length} columns={columns} data={[...filteredForms]} />
                    )}
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default FormTabContent;
