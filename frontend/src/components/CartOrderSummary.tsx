"use client";
import React, { useMemo } from "react";
import { Tag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

type CartOrderSummaryProps = {
  promoCode: string;
  setPromoCode: (value: string) => void;
  handleApplyPromo: () => void;
};

const CartOrderSummary: React.FC<CartOrderSummaryProps> = ({
  promoCode,
  setPromoCode,
  handleApplyPromo,
}) => {
  const selectedIds = useCartStore((state) => state.getSelectedArray());
  const setCheckoutPayload = useCartStore((state) => state.setCheckoutPayload);
  const products = useCartStore((state) => state.getAll());
  const router = useRouter();

  const selectedIdsSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const selectedProducts = useMemo(
    () => products.filter((p) => selectedIdsSet.has(p.productId)),
    [products, selectedIdsSet]
  );

  const subtotal = useMemo(
    () =>
      selectedProducts.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      ),
    [selectedProducts]
  );
  const shipping = selectedProducts.length > 0 ? 0 : 0;
  const tax = selectedProducts.length > 0 ? 0 : 0;
  const total = subtotal + shipping + tax;

  const handleProceedToCheckout = () => {
    const payload = {
      products: selectedProducts,
      subtotal,
      shipping,
      tax,
      total,
    };
    setCheckoutPayload(payload);
    router.push("/checkout");
  };

  return (
    <div className="bg-white rounded-lg border border-border-primary p-5">
      <h2 className="text-2xl font-semibold text-text-primary mb-5">
        Order Summary
      </h2>

      <div className="space-y-2.5 mb-2.5">
        <div className="flex justify-between items-center text-text-primary text-base">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-text-primary text-base">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-text-primary text-base">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex gap-x-2.5">
          <div className="flex-1 relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-text-primary" />
            <input
              type="text"
              placeholder="Enter a promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full min-h-13 pl-11 pr-4 border border-border-primary rounded-md text-text-primary placeholder-text-secondary focus:outline-none"
            />
          </div>
          <button
            onClick={handleApplyPromo}
            className="px-5 py-2.5 rounded-sm text-white text-base font-medium bg-button-primary hover:cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="border-t border-border-primary my-5" />

      <div className="flex justify-between items-center mb-5">
        <span className="text-base font-medium text-text-primary">Total</span>
        <span className="text-base font-medium text-text-primary">
          ${total.toFixed(2)}
        </span>
      </div>

      <div className="w-full flex justify-end">
        <button
          onClick={handleProceedToCheckout}
          disabled={selectedProducts.length === 0}
          className="px-5 py-2.5 rounded-sm text-white text-base font-medium bg-button-primary hover:cursor-pointer"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartOrderSummary;
