"use client";
import { ArrowLeft, Printer, Phone, X, Truck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Timeline from "../Timeline";
import BuyerInformation from "../BuyerInformation";
import PaymentInformation from "../PaymentInformation";
import ProductDetailsCard from "../ProductDetailsCard";
import { CancelOrderModal } from "../CancelOrderModal";
import { useGetOrderDetails, useUpdateOrderStatus } from "@/hooks/orderHooks";
import toast from "react-hot-toast";
import { OrderDetailsResponse } from "@/types/ordertypes";

const OrderDetails = () => {
  const router = useRouter();
  const [statusUpdated, setStatusUpdated] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const params = useParams();
  const orderId = params?.orderId as string;
  const _id = params?.id as string;
  const { data, isLoading, error } = useGetOrderDetails(_id);
  const { mutate: updateOrderStatus, isPending: isShipLoading } =
    useUpdateOrderStatus();

  const handleShip = () => {
    updateOrderStatus(
      { orderId: _id, orderStatus: "shipped" },
      {
        onSuccess: () => {
          toast.success("Order marked as shipped");
          setStatusUpdated(true);
        },
        onError: () => {
          toast.error("Failed to update order status");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-[#7D8184] opacity-50" />
        <div className="relative bg-background-primary rounded-lg p-5 border border-border-primary">
          <p className="text-text-primary">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-[#7D8184] opacity-50" />
        <div className="relative bg-background-primary rounded-lg p-5 border border-border-primary">
          <p className="text-text-primary">Failed to load order details.</p>
        </div>
      </div>
    );
  }

  const order = data as OrderDetailsResponse;

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mr-5 gap-y-5">
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => router.push("/seller/orders")}
            className="rounded-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-semibold">Order Details</h1>
        </div>
        <div className="flex gap-x-5">
          <button className="flex items-center justify-center hover:cursor-pointer rounded-sm gap-x-2.5 min-w-[190px] min-h-[52px] px-5 py-2.5 border text-text-primary border-border-primary font-medium">
            <Printer className="w-5 h-5" />
            Print Invoice
          </button>
          <button className="flex items-center justify-center hover:cursor-pointer rounded-sm gap-x-2.5 min-w-[190px] min-h-[52px] px-5 py-2.5 bg-button-primary text-white font-medium">
            <Phone className="w-5 h-5" />
            Contact Buyer
          </button>
        </div>
      </div>
      <div className="lg:mt-10 mt-5 rounded-lg md:border md:border-border-primary bg-white md:p-5">
        <ProductDetailsCard order={order} orderId={orderId} />
        <div className="flex md:flex-row flex-col gap-y-4 md:gap-y-0 gap-x-5 mt-5 items-start">
          <Timeline />
          <BuyerInformation order={order} />
         <div className="hidden lg:block"> <PaymentInformation order={order} /></div>
        </div>
         <div className="lg:hidden blockn mt-5 w-full md:w-61"> <PaymentInformation order={order} /></div>
        <div className="flex justify-between md:justify-start gap-x-5 mt-10">
          <button
            onClick={() => setIsCancelModalOpen(true)}
            disabled={statusUpdated || order?.orderStatus !== "pending"}
            className={`flex items-center min-w-42 min-h-13 justify-center rounded-sm border font-medium border-red-200 text-button-primary gap-x-1.5 px-4 py-2 cursor-pointer ${
              statusUpdated || order?.orderStatus !== "pending"
                ? "opacity-50"
                : ""
            }`}
          >
            <X className="w-6 h-6" />
            Cancel Order
          </button>

          <button
            onClick={handleShip}
            disabled={
              isShipLoading || statusUpdated || order?.orderStatus !== "pending"
            }
            className={`flex items-center min-w-42 min-h-13 justify-center rounded-sm border font-medium text-white bg-button-primary gap-x-1.5 px-4 py-2 cursor-pointer ${
              statusUpdated || order?.orderStatus !== "pending"
                ? "opacity-50"
                : ""
            }`}
          >
            <Truck className="w-6 h-6" />
            {isShipLoading ? "Shipping..." : "Ship Order"}
          </button>
        </div>
      </div>

      <CancelOrderModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        order={order}
        orderId={orderId}
      />
    </div>
  );
};

export default OrderDetails;
