
export interface Order {
  _id: string;
  customerId: string;
  productId: string;
  quantity: number;
  price: number;
  shippingInfoId: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
  customerName?: string;
  status: string;
  orderId: string;
  productTitle?: string;
}

export interface Payment{
   _id: string;
  customerId: string;
  productId: string;
  quantity: number;
  price: number;
  shippingInfoId: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
  customerName?: string;
  status: string;
  orderId: string;
  productTitle?: string;
  transactionId: string
}


export interface Address {
  _id: string;
  customerId: string;
  name: string;
  addressLine: string;
  city: string;
  zipCode: string;
  country: string;
  state: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface ShippingInfo {
  _id: string;
  customerId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  addressId: string;
  optionalAddressId?: string | null;
  cashOnDelivery: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface CheckoutProduct {
  productId: string;
  quantity: number;
  price: number;
}


export interface CheckoutPayload {
  products: CheckoutProduct[];
  shipping: number;
  subtotal: number;
  tax: number;
  total: number;
}


export interface CreateOrderRequest {
  acceptTerms: boolean;
  billingAddressSame: boolean;
  paymentMethod: string;
  promoCode?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  addressId?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  name?: string;
  checkoutPayload: CheckoutPayload;
}


export interface OrderResponse {
  success: boolean;
  message: string;
  data: {
    orders: Order[];
    shippingInfo: ShippingInfo;
    addresses: {
      primary: string;
      optional: string | null;
    };
    orderSummary: {
      totalOrders: number;
      subtotal: number;
      shipping: number;
      tax: number;
      total: number;
    };
  };
}


export interface OrderErrorResponse {
  success: false;
  message: string;
  error?: string;
}


export interface PopulatedOrder extends Order {
  shippingInfo?: ShippingInfo;
  product?: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  };
}


export interface UpdateOrderStatusRequest {
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
}

export interface UpdatePaymentStatusRequest {
  paymentStatus: 'pending' | 'paid' | 'failed';
}

export interface CheckoutFormData {
 
  addressId?: string;

  
  fullName: string;
  phoneNumber: string;
  email: string;

 
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  state?: string;

  
  billingAddressSame: boolean;
  cashOnDelivery: boolean;
  acceptTerms: boolean;
  promoCode?: string;

  
  paymentMethod: string;

  checkoutPayload?: CheckoutPayload;
}

export interface OrderDetailsResponse {
  _id: string;
  quantity: number;
  price: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;

  product: {
    _id: string;
    title: string;
    price: number;
    salePrice?: number;
    category: string;
    brand: string;
    quantity: number;
    model: string;
    storage: string;
    colour: string;
    condition: string;
    ram: string;
    sku: string;
    negotiable: boolean;
    tags: string[];
    firstImageBase64: string | null;
    stockStatus:string;
  };

  shippingInfo: {
    _id: string;
    customerId: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    addressId: {
      _id: string;
      customerId: string;
      name: string;
      addressLine: string;
      city: string;
      zipCode: string;
      country: string;
      state: string;
      isDefault: boolean;
      createdAt: string;
      updatedAt: string;
    };
    optionalAddressId?: {
      _id: string;
      customerId: string;
      name: string;
      addressLine: string;
      city: string;
      zipCode: string;
      country: string;
      state: string;
      isDefault: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface OrderStatusCounts{
  pending: number;
  shipped: number;
  delivered: number;
  cancelled: number;
};
