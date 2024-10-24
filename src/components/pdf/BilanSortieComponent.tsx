import {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";

const BilanSortieComponent = ({ onDataChange }) => {
  const [bilanSortieData, setBilanSortieData] = useState({
    dateBilan: '',
    syntheseParcours: '',
    rdvFT: '',
    pointsVigilance: '',
    commentairesBeneficiaire: '',
    termeDuDispositif: false,
    suiviNecessaire: '',
    dateProposee: '',
    sortieAnticipeePositive: false,
    dateSortie: '',
    motifSortie: '',
    abandon: false,
    dateAbandon: '',
    motifAbandon: '',
    dateSignature: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBilanSortieData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    onDataChange(bilanSortieData);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Bilan de sortie</h2>
      
      <div>
        <Label htmlFor="dateBilan">Date de réalisation du bilan :</Label>
        <Input type="date" id="dateBilan" name="dateBilan" value={bilanSortieData.dateBilan} onChange={handleInputChange} />
      </div>

      <div>
        <Label htmlFor="syntheseParcours">Synthèse du parcours et plan d'actions envisagé :</Label>
        <Textarea id="syntheseParcours" name="syntheseParcours" value={bilanSortieData.syntheseParcours} onChange={handleInputChange} />
      </div>

      <div>
        <Label htmlFor="rdvFT">RDV pris avec FT le :</Label>
        <Input type="date" id="rdvFT" name="rdvFT" value={bilanSortieData.rdvFT} onChange={handleInputChange} />
      </div>

      <div>
        <Label htmlFor="pointsVigilance">Points de vigilance :</Label>
        <Textarea id="pointsVigilance" name="pointsVigilance" value={bilanSortieData.pointsVigilance} onChange={handleInputChange} />
      </div>

      <div>
        <Label htmlFor="commentairesBeneficiaire">Commentaires du bénéficiaire :</Label>
        <Textarea id="commentairesBeneficiaire" name="commentairesBeneficiaire" value={bilanSortieData.commentairesBeneficiaire} onChange={handleInputChange} />
      </div>

      <div>
        <Label className="flex items-center">
          <Checkbox
            checked={bilanSortieData.termeDuDispositif}
            onCheckedChange={(checked) => handleInputChange({ target: { type: 'checkbox', checked, name: 'termeDuDispositif' } })}
          />
          <span className="ml-2">Terme du dispositif (avec projet de formation ou de retour à l'emploi)</span>
        </Label>
      </div>

      <div>
        <Label>Nécessité d'un suivi (Atelier Club Prepa) :</Label>
        <div className="flex space-x-4">
          <Label className="flex items-center">
            <input
              type="radio"
              name="suiviNecessaire"
              value="oui"
              checked={bilanSortieData.suiviNecessaire === 'oui'}
              onChange={handleInputChange}
            />
            <span className="ml-2">Oui</span>
          </Label>
          <Label className="flex items-center">
            <input
              type="radio"
              name="suiviNecessaire"
              value="non"
              checked={bilanSortieData.suiviNecessaire === 'non'}
              onChange={handleInputChange}
            />
            <span className="ml-2">Non</span>
          </Label>
        </div>
      </div>

      {bilanSortieData.suiviNecessaire === 'oui' && (
        <div>
          <Label htmlFor="dateProposee">Si oui, première date proposée (à confirmer) :</Label>
          <Input type="date" id="dateProposee" name="dateProposee" value={bilanSortieData.dateProposee} onChange={handleInputChange} />
        </div>
      )}

      <div>
        <Label className="flex items-center">
          <Checkbox
            checked={bilanSortieData.sortieAnticipeePositive}
            onCheckedChange={(checked) => handleInputChange({ target: { type: 'checkbox', checked, name: 'sortieAnticipeePositive' } })}
          />
          <span className="ml-2">Sortie anticipée positive (entrée en formation ou retour à l'emploi)</span>
        </Label>
      </div>

      {bilanSortieData.sortieAnticipeePositive && (
        <>
          <div>
            <Label htmlFor="dateSortie">Date de sortie :</Label>
            <Input type="date" id="dateSortie" name="dateSortie" value={bilanSortieData.dateSortie} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="motifSortie">Motif :</Label>
            <Input id="motifSortie" name="motifSortie" value={bilanSortieData.motifSortie} onChange={handleInputChange} />
          </div>
        </>
      )}

      <div>
        <Label className="flex items-center">
          <Checkbox
            checked={bilanSortieData.abandon}
            onCheckedChange={(checked) => handleInputChange({ target: { type: 'checkbox', checked, name: 'abandon' } })}
          />
          <span className="ml-2">Abandon</span>
        </Label>
      </div>

      {bilanSortieData.abandon && (
        <>
          <div>
            <Label htmlFor="dateAbandon">Date d'abandon :</Label>
            <Input type="date" id="dateAbandon" name="dateAbandon" value={bilanSortieData.dateAbandon} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="motifAbandon">Motif :</Label>
            <Input id="motifAbandon" name="motifAbandon" value={bilanSortieData.motifAbandon} onChange={handleInputChange} />
          </div>
        </>
      )}

      <div>
        <Label htmlFor="dateSignature">Date de signature :</Label>
        <Input type="date" id="dateSignature" name="dateSignature" value={bilanSortieData.dateSignature} onChange={handleInputChange} />
      </div>
    </div>
  );
};

export default BilanSortieComponent;
