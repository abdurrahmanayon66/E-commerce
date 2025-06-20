"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAddAddress, useUpdateAddress } from "@/hooks/addressHooks";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export default function AddressModal({
  onClose,
  initialData,
}: {
  onClose: () => void;
  initialData?: any;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState(initialData?.name || "");
  const [addressLine, setAddressLine] = useState(
    initialData?.addressLine || ""
  );
  const [city, setCity] = useState(initialData?.city || "");
  const [country, setCountry] = useState(initialData?.country || "");
  const [zipCode, setZipCode] = useState(initialData?.zipCode || "");
  const [state, setState] = useState(initialData?.state || "");

  const { mutate: createAddress, isPending: isCreating } = useAddAddress();
  const { mutate: updateAddress, isPending: isUpdating } = useUpdateAddress();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = () => {
    if (!name || !addressLine || !city || !country || !zipCode || !state) {
      toast.error("Please fill in all fields");
      return;
    }

    const updates = {
      name,
      addressLine,
      city,
      country,
      zipCode,
      state,
    };

    if (initialData) {
      updateAddress(
        { addressId: initialData._id, updates },
        {
          onSuccess: () => {
            toast.success("Address updated successfully");
            onClose();
          },
          onError: () => toast.error("Failed to update address"),
        }
      );
    } else {
      createAddress(updates, {
        onSuccess: () => {
          toast.success("Address saved successfully");
          onClose();
        },
        onError: () => toast.error("Failed to save address"),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-[#7D8184] opacity-50"  />
      <div
        ref={modalRef}
        className="bg-white relative p-6.5 rounded-sm border max-h-[95vh] overflow-y-scroll md:overflow-hidden border-border-primary w-full max-w-2xl mx-4"
      >
        <span className="md:hidden"><X onClick={onClose} className="absolute top-1 right-1 w-6 h-6 cursor-pointer"/></span>
        <h2 className="text-2xl font-medium text-text-primary mb-6.5">
          {initialData ? "Edit Address" : "Add New Address"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              Address Name
            </label>
            <input
              type="text"
              placeholder="e.g. Home, Work"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base placeholder-text-secondary"
            />
          </div>
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              Address Line
            </label>
            <input
              type="text"
              placeholder="Enter Address Line"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base placeholder-text-secondary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              City
            </label>
            <input
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base placeholder-text-secondary"
            />
          </div>
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              Zip/Postal Code
            </label>
            <input
              type="text"
              placeholder="Enter Zip/Postal Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base placeholder-text-secondary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              Country
            </label>
            <input
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base placeholder-text-secondary"
            />
          </div>
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              State/Province
            </label>
            <input
              type="text"
              placeholder="Enter State/Province"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base placeholder-text-secondary"
            />
          </div>
        </div>

        <div className="flex gap-x-2.5 mt-2">
          <button
            onClick={onClose}
            className="px-6 py-3 hidden lg:block border md:min-w-44 border-border-primary text-text-primary rounded-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isCreating || isUpdating}
            className="px-6 py-3 bg-button-primary text-white rounded-sm hover:bg-opacity-90"
          >
            {isCreating || isUpdating
              ? initialData
                ? "Updating..."
                : "Saving..."
              : initialData
              ? "Update Address"
              : "Save Address"}
          </button>
        </div>
      </div>
    </div>
  )};