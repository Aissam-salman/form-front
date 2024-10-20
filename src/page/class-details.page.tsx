import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classeService from '@/service/classe.service.ts';
import { Candidate } from '@/types/Candidate.ts';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';

const ClassDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [classe, setClasse] = useState<any>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [newCandidate, setNewCandidate] = useState<Candidate>({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        phone_number: '',
    });

    useEffect(() => {
        const fetchClassDetails = async () => {
            const response = await classeService.getOne(id);
            setClasse(response.data);
            setCandidates(response.data.candidates || []);
        };

        fetchClassDetails();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCandidate({
            ...newCandidate,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddCandidate = async (e: React.FormEvent) => {
        e.preventDefault();
        // Assurez-vous que votre backend a une API pour ajouter des candidats à une classe
        await classeService.addCandidateToClass(id, newCandidate);
        setCandidates([...candidates, newCandidate]);
        setNewCandidate({
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            phone_number: '',
        });
    };

    return (
        <div>
            <h1>Détails de la classe</h1>
            {classe && (
                <div>
                    <h2>{classe.name}</h2>
                    <p>{classe.description}</p>
                    <h3>Candidats</h3>
                    <ul>
                        {candidates.map(candidate => (
                            <li key={candidate.id}>{candidate.firstname} {candidate.lastname}</li>
                        ))}
                    </ul>
                    <form onSubmit={handleAddCandidate}>
                        <Input type="text" name="firstname" value={newCandidate.firstname} onChange={handleChange} placeholder="Prénom" />
                        <Input type="text" name="lastname" value={newCandidate.lastname} onChange={handleChange} placeholder="Nom" />
                        <Input type="email" name="email" value={newCandidate.email} onChange={handleChange} placeholder="Email" />
                        <Input type="phone" name="phone_number" value={newCandidate.phone_number} onChange={handleChange} placeholder="Téléphone" />
                        <Button type="submit">Ajouter Candidat</Button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ClassDetailsPage;