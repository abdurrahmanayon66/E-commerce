import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import {
  Order,
  OrderResponse,
  CreateOrderRequest,
  OrderDetailsResponse,
  OrderStatusCounts,
  Payment,
} from "@/types/ordertypes";
import {
  CUSTOMER_ACTIVITIES_QUERY_KEY,
  CUSTOMER_NOTIFICATIONS_QUERY_KEY,
  CUSTOMER_STATS_QUERY_KEY,
} from "./customerHooks";

export const ORDERS_QUERY_KEY = ["orders"];
export const SELLER_ORDERS_QUERY_KEY = ["seller-orders"];
export const ORDER_DETAILS_QUERY_KEY = (orderId: string) => [
  "order-details",
  orderId,
];
export const ORDER_STATUS_COUNTS_QUERY_KEY = ["order-status-counts"];
export const PAYMENTS_QUERY_KEY = ["payments"];

export const useGetAllOrders = () => {
  return useQuery<{ orders: Order[] }>({
    queryKey: ORDERS_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/api/orders/get-all");
      return res.data;
    },
    staleTime: 0,
  });
};

export const useGetPaymentTransactions = () => {
  return useQuery<{ success: boolean; payments: Payment[] }>({
    queryKey: PAYMENTS_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/api/orders/get-payments");
      return res.data;
    },
    staleTime: 0,
  });
};

export const useGetOrderDetails = (orderId: string) => {
  return useQuery<OrderDetailsResponse>({
    queryKey: ORDER_DETAILS_QUERY_KEY(orderId),
    queryFn: async () => {
      const res = await apiClient.get(
        `/api/orders/get-seller-order/${orderId}`
      );
      return res.data;
    },
    enabled: !!orderId,
    staleTime: 0,
  });
};

export const useGetAllSellerOrders = () => {
  return useQuery<Order[]>({
    queryKey: SELLER_ORDERS_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/api/orders/get-seller-orders");
      return res.data.data;
    },
    staleTime: 0,
  });
};

export const useAddOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: CreateOrderRequest) => {
      const res = await apiClient.post("/api/orders/add-order", orderData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CUSTOMER_STATS_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: CUSTOMER_NOTIFICATIONS_QUERY_KEY,
      });
      queryClient.invalidateQueries({ queryKey: PAYMENTS_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: CUSTOMER_ACTIVITIES_QUERY_KEY,
      });
      queryClient.refetchQueries({
        queryKey: ORDERS_QUERY_KEY,
        exact: true,
      });
    },
  });
};

type UpdateOrderStatusRequest = {
  orderId: string;
  orderStatus: string;
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, orderStatus }: UpdateOrderStatusRequest) => {
      const res = await apiClient.patch(
        `/api/orders/update-status/${orderId}`,
        {
          orderStatus,
        }
      );
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: SELLER_ORDERS_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: CUSTOMER_NOTIFICATIONS_QUERY_KEY,
      });
      queryClient.invalidateQueries({ queryKey: CUSTOMER_STATS_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: CUSTOMER_ACTIVITIES_QUERY_KEY,
      });
      queryClient.invalidateQueries({
        queryKey: ORDER_DETAILS_QUERY_KEY(variables.orderId),
      });
    },
  });
};

export const useOrderStatusCounts = () => {
  return useQuery<OrderStatusCounts>({
    queryKey: ORDER_STATUS_COUNTS_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/api/orders/get-order-status-counts");
      return res.data;
    },
    staleTime: 0,
  });
};
