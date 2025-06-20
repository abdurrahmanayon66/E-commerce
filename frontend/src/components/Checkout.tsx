"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import CheckoutProcess from "./CheckoutProcess";
import ShippingInfoForm from "./ShippingInfoForm";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";
import { useAddOrder } from "@/hooks/orderHooks";
import { CheckoutFormData } from "@/types/ordertypes";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [promoCode, setPromoCode] = useState("");
  const checkoutPayload = useCartStore((state) => state.checkoutPayload);
  const addOrderMutation = useAddOrder();
  const { resetEverything } = useCartStore();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const router = useRouter();

  const methods = useForm<CheckoutFormData>({
    defaultValues: {
      billingAddressSame: true,
      cashOnDelivery: false,
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    if (!selectedPayment) {
      toast.error("Please select a payment method");
      return;
    }

    if (!checkoutPayload) {
      toast.error(
        "Cart is empty! Please go back to cart and add items to checkout."
      );
      return;
    }

    const payloadToSubmit = {
      ...data,
      checkoutPayload,
      promoCode,
      paymentMethod: selectedPayment,
    };
    setIsPlacingOrder(true);
    addOrderMutation.mutate(payloadToSubmit, {
      onSuccess: (response) => {
        resetEverything();
        localStorage.removeItem("cart-storage");
        toast.success(`Order created successfully!`);
        setTimeout(() => {
          router.push("/customer/my-orders");
        }, 1000);
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to create order";
        toast.error(errorMessage);
        setIsPlacingOrder(false);
        console.error("Order Error:", error);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="pb-6 space-y-10">
          <div>
            <h1 className="text-3xl font-semibold text-text-primary mb-1">
              Checkout
            </h1>
            <p className="text-base text-text-secondary">
              Please review and complete your purchase
            </p>
          </div>

          <div>
            <CheckoutProcess />
          </div>

          <ShippingInfoForm />

          <div className="my-10">
            <PaymentMethod
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
            />
          </div>

          <OrderSummary
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            onPlaceOrder={methods.handleSubmit(onSubmit)}
            isPlacingOrder={isPlacingOrder}
          />
        </div>
      </form>
    </FormProvider>
  );
}
