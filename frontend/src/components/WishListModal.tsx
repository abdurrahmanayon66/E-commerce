"use client";
import React, { useState } from "react";
import { useGetAllLists } from "@/hooks/wishlistHooks";
import { WishlistDocument } from "@/types/wishlistTypes";
import { Check, ListChecks } from "lucide-react";

interface WishListModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (wishlistId: string) => void;
}

const WishListModal: React.FC<WishListModalProps> = ({
  open,
  onClose,
  onSelect,
}) => {
  const [selectedList, setSelectedList] = useState<string>("");
  const { data, isLoading, isError } = useGetAllLists();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-[#7D8184] opacity-50" />
      <div
        className="bg-white relative w-full max-w-md rounded-lg p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Select a Wishlist to add your product
        </h2>

        <div className="mb-6">
          {isLoading ? (
            <div className="text-text-secondary">Loading...</div>
          ) : isError || !data?.wishlists.length ? (
            <div className="text-center py-4">
              <p className="text-text-secondary mb-2">
                You don't have any wishlists available.
              </p>
              <p className="text-text-secondary">
                Go to wishlist page to Create one now.
              </p>
            </div>
          ) : (
            <div className="space-y-5 p-5 max-h-[400px] overflow-y-auto border border-border-primary rounded-lg">
              <div className="flex gap-x-2.5">
                <ListChecks className="w-6 h-6 text-text-secondary" />{" "}
                <p className="text-base font-medium text-text-secondary">
                  Your current wishlists
                </p>
              </div>
              {data.wishlists.map((list: WishlistDocument) => {
                const isSelected = selectedList === list._id;
                return (
                  <div
                    key={list._id}
                    onClick={() => setSelectedList(list._id)}
                    className={`px-4 py-2 rounded-sm cursor-pointer border transition-colors flex justify-between ${
                      isSelected
                        ? "bg-danger-secondary border-danger-primary"
                        : "bg-white border-border-primary"
                    }`}
                  >
                    {list.title}
                    {isSelected && (
                      <Check className="w-6 h-6 text-danger-primary" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-sm border border-border-primary text-text-secondary hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          {!isLoading && !isError && data!.wishlists.length > 0 && (
            <button
              disabled={!selectedList}
              onClick={() => {
                onSelect(selectedList);
                onClose();
              }}
              className="px-4 py-2 rounded-sm bg-button-primary text-white hover:bg-opacity-90 transition disabled:opacity-50"
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishListModal;
