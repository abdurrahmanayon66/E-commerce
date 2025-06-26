"use client";
import React, { useState } from "react";
import { Store, Minus, Plus, Trash2, ShoppingCart, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useAddToCart, useRemoveFromCart } from "@/hooks/cartHooks";
import toast from "react-hot-toast";
import { WishlistGroup } from "@/types/wishlistTypes";
import { useRemoveFromWishlist } from "@/hooks/wishlistHooks";

type CartContentProps = {
  type: "cart" | "wishlist";
  list: WishlistGroup;
};

const CartContent: React.FC<CartContentProps> = ({ type, list }) => {
  const [addingId, setAddingId] = useState<string | null>(null);

  const { toggleSelection, selectMultiple, isSelected } = useWishlistStore();
  const {
    setProductQuantity,
    increment,
    decrement,
    remove,
    getQuantity,
    toggleSelection: toggleCartSelection,
    selectMultiple: selectCartMultiple,
    isSelected: isCartSelected,
    getAll,
  } = useCartStore();

  const { mutate: addToCart } = useAddToCart();
  const { mutate: removeFromWishlist } = useRemoveFromWishlist();
  const { mutate: removeFromCart } = useRemoveFromCart();

  const items =
    type === "cart"
      ? list.products.map((product) => ({
          ...product,
          quantity: getQuantity(product._id),
        }))
      : (list?.products ?? []).map((product) => ({
          ...product,
          quantity: 1,
        }));

  const allSelected =
    type === "wishlist"
      ? items.every((item) => isSelected(item._id))
      : items.every((item) => isCartSelected(item._id));

  const toggleSeller = () => {
    const ids = items.map((item) => item._id);
    if (allSelected) {
      ids.forEach((id) =>
        type === "wishlist" ? toggleSelection(id) : toggleCartSelection(id)
      );
    } else {
      type === "wishlist" ? selectMultiple(ids) : selectCartMultiple(ids);
    }
  };

  const updateQuantity = (id: string, change: number, price: number) => {
    if (type === "cart") {
      const current = getQuantity(id);
      const updated = Math.max(1, current + change);
      setProductQuantity(id, updated, price);
    }
  };

  const removeItem = (productId: string) => {
    if (type === "cart") {
      removeFromCart(
        { cartId: list._id, productId },
        {
          onSuccess: () => {
            remove(productId);
            toast.success("Removed item from cart");
          },
          onError: () => toast.error("Failed to remove from cart"),
        }
      );
    } else {
      removeFromWishlist(
        { wishlistId: list._id, productId },
        {
          onSuccess: () => toast.success("Removed item from wishlist"),
          onError: () => toast.error("Failed to remove from wishlist"),
        }
      );
    }
  };

  const handleAddSingle = (wishlistId: string, productId: string) => {
    setAddingId(productId);
    addToCart(
      { wishlistId, productId },
      {
        onSuccess: () => toast.success("Added to cart"),
        onError: () => toast.error("Failed to add to cart"),
        onSettled: () => setAddingId(null),
      }
    );
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg border border-border-primary p-5">
        <div className="flex items-center gap-x-4 mb-5 pb-2.5 border-b border-border-primary">
          <Checkbox
            checked={allSelected}
            onCheckedChange={toggleSeller}
            className="w-4.5 h-4.5 border-border-secondary border-2 rounded-[3px] shadow-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-white data-[state=checked]:text-blue-500 [&_svg]:!w-3 [&_svg]:!h-3 [&_svg]:!stroke-5 hover:cursor-pointer"
          />
          <Store className="w-5 h-5 text-text-secondary" />
          <span className="text-text-secondary text-base">{list?.title}</span>
        </div>

        <div className="space-y-5">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item._id} className="flex items-center gap-4">
                <Checkbox
                  checked={
                    type === "wishlist"
                      ? isSelected(item._id)
                      : isCartSelected(item._id)
                  }
                  onCheckedChange={() =>
                    type === "wishlist"
                      ? toggleSelection(item._id)
                      : toggleCartSelection(item._id)
                  }
                  className="w-4.5 h-4.5 border-border-secondary hover:cursor-pointer border-2 rounded-[3px] shadow-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-white data-[state=checked]:text-blue-500 [&_svg]:!w-3 [&_svg]:!h-3 [&_svg]:!stroke-5"
                />

                <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={`data:image/jpeg;base64,${item?.image}`}
                    alt={item?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="w-full flex gap-x-2.5 justify-between items-center">
                    <h3 className="text-xl font-medium text-text-primary line-clamp-1">
                      {item.title}
                    </h3>
                    <button
                      onClick={() => removeItem(item._id)}
                      className={`hover:cursor-pointer ${
                        type === "wishlist"
                          ? "text-text-secondary"
                          : "text-button-primary"
                      }`}
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                  <p className="text-text-secondary text-base mb-2.5">
                    {item?.model} | {item?.colour}
                  </p>
                  <div
                    className={`flex justify-between gap-x-2.5 w-full ${
                      type === "wishlist" ? "items-center" : "items-start"
                    }`}
                  >
                    <p className="text-xl font-medium text-text-primary">
                      ${item?.price.toFixed(2)}
                    </p>
                    {type === "cart" ? (
                      <div className="flex items-center gap-x-2">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, -1, item.price)
                          }
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-text-primary" />
                        </button>
                        <span className="text-base min-w-6 text-text-primary font-medium text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, 1, item.price)
                          }
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-text-primary" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddSingle(list._id, item._id)}
                        className="flex items-center md:min-h-12 md:min-w-39.5 justify-center gap-x-2.5 px-4 py-2 text-white font-medium text-base rounded-sm bg-button-primary hover:cursor-pointer"
                      >
                        {addingId === item._id ? (
                         <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <>
                            <ShoppingCart className="w-6 h-6" />
                            <span className="text-sm font-medium hidden md:block">
                              Add to Cart
                            </span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-text-secondary text-sm">
              No products in this wishlist.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartContent;
