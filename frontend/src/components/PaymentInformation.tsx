import { OrderDetailsResponse } from "@/types/ordertypes";
import React from "react";

const PaymentInformation = ({
  order,
}: {
  order: OrderDetailsResponse;
}) => {
  const subtotal = order?.price || 0; 
  const shipping =  0;
  const tax =  0;
  const discount =  0;

  const total = subtotal + shipping + tax - discount;

  const formatCurrency = (amount: number) =>
    `$${amount.toFixed(2)}`;

  return (
    <div className="border bg-white border-border-primary rounded-lg p-5">
      <div className="text-2xl font-semibold mb-5">Payment Info</div>

      <div className="grid grid-cols-2 gap-x-20">
        <div className="space-y-2.5 text-text-secondary text-base font-normal">
          <div>Subtotal</div>
          <div>Shipping</div>
          <div>Tax</div>
          <div>Discount</div>
        </div>
        <div className="space-y-2.5 text-text-primary text-base font-normal text-right">
          <div>{formatCurrency(subtotal)}</div>
          <div>{formatCurrency(shipping)}</div>
          <div>{formatCurrency(tax)}</div>
          <div>-{formatCurrency(discount)}</div>
        </div>
      </div>

      <div className="my-2.5 border-t border-border-primary" />

      <div className="grid grid-cols-2 gap-x-20">
        <div className="text-text-secondary text-base font-medium">Total</div>
        <div className="text-text-primary text-base font-medium text-right">
          {formatCurrency(total)}
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation;
