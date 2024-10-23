import { z } from "zod";

export const AdhesionFormDataSchema = z.object({
  centreAFPA: z.string(),
  agenceFranceTravail: z.string(),
  nomReferentAFPA: z.string(),
  telephoneReferentAFPA: z.string(),
  mailReferentAFPA: z.string(),
  nomConseillerFranceTravail: z.string(),
  telephoneConseillerFranceTravail: z.string(),
  mailConseillerFranceTravail: z.string(),
  nomReferentAutre: z.string(),
  nomBeneficiaire: z.string(),
  prenomBeneficiaire: z.string(),
  identifiantBeneficiaire: z.string(),
  telephoneBeneficiaire: z.string(),
  mailBeneficiaire: z.string(),
  objectifsBeneficiaire: z.string(),
  adhesion: z.boolean(),
  dateEntree: z.string(),
  motifNonAdhesion: z.string(),
  metiersCibles: z.string(),
});

export type AdhesionFormData = z.infer<typeof AdhesionFormDataSchema>;