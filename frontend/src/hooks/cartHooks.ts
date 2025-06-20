import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import { SimplifiedProduct } from '@/types/productTypes';
import { WishlistGroup } from '@/types/wishlistTypes';

export const CART_QUERY_KEY = ['cart'];
export const WISHLIST_QUERY_KEY = ['wishlist'];

export interface CartItem {
  _id: string;
  product: SimplifiedProduct;
  quantity: number;
}

export interface CartEntry {
  wishlistId: string;
  productId: string | string[];
}

export const useGetCart = () => {
  return useQuery<{ lists: WishlistGroup[]}>({
    queryKey: CART_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get('/api/carts/get-all');
      return res.data;
    },
    staleTime:0,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entries: CartEntry | CartEntry[]) => {
      const res = await apiClient.post('/api/carts/add-to-cart', entries);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
      queryClient.refetchQueries({ queryKey: WISHLIST_QUERY_KEY, exact: true });
    },
  });
};

interface RemoveFromCartInput {
  cartId: string | string[];
  productId: string | string[];
}

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cartId, productId }: RemoveFromCartInput) => {
      const res = await apiClient.delete(`/api/carts/delete-cart-item`, {
        data: { cartId, productId }, 
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};



export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      const res = await apiClient.patch('/api/carts/update-quantity', {
        id,
        quantity,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};