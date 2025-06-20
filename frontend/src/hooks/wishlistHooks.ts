import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { WishlistDocument, WishlistGroup } from "@/types/wishlistTypes";
import { CUSTOMER_STATS_QUERY_KEY } from "./customerHooks";

export const WISHLIST_QUERY_KEY = ['wishlist'];
export const GET_ALL_LISTS_QUERY_KEY = ["list"];

export const useGetWishlist = () => {
  return useQuery<{ lists: WishlistGroup[] }>({
    queryKey: WISHLIST_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/api/wishlists/get-all");
      return res.data;
    },
    staleTime: 0,
  });
};

export const useCreateWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title: string) => {
      const res = await apiClient.post("/api/wishlists/create-list", { title });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GET_ALL_LISTS_QUERY_KEY });
       queryClient.refetchQueries({
        queryKey: GET_ALL_LISTS_QUERY_KEY,
        exact: true,
      });
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    },
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      wishlistId,
      productId,
    }: {
      wishlistId: string;
      productId: string;
    }) => {
      const res = await apiClient.post("/api/wishlists/add-to-list", {
        wishlistId,
        productId,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GET_ALL_LISTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CUSTOMER_STATS_QUERY_KEY });
    },
  });
};

export const useGetAllLists = () => {
  return useQuery<{ wishlists: WishlistDocument[] }>({
    queryKey: GET_ALL_LISTS_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/api/wishlists/get-all-lists");
      return res.data;
    },
    staleTime: 0,
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      wishlistId,
      productId,
    }: {
      wishlistId: string;
      productId: string | string[];
    }) => {
      const res = await apiClient.request({
        url: `/api/wishlists/delete-wishlist-item/${wishlistId}`,
        method: "DELETE",
        data: { productId },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GET_ALL_LISTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CUSTOMER_STATS_QUERY_KEY });
    },
  });
};

