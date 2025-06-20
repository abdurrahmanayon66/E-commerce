import React from "react";
import { Mail, MapPin } from "lucide-react";
import { OrderDetailsResponse } from "@/types/ordertypes";

const BuyerInformation = ({ order }: { order: OrderDetailsResponse }) => {
  return (
    <div className="bg-white p-5 border border-border-primary rounded-lg w-full md:w-auto">
      <div className="text-2xl font-semibold mb-5">Buyer Information</div>

      <div className="space-y-5 text-base">
        <div>
          <div className="text-text-secondary text-xl font-semibold mb-2.5">
            Buyer
          </div>
          <div className="text-text-primary font-semibold">
            {" "}
            {order?.shippingInfo?.fullName}
          </div>
          <div className="text-text-secondary flex items-center gap-x-1.5">
            <Mail className="w-5 h-5" />
            {order?.shippingInfo?.email}
          </div>
        </div>

        <div>
          <div className="text-text-secondary text-xl font-semibold mb-2.5">
            Shipping Address
          </div>
          <div className="text-text-primary text-base flex items-start gap-x-1.5">
            <MapPin className="w-5 h-5 mt-0.5" />
            <span className="max-w-60">
              {order?.shippingInfo?.addressId?.addressLine},{" "}
              {order?.shippingInfo?.addressId?.city},{" "}
              {order?.shippingInfo?.addressId?.state},{" "}
              {order?.shippingInfo?.addressId?.zipCode},{" "}
              {order?.shippingInfo?.addressId?.country}
            </span>
          </div>
        </div>

        <div>
          <div className="text-text-secondary mb-2.5 text-xl font-semibold">
            Payment Method
          </div>
          <div className="text-text-primary text-base font-semibold">
            {order?.paymentMethod === "gateway"
              ? "Credit Card"
              : "Cash on Delivery"}
          </div>

          <div className="text-base text-text-secondary my-1">
            {order?.paymentMethod === "gateway"
              ? "**** **** **** 4242"
              : "Payment will be made cash on delivery"}
          </div>

          <span
            className={`px-4 py-1 rounded-full text-sm font-medium 
    ${
      order?.paymentStatus === "paid"
        ? "bg-success-secondary text-success-primary"
        : order?.paymentStatus === "pending"
        ? "bg-warning-secondary text-warning-primary"
        : order?.paymentStatus === "failed"
        ? "bg-danger-secondary text-danger-primary"
        : "bg-gray-200 text-gray-700"
    }
  `}
          >
            {order?.paymentStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BuyerInformation;
