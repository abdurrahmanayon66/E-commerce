export interface Activity {
  _id: string;
  customerId: string;
  wishlistId?: string;
  orderId?: string;
  activityStatus: string;
  activityType: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivitiesResponse {
  success: boolean;
  activities: Activity[];
}