import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {TabsContent} from "@/components/ui/tabs";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {SquarePlus} from "lucide-react";
import {useState} from "react";
import {Candidate} from "@/types/Candidate.ts";
import {ColumnDef} from "@tanstack/react-table";
import NewCandidateModal from "@/components/modal/new-candidate-modal.tsx";
import DataTable from "@/components/data-table.tsx";

interface CandidatesTabContentProps {
    columns: ColumnDef<Candidate>[];
    candidates: Candidate[];
    isLoading: boolean;
    handleSuccess: (isSuccess: boolean) => void;
}

const CandidatesTabContent: React.FC<CandidatesTabContentProps> = ({
                                                                       columns,
                                                                       candidates,
                                                                       isLoading,
                                                                       handleSuccess,
                                                                   }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredCandidates = candidates.filter((candidate) =>
        `${candidate.firstname} ${candidate.lastname}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <TabsContent value="candidats" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Candidats</CardTitle>
                    <CardDescription>Gérer les candidats ici.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-2">
                        <div>
                            <Label htmlFor="search-users">Rechercher un candidat</Label>
                            <Input
                                id="search-users"
                                placeholder="Par nom..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <NewCandidateModal onSuccess={handleSuccess}>
                            <Button className="self-end">
                                <SquarePlus className="h-5 w-5" />
                            </Button>
                        </NewCandidateModal>
                    </div>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <DataTable columns={columns} data={filteredCandidates} />
                    )}
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default CandidatesTabContent;