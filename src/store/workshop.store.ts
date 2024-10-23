import { create } from 'zustand';
import { Workshop } from '@/types/Workshop';

interface WorkshopState {
  activeWorkshop: number;
  workshops: Workshop[];
  setActiveWorkshop: (id: number) => void;
  setWorkshops: (workshops: Workshop[]) => void;
}

export const useWorkshopStore = create<WorkshopState>((set) => ({
  activeWorkshop: 1,
  workshops: [],
  setActiveWorkshop: (id) => set({ activeWorkshop: id }),
  setWorkshops: (workshops) => set({ workshops }),
}));