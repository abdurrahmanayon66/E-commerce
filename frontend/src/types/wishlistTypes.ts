import { SimplifiedProduct } from "./productTypes";


export interface WishlistGroup {
  _id: string;
  title: string;
  productIds: string[];
  customerId: string;
  createdAt: string;
  updatedAt: string;
  products: SimplifiedProduct[];
  productsCount: number;
}

export interface WishlistDocument {
  _id: string;
  title: string;
  customerId: string;
  productIds: string[];
  createdAt: string;
  updatedAt: string;
}