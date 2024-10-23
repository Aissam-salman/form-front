import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import fakeData from '@/data/fakeData.json';
import { AdhesionFormData } from '@/types/Adhesion.ts';
import { useNavigate } from 'react-router-dom';

const AdhesionForm = () => {
  const [formData, setFormData] = useState<AdhesionFormData>({
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
  });
const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Formulaire d'adhésion enregistré");
    navigate('/candidate/${id}');
  };

  const fillWithFakeData = () => {
    setFormData({
      ...fakeData,
      adhesion: Boolean(fakeData.adhesion),
      dateEntree: fakeData.dateEntree || '',
      motifNonAdhesion: fakeData.motifNonAdhesion || '',
      metiersCibles: fakeData.metiersCibles || '',
    } as AdhesionFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      <Button type="button" onClick={fillWithFakeData} className="mb-4">
        Remplir avec des données factices
      </Button>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="centreAFPA">Centre AFPA de :</Label>
          <Input id="centreAFPA" name="centreAFPA" value={formData.centreAFPA} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="agenceFranceTravail">Agence France Travail de :</Label>
          <Input id="agenceFranceTravail" name="agenceFranceTravail" value={formData.agenceFranceTravail} onChange={handleChange} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nomReferentAFPA">Nom du référent AFPA :</Label>
          <Input id="nomReferentAFPA" name="nomReferentAFPA" value={formData.nomReferentAFPA} onChange={handleChange} />
          <Label htmlFor="telephoneReferentAFPA">Téléphone :</Label>
          <Input id="telephoneReferentAFPA" name="telephoneReferentAFPA" value={formData.telephoneReferentAFPA} onChange={handleChange} />
          <Label htmlFor="mailReferentAFPA">Mail :</Label>
          <Input id="mailReferentAFPA" name="mailReferentAFPA" type="email" value={formData.mailReferentAFPA} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="nomConseillerFranceTravail">Nom du conseiller référent France Travail :</Label>
          <Input id="nomConseillerFranceTravail" name="nomConseillerFranceTravail" value={formData.nomConseillerFranceTravail} onChange={handleChange} />
          <Label htmlFor="telephoneConseillerFranceTravail">Téléphone :</Label>
          <Input id="telephoneConseillerFranceTravail" name="telephoneConseillerFranceTravail" value={formData.telephoneConseillerFranceTravail} onChange={handleChange} />
          <Label htmlFor="mailConseillerFranceTravail">Mail :</Label>
          <Input id="mailConseillerFranceTravail" name="mailConseillerFranceTravail" type="email" value={formData.mailConseillerFranceTravail} onChange={handleChange} />
          <Label htmlFor="nomReferentAutre">Nom du référent (autre que France Travail) qui suit le DE :</Label>
          <Input id="nomReferentAutre" name="nomReferentAutre" value={formData.nomReferentAutre} onChange={handleChange} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nomBeneficiaire">Nom :</Label>
          <Input id="nomBeneficiaire" name="nomBeneficiaire" value={formData.nomBeneficiaire} onChange={handleChange} />
          <Label htmlFor="prenomBeneficiaire">Prénom :</Label>
          <Input id="prenomBeneficiaire" name="prenomBeneficiaire" value={formData.prenomBeneficiaire} onChange={handleChange} />
          <Label htmlFor="identifiantBeneficiaire">Identifiant :</Label>
          <Input id="identifiantBeneficiaire" name="identifiantBeneficiaire" value={formData.identifiantBeneficiaire} onChange={handleChange} />
          <Label htmlFor="telephoneBeneficiaire">Téléphone :</Label>
          <Input id="telephoneBeneficiaire" name="telephoneBeneficiaire" value={formData.telephoneBeneficiaire} onChange={handleChange} />
          <Label htmlFor="mailBeneficiaire">Mail :</Label>
          <Input id="mailBeneficiaire" name="mailBeneficiaire" type="email" value={formData.mailBeneficiaire} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="objectifsBeneficiaire">Objectifs du bénéficiaire à l'entrée dans le dispositif (prescription France Travail) :</Label>
          <Input id="objectifsBeneficiaire" name="objectifsBeneficiaire" value={formData.objectifsBeneficiaire} onChange={handleChange} />
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
          <Input id="dateEntree" name="dateEntree" type="date" value={formData.dateEntree} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="motifNonAdhesion">Si non-adhésion, quel en est le motif ?</Label>
          <Input id="motifNonAdhesion" name="motifNonAdhesion" value={formData.motifNonAdhesion} onChange={handleChange} />
        </div>
      </div>

      <div>
        <Label htmlFor="metiersCibles">Métier(s) ou secteur(s) d'activité ciblé(s)</Label>
        <Input id="metiersCibles" name="metiersCibles" value={formData.metiersCibles} onChange={handleChange} />
      </div>

      <div className="flex space-x-4">
        <Button type="submit">Enregistrer l'adhésion</Button>
      </div>
    </form>
  );
};

export default AdhesionForm;