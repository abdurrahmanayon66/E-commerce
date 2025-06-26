"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import GeneralInformationForm from "./GeneralInformationForm";
import SpecificationsForm from "./SpecificationsForm";
import PricingInventoryForm from "./PricingInventoryForm";
import AdditionalInformationForm from "./AdditionalInformationForm";
import { Checkbox } from "./ui/checkbox";
import { ProductFormData } from "@/types/productTypes";
import toast from "react-hot-toast";

const AddProductForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [negotiable, setNegotiable] = useState(false);

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

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
       toast.error("You are not authorized! Please login to continue");
        return;
      }

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("brand", data.brand);
      formData.append("model", data.model);
      formData.append("storage", data.storage);
      formData.append("colour", data.color);
      formData.append("ram", data.ram);
      formData.append("price", data.price);
      formData.append("quantity", data.quantity);
      formData.append("negotiable", negotiable.toString());

      if (data.salePrice) formData.append("salePrice", data.salePrice);
      if (data.sku) formData.append("sku", data.sku);
      if (data.seoTitle) formData.append("seoTitle", data.seoTitle);
      if (data.seoDescription)
        formData.append("seoDescription", data.seoDescription);

      formData.append("conditions", JSON.stringify(data.conditions));
      formData.append("features", JSON.stringify(data.features));

      if (data.tags) {
        const tagsArray = data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag);
        formData.append("tags", JSON.stringify(tagsArray));
      }

      if (data.specifications && data.specifications.length > 0) {
        formData.append("specifications", JSON.stringify(data.specifications));
      }

      if (data.productImages && data.productImages.length > 0) {
        for (let i = 0; i < data.productImages.length; i++) {
          formData.append("productImages", data.productImages[i]);
        }
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/create`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Product created successfully!");
        router.push("/seller/products");
      } else {
        throw new Error(result.error || "Failed to create product");
      }
    } catch (error: unknown) {
      console.error("Error creating product:", error);
      if (error instanceof Error) {
        toast.error(error.message);
        setIsSubmitting(false);
      } else {
        toast.error("Failed to create product. Please try again.");
        setIsSubmitting(false);
      }
    }
  };

  const saveDraft = async () => {
    toast.error("Sorry, this feature is not available yet.");
  };

  const discardProduct = () => {
    if (
      confirm(
        "Are you sure you want to discard this product? All unsaved changes will be lost."
      )
    ) {
      localStorage.removeItem("productDraft");
      reset();
    }
  };

  useEffect(() => {
    const draft = localStorage.getItem("productDraft");
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        methods.reset(parsedDraft);
        setNegotiable(parsedDraft.negotiable || false);
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
  }, [methods]);

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
            <h1 className="text-3xl font-semibold">Add New Product</h1>
          </div>

          <h2 className="text-lg text-text-secondary ml-7 mt-3 mb-6">
            Fill in the details to list your product for sale
          </h2>

          <div className="space-y-8">
            <GeneralInformationForm />
            <SpecificationsForm />
            <PricingInventoryForm />

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

            <div className="space-y-6 bg-background-primary p-2.5 md:p-6 rounded-lg border border-border-primary">
              <AdditionalInformationForm />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center md:pr-8 pl-4 pr-4 lg:pl-5 lg:pr-14 bg-white border-t border-border-primary h-16 md:h-29 absolute bottom-0 w-full">
          <button
            type="button"
            onClick={discardProduct}
            disabled={isSubmitting}
            className="flex items-center gap-x-1.5 px-2 py-1 md:px-4 md:py-2 text-sm md:text-base hover:bg-background-hover rounded-sm text-danger-primary border border-[#f5cdd5] cursor-pointer disabled:opacity-50"
          >
            <Trash2 className="w-5 h-5" />
            <span className="font-medium hidden md:block">Discard</span>
          </button>

          <div className="flex gap-x-1">
            <button
              type="button"
              onClick={saveDraft}
              disabled={isSubmitting}
              className="md:px-5 md:py-2.5 px-2 py-1 bg-button-secondary text-sm md:text-base text-text-primary rounded-sm border border-border-primary mr-2 cursor-pointer"
            >
              Save Draft
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="md:px-5 md:py-2.5 px-2 py-1 bg-button-primary text-sm md:text-base text-white rounded-sm cursor-pointer"
            >
              {isSubmitting ? "Sending..." : "Send for Review"}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddProductForm;
