import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

const FormComponent = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    centreAFPA: '',
    agenceFranceTravail: '',
    nomReferentAFPA: '',
    telephoneReferentAFPA: '',
    mailReferentAFPA: '',
    nomConseillerFranceTravail: '',
    telephoneConseillerFranceTravail: '',
    mailConseillerFranceTravail: '',
    nomReferentAutre: '',
    nomBeneficiaire: '',
    prenomBeneficiaire: '',
    identifiantBeneficiaire: '',
    telephoneBeneficiaire: '',
    mailBeneficiaire: '',
    objectifsBeneficiaire: '',
    adhesion: false,
    dateEntree: '',
    motifNonAdhesion: '',
    metiersCibles: '',
    phase1: {
      atelier1: {
        dateDebut: '',
        dateFin: '',
        heures: '',
        ceQueJeRetiens: '',
        commentairesIntervenant: '',
      }
    },
    phase2: {
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
    },
    phase3: {
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
    },
    phase4: {
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
    },
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const fillWithFakeData = () => {
    setFormData({
      centreAFPA: 'Centre AFPA de Paris',
      agenceFranceTravail: 'Agence France Travail de Paris',
      nomReferentAFPA: 'Jean Dupont',
      telephoneReferentAFPA: '0123456789',
      mailReferentAFPA: 'jean.dupont@afpa.fr',
      nomConseillerFranceTravail: 'Marie Martin',
      telephoneConseillerFranceTravail: '0987654321',
      mailConseillerFranceTravail: 'marie.martin@francetravail.fr',
      nomReferentAutre: 'Pierre Durand',
      nomBeneficiaire: 'Dubois',
      prenomBeneficiaire: 'Sophie',
      identifiantBeneficiaire: 'SD123456',
      telephoneBeneficiaire: '0654321987',
      mailBeneficiaire: 'sophie.dubois@email.com',
      objectifsBeneficiaire: 'Reconversion professionnelle dans le domaine du numérique',
      adhesion: true,
      dateEntree: '2024-03-15',
      motifNonAdhesion: 'Non applicable',
      metiersCibles: 'Développeur web, Data Analyst',
      phase1: {
        atelier1: {
          dateDebut: '2024-03-16',
          dateFin: '2024-03-17',
          heures: '9h-17h',
          ceQueJeRetiens: 'Importance de la communication dans le milieu professionnel',
          commentairesIntervenant: 'Participation active et bonne compréhension des enjeux',
        }
      },
      phase2: {
        atelier2: {
          metier: 'Développeur Web',
          dateDebut: '2024-03-18',
          dateFin: '2024-03-19',
          heures: '9h-17h',
          moyenDecouverte: 'Stage d\'observation',
          entreprise: 'TechCorp',
          choixMetierConfirme: 'Oui',
          competences: ['HTML', 'CSS', 'JavaScript'],
        },
        atelier9: {
          dateDebut: '2024-03-20',
          dateFin: '2024-03-21',
          heures: '9h-17h',
          moyen: 'Atelier pratique',
          ceQueJeRetiens: 'Importance de la veille technologique',
          commentairesIntervenant: 'Bonne implication dans les exercices pratiques',
        },
        atelier10: {
          dateDebut: '2024-03-22',
          dateFin: '2024-03-23',
          heures: '9h-17h',
          moyen: 'Simulation d\'entretien',
          ceQueJeRetiens: 'Techniques pour bien se présenter en entretien',
          commentairesIntervenant: 'Progrès notables dans la présentation orale',
        },
      },
      phase3: {
        atelier3: {
          dateDebut: '2024-03-24',
          dateFin: '2024-03-25',
          heures: '9h-17h',
          ceQueJeRetiens: 'Maîtrise des outils numériques de base',
          commentairesIntervenant: 'Bonne progression dans l\'utilisation des logiciels',
        },
        atelier4: {
          dateDebut: '2024-03-26',
          dateFin: '2024-03-27',
          heures: '9h-17h',
          ceQueJeRetiens: 'Importance de la logique dans la programmation',
          commentairesIntervenant: 'Capacité d\'analyse en amélioration',
        },
        atelier5: {
          dateDebut: '2024-03-28',
          dateFin: '2024-03-29',
          heures: '9h-17h',
          ceQueJeRetiens: 'Stratégies pour sécuriser son parcours professionnel',
          commentairesIntervenant: 'Bonne compréhension des enjeux de formation continue',
        },
        atelier8: {
          dateDebut: '2024-03-30',
          dateFin: '2024-03-31',
          heures: '9h-17h',
          ceQueJeRetiens: 'Fonctionnement et avantages du CPF',
          commentairesIntervenant: 'Intérêt marqué pour les possibilités offertes par le CPF',
        },
      },
      phase4: {
        atelier6: {
          dateDebut: '2024-04-01',
          dateFin: '2024-04-02',
          heures: '9h-17h',
          metierVise: 'Développeur Full Stack',
          formations: [
            { intitule: 'Formation Développeur Web', organisme: 'AFPA', lieu: 'Paris', dateEntree: '2024-09-01' },
            { intitule: 'Bootcamp JavaScript Avancé', organisme: 'CodeAcademy', lieu: 'En ligne', dateEntree: '2024-06-15' },
            { intitule: 'Formation React et Node.js', organisme: 'OpenClassrooms', lieu: 'En ligne', dateEntree: '2024-11-01' },
          ],
          formationPresenteAuPRF: true,
          planFormationArgumente: 'Parcours de formation complet pour devenir développeur full stack, combinant formations en présentiel et en ligne',
        },
      },
      dateBilan: '2024-03-31',
      syntheseParcours: 'Le bénéficiaire a complété avec succès tous les ateliers. Il est prêt pour une formation en développement web.',
      rdvFT: '2024-04-15',
      pointsVigilance: 'Besoin de renforcer les compétences en anglais technique.',
      commentairesBeneficiaire: 'Je me sens confiant pour commencer ma formation en développement web.',
      termeDuDispositif: true,
      suiviNecessaire: 'oui',
      dateProposee: '2024-05-01',
      sortieAnticipeePositive: false,
      dateSortie: '',
      motifSortie: '',
      abandon: false,
      dateAbandon: '',
      motifAbandon: '',
      dateSignature: '2024-03-31',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Button type="button" onClick={fillWithFakeData} className="mb-4">
        Remplir avec des données factices
      </Button>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="centreAFPA">Centre AFPA de :</Label>
          <Input id="centreAFPA" name="centreAFPA" value={formData.centreAFPA} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="agenceFranceTravail">Agence France Travail de :</Label>
          <Input id="agenceFranceTravail" name="agenceFranceTravail" value={formData.agenceFranceTravail} onChange={handleChange} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nomReferentAFPA">Nom du référent AFPA :</Label>
          <Input id="nomReferentAFPA" name="nomReferentAFPA" value={formData.nomReferentAFPA} onChange={handleChange} required />
          <Label htmlFor="telephoneReferentAFPA">Téléphone :</Label>
          <Input id="telephoneReferentAFPA" name="telephoneReferentAFPA" value={formData.telephoneReferentAFPA} onChange={handleChange} required />
          <Label htmlFor="mailReferentAFPA">Mail :</Label>
          <Input id="mailReferentAFPA" name="mailReferentAFPA" type="email" value={formData.mailReferentAFPA} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="nomConseillerFranceTravail">Nom du conseiller référent France Travail :</Label>
          <Input id="nomConseillerFranceTravail" name="nomConseillerFranceTravail" value={formData.nomConseillerFranceTravail} onChange={handleChange} required />
          <Label htmlFor="telephoneConseillerFranceTravail">Téléphone :</Label>
          <Input id="telephoneConseillerFranceTravail" name="telephoneConseillerFranceTravail" value={formData.telephoneConseillerFranceTravail} onChange={handleChange} required />
          <Label htmlFor="mailConseillerFranceTravail">Mail :</Label>
          <Input id="mailConseillerFranceTravail" name="mailConseillerFranceTravail" type="email" value={formData.mailConseillerFranceTravail} onChange={handleChange} required />
          <Label htmlFor="nomReferentAutre">Nom du référent (autre que France Travail) qui suit le DE :</Label>
          <Input id="nomReferentAutre" name="nomReferentAutre" value={formData.nomReferentAutre} onChange={handleChange} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nomBeneficiaire">Nom :</Label>
          <Input id="nomBeneficiaire" name="nomBeneficiaire" value={formData.nomBeneficiaire} onChange={handleChange} required />
          <Label htmlFor="prenomBeneficiaire">Prénom :</Label>
          <Input id="prenomBeneficiaire" name="prenomBeneficiaire" value={formData.prenomBeneficiaire} onChange={handleChange} required />
          <Label htmlFor="identifiantBeneficiaire">Identifiant :</Label>
          <Input id="identifiantBeneficiaire" name="identifiantBeneficiaire" value={formData.identifiantBeneficiaire} onChange={handleChange} required />
          <Label htmlFor="telephoneBeneficiaire">Téléphone :</Label>
          <Input id="telephoneBeneficiaire" name="telephoneBeneficiaire" value={formData.telephoneBeneficiaire} onChange={handleChange} required />
          <Label htmlFor="mailBeneficiaire">Mail :</Label>
          <Input id="mailBeneficiaire" name="mailBeneficiaire" type="email" value={formData.mailBeneficiaire} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="objectifsBeneficiaire">Objectifs du bénéficiaire à l'entrée dans le dispositif (prescription France Travail) :</Label>
          <Input id="objectifsBeneficiaire" name="objectifsBeneficiaire" value={formData.objectifsBeneficiaire} onChange={handleChange} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Adhésion suite au premier entretien</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id="adhesion" name="adhesion" checked={formData.adhesion} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, adhesion: checked }))} />
            <Label htmlFor="adhesion">OUI</Label>
          </div>
          <Label htmlFor="dateEntree">Date d'entrée dans le dispositif :</Label>
          <Input id="dateEntree" name="dateEntree" type="date" value={formData.dateEntree} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="motifNonAdhesion">Si non-adhésion, quel en est le motif ?</Label>
          <Input id="motifNonAdhesion" name="motifNonAdhesion" value={formData.motifNonAdhesion} onChange={handleChange} />
        </div>
      </div>

      <div>
        <Label htmlFor="metiersCibles">Métier(s) ou secteur(s) d'activité ciblé(s)</Label>
        <Input id="metiersCibles" name="metiersCibles" value={formData.metiersCibles} onChange={handleChange} required />
      </div>

      <h2 className="text-xl font-bold mt-8">Bilan de sortie</h2>
      
      <div>
        <Label htmlFor="dateBilan">Date de réalisation du bilan :</Label>
        <Input type="date" id="dateBilan" name="dateBilan" value={formData.dateBilan} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="syntheseParcours">Synthèse du parcours et plan d'actions envisagé :</Label>
        <Textarea id="syntheseParcours" name="syntheseParcours" value={formData.syntheseParcours} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="rdvFT">RDV pris avec FT le :</Label>
        <Input type="date" id="rdvFT" name="rdvFT" value={formData.rdvFT} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="pointsVigilance">Points de vigilance :</Label>
        <Textarea id="pointsVigilance" name="pointsVigilance" value={formData.pointsVigilance} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="commentairesBeneficiaire">Commentaires du bénéficiaire :</Label>
        <Textarea id="commentairesBeneficiaire" name="commentairesBeneficiaire" value={formData.commentairesBeneficiaire} onChange={handleChange} />
      </div>

      <div>
        <Label className="flex items-center">
          <Checkbox
            checked={formData.termeDuDispositif}
            onCheckedChange={(checked) => handleChange({ target: { type: 'checkbox', checked, name: 'termeDuDispositif' } })}
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
              checked={formData.suiviNecessaire === 'oui'}
              onChange={handleChange}
            />
            <span className="ml-2">Oui</span>
          </Label>
          <Label className="flex items-center">
            <input
              type="radio"
              name="suiviNecessaire"
              value="non"
              checked={formData.suiviNecessaire === 'non'}
              onChange={handleChange}
            />
            <span className="ml-2">Non</span>
          </Label>
        </div>
      </div>

      {formData.suiviNecessaire === 'oui' && (
        <div>
          <Label htmlFor="dateProposee">Si oui, première date proposée (à confirmer) :</Label>
          <Input type="date" id="dateProposee" name="dateProposee" value={formData.dateProposee} onChange={handleChange} />
        </div>
      )}

      <div>
        <Label className="flex items-center">
          <Checkbox
            checked={formData.sortieAnticipeePositive}
            onCheckedChange={(checked) => handleChange({ target: { type: 'checkbox', checked, name: 'sortieAnticipeePositive' } })}
          />
          <span className="ml-2">Sortie anticipée positive (entrée en formation ou retour à l'emploi)</span>
        </Label>
      </div>

      {formData.sortieAnticipeePositive && (
        <>
          <div>
            <Label htmlFor="dateSortie">Date de sortie :</Label>
            <Input type="date" id="dateSortie" name="dateSortie" value={formData.dateSortie} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="motifSortie">Motif :</Label>
            <Input id="motifSortie" name="motifSortie" value={formData.motifSortie} onChange={handleChange} />
          </div>
        </>
      )}

      <div>
        <Label className="flex items-center">
          <Checkbox
            checked={formData.abandon}
            onCheckedChange={(checked) => handleChange({ target: { type: 'checkbox', checked, name: 'abandon' } })}
          />
          <span className="ml-2">Abandon</span>
        </Label>
      </div>

      {formData.abandon && (
        <>
          <div>
            <Label htmlFor="dateAbandon">Date d'abandon :</Label>
            <Input type="date" id="dateAbandon" name="dateAbandon" value={formData.dateAbandon} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="motifAbandon">Motif :</Label>
            <Input id="motifAbandon" name="motifAbandon" value={formData.motifAbandon} onChange={handleChange} />
          </div>
        </>
      )}

      <div>
        <Label htmlFor="dateSignature">Date de signature :</Label>
        <Input type="date" id="dateSignature" name="dateSignature" value={formData.dateSignature} onChange={handleChange} />
      </div>

      <div className="flex space-x-4">
        <Button type="submit">Générer PDF</Button>
      </div>
    </form>
  );
};

export default FormComponent;