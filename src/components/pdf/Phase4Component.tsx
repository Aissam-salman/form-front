import {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";

const Phase4Component = ({ onDataChange }) => {
  const [phase4Data, setPhase4Data] = useState({
    atelier6: {
      dateDebut: '',
      dateFin: '',
      heures: '',
      metierVise: '',
      formations: [
        { intitule: '', organisme: '', lieu: '', dateEntree: '' },
        { intitule: '', organisme: '', lieu: '', dateEntree: '' },
        { intitule: '', organisme: '', lieu: '', dateEntree: '' },
      ],
      formationPresenteAuPRF: false,
      planFormationArgumente: '',
    },
    competencesDeveloppees: {
      communiquerEcrit: false,
      communiquerOral: false,
      utiliserMathematiques: false,
      utiliserOutils: false,
      recueillirTraiterInfo: false,
      travaillerGroupe: false,
      travaillerAutonomie: false,
      connaitreReglesSecurite: false,
      realiserActivitesPratiques: false,
      organiserActivitePro: false,
      faireChoixParcours: false,
    },
  });

  const handleInputChange = (e, section, field, index = null) => {
    const { value, type, checked } = e.target;
    setPhase4Data(prevData => {
      if (index !== null) {
        const newFormations = [...prevData.atelier6.formations];
        newFormations[index] = { ...newFormations[index], [field]: value };
        return {
          ...prevData,
          atelier6: {
            ...prevData.atelier6,
            formations: newFormations,
          },
        };
      } else if (type === 'checkbox') {
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [field]: checked,
          },
        };
      } else {
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [field]: value,
          },
        };
      }
    });
    onDataChange(phase4Data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">PHASE 4 : Concrétiser son projet</h2>
      
      <div className="border p-4 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Atelier 6 : Concrétiser son projet de professionnalisation</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dateDebut">Du :</Label>
            <Input type="date" id="dateDebut" value={phase4Data.atelier6.dateDebut} onChange={(e) => handleInputChange(e, 'atelier6', 'dateDebut')} />
          </div>
          <div>
            <Label htmlFor="dateFin">au :</Label>
            <Input type="date" id="dateFin" value={phase4Data.atelier6.dateFin} onChange={(e) => handleInputChange(e, 'atelier6', 'dateFin')} />
          </div>
          <div>
            <Label htmlFor="heures">de ... heures à ... heures :</Label>
            <Input id="heures" value={phase4Data.atelier6.heures} onChange={(e) => handleInputChange(e, 'atelier6', 'heures')} />
          </div>
          <div>
            <Label htmlFor="metierVise">Métier(s) visé(s) :</Label>
            <Input id="metierVise" value={phase4Data.atelier6.metierVise} onChange={(e) => handleInputChange(e, 'atelier6', 'metierVise')} />
          </div>
        </div>

        <h4 className="text-lg font-semibold mt-4 mb-2">Formations identifiées au sein de l'offre de formation</h4>
        {phase4Data.atelier6.formations.map((formation, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 mb-2">
            <Input placeholder="Intitulé" value={formation.intitule} onChange={(e) => handleInputChange(e, 'atelier6', 'intitule', index)} />
            <Input placeholder="Organisme" value={formation.organisme} onChange={(e) => handleInputChange(e, 'atelier6', 'organisme', index)} />
            <Input placeholder="Lieu" value={formation.lieu} onChange={(e) => handleInputChange(e, 'atelier6', 'lieu', index)} />
            <Input type="date" placeholder="Date d'entrée" value={formation.dateEntree} onChange={(e) => handleInputChange(e, 'atelier6', 'dateEntree', index)} />
          </div>
        ))}

        <div className="mt-4">
          <Label className="flex items-center">
            <Checkbox
              checked={phase4Data.atelier6.formationPresenteAuPRF}
              onCheckedChange={(checked) => handleInputChange({ target: { type: 'checkbox', checked } }, 'atelier6', 'formationPresenteAuPRF')}
            />
            <span className="ml-2">Formation présente au PRF</span>
          </Label>
        </div>

        <div className="mt-4">
          <Label htmlFor="planFormationArgumente">Plan de formation argumenté :</Label>
          <Textarea id="planFormationArgumente" value={phase4Data.atelier6.planFormationArgumente} onChange={(e) => handleInputChange(e, 'atelier6', 'planFormationArgumente')} />
        </div>
      </div>

      <div className="border p-4 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Les compétences développées pendant Prépa compétences et mises à jour dans le profil de compétences</h3>
        {Object.entries(phase4Data.competencesDeveloppees).map(([key, value]) => (
          <Label key={key} className="flex items-center mt-2">
            <Checkbox
              checked={value}
              onCheckedChange={(checked) => handleInputChange({ target: { type: 'checkbox', checked } }, 'competencesDeveloppees', key)}
            />
            <span className="ml-2">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
          </Label>
        ))}
      </div>
    </div>
  );
};

export default Phase4Component;