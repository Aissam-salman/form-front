import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Phase2Component = ({ onDataChange }) => {
  const [phase2Data, setPhase2Data] = useState({
    atelier2: {
      metier: '',
      dateDebut: '',
      dateFin: '',
      heures: '',
      moyenDecouverte: '',
      entreprise: '',
      choixMetierConfirme: '',
      competences: [],
    },
    commentairesReferentAFPA: '',
    ceQueJeRetiens: '',
    atelier9: {
      dateDebut: '',
      dateFin: '',
      heures: '',
      moyen: '',
      ceQueJeRetiens: '',
      commentairesIntervenant: '',
    },
    atelier10: {
      dateDebut: '',
      dateFin: '',
      heures: '',
      moyen: '',
      ceQueJeRetiens: '',
      commentairesIntervenant: '',
    },
  });

  const handleInputChange = (e, section, field) => {
    const { value } = e.target;
    setPhase2Data(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value
      }
    }));
    onDataChange(phase2Data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">PHASE 2 : Découvrir, pratiquer et faire son choix</h2>
      
      <div className="border p-4 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Atelier 2 : Découvrir son métier et consolider son projet professionnel</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="metier">Je découvre le métier de :</Label>
            <Input id="metier" value={phase2Data.atelier2.metier} onChange={(e) => handleInputChange(e, 'atelier2', 'metier')} />
          </div>
          <div>
            <Label htmlFor="dateDebut">Du :</Label>
            <Input type="date" id="dateDebut" value={phase2Data.atelier2.dateDebut} onChange={(e) => handleInputChange(e, 'atelier2', 'dateDebut')} />
          </div>
          <div>
            <Label htmlFor="dateFin">au :</Label>
            <Input type="date" id="dateFin" value={phase2Data.atelier2.dateFin} onChange={(e) => handleInputChange(e, 'atelier2', 'dateFin')} />
          </div>
          <div>
            <Label htmlFor="heures">de ... heures à ... heures :</Label>
            <Input id="heures" value={phase2Data.atelier2.heures} onChange={(e) => handleInputChange(e, 'atelier2', 'heures')} />
          </div>
        </div>
        {/* Add more fields for Atelier 2 */}
      </div>

      <div className="border p-4 rounded-md">
        <Label htmlFor="commentairesReferentAFPA">Commentaires du référent AFPA :</Label>
        <Textarea id="commentairesReferentAFPA" value={phase2Data.commentairesReferentAFPA} onChange={(e) => handleInputChange(e, '', 'commentairesReferentAFPA')} />
      </div>

      <div className="border p-4 rounded-md">
        <Label htmlFor="ceQueJeRetiens">« Ce que je retiens de cette phase » (par le bénéficiaire) :</Label>
        <Textarea id="ceQueJeRetiens" value={phase2Data.ceQueJeRetiens} onChange={(e) => handleInputChange(e, '', 'ceQueJeRetiens')} />
      </div>

      {/* Add Atelier 9 and Atelier 10 sections similar to Atelier 2 */}
    </div>
  );
};

export default Phase2Component;