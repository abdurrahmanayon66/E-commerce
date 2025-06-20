
import { create } from 'zustand';

interface ProductFilterState {
  search: string;
  category: string;
  stockStatus: string;
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setStockStatus: (stockStatus: string) => void;
  resetFilters: () => void;
}

export const useProductFilterStore = create<ProductFilterState>((set) => ({
  search: '',
  category: '',
  stockStatus: '',
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setStockStatus: (stockStatus) => set({ stockStatus }),
  resetFilters: () => set({ search: '', category: '', stockStatus: '' }),
}));
