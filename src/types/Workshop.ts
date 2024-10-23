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

export const defaultWorkshop: Workshop = {
  id: 0,
  phase: 0,
  name: "",
  startDate: "",
  endDate: "",
  learnings: "",
  trainerComments: "",
};