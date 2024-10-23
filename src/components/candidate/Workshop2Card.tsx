import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

const Workshop2Card = ({ onDataChange }) => {
  const [phase2Data, setPhase2Data] = useState({
    atelier2: {
      metier: "",
      dateDebut: "",
      dateFin: "",
      heures: "",
      moyenDecouverte: "",
      entreprise: "",
      choixMetierConfirme: "",
      competences: [],
    },
    commentairesReferentAFPA: "",
    ceQueJeRetiens: "",
    atelier9: {
      dateDebut: "",
      dateFin: "",
      heures: "",
      moyen: "",
      ceQueJeRetiens: "",
      commentairesIntervenant: "",
    },
    atelier10: {
      dateDebut: "",
      dateFin: "",
      heures: "",
      moyen: "",
      ceQueJeRetiens: "",
      commentairesIntervenant: "",
    },
  });

  const handleInputChange = (e, section, field) => {
    const { value } = e.target;
    setPhase2Data((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
    onDataChange(phase2Data);
  };

  return (
    <div className="p-12 min-w-[80%] mx-auto">
      <div className="p-12 max-w-6xl mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold">
          {/* PHASE 2 : Découvrir, pratiquer et faire son choix */}
        </h2>

        <div className="p-4 rounded-md">
          <h3 className="text-2xl font-bold mb-2">
            Atelier 2 : Découvrir son métier et consolider son projet
            professionnel
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="metier">Je découvre le métier de :</Label>
              <Input
                id="metier"
                value={phase2Data.atelier2.metier}
                onChange={(e) => handleInputChange(e, "atelier2", "metier")}
              />
            </div>
            <div>
              <Label htmlFor="dateDebut">Du :</Label>
              <Input
                type="date"
                id="dateDebut"
                value={phase2Data.atelier2.dateDebut}
                onChange={(e) => handleInputChange(e, "atelier2", "dateDebut")}
              />
            </div>
            <div>
              <Label htmlFor="dateFin">au :</Label>
              <Input
                type="date"
                id="dateFin"
                value={phase2Data.atelier2.dateFin}
                onChange={(e) => handleInputChange(e, "atelier2", "dateFin")}
              />
            </div>
            <div>
              <Label htmlFor="heures">de ... heures à ... heures :</Label>
              <Input
                id="heures"
                value={phase2Data.atelier2.heures}
                onChange={(e) => handleInputChange(e, "atelier2", "heures")}
              />
            </div>
          </div>
        </div>

        <div>
          <Checkbox
            id="immersion"
            checked={phase2Data.atelier2.immersion}
            onChange={(e) => handleInputChange(e, "atelier2", "immersion")}
          />
          <Label htmlFor="immersion">
            Immersion (PMSMP) Entreprise / Structure d’accueil :
          </Label>
        </div>
        <div>
          <Checkbox
            id="plateauTechnique"
            checked={phase2Data.atelier2.plateauTechnique}
            onChange={(e) =>
              handleInputChange(e, "atelier2", "plateauTechnique")
            }
          />
          <Label htmlFor="plateauTechnique">
            Plateau technique DWWM Afpa de Brest
          </Label>
        </div>
        <div>
          <Checkbox
            id="autre"
            checked={phase2Data.atelier2.autre}
            onChange={(e) => handleInputChange(e, "atelier2", "autre")}
          />
          <Label htmlFor="autre">
            Autre : enquête métier/prépa recherche PMSMP
          </Label>
        </div>
        <div>
          <Label>Choix du métier confirmé</Label>
          <div>
            <Checkbox
              id="choixConfirmeOui"
              checked={phase2Data.atelier2.choixConfirme === "oui"}
              onChange={(e) =>
                handleInputChange(e, "atelier2", "choixConfirme")
              }
              value="oui"
            />
            <Label htmlFor="choixConfirmeOui">oui</Label>
          </div>
          <div>
            <Checkbox
              id="choixConfirmeNon"
              checked={phase2Data.atelier2.choixConfirme === "non"}
              onChange={(e) =>
                handleInputChange(e, "atelier2", "choixConfirme")
              }
              value="non"
            />
            <Label htmlFor="choixConfirmeNon">non</Label>
          </div>
          <div>
            <Checkbox
              id="choixConfirmeNeSaitPas"
              checked={phase2Data.atelier2.choixConfirme === "neSaitPas"}
              onChange={(e) =>
                handleInputChange(e, "atelier2", "choixConfirme")
              }
              value="neSaitPas"
            />
            <Label htmlFor="choixConfirmeNeSaitPas">ne sait pas encore</Label>
          </div>
        </div>
        <div>
          <Label>Compétences</Label>
          <div>
            <Checkbox
              id="competencesAcquises"
              checked={phase2Data.atelier2.competences === "acquises"}
              onChange={(e) => handleInputChange(e, "atelier2", "competences")}
              value="acquises"
            />
            <Label htmlFor="competencesAcquises">acquises</Label>
          </div>
          <div>
            <Checkbox
              id="competencesEnCours"
              checked={phase2Data.atelier2.competences === "enCours"}
              onChange={(e) => handleInputChange(e, "atelier2", "competences")}
              value="enCours"
            />
            <Label htmlFor="competencesEnCours">en cours d’acquisition</Label>
          </div>
          <div>
            <Checkbox
              id="competencesNonAcquises"
              checked={phase2Data.atelier2.competences === "nonAcquises"}
              onChange={(e) => handleInputChange(e, "atelier2", "competences")}
              value="nonAcquises"
            />
            <Label htmlFor="competencesNonAcquises">non acquises</Label>
          </div>
        </div>
        <div className=" p-4 rounded-md">
          <Label htmlFor="commentairesReferentAFPA">
            Commentaires du référent AFPA :
          </Label>
          <Textarea
            id="commentairesReferentAFPA"
            value={phase2Data.commentairesReferentAFPA}
            onChange={(e) =>
              handleInputChange(e, "", "commentairesReferentAFPA")
            }
          />
        </div>

        <div className=" p-4 rounded-md">
          <Label htmlFor="ceQueJeRetiens">
            « Ce que je retiens de cette phase » (par le bénéficiaire) :
          </Label>
          <Textarea
            id="ceQueJeRetiens"
            value={phase2Data.ceQueJeRetiens}
            onChange={(e) => handleInputChange(e, "", "ceQueJeRetiens")}
          />
        </div>

        <Button onClick={() => onSave(workshop)} className="w-full">
          Enregistrer
        </Button>
      </div>
    </div>
  );
};

export default Workshop2Card;
