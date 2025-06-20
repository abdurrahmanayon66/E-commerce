"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import GeneralInformationForm from "./GeneralInformationForm";
import SpecificationsForm from "./SpecificationsForm";
import PricingInventoryForm from "./PricingInventoryForm";
import AdditionalInformationForm from "./AdditionalInformationForm";
import { Checkbox } from "./ui/checkbox";
import { ProductFormData } from "@/types/productTypes";
import { useSingleProduct } from "@/hooks/productHooks";
import apiClient from "@/lib/apiClient";
import toast from "react-hot-toast";

const EditProductForm = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params?.productId as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [negotiable, setNegotiable] = useState(false);

  const { data: productData, isLoading, error } = useSingleProduct(productId);

  const methods = useForm<ProductFormData>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      productImages: [],
      brand: "",
      model: "",
      storage: "",
      ram: "",
      color: "",
      conditions: [],
      features: [],
      price: "",
      salePrice: "",
      quantity: "",
      sku: "",
      tags: "",
      seoTitle: "",
      seoDescription: "",
      specifications: [],
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const transformProductData = useCallback((data: any) => {
    return {
      title: data.title || "",
      description: data.description || "",
      category: data.category || "",
      productImages: [],
      brand: data.brand || "",
      model: data.model || "",
      storage: data.storage || "",
      ram: data.ram || "",
      color: data.colour || data.color || "",
      conditions: data.conditions || [],
      features: data.features || [],
      price: data.price?.toString() || "",
      salePrice: data.salePrice?.toString() || "",
      quantity: data.quantity?.toString() || "",
      sku: data.sku || "",
      tags: Array.isArray(data.tags) ? data.tags.join(", ") : data.tags || "",
      seoTitle: data.seoTitle || "",
      seoDescription: data.seoDescription || "",
      specifications: data.specifications || [],
    };
  }, []);

  useEffect(() => {
    if (productData && !isLoading) {
      const formData = transformProductData(productData);
      reset(formData);
      setNegotiable(productData.negotiable || false);
    }
  }, [productData, isLoading, reset, transformProductData]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);

      const patchData = {
        ...data,
        negotiable,
        productId,
        price: parseFloat(data.price),
        salePrice: data.salePrice ? parseFloat(data.salePrice) : undefined,
        quantity: parseInt(data.quantity),
        tags: data.tags
          ? data.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag)
          : [],
      };

      console.log("Data to patch:", patchData);

      const response = await apiClient.patch(`/api/products/update-product`, patchData);

      if (response.data.success) {
        toast.success("Product updated successfully!");
        router.push("/seller/products");
      } else {
        throw new Error(response.data.message || "Failed to update product");
      }
    } catch (error: unknown) {
      console.error("Error updating product:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update product. Please try again.");
        setIsSubmitting(false);
      }
    }
  };

  const discardChanges = useCallback(() => {
    if (
      confirm(
        "Are you sure you want to discard your changes? All unsaved changes will be lost."
      )
    ) {
      if (productData) {
        const originalData = transformProductData(productData);
        reset(originalData);
        setNegotiable(productData.negotiable || false);
      }
    }
  }, [productData, reset, transformProductData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading product data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">
          Error loading product: {error.message}
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Product not found</div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <div className="lg:pl-5 lg:pr-14 md:pr-8 pl-4 pr-4 pb-50">
          <div className="flex items-center gap-x-2">
            <button
              type="button"
              onClick={() => router.push("/seller/products")}
              className="rounded-sm transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-semibold">Edit Product Details</h1>
          </div>

          <h2 className="text-lg text-text-secondary ml-7 mt-3 mb-6">
            Edit the details of your product
          </h2>

          <div className="space-y-8">
            <GeneralInformationForm
              initialData={{
                title: productData.title,
                description: productData.description,
                category: productData.category,
                productImages: [],
              }}
            />

            <SpecificationsForm
              initialData={{
                brand: productData.brand,
                model: productData.model,
                storage: productData.storage,
                ram: productData.ram,
                color: productData.colour || productData.color,
                conditions: productData.conditions,
                features: productData.features,
              }}
            />

            <PricingInventoryForm
              initialData={{
                price: parseFloat(productData.price),
                salePrice: productData.salePrice
                  ? parseFloat(productData.salePrice)
                  : undefined,
                quantity: parseInt(productData.quantity),
                sku: productData.sku,
              }}
            />

            <div className="flex items-center bg-white p-6 gap-x-2.5 border border-border-primary rounded-lg">
              <Checkbox
                id="negotiation"
                checked={negotiable}
                onCheckedChange={(checked) => {
                  if (typeof checked === "boolean") {
                    setNegotiable(checked);
                  }
                }}
                className="rounded-[3px] border-2 border-text-primary data-[state=checked]:border-blue-500 data-[state=checked]:bg-white data-[state=checked]:text-blue-500 [&_svg]:!w-3 [&_svg]:!h-3 [&_svg]:!stroke-5"
              />
              <label htmlFor="negotiation" className="text-xl">
                Enable Negotiation
              </label>
            </div>

            <div className="space-y-6 bg-background-primary p-6 rounded-lg border border-border-primary">
              <AdditionalInformationForm
                initialData={{
                  tags: Array.isArray(productData.tags)
                    ? productData.tags.join(", ")
                    : productData.tags,
                  seoTitle: productData.seoTitle,
                  seoDescription: productData.seoDescription,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center md:pl-4 md:pr-8 pl-4 pr-4 lg:pl-5 lg:pr-14 bg-white border-t border-border-primary h-29 absolute bottom-0 w-full">
          <button
            type="button"
            onClick={discardChanges}
            disabled={isSubmitting}
            className="flex items-center gap-x-1.5 px-4 py-2 hover:bg-background-hover rounded-sm text-danger-primary border border-[#f5cdd5] text-base cursor-pointer disabled:opacity-50"
          >
            <Trash2 className="w-5 h-5" />
            <span className="font-medium hidden md:block">Discard</span>
          </button>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-[10px] bg-button-primary text-white rounded-sm cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Send for Review"}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditProductForm;
