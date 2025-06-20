"use client";
import React, { useState } from "react";
import {
  useAddAddress,
  useDeleteAddress,
  useGetAddresses,
  useSetDefaultAddress,
} from "@/hooks/addressHooks";
import toast from "react-hot-toast";
import { MapPin, Edit, Trash2, Plus, Check } from "lucide-react";
import AddressModal from "./AddressModal";

export default function AddressInfo() {
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const { data, isLoading, refetch } = useGetAddresses();
  const { mutate: deleteAddress } = useDeleteAddress();
  const { mutate: setDefaultAddress } = useSetDefaultAddress();

  const handleDelete = (id: string) => {
    deleteAddress(id, {
      onSuccess: () => {
        toast.success("Address deleted successfully");
        refetch();
      },
      onError: () => {
        toast.error("Failed to delete address");
      },
    });
  };

  const handleSetDefault = (id: string) => {
    setDefaultAddress(id, {
      onSuccess: () => {
        toast.success("Address set as default");
        refetch();
      },
      onError: () => {
        toast.error("Failed to set default address");
      },
    });
  };

  return (
    <>
      <div className="w-full p-6.5 bg-white border border-border-primary rounded-lg">
        <div className="flex md:flex-row flex-col items-start md:justify-between md:items-center mb-6.5">
          <div>
            <h1 className="text-2xl font-medium text-text-primary mb-1">
              Addresses
            </h1>
            <h3 className="text-base text-text-secondary">
              Manage your shipping and billing addresses.
            </h3>
          </div>
          <button
            onClick={() => {
              setEditingAddress(null);
              setShowModal(true);
            }}
            className="flex mt-2.5 md:mt-0 items-center justify-center min-w-43.5 h-13 gap-2.5 px-5 py-2.5 font-medium bg-button-primary text-white rounded-sm hover:bg-opacity-90 transition-colors cursor-pointer"
          >
            <Plus className="w-6 h-6" />
            Add Address
          </button>
        </div>

        <div className="space-y-5">
          {isLoading ? (
            <p className="text-base text-text-secondary">Loading...</p>
          ) : (
            data?.map((address: any) => (
              <div
                key={address._id}
                className="border border-border-primary rounded-lg p-5 space-y-5"
              >
                <div className="flex items-center gap-x-2.5">
                  <MapPin className="text-text-secondary w-6 h-6" />
                  <h3 className="text-xl font-medium text-text-primary">
                    {address.name}
                  </h3>
                </div>
                <p className="text-base text-text-secondary max-w-[350px]">
                  {`${address.addressLine}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`}
                </p>
                <div className="flex gap-x-2.5 items-center">
                  <button
                    onClick={() => {
                      setEditingAddress(address);
                      setShowModal(true);
                    }}
                    className="flex items-center gap-x-[0.4rem] px-4 py-2 text-base font-medium text-text-primary border border-border-primary rounded-sm"
                  >
                    <Edit className="w-6 h-6" />
                    <span className="hidden md:block">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(address._id)}
                    className="flex items-center gap-x-[0.4rem] px-4 py-2 text-base font-medium text-button-primary border border-danger-border rounded-sm"
                  >
                    <Trash2 className="w-6 h-6" />
                    <span className="hidden md:block">Delete</span>
                  </button>
                  {address.isDefault ? (
                    <div className="flex items-center gap-x-[0.4rem] px-4 py-2 text-base font-medium text-text-secondary rounded-sm">
                      <Check className="w-6 h-6" />
                     <span>Default</span>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleSetDefault(address._id)}
                      className="flex items-center gap-x-[0.4rem] px-4 py-2 text-base font-medium text-text-primary border border-border-primary rounded-sm hover:cursor-pointer"
                    >
                      <span>Set as Default</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <AddressModal
          onClose={() => {
            setShowModal(false);
            refetch();
          }}
          initialData={editingAddress}
        />
      )}
    </>
  );
}