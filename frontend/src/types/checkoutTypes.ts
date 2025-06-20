export interface CartProduct {
  productId: string;
  quantity: number;
  price: number;
}

export interface CheckoutPayload {
  products: CartProduct[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}