import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/candidate/header";
import Sidebar from "@/components/candidate/sidebar";
import WorkshopCard from "@/components/candidate/WorkshopCard";
import Phase4Card from "@/components/candidate/Workshop6Card";
import {Toaster} from "@/components/ui/sonner.tsx";
import { Card } from "@/components/ui/card";
import Workshop1Card from "@/components/candidate/Workshop1Card";
import Workshop2Card from "@/components/candidate/Workshop2Card";
import Workshop6Card from "@/components/candidate/Workshop6Card";

interface Workshop {
  id: number;
  phase: number;
  name: string;
  startDate: string;
  endDate: string;
  learnings: string;
  trainerComments: string;
}

const CandidatePage = () => {
  const [skillStatus, setSkillStatus] = useState({
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
  });

  const [activeTab, setActiveTab] = useState<number>(1);
  // const [activeWorkshop, setActiveWorkshop] = useState<number>(1);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop>({
    id: 1,
    phase: 1,
    name: "Co-construire son parcours",
    startDate: "",
    endDate: "",
    learnings: "",
    trainerComments: "",
  });
  const handleChange = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
  };
  const handleSave = () => {
    toast.success("Progrès enregistré avec succès");
  };

  const sidebarItems = [
    {
      phase: "PHASE 1 :",
      name: " Co-construire son parcours",
      workshops: [{ id: 1, name: "Atelier 1 : Co-construire son parcours" }],
    },
    {
      phase: "PHASE 2 :", name: " Découvrir, pratiquer et faire son choix",
      workshops: [
        {
          id: 2,
          name: "Atelier 2 : Découvrir son métier et consolider son projet professionnel",
        },
        { id: 9, name: "Atelier 9 : se construire un territoire facilitant" },
        { id: 10, name: "Atelier 10 : Cartographier ses compétences" },
      ],
    },
    {
      phase:
        "PHASE 3 :",
      name: " Ateliers complémentaires d’entraînement ou d’accompagnement",
      workshops: [
        { id: 3, name: "Atelier 3 : Renforcer ses compétences numériques" },
        { id: 4, name: "Atelier 4 : Développer ses compétences de bases" },
        { id: 5, name: "Atelier 5 : Sécuriser son parcours" },
        { id: 8, name: "Atelier 8 : Découvrir le CPF" },
      ],
    },
    {
      phase: "PHASE 4 :", name: " Concrétiser son projet",
      workshops: [
        {
          id: 6,
          name: "Atelier 6 : Concrétiser son projet de professionnalisation",
        },
      ],
    },
    {
      phase: "Bilan de sortie",
      workshops: [],
    },
  ];
 
  const workshopToDisplay = sidebarItems
    .flatMap((item) => item.workshops)
    .find((workshop) => workshop.id === activeTab);
  return (
    <div className="min-h-screen bg-gray-100">
        <Header />
      <div className="flex flex-row ">
     
        <Sidebar items={sidebarItems} activeWorkshop={activeTab} setActiveWorkshop={setActiveTab} />
              {workshopToDisplay ? (
              [9, 10, 3, 4, 5, 8].includes(workshopToDisplay.id) ? (
                <WorkshopCard
                  workshop={{
                    ...selectedWorkshop,
                    id: workshopToDisplay.id,
                    name: workshopToDisplay.name,
                    phase: sidebarItems.find(item => item.workshops.some(w => w.id === workshopToDisplay.id))?.phase || 0,
                  }}
                  onSave={handleSave}
                  onChange={handleChange}
                />
              ) : workshopToDisplay.id === 1 ? (
                <Workshop1Card
                  workshop={{
                    ...selectedWorkshop,
                    id: workshopToDisplay.id,
                    name: workshopToDisplay.name,
                    phase: sidebarItems.find(item => item.workshops.some(w => w.id === workshopToDisplay.id))?.phase || 0,
                  }}
                  onSave={handleSave}
                  onChange={handleChange}
                />
              ) : workshopToDisplay.id === 2 ? (
                <Workshop2Card
                  workshop={{
                    ...selectedWorkshop,
                    id: workshopToDisplay.id,
                    name: workshopToDisplay.name,
                    phase: sidebarItems.find(item => item.workshops.some(w => w.id === workshopToDisplay.id))?.phase || 0,
                  }}
                  onSave={handleSave}
                  onChange={handleChange}
                />
              ) : workshopToDisplay.id === 6 ? (
                <Workshop6Card  skillStatus={skillStatus}
                  
                />
              ) : (
                <div>Contenu spécifique pour les autres ateliers</div>
              )
            ) : (
              <Phase4Card skillStatus={skillStatus} />
            )}
        
        
        
            {/* <main className="flex-1 p-8">
          <Card className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              Phase {selectedWorkshop.phase}: {selectedWorkshop.name}
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date de début</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded"
                    value={selectedWorkshop.startDate}
                    onChange={(e) => setSelectedWorkshop({...selectedWorkshop, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date de fin</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded"
                    value={selectedWorkshop.endDate}
                    onChange={(e) => setSelectedWorkshop({...selectedWorkshop, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ce que je retiens</label>
                <Textarea 
                  placeholder="Notez ici ce que vous avez retenu..."
                  value={selectedWorkshop.learnings}
                  onChange={(e) => setSelectedWorkshop({...selectedWorkshop, learnings: e.target.value})}
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Commentaire Formateur</label>
                <Textarea 
                  placeholder="Commentaires du formateur..."
                  value={selectedWorkshop.trainerComments}
                  onChange={(e) => setSelectedWorkshop({...selectedWorkshop, trainerComments: e.target.value})}
                  className="min-h-[100px]"
                />
              </div>

              <Button onClick={handleSave} className="w-full">
                Enregistrer
              </Button>
            </div>
          </Card>
        </main> */}
      </div>
      <Toaster/>
      </div>
  );
};

export default CandidatePage;
