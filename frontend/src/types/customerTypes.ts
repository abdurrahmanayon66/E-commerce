export interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  customerImage: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerStats {
  totalOrders: number;
  pendingOrders: number;
  totalWishlistItems: number;
}

export interface LoginResponse {
  accessToken: string;
  customer: Customer;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  bio?: string;
  customerImage?: File;
}

export interface UpdatePayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  customerImage?: File;
}