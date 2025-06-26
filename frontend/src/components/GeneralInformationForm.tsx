"use client";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Trash2, Upload,ImagePlus } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface GeneralInformationFormProps {
  initialData?: {
    title?: string;
    description?: string;
    category?: string;
    productImages?: File[];
    productImageStrings?: string[];
  };
}

const GeneralInformationForm = ({
  initialData,
}: GeneralInformationFormProps) => {
  const {
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useFormContext();

  const isInitialized = useRef(false);
  const [selectedCategory, setSelectedCategory] = useState(
    initialData?.category || ""
  );

  const [existingImages, setExistingImages] = useState<string[]>(
    initialData?.productImageStrings || []
  );

  const watchedTitle = watch("title");
  const watchedDescription = watch("description");
  const watchedCategory = watch("category");
  const watchedImages = watch("productImages") || [];

  const totalImages = existingImages.length + watchedImages.length;
  const hasImages = totalImages > 0;

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(
      (file) =>
        file.type.startsWith("image/") &&
        file.size <= 5 * 1024 * 1024 &&
        totalImages + files.length <= 4
    );
    setValue("productImages", [...watchedImages, ...validFiles]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter(
        (file) =>
          file.type.startsWith("image/") &&
          file.size <= 5 * 1024 * 1024 &&
          totalImages + files.length <= 4
      );
      setValue("productImages", [...watchedImages, ...validFiles]);
    }
  };

  const removeNewImage = (index: number) => {
    const newImages = watchedImages.filter(
      (file: File, i: number) => i !== index
    );
    setValue("productImages", newImages);
  };

  const removeExistingImage = (index: number) => {
    const updatedExistingImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(updatedExistingImages);
    setValue("productImageStrings", updatedExistingImages);
  };

  useEffect(() => {
    if (initialData && !isInitialized.current) {
      reset({
        title: initialData.title || "",
        description: initialData.description || "",
        category: initialData.category || "",
        productImages: initialData.productImages || [],
        productImageStrings: initialData.productImageStrings || [],
      });
      setSelectedCategory(initialData.category || "");
      setExistingImages(initialData.productImageStrings || []);
      isInitialized.current = true;
    }
  }, [initialData, reset]);

  useEffect(() => {
    setValue("productImageStrings", existingImages);
  }, [existingImages, setValue]);

  return (
    <div className="space-y-6.5 bg-background-primary p-6 rounded-lg border border-border-primary">
      <h2 className="text-2xl font-medium">General Information</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium text-xl mb-2.5">
            Product Title <span className="text-danger-primary">*</span>
          </label>
          <input
            {...register("title", { required: "Product title is required" })}
            type="text"
            id="title"
            className="w-full min-h-13 px-5 py-2.5 border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary ztext-base"
            placeholder="Enter product title"
          />
          {errors.title && (
            <p className="text-danger-primary text-sm mt-1">
              {errors.title.message as string}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block font-medium text-xl mb-2.5"
          >
            Description <span className="text-danger-primary">*</span>
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            id="description"
            rows={4}
            className="w-full px-5 py-2.5 border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none text-base"
            placeholder="Enter product description"
          />
          {errors.description && (
            <p className="text-danger-primary text-sm mt-1">
              {errors.description.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium text-xl mb-2.5">
            Product Images <span className="text-danger-primary">*</span>
          </label>
          
         
          {!hasImages && (
            <div
              className="border-2 border-dashed min-h-[280px] border-border-primary rounded-md px-5 py-2.5 text-center flex flex-col justify-center items-center gap-y-5"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleImageDrop}
            >
              <Upload className="w-9 h-9 text-text-primary" strokeWidth={1} />
              <div className="text-xl font-medium text-text-primary">
                Drag & drop product images
              </div>
              <div className="text-base text-text-secondary">
                or click to browse files (PNG, JPG, WEBP up to 5MB each)
              </div>
              <div className="text-sm text-text-secondary"></div>
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={totalImages >= 4}
              />
              <button
                type="button"
                onClick={() => document.getElementById("images")?.click()}
                disabled={totalImages >= 4}
                className="px-5 py-2.5 text-text-primary border font-medium border-border-primary text-base rounded-sm hover:cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Select Files
              </button>
            </div>
          )}

        
          {hasImages && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {existingImages.map((imageBase64: string, index: number) => (
                <div key={`existing-${index}`} className="relative group">
                  <Image
                    width={220}
                    height={220}
                    src={`data:image/jpeg;base64,${imageBase64}`}
                    alt={`Existing ${index + 1}`}
                    className="w-full h-45 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-1 right-1 text-danger-primary p-1 rounded-sm"
                  >
                    <Trash2 className="w-6 h-6 cursor-pointer" />
                  </button>
                </div>
              ))}

              {watchedImages.map((image: File, index: number) => (
                <div key={`new-${index}`} className="relative group">
                  <Image
                    width={220}
                    height={220}
                    src={URL.createObjectURL(image)}
                    alt={`New ${index + 1}`}
                    className="w-full h-45 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute top-1 right-1 text-danger-primary p-1 rounded-sm"
                  >
                    <Trash2 className="w-6 h-6 cursor-pointer" />
                  </button>
                </div>
              ))}

              {totalImages < 4 && (
                <div className="relative">
                  <div 
                    className="w-full h-45 border-2 border-dashed bg-[#F5F5F5] border-border-primary rounded-md flex flex-col justify-center items-center gap-2 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => document.getElementById("images-grid")?.click()}
                  >
                    <ImagePlus className="w-7.5 h-7.5 text-text-secondary" strokeWidth={2} />
                    <span className="text-base font-medium text-text-secondary">Add Image</span>
                  </div>
                  <input
                    type="file"
                    id="images-grid"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              )}
            </div>
          )}

          <p className="mt-2.5 text-base text-text-secondary">
            Upload up to 4 images. First image will be used as the product
            thumbnail.
          </p>
        </div>

        <div>
          <label className="block font-medium text-xl mb-2.5">
            Category <span className="text-danger-primary">*</span>
          </label>
          <Select
            value={selectedCategory}
            onValueChange={(value) => {
              setValue("category", value);
              setSelectedCategory(value);
            }}
          >
            <SelectTrigger
              className={`w-full min-h-13 px-5 py-2.5 [&>svg]:w-6 [&>svg]:h-6 rounded-md border-border-primary focus:outline-none focus:ring-0 text-base ${
                watchedCategory ? "text-text-primary" : "text-text-secondary"
              }`}
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white border-border-primary text-base">
              <SelectItem value="electronics" className="text-base">
                Electronics
              </SelectItem>
              <SelectItem value="clothing" className="text-base">
                Clothing
              </SelectItem>
              <SelectItem value="books" className="text-base">
                Books
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-danger-primary text-sm mt-1">
              {errors.category.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralInformationForm;