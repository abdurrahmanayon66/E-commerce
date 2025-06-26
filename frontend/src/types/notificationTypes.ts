export interface Notification {
  _id: string;
  customerId: string;
  wishlistId?: string;
  orderId?: string;
  activityStatus: string;
  activityType: string;
  createdAt: string;
  updatedAt: string;
  isNew: boolean;
}

export interface SellerNotification {
  _id?: string;
  notificationType: string;
  orderId: string;
  sellerId: string;
  description?: string;
  timestamp?: string;
  createdAt?: string;
  updatedAt?: string;
  isNew?: boolean;
}

export interface SellerNotificationResponse {
  success: boolean;
  notifications: SellerNotification[];
}

export interface NotificationsResponse {
  success: boolean;
  notifications: Notification[];
}