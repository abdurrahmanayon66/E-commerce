
import { create } from 'zustand';

interface OrderFilterState {
  search: string;
  status: string;
  setSearch: (search: string) => void;
  setStatus: (status: string) => void;
  resetFilters: () => void;
}

export const useOrderFilterStore = create<OrderFilterState>((set) => ({
  search: '',
  status: '',
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  resetFilters: () => set({ search: '', status: '' }),
}));
