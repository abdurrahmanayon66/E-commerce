"use client";
import React from "react";
import { AlertTriangle } from "lucide-react";
import { OrderDetailsResponse } from "@/types/ordertypes";
import { useUpdateOrderStatus } from "@/hooks/orderHooks";
import toast from "react-hot-toast";

interface CancelOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderDetailsResponse;
  orderId: string;
}

export const CancelOrderModal = ({
  isOpen,
  onClose,
  order,
  orderId,
}: CancelOrderModalProps) => {
  if (!isOpen) return null;

  const { mutate: updateOrderStatus, isPending: isCancelLoading } =
    useUpdateOrderStatus();

  const handleCancel = () => {
    updateOrderStatus(
      { orderId: order._id, orderStatus: "cancelled" },
      {
        onSuccess: () => {
          toast.success("Order has been cancelled!");
          onClose();
        },
        onError: () => {
          toast.error("Failed to update order status");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-[#7D8184] opacity-50"
        onClick={onClose}
      />
      <div className="relative bg-background-primary rounded-lg p-4.5 max-w-[410px] border border-border-primary">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2.5">
            <div className="p-3 bg-danger-secondary rounded-full">
              <AlertTriangle
                className="w-10 h-10 text-button-primary  p-1"
                strokeWidth={1.5}
              />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2.5">
            Cancel Order?
          </h2>
          <p className="text-sm text-text-secondary mb-5.5">
            Are you sure you want to cancel this order? The customer will be
            notified and the order will be marked as cancelled.
          </p>

          <div className="text-left mb-5.5">
            <label className="block text-xl text-text-primary font-medium mb-2">
              Reason for cancellation{" "}
              <span className="text-button-primary">*</span>
            </label>
            <textarea
              className="w-full text-sm p-4 border border-border-primary rounded-md min-h-21"
              placeholder="Enter reason for cancellation"
            />
          </div>

          <div className="border border-border-primary rounded-lg p-3">
            <h3 className="text-sm text-left font-medium text-text-primary mb-2">
              Order Summary
            </h3>
            <div className="flex">
              <div className="flex-1 space-y-1 text-left">
                <p className="text-sm text-text-secondary">Order ID:</p>
                <p className="text-sm text-text-secondary">Product:</p>
                <p className="text-sm text-text-secondary">Customer:</p>
              </div>
              <div className="flex-1 space-y-1 text-right">
                <p className="text-sm font-medium text-text-primary">
                  #{orderId}
                </p>
                <p className="text-sm font-medium text-text-primary">
                  {order?.product?.title}
                </p>
                <p className="text-sm font-medium text-text-primary">
                  {order?.shippingInfo?.fullName}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border-primary my-5.5 h-[1px]" />
        <div className="flex gap-x-4 justify-center text-base font-medium">
          <button
            onClick={onClose}
            className="px-4 py-2 min-w-44.5 min-h-13 flex justify-center items-center rounded-lg border border-border-primary text-text-primary hover:bg-background-hover transition-colors cursor-pointer"
          >
            Keep Order
          </button>
          <button
            onClick={handleCancel}
            disabled={isCancelLoading}
            className="px-4 py-2 min-w-44.5 min-h-13 flex justify-center items-center rounded-lg bg-danger-primary text-white hover:bg-danger-primary/90 transition-colors cursor-pointer"
          >
            {isCancelLoading ? "Cancelling..." : "Cancel Order"}
          </button>
        </div>
      </div>
    </div>
  );
};
