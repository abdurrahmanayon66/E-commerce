import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import {
  SellerNotificationResponse,
  SellerNotification,
} from "@/types/notificationTypes";
import { Payment } from "@/types/ordertypes";

export const SELLER_NOTIFICATIONS_QUERY_KEY = ["seller-notifications"];
export const SELLER_PAYMENTS_QUERY_KEY = ["seller-payments"];

export const useGetSellerNotifications = (options: { enabled?: boolean }) => {
  return useQuery<SellerNotificationResponse>({
    queryKey: SELLER_NOTIFICATIONS_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/api/sellers/get-notifications");
      return res.data;
    },
    enabled: options.enabled,
    staleTime: 0,
  });
};

export const useGetSellerPaymentTransactions = () => {
  return useQuery<{ success: boolean; payments: Payment[] }>({
    queryKey: SELLER_PAYMENTS_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/api/sellers/get-payments");
      return res.data;
    },
    staleTime: 0,
  });
};

export const useUpdateLastNotificationSeen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lastSeenNotificationId: string) => {
      const response = await apiClient.patch(
        "/api/sellers/update-notification",
        {
          lastSeenNotificationId,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SELLER_NOTIFICATIONS_QUERY_KEY,
      });
    },
  });
};
