"use client";
import React,{useEffect, useRef} from "react";
import { useFormContext } from "react-hook-form";

interface PricingInventoryFormProps {
  initialData?: {
    price?: number;
    salePrice?: number;
    quantity?: number;
    sku?: string;
  };
}

const PricingInventoryForm = ({ initialData }: PricingInventoryFormProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const watchedPrice = watch("price", "");
  const watchedSalePrice = watch("salePrice", "");
  const watchedQuantity = watch("quantity", "");
  const watchedSku = watch("sku", "");

  const isInitialized = useRef(false);

  useEffect(() => {
    if (initialData && !isInitialized.current) {
      // Set individual field values instead of using reset
      if (initialData.price !== undefined) setValue("price", initialData.price.toString());
      if (initialData.salePrice !== undefined) setValue("salePrice", initialData.salePrice.toString());
      if (initialData.quantity !== undefined) setValue("quantity", initialData.quantity.toString());
      if (initialData.sku !== undefined) setValue("sku", initialData.sku);
      
      isInitialized.current = true;
    }
  }, [initialData, setValue]);

  return (
    <div className="space-y-6.5 bg-background-primary p-2.5 md:p-6 rounded-lg border border-border-primary">
      <h2 className="text-2xl font-medium">Pricing & Inventory</h2>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xl font-medium mb-2.5">
              Price ($) <span className="text-danger-primary">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("price", { 
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" }
              })}
              className="w-full px-2.5 md:px-5 py-2.5 min-h-13 text-sm md:text-base border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.price && (
              <p className="text-danger-primary text-sm mt-1">
                {errors.price.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xl font-medium mb-2.5">
              Sale Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("salePrice", {
                validate: (value) => 
                  !value || parseFloat(value) <= parseFloat(watchedPrice) || 
                  "Sale price must be less than regular price"
              })}
              className="w-full px-2.5 md:px-5 py-2.5 min-h-13 text-sm md:text-base border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.salePrice && (
              <p className="text-danger-primary text-sm mt-1">
                {errors.salePrice.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xl font-medium mb-2.5">
              Quantity <span className="text-danger-primary">*</span>
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              {...register("quantity", { 
                required: "Quantity is required",
                min: { value: 0, message: "Quantity must be positive" }
              })}
              className="w-full px-2.5 md:px-5 py-2.5 min-h-13 text-sm md:text-base border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.quantity && (
              <p className="text-danger-primary text-sm mt-1">
                {errors.quantity.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xl font-medium mb-2.5">
              SKU
            </label>
            <input
              type="text"
              placeholder="Enter SKU"
              {...register("sku")}
              className="w-full px-2.5 md:px-5 py-2.5 min-h-13 text-sm md:text-base border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingInventoryForm;