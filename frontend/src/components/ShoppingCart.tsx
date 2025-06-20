"use client";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import CartContent from "./CartContent";
import CartOrderSummary from "./CartOrderSummary";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetCart, useRemoveFromCart } from "@/hooks/cartHooks";
import { WishlistGroup } from "@/types/wishlistTypes";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useAuthCheck from "@/hooks/useAuthCheck";

const ShoppingCart: React.FC = () => {
  const [promoCode, setPromoCode] = useState<string>("");
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const { data, isLoading, isError } = useGetCart();
  const hydrateCart = useCartStore((state) => state.hydrateCart);
  const cartItems = useCartStore((state) => state.getAll());
  const isSelected = useCartStore((state) => state.isSelected);
  const getSelected = useCartStore((state) => state.getSelected);
  const removeLocal = useCartStore((state) => state.remove);
  const { mutate: removeFromCart } = useRemoveFromCart();
  const [deleting, setDeleting] = useState(false);
    const { userType, userId, errorAuth } = useAuthCheck();
       const router = useRouter();
     
       useEffect(() => {
         if (userId && userType !== "customer") {
           router.back();
         }
         if (errorAuth) {
           router.back();
         }
       }, [userId, userType, errorAuth, router]);
  

  const handleDeleteSelected = async () => {
  setDeleting(true);
  const selectedIds = getSelected();

  try {
    const cartIdsSet = new Set<string>();
    const productIdsToRemove: string[] = [];

    data?.lists.forEach((list) => {
      const matchingProducts = list.products.filter((product) =>
        selectedIds.includes(product._id)
      );
      if (matchingProducts.length > 0) {
        cartIdsSet.add(list._id);
        matchingProducts.forEach((product) => {
          productIdsToRemove.push(product._id);
        });
      }
    });

    if (cartIdsSet.size === 0 || productIdsToRemove.length === 0) {
      toast.error("No valid cart/product found for deletion.");
      return;
    }
    removeFromCart(
      {
        cartId: Array.from(cartIdsSet),
        productId: productIdsToRemove,
      },
      {
        onSuccess: () => {
          productIdsToRemove.forEach((id) => removeLocal(id));
          toast.success("Selected items removed from cart");
        },
        onError: () => {
          toast.error("Failed to remove some cart items");
        },
      }
    );
  } finally {
    setDeleting(false);
  }
};


  useEffect(() => {
    if (data?.lists) {
      const items = data.lists.flatMap((list: WishlistGroup) =>
        list?.products.map((product) => ({
          productId: product._id,
          quantity: product?.quantity ?? 1,
          price: product.price ?? 0,
        }))
      );
      hydrateCart(items);
    }
  }, [data, hydrateCart]);

  const handleApplyPromo = () => {
    console.log("Applying promo code:", promoCode);
  };

  if (isLoading) return <p className="text-text-secondary">Loading cart...</p>;
  if (isError || !data)
    return <p className="text-red-500">Failed to load shopping cart</p>;

  return (
    <div>
      <div className="mb-5 lg:mb-10 space-y-1">
        <h1 className="text-3xl font-semibold">Shopping Cart</h1>
        <h3 className="text-text-secondary text-base">
          You have (
          {data.lists.reduce((acc, list) => acc + list.products.length, 0) || 0}
          ) items in your cart.
        </h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-y-5 lg:gap-x-10">
        <div className="space-y-5">
          <div className="flex min-h-16 justify-between w-full items-center px-5 bg-white border-1 border-border-primary rounded-lg">
            <div className="flex items-center gap-x-2.5 text-text-secondary text-base">
              <Checkbox
                checked={selectAll}
                onCheckedChange={(checked) => {
                  setSelectAll(!!checked);
                  const allIds = data.lists.flatMap((list: WishlistGroup) =>
                    list.products.map((p) => p._id)
                  );
                  checked
                    ? useCartStore.getState().selectMultiple(allIds)
                    : useCartStore.getState().deselectAll();
                }}
              />
              Select All (
              {data.lists.reduce(
                (acc, list) => acc + list.products.length,
                0
              ) || 0}
              )
            </div>
            <button
              onClick={handleDeleteSelected}
              disabled={deleting}
              className={`flex items-center gap-x-2.5 text-button-primary text-base cursor-pointer ${
                deleting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {deleting ? (
                <svg
                  className="animate-spin w-5 h-5 text-button-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                <Trash2 className="w-6 h-6" />
              )}
              Delete
            </button>
          </div>

          {data.lists.map((list: WishlistGroup) => (
            <CartContent key={list.title} list={list} type="cart" />
          ))}
        </div>

        <div>
          <CartOrderSummary
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            handleApplyPromo={handleApplyPromo}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
