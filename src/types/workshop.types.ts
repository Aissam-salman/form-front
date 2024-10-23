import { z } from "zod";

export const WorkshopSchema = z.object({
  id: z.number(),
  phase: z.number(),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  learnings: z.string(),
  trainerComments: z.string(),
});

export type Workshop = z.infer<typeof WorkshopSchema>;

export const BilanSortieSchema = z.object({
  dateBilan: z.string(),
  syntheseParcours: z.string(),
  rdvFT: z.string(),
  pointsVigilance: z.string(),
  commentairesBeneficiaire: z.string(),
  termeDuDispositif: z.boolean(),
  suiviNecessaire: z.string(),
  dateProposee: z.string().optional(),
  sortieAnticipeePositive: z.boolean(),
  dateSortie: z.string().optional(),
  motifSortie: z.string().optional(),
  abandon: z.boolean(),
  dateAbandon: z.string().optional(),
  motifAbandon: z.string().optional(),
  dateSignature: z.string(),
});

export type BilanSortie = z.infer<typeof BilanSortieSchema>;

export const AdhesionSchema = z.object({
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

export type Adhesion = z.infer<typeof AdhesionSchema>;