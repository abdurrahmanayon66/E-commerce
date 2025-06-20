import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";

export interface Address {
  _id: string;
  addressLine: string;
  city: string;
  zipCode: string;
  country: string;
  state: string;
  name: string;
  isDefault: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddressPayload {
  addressLine: string;
  city: string;
  zipCode: string;
  name: string;
  country: string;
  state: string;
  isDefault?: boolean;
}

const ADDRESS_QUERY_KEY = ["addresses"];

export const useGetAddresses = () => {
  return useQuery<Address[]>({
    queryKey: ADDRESS_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/api/addresses/all");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddressPayload) => {
      const res = await apiClient.post("/api/addresses/add", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEY });
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      addressId,
      updates,
    }: {
      addressId: string;
      updates: Partial<AddressPayload>;
    }) => {
      const res = await apiClient.patch(`/api/addresses/${addressId}`, updates);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEY });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addressId: string) => {
      const res = await apiClient.delete(`/api/addresses/${addressId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEY });
    },
  });
};

export const useSetDefaultAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addressId: string) => {
      const res = await apiClient.patch(`/api/addresses/default/${addressId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEY });
    },
  });
};
