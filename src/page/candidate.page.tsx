import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import MainLayout from "@/components/layout/MainLayout";
import WorkshopCard from "@/components/candidate/WorkshopCard.tsx";
import Workshop6Card from "@/components/candidate/Workshop6Card.tsx";
import Workshop1Card from "@/components/candidate/Workshop1Card.tsx";
import Workshop2Card from "@/components/candidate/Workshop2Card.tsx";
import { Toaster } from "@/components/ui/sonner";
import { useWorkshopStore } from "@/store/workshop.store";
import { WorkshopService } from "@/service/workshop.service";
import { Workshop, defaultWorkshop } from "@/types/Workshop";
import {Navigate} from "react-router-dom";
import BilanSortiePage from "@/page/BilanSortie.tsx";


const defaultSkillStatus = {
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
};

const CandidatePage = () => {
  const { activeWorkshop, setActiveWorkshop, workshops, setWorkshops } = useWorkshopStore();

  const { data, isLoading } = useQuery({
    queryKey: ['workshops'],
    queryFn: async () => {
      const response = await WorkshopService.getWorkshops();
      if (Array.isArray(response.data)) {
        setWorkshops(response.data);
        return response.data;
      }
      return [];
    },
  });

  const handleSave = async (workshopData: Workshop) => {
    try {
      await WorkshopService.updateWorkshop(workshopData.id, workshopData);
      toast.success("Progrès enregistré avec succès");
    } catch  {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const workshopToDisplay = workshops.find(w => w.id === activeWorkshop) || defaultWorkshop;

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
      workshops: [
        { id: "Final", name: "Bilan de sortie" },
      ],
    },
  ];

  return (
      <MainLayout
          sidebarItems={sidebarItems}
          activeWorkshop={activeWorkshop}
          setActiveWorkshop={setActiveWorkshop}
      >
        {isLoading ? (
            <div>Chargement...</div>
        ) : workshopToDisplay ? (
            [9, 10, 3, 4, 5, 8].includes(workshopToDisplay.id) ? (
                <WorkshopCard
                    workshop={workshopToDisplay}
                    onSave={handleSave}
                    onChange={() => {}}
                />
            ) : workshopToDisplay.id === 1 ? (
                <Workshop1Card
                    workshop={workshopToDisplay}
                    onSave={handleSave}
                    onChange={() => {}}
                />
            ) : workshopToDisplay.id === 2 ? (
                <Workshop2Card
                    workshop={workshopToDisplay}
                    onSave={handleSave}
                    onChange={() => {}}
                />
            ) : workshopToDisplay.id === 6 ? (
                <Workshop6Card
                    workshop={workshopToDisplay}
                    onSave={handleSave}
                    onChange={() => {}}
                    skillStatus={defaultSkillStatus}
                />
            ) : workshopToDisplay.id === 0 ? (
                <BilanSortiePage />
                // <Navigate to="/bilan-sortie" />
            ) : (
                <div>Contenu spécifique pour les autres ateliers</div>
            )
        ) : (
            <div>Atelier non trouvé</div>
        )}
        <Toaster />
      </MainLayout>
  );
};

export default CandidatePage;