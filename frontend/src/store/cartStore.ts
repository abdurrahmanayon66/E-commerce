import { CartProduct, CheckoutPayload } from '@/types/checkoutTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  products: CartProduct[];
  selectedProductIds: Set<string>;
  _selectedIdsArray: string[];
  checkoutPayload: CheckoutPayload | null;

  hydrateCart: (products: CartProduct[]) => void;
  setProductQuantity: (productId: string, quantity: number, price: number) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  remove: (productId: string) => void;
  getQuantity: (productId: string) => number;
  getAll: () => CartProduct[];
  clear: () => void;

  toggleSelection: (productId: string) => void;
  selectMultiple: (ids: string[]) => void;
  deselectAll: () => void;
  isSelected: (productId: string) => boolean;
  getSelected: () => string[];
  getSelectedArray: () => string[];

  setCheckoutPayload: (payload: CheckoutPayload) => void;
  clearCheckoutPayload: () => void;
  resetEverything: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      products: [],
      selectedProductIds: new Set(),
      _selectedIdsArray: [],
      checkoutPayload: null,

      hydrateCart: (products) => {
        set({ products });
      },

      setProductQuantity: (productId, quantity, price) => {
        set((state) => {
          const exists = state.products.find((p) => p.productId === productId);
          if (exists) {
            return {
              products: state.products.map((p) =>
                p.productId === productId ? { ...p, quantity } : p
              ),
            };
          } else {
            return {
              products: [...state.products, { productId, quantity, price }],
            };
          }
        });
      },

      increment: (productId) => {
        const current = get().getQuantity(productId);
        const price = get().products.find((p) => p.productId === productId)?.price ?? 0;
        get().setProductQuantity(productId, current + 1, price);
      },

      decrement: (productId) => {
        const current = get().getQuantity(productId);
        const price = get().products.find((p) => p.productId === productId)?.price ?? 0;
        get().setProductQuantity(productId, Math.max(1, current - 1), price);
      },

      remove: (productId) => {
        set((state) => {
          const newSelectedIds = new Set(
            Array.from(state.selectedProductIds).filter((id) => id !== productId)
          );
          return {
            products: state.products.filter((p) => p.productId !== productId),
            selectedProductIds: newSelectedIds,
            _selectedIdsArray: Array.from(newSelectedIds),
          };
        });
      },

      getQuantity: (productId) => {
        return get().products.find((p) => p.productId === productId)?.quantity ?? 1;
      },

      getAll: () => get().products,

      clear: () =>
        set({
          products: [],
          selectedProductIds: new Set(),
          _selectedIdsArray: [],
        }),

      toggleSelection: (productId) => {
        set((state) => {
          const current = new Set(state.selectedProductIds);
          current.has(productId) ? current.delete(productId) : current.add(productId);
          return {
            selectedProductIds: current,
            _selectedIdsArray: Array.from(current),
          };
        });
      },

      selectMultiple: (ids) => {
        set((state) => {
          const current = new Set(state.selectedProductIds);
          ids.forEach((id) => current.add(id));
          return {
            selectedProductIds: current,
            _selectedIdsArray: Array.from(current),
          };
        });
      },

      deselectAll: () =>
        set({
          selectedProductIds: new Set(),
          _selectedIdsArray: [],
        }),

      isSelected: (productId) => get().selectedProductIds.has(productId),
      getSelected: () => Array.from(get().selectedProductIds),
      getSelectedArray: () => get()._selectedIdsArray,

      setCheckoutPayload: (payload) => {
        set({ checkoutPayload: payload });
      },

      clearCheckoutPayload: () => {
        set({ checkoutPayload: null });
      },

      resetEverything: () => {
        set({
          products: [],
          selectedProductIds: new Set(),
          _selectedIdsArray: [],
          checkoutPayload: null,
        });
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        products: state.products,
        _selectedIdsArray: state._selectedIdsArray,
        checkoutPayload: state.checkoutPayload,
      }),
      onRehydrateStorage: (state) => {
        return (state, error) => {
          if (state) {
            state.selectedProductIds = new Set(state._selectedIdsArray || []);
          }
        };
      },
    }
  )
);