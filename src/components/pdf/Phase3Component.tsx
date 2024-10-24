import  {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";

const Phase3Component = ({ onDataChange }) => {
  const [phase3Data, setPhase3Data] = useState({
    atelier3: {
      dateDebut: '',
      dateFin: '',
      heures: '',
      ceQueJeRetiens: '',
      commentairesIntervenant: '',
    },
    atelier4: {
      dateDebut: '',
      dateFin: '',
      heures: '',
      ceQueJeRetiens: '',
      commentairesIntervenant: '',
    },
    atelier5: {
      dateDebut: '',
      dateFin: '',
      heures: '',
      ceQueJeRetiens: '',
      commentairesIntervenant: '',
    },
    atelier8: {
      dateDebut: '',
      dateFin: '',
      heures: '',
      ceQueJeRetiens: '',
      commentairesIntervenant: '',
    },
  });

  const handleInputChange = (e, atelier, field) => {
    const { value } = e.target;
    setPhase3Data(prevData => ({
      ...prevData,
      [atelier]: {
        ...prevData[atelier],
        [field]: value
      }
    }));
    onDataChange(phase3Data);
  };

  const renderAtelier = (atelierNumber, title) => (
    <div className="border p-4 rounded-md mb-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`dateDebut${atelierNumber}`}>Du :</Label>
          <Input type="date" id={`dateDebut${atelierNumber}`} value={phase3Data[`atelier${atelierNumber}`].dateDebut} onChange={(e) => handleInputChange(e, `atelier${atelierNumber}`, 'dateDebut')} />
        </div>
        <div>
          <Label htmlFor={`dateFin${atelierNumber}`}>au :</Label>
          <Input type="date" id={`dateFin${atelierNumber}`} value={phase3Data[`atelier${atelierNumber}`].dateFin} onChange={(e) => handleInputChange(e, `atelier${atelierNumber}`, 'dateFin')} />
        </div>
        <div>
          <Label htmlFor={`heures${atelierNumber}`}>de ... heures à ... heures :</Label>
          <Input id={`heures${atelierNumber}`} value={phase3Data[`atelier${atelierNumber}`].heures} onChange={(e) => handleInputChange(e, `atelier${atelierNumber}`, 'heures')} />
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor={`ceQueJeRetiens${atelierNumber}`}>« Ce que je retiens de cette phase » (par le bénéficiaire) :</Label>
        <Textarea id={`ceQueJeRetiens${atelierNumber}`} value={phase3Data[`atelier${atelierNumber}`].ceQueJeRetiens} onChange={(e) => handleInputChange(e, `atelier${atelierNumber}`, 'ceQueJeRetiens')} />
      </div>
      <div className="mt-4">
        <Label htmlFor={`commentairesIntervenant${atelierNumber}`}>Commentaires de l'intervenant AFPA :</Label>
        <Textarea id={`commentairesIntervenant${atelierNumber}`} value={phase3Data[`atelier${atelierNumber}`].commentairesIntervenant} onChange={(e) => handleInputChange(e, `atelier${atelierNumber}`, 'commentairesIntervenant')} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">PHASE 3 : Ateliers complémentaires d'entraînement et d'accompagnement</h2>
      {renderAtelier(3, "Atelier 3 : Renforcer ses compétences numériques")}
      {renderAtelier(4, "Atelier 4 : Développer ses compétences de bases")}
      {renderAtelier(5, "Atelier 5 : Sécuriser son parcours")}
      {renderAtelier(8, "Atelier 8 : Découvrir le CPF")}
    </div>
  );
};

export default Phase3Component;