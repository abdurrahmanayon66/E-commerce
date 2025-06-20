import { create } from 'zustand';
import { WishlistGroup } from '@/types/wishlistTypes'; 

interface WishlistStore {
  selectedProductIds: Set<string>;
  toggleSelection: (id: string) => void;
  selectMultiple: (ids: string[]) => void;
  deselectAll: () => void;
  isSelected: (id: string) => boolean;
  getSelected: () => string[];
  getSelectedByWishlist: (wishlists: WishlistGroup[]) => Array<{wishlistId: string, productIds: string[]}>;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  selectedProductIds: new Set(),
  
  toggleSelection: (id) => {
    const current = new Set(get().selectedProductIds);
    current.has(id) ? current.delete(id) : current.add(id);
    set({ selectedProductIds: current });
  },
  
  selectMultiple: (ids) => {
    const current = new Set(get().selectedProductIds);
    ids.forEach((id) => current.add(id));
    set({ selectedProductIds: current });
  },
  
  deselectAll: () => set({ selectedProductIds: new Set() }),
  
  isSelected: (id) => get().selectedProductIds.has(id),
  
  getSelected: () => Array.from(get().selectedProductIds),
  
  getSelectedByWishlist: (wishlists) => {
    const selectedIds = get().getSelected();
    const result: Array<{wishlistId: string, productIds: string[]}> = [];
    
    wishlists.forEach(wishlist => {
      const selectedProductsInThisWishlist = wishlist.products
        .filter(product => selectedIds.includes(product._id))
        .map(product => product._id);
      
      if (selectedProductsInThisWishlist.length > 0) {
        result.push({
          wishlistId: wishlist._id,
          productIds: selectedProductsInThisWishlist
        });
      }
    });
    
    return result;
  }
}));