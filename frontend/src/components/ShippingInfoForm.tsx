"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MapPin, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetAddresses } from "@/hooks/addressHooks";

export default function ShippingInfoForm() {
  const { data, isLoading, refetch } = useGetAddresses();
  const { register, watch, setValue } = useFormContext();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  
  const billingAddressSame = watch("billingAddressSame");

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
    setValue("addressId", addressId);
    setValue("addressLine1", "");
    setValue("addressLine2", "");
    setValue("city", "");
    setValue("zipCode", "");
    setValue("country", "");
    setValue("state", "");
  };

  const handleAddressDeselect = () => {
    setSelectedAddress(null);
    setValue("addressId", undefined);
  };

  const isAddressSelected = selectedAddress !== null;

  return (
    <div className="bg-white border border-border-primary rounded-sm p-6.5">
      <h2 className="text-2xl font-medium text-text-primary mb-6.5">
        Shipping Information
      </h2>

      <div className="mb-5">
        <h3 className="text-xl font-medium text-text-primary mb-2.5">
          Saved Addresses
        </h3>

        {isLoading ? (
          <p className="text-base text-text-secondary">Loading addresses...</p>
        ) : Array.isArray(data) && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2.5 gap-y-6.5">
            {data.map((address) => (
              <div
                key={address._id}
                className={`border rounded-sm p-5 cursor-pointer ${
                  selectedAddress === address._id
                    ? "border-button-primary bg-[#FCE9EC]"
                    : "border-border-primary"
                }`}
                onClick={() => selectedAddress === address._id ? handleAddressDeselect() : handleAddressSelect(address._id)}
              >
                <div className="flex items-center gap-x-2.5 mb-2.5 relative">
                  <MapPin className="w-6 h-6 text-text-primary" />
                  <span className="text-text-primary font-medium text-xl">
                    {address?.name}
                  </span>

                  {address.isDefault && (
                    <span className="flex items-center gap-x-1 text-base font-medium text-text-secondary">
                      <Check className="w-6 h-6" />
                      Default
                    </span>
                  )}

                  {selectedAddress === address._id && (
                    <div className="w-5 h-5 border-2 border-button-primary rounded-full flex items-center justify-center absolute right-0">
                      <Check
                        strokeWidth={4}
                        className="text-button-primary w-2.5 h-2.5"
                      />
                    </div>
                  )}
                </div>
                <p className="text-base text-text-secondary font-normal">
                  {`${address.addressLine}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-base text-text-secondary">
            You don't have any saved addresses yet.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
        <div>
          <label className="block text-xl font-medium text-text-primary mb-2.5">
            <span className="flex gap-x-1.5 items-center">
              Full Name <span className="text-button-primary">*</span>
            </span>
          </label>
          <input
            {...register("fullName", { required: true })}
            type="text"
            placeholder="Enter Full Name"
            className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
          />
        </div>
        <div>
          <label className="block text-xl font-medium text-text-primary mb-2.5">
            <span className="flex gap-x-1.5 items-center">
              Phone Number <span className="text-button-primary">*</span>
            </span>
          </label>
          <input
            {...register("phoneNumber", { required: true })}
            type="text"
            placeholder="Enter Phone Number"
            className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-xl font-medium text-text-primary mb-2.5">
          <span className="flex gap-x-1.5 items-center">
            Email <span className="text-button-primary">*</span>
          </span>
        </label>
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Enter Email"
          className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
        />
      </div>

      <div className="mb-5">
        <label className="block text-xl font-medium text-text-primary mb-2.5">
          <span className="flex gap-x-1.5 items-center">
            Address Line 1 {!isAddressSelected && <span className="text-button-primary">*</span>}
          </span>
        </label>
        <input
          {...register("addressLine1", { required: !isAddressSelected })}
          type="text"
          placeholder="Enter Address Line 1"
          className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
        />
      </div>

      <div className="mb-5">
        <label className="block text-xl font-medium text-text-primary mb-2.5">
          Address Line 2 (Optional)
        </label>
        <input
          {...register("addressLine2")}
          type="text"
          placeholder="Enter Address Line 2"
          className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
        <div>
          <label className="block text-xl font-medium text-text-primary mb-2.5">
            <span className="flex gap-x-1.5 items-center">
              City {!isAddressSelected && <span className="text-button-primary">*</span>}
            </span>
          </label>
          <input
            {...register("city", { required: !isAddressSelected })}
            type="text"
            placeholder="Enter City"
            className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
          />
        </div>
        <div>
          <label className="block text-xl font-medium text-text-primary mb-2.5">
            <span className="flex gap-x-1.5 items-center">
              Zip/Postal Code {!isAddressSelected && <span className="text-button-primary">*</span>}
            </span>
          </label>
          <input
            {...register("zipCode", { required: !isAddressSelected })}
            type="text"
            placeholder="Enter Zip/Postal Code"
            className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
        <div>
          <label className="block text-xl font-medium text-text-primary mb-2.5">
            <span className="flex gap-x-1.5 items-center">
              Country {!isAddressSelected && <span className="text-button-primary">*</span>}
            </span>
          </label>
          <input
            {...register("country", { required: !isAddressSelected })}
            type="text"
            placeholder="Enter Country"
            className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
          />
        </div>
        <div>
          <label className="block text-xl font-medium text-text-primary mb-2.5">
            <span className="flex gap-x-1.5 items-center">
              State/Province {!isAddressSelected && <span className="text-button-primary">*</span>}
            </span>
          </label>
          <input
            {...register("state", { required: !isAddressSelected })}
            type="text"
            placeholder="Enter State/Province"
            className="w-full px-2.5 min-h-13 border border-border-primary rounded-sm focus:outline-none text-text-primary text-base font-normal placeholder-text-secondary"
          />
        </div>
      </div>

      <div className="flex items-center gap-x-2.5">
        <Checkbox
          id="billing-same"
          checked={billingAddressSame}
          onCheckedChange={(checked) => setValue("billingAddressSame", !!checked)}
          className="w-5 h-5 border-text-primary hover:cursor-pointer border-3 rounded-[3px] shadow-none data-[state=checked]:border-custom-blue data-[state=checked]:bg-white data-[state=checked]:text-custom-blue [&_svg]:!w-2.5 [&_svg]:!h-2.5 [&_svg]:!stroke-5"
        />
        <label htmlFor="billing-same" className="text-base text-text-primary">
          Billing address is the same as shipping
        </label>
      </div>
    </div>
  );
}