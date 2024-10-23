import { useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Workshop } from "@/types/Workshop.ts";

interface SkillStatus {
  communiquerEcrit: boolean;
  communiquerOral: boolean;
  utiliserMathematiques: boolean;
  utiliserOutils: boolean;
  recueillirTraiterInfo: boolean;
  travaillerGroupe: boolean;
  travaillerAutonomie: boolean;
  connaitreReglesSecurite: boolean;
  realiserActivitesPratiques: boolean;
  organiserActivitePro: boolean;
  faireChoixParcours: boolean;
}

interface Workshop6CardProps {
  workshop: Workshop;
  onSave: (workshop: Workshop) => void;
  onChange: (workshop: Workshop) => void;
  skillStatus: SkillStatus;
}

interface Phase4Data {
  atelier6: {
    dateDebut: string;
    dateFin: string;
    heures: string;
    metierVise: string;
    formations: Array<{
      intitule: string;
      organisme: string;
      lieu: string;
      dateEntree: string;
    }>;
    formationPresenteAuPRF: boolean;
    planFormationArgumente: string;
  };
  competencesDeveloppees: SkillStatus;
}

const Workshop6Card: React.FC<Workshop6CardProps> = ({ workshop, onSave, skillStatus }) => {
  const [phase4Data, setPhase4Data] = useState<Phase4Data>({
    atelier6: {
      dateDebut: "",
      dateFin: "",
      heures: "",
      metierVise: "",
      formations: [
        { intitule: "", organisme: "", lieu: "", dateEntree: "" },
        { intitule: "", organisme: "", lieu: "", dateEntree: "" },
        { intitule: "", organisme: "", lieu: "", dateEntree: "" },
      ],
      formationPresenteAuPRF: false,
      planFormationArgumente: "",
    },
    competencesDeveloppees: skillStatus,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string,
    field: string,
    index: number | null = null
  ) => {
    const { value, type } = e.target;
    setPhase4Data(prev => {
      if (index !== null) {
        const newFormations = [...prev.atelier6.formations];
        newFormations[index] = { ...newFormations[index], [field]: value };
        return {
          ...prev,
          atelier6: {
            ...prev.atelier6,
            formations: newFormations,
          },
        };
      }
      return {
        ...prev,
        [section]: {
          ...prev[section as keyof Phase4Data],
          [field]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        },
      };
    });
  };

  const handleSave = () => {
    const updatedWorkshop: Workshop = {
      ...workshop,
      startDate: phase4Data.atelier6.dateDebut,
      endDate: phase4Data.atelier6.dateFin,
      learnings: phase4Data.atelier6.planFormationArgumente,
    };
    onSave(updatedWorkshop);
  };

  return (
    <div className="p-12 min-w-[80%] mx-auto">
      <div className="p-12 max-w-6xl mx-auto bg-white shadow-md rounded-lg">

          <h2 className="text-xl font-semibold mb-2">
            Atelier 6 : Concrétiser son projet de professionnalisation
          </h2>
        <div className="border p-8 rounded-md my-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateDebut">Du :</Label>
              <Input
                type="date"
                id="dateDebut"
                value={phase4Data.atelier6.dateDebut}
                onChange={(e) => handleInputChange(e, "atelier6", "dateDebut")}
              />
            </div>
            <div>
              <Label htmlFor="dateFin">au :</Label>
              <Input
                type="date"
                id="dateFin"
                value={phase4Data.atelier6.dateFin}
                onChange={(e) => handleInputChange(e, "atelier6", "dateFin")}
              />
            </div>
            <div>
              <Label htmlFor="heures">de ... heures à ... heures :</Label>
              <Input
                id="heures"
                value={phase4Data.atelier6.heures}
                onChange={(e) => handleInputChange(e, "atelier6", "heures")}
              />
            </div>
            <div>
              <Label htmlFor="metierVise">Métier(s) visé(s) :</Label>
              <Input
                id="metierVise"
                value={phase4Data.atelier6.metierVise}
                onChange={(e) => handleInputChange(e, "atelier6", "metierVise")}
              />
            </div>
          </div>

          <h4 className="text-lg font-semibold mt-4 mb-2">
            Formations identifiées au sein de l'offre de formation
          </h4>
          {phase4Data.atelier6.formations.map((formation, index) => (
            <div key={index} className="grid grid-cols-4 gap-2 mb-2">
              <Input
                placeholder="Intitulé"
                value={formation.intitule}
                onChange={(e) =>
                  handleInputChange(e, "atelier6", "intitule", index)
                }
              />
              <Input
                placeholder="Organisme"
                value={formation.organisme}
                onChange={(e) =>
                  handleInputChange(e, "atelier6", "organisme", index)
                }
              />
              <Input
                placeholder="Lieu"
                value={formation.lieu}
                onChange={(e) =>
                  handleInputChange(e, "atelier6", "lieu", index)
                }
              />
              <Input
                type="date"
                placeholder="Date d'entrée"
                value={formation.dateEntree}
                onChange={(e) =>
                  handleInputChange(e, "atelier6", "dateEntree", index)
                }
              />
            </div>
          ))}

          <div className="mt-4">
            <Label className="flex items-center">
              <Checkbox
                checked={phase4Data.atelier6.formationPresenteAuPRF}
                onCheckedChange={(checked) =>
                  handleInputChange(
                    { target: { type: "checkbox", checked } },
                    "atelier6",
                    "formationPresenteAuPRF"
                  )
                }
              />
              <span className="ml-2">Formation présente au PRF</span>
            </Label>
          </div>

          <div className="mt-4">
            <Label htmlFor="planFormationArgumente">
              Plan de formation argumenté :
            </Label>
            <Textarea
              id="planFormationArgumente"
              value={phase4Data.atelier6.planFormationArgumente}
              onChange={(e) =>
                handleInputChange(e, "atelier6", "planFormationArgumente")
              }
            />
          </div>
        </div>

        <div className="border p-4 rounded-md my-8 p-8">
          <h3 className="text-xl font-semibold mb-2">
            Les compétences développées pendant Prépa compétences et mises à
            jour dans le profil de compétences
          </h3>
          <div className="space-y-4">
            {Object.keys(skillStatus).map((key) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={skillStatus[key as keyof SkillStatus]}
                  onChange={() => {}}
                  className="mr-2"
                />
                <label className="text-sm">{key}</label>
              </div>
            ))}
          </div>
        </div>
        <Button onClick={() => onSave && onSave(workshop)} className="w-full">
          Enregistrer
        </Button>
      </div>
    </div>
  );
};

export default Workshop6Card;