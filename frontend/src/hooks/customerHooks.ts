import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import {
  RegisterPayload,
  LoginResponse,
  Customer,
  UpdatePayload,
  CustomerStats,
} from "@/types/customerTypes";
import { ActivitiesResponse } from "@/types/activityTypes";
import { NotificationsResponse } from "@/types/notificationTypes";

export const CUSTOMER_QUERY_KEY = ["customers"];
export const CUSTOMER_PROFILE_QUERY_KEY = ["customer-profile"];
export const CUSTOMER_STATS_QUERY_KEY = ["customer-stats"];
export const CUSTOMER_ACTIVITIES_QUERY_KEY = ["customer-activities"];
export const CUSTOMER_NOTIFICATIONS_QUERY_KEY = ["customer-notifications"];

export const useCustomerStats = () => {
  return useQuery<CustomerStats>({
    queryKey: CUSTOMER_STATS_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.get("/api/customers/get-overview-stats");
      return response.data;
    },
    staleTime: 0,
  });
};

export const useRegisterCustomer = () => {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const formData = new FormData();
      formData.append("firstName", payload.firstName);
      formData.append("lastName", payload.lastName);
      formData.append("email", payload.email);
      formData.append("password", payload.password);
      if (payload.phone) formData.append("phone", payload.phone);
      if (payload.bio) formData.append("bio", payload.bio);
      if (payload.customerImage)
        formData.append("customerImage", payload.customerImage);

      const response = await apiClient.post("/customers/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
  });
};

export const useGetCustomerActivities = () => {
  return useQuery<ActivitiesResponse>({
    queryKey: CUSTOMER_ACTIVITIES_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/api/customers/get-recent-activity");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetCustomerNotifications = (options: { enabled?: boolean }) => {
  return useQuery<NotificationsResponse>({
    queryKey: CUSTOMER_NOTIFICATIONS_QUERY_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/api/customers/get-notifications");
      return res.data;
    },
    enabled: options.enabled,
    staleTime: 0,
  });
};

export const useLoginCustomer = () => {
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await apiClient.post<LoginResponse>(
        "/customers/login",
        credentials
      );
      return response.data;
    },
  });
};

export const useGetAllCustomers = () => {
  return useQuery<Customer[]>({
    queryKey: CUSTOMER_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.get("/customers/get-all-customers");
      return response.data.customers;
    },
    staleTime: 1000 * 60 * 5,
    enabled: false,
  });
};

export const useGetCustomerProfile = () => {
  return useQuery<Customer>({
    queryKey: CUSTOMER_PROFILE_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.get("/api/customers/profile");
      return response.data;
    },
    staleTime: 0,
  });
};

export const useMarkNotificationsAsSeen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await apiClient.post("/api/customers/mark-as-seen", {
        notificationId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CUSTOMER_NOTIFICATIONS_QUERY_KEY,
      });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdatePayload) => {
      const formData = new FormData();
      if (payload.firstName) formData.append("firstName", payload.firstName);
      if (payload.lastName) formData.append("lastName", payload.lastName);
      if (payload.email) formData.append("email", payload.email);
      if (payload.phone) formData.append("phone", payload.phone);
      if (payload.bio) formData.append("bio", payload.bio);
      if (payload.customerImage)
        formData.append("customerImage", payload.customerImage);

      const response = await apiClient.patch("api/customers/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_PROFILE_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CUSTOMER_QUERY_KEY });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.delete("/customers/delete");
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_QUERY_KEY });
    },
  });
};
