import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Phase1Component = ({ onDataChange }) => {
  const [phase1Data, setPhase1Data] = useState({
    atelier1: {
      dateDebut: '',
      dateFin: '',
      heures: '',
      ceQueJeRetiens: '',
      commentairesIntervenant: '',
    }
  });

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setPhase1Data(prevData => ({
      ...prevData,
      atelier1: {
        ...prevData.atelier1,
        [field]: value
      }
    }));
    onDataChange(phase1Data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">PHASE 1 : Confirmer son projet</h2>
      
      <div className="border p-4 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Atelier 1</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dateDebut">Du :</Label>
            <Input type="date" id="dateDebut" value={phase1Data.atelier1.dateDebut} onChange={(e) => handleInputChange(e, 'dateDebut')} />
          </div>
          <div>
            <Label htmlFor="dateFin">au :</Label>
            <Input type="date" id="dateFin" value={phase1Data.atelier1.dateFin} onChange={(e) => handleInputChange(e, 'dateFin')} />
          </div>
          <div>
            <Label htmlFor="heures">de ... heures à ... heures :</Label>
            <Input id="heures" value={phase1Data.atelier1.heures} onChange={(e) => handleInputChange(e, 'heures')} />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="ceQueJeRetiens">Ce que je retiens :</Label>
          <Textarea id="ceQueJeRetiens" value={phase1Data.atelier1.ceQueJeRetiens} onChange={(e) => handleInputChange(e, 'ceQueJeRetiens')} />
        </div>
        <div className="mt-4">
          <Label htmlFor="commentairesIntervenant">Commentaires de l'intervenant :</Label>
          <Textarea id="commentairesIntervenant" value={phase1Data.atelier1.commentairesIntervenant} onChange={(e) => handleInputChange(e, 'commentairesIntervenant')} />
        </div>
      </div>
    </div>
  );
};

export default Phase1Component;