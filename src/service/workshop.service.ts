import Api from "@/api.ts";
import { Workshop, BilanSortie, Adhesion } from "@/types/workshop.types";

export const WorkshopService = {
  getWorkshops: () => Api.get<Workshop[]>("/classes/workshops"),

  getWorkshopById: (id: number) => Api.get<Workshop>(`/workshops/${id}`),
  updateWorkshop: (id: number, data: Partial<Workshop>) => 
    Api.patch<Workshop>(`/workshops/${id}`, data),
  saveBilanSortie: (data: BilanSortie) => 
    Api.post<BilanSortie>("/bilan-sortie", data),
  saveAdhesion: (data: Adhesion) => 
    Api.post<Adhesion>("/adhesion", data),
};