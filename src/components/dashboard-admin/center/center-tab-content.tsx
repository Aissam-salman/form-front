import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {TabsContent} from "@/components/ui/tabs.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {SquarePlus} from "lucide-react";
import {ColumnDef} from "@tanstack/react-table";
import DataTable from "@/components/data-table.tsx";
import {Center} from "@/types/Center.ts";
import NewCenterModal from "@/components/dashboard-admin/center/new-center-modal.tsx";
import {useState} from "react";

interface CenterTabContentProps {
    columns: ColumnDef<Center>[],
    centers: Center[],
    isLoading: boolean,
    handleSuccess: (isSuccess: boolean) => void,
}

const CenterTabContent: React.FC<CenterTabContentProps> = ({
                                                                       columns,
                                                                       centers,
                                                                       isLoading,
                                                                       handleSuccess,
                                                                   }) => {
const [searchTerm, setSearchTerm] = useState("");
const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
};
const filteredCenters = centers.filter((center) =>
    `${center.name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
);

    return (
        <TabsContent value="centers" className="space-y-4">
            <Card>
            <CardHeader>
                <CardTitle>Centre AFPA</CardTitle>
                <CardDescription>Gérer les centres ici.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between mb-2">
                    <div>
                        <Label htmlFor="search-centers">Rechercher un centre</Label>
                        <Input
                            id="search-centers"
                            placeholder="Par nom..."
                            value={searchTerm}
                            className="w-full"
                            onChange={handleSearchChange}
                        />
                    </div>
                <NewCenterModal onSuccess={handleSuccess}>
                    <Button className="self-end">
                        <SquarePlus className="h-5 w-5"/>
                    </Button>
                </NewCenterModal>
                </div>
                {isLoading ? (
                <div>Loading...</div>
                ) : (
                <DataTable  key={filteredCenters.length} columns={columns} data={[...filteredCenters]} />
                )}
            </CardContent>
            </Card>
        </TabsContent>
    );
};

export default CenterTabContent;
