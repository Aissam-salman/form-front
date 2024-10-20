import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classeService from '@/service/classe.service.ts';
import candidateService from '@/service/candidate.service.ts';
import centerService from '@/service/center.service.ts';
import formerService from '@/service/former.service.ts';
import { Candidate } from '@/types/Candidate.ts';
import { Center } from '@/types/Center.ts';
import { Former } from '@/types/Former.ts';
import { Button } from '@/components/ui/button.tsx';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { PlusIcon } from 'lucide-react';
import HeaderDashboard from "@/components/dashboard-admin/header-dashboard.tsx";

const ClassDetailsPage: React.FC = () => {
    const { classId } = useParams();
    const [classe, setClasse] = useState<any>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [allCandidates, setAllCandidates] = useState<Candidate[]>([]);
    const [newCandidateId, setNewCandidateId] = useState<string>('');
    const [center, setCenter] = useState<Center | null>(null);
    const [former, setFormer] = useState<Former | null>(null);

    useEffect(() => {
        const fetchClassDetails = async () => {
            if (classId) {
                const response = await classeService.getOne(classId);
                setClasse(response.data);
                setCandidates(response.data.candidateIds || []);
                await fetchCenterDetails(response.data.centerId);
                await fetchFormerDetails(response.data.formerId);
                await fetchCandidateDetails(response.data.candidateIds);
            }
        };

        const fetchAllCandidates = async () => {
            const response = await candidateService.getAll();
            setAllCandidates(response.data);
        };

        const fetchCenterDetails = async (centerId: string) => {
            const response = await centerService.getOne(centerId);
            setCenter(response.data);
        };

        const fetchFormerDetails = async (formerId: string) => {
            const response = await formerService.getOne(formerId);
            setFormer(response.data);
        };

        const fetchCandidateDetails = async (candidateIds: string[]) => {
            const candidateDetails = await Promise.all(candidateIds.map(id => candidateService.getOne(id)));
            setCandidates(candidateDetails.map(response => response.data));
        };

        fetchClassDetails();
        fetchAllCandidates();
    }, [classId]);

const handleAddCandidate = async () => {
    if (newCandidateId) {
        try {
            await classeService.addCandidateToClasse(classId, [newCandidateId]);
            const newCandidate = allCandidates.find(candidate => candidate.id === newCandidateId);
            if (newCandidate) {
                setCandidates([...candidates, newCandidate]);
            }
            setNewCandidateId('');
        } catch (error) {
            console.error("Error adding candidate to class:", error);
        }
    }
};

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <HeaderDashboard menuItems={[{ id: '', label: 'Session Prépa Compétences n°: ' + classId }]} activeTab={''}/>

            {classe ? (
                <Card className="mx-auto my-8 p-4 ">
                    <CardHeader>
                        <CardTitle>Détails de la Session</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p>Centre AFPA de: {center ? center.name : 'Loading...'}</p>
                                <p>Formateur: {former ? `${former.firstname} ${former.lastname}` : 'Loading...'}</p>
                                <p>Date de début: {new Date(classe.date_start).toLocaleDateString('fr-FR')}</p>
                                <p>Date de fin: { new Date (classe.date_end).toLocaleDateString('fr-FR')}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Ajouter un candidat</h3>
                                <select
                                    value={newCandidateId}
                                    onChange={(e) => setNewCandidateId(e.target.value)}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Sélectionner un candidat</option>
                                    {allCandidates.map(candidate => (
                                        <option key={candidate.id} value={candidate.id}>
                                            {candidate.firstname} {candidate.lastname}
                                        </option>
                                    ))}
                                </select>
                                <Button onClick={handleAddCandidate} className="mt-2">
                                    <PlusIcon className="mr-2" /> Ajouter
                                </Button>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold mt-4">Candidats inscrits</h3>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Prénom</TableCell>
                                    <TableCell>Nom</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Téléphone</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {candidates.map(candidate => (
                                    <TableRow key={candidate.id}>
                                        <TableCell>{candidate.firstname}</TableCell>
                                        <TableCell>{candidate.lastname}</TableCell>
                                        <TableCell>{candidate.email}</TableCell>
                                        <TableCell>{candidate.phone_number}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ClassDetailsPage;