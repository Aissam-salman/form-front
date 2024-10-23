import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Workshop } from "@/types/Workshop";



interface WorkshopCardProps {
    workshop: Workshop;
    onSave: (workshop: Workshop) => void;
    onChange: (workshop: Workshop) => void;
  }

  const skills = {
    communiquerEcrit: "Communiquer à l’écrit dans un contexte professionnel",
    communiquerOral: "Communiquer à l’oral dans un contexte professionnel",
    utiliserMathematiques: "Utiliser les mathématiques dans le cadre d’une pratique professionnelle",
    utiliserOutils: "Utiliser les outils numériques, découvrir les usages et la culture du numérique (plateforme numérique pour se former)",
    recueillirTraiterInfo: "Recueillir et traiter de l’information",
    travaillerGroupe: "Travailler en groupe et en équipe",
    travaillerAutonomie: "Travailler en autonomie et réaliser un objectif individuel",
    connaitreReglesSecurite: "Connaître les règles de sécurité, l’environnement et la prévention santé en lien avec le métier visé",
    realiserActivitesPratiques: "Réaliser des activités pratiques en lien avec le métier visé",
    organiserActivitePro: "S’organiser dans son activité professionnelle",
    faireChoixParcours: "Faire des choix et construire son parcours de formation",
  };
const Workshop6Card:React.FC<WorkshopCardProps>  = ({ workshop, onSave, onChange,skillStatus }) => {
  const [phase4Data, setPhase4Data] = useState({
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
    setPhase4Data((prevData) => {
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
      } else if (type === "checkbox") {
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
    <div className="p-12 min-w-[80%] mx-auto">
      <div className="p-12 max-w-6xl mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold">PHASE 4 : Concrétiser son projet</h2>

        <div className="border p-8 rounded-md my-8">
          <h3 className="text-xl font-semibold mb-2">
            Atelier 6 : Concrétiser son projet de professionnalisation
          </h3>
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
          {/* {Object.entries(phase4Data.competencesDeveloppees).map(
            ([key, value]) => (
              <Label key={key} className="flex items-center mt-2">
                <Checkbox
                  checked={value}
                  onCheckedChange={(checked) =>
                    handleInputChange(
                      { target: { type: "checkbox", checked } },
                      "competencesDeveloppees",
                      key
                    )
                  }
                />
                <span className="ml-2">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </span>
              </Label>
            )
          )} */}

        <div className="space-y-4">
        {Object.keys(skills).map((key) => (
          <div key={key} className="flex items-center">
            <input
              type="checkbox"
              checked={skillStatus[key]}
              onChange={() => {}}
              className="mr-2"
            />
            <label className="text-sm">{skills[key]}</label>
          </div>
        ))}
      </div>
        </div>
        <Button onClick={() => onSave(workshop)} className="w-full">
            Enregistrer
          </Button>
      </div>
    </div>
  );
};

export default Workshop6Card;
