"use client";
import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface AdditionalInformationFormProps {
  initialData?: {
    tags?: string;
    seoTitle?: string;
    seoDescription?: string;
  };
}

const AdditionalInformationForm = ({
  initialData,
}: AdditionalInformationFormProps) => {
  const {
    register,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useFormContext();

  const watchedTags = watch("tags", "");
  const seoTitleValue = watch("seoTitle", initialData?.seoTitle || "");
  const seoDescriptionValue = watch(
    "seoDescription",
    initialData?.seoDescription || ""
  );

  const [existingTags, setExistingTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState("");

  const isInitialized = useRef(false);

  useEffect(() => {
    if (initialData && !isInitialized.current) {
      const splitTags = initialData.tags
        ? initialData.tags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t.length > 0)
        : [];

      setExistingTags(splitTags);

      reset({
        tags: initialData.tags || "",
        seoTitle: initialData.seoTitle || "",
        seoDescription: initialData.seoDescription || "",
      });

      isInitialized.current = true;
    }
  }, [initialData, reset]);

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = newTagInput.trim();
      if (tag && !existingTags.includes(tag)) {
        const updatedTags = [...existingTags, tag];
        setExistingTags(updatedTags);
        setValue("tags", updatedTags.join(","));
        setNewTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = existingTags.filter((t) => t !== tagToRemove);
    setExistingTags(updatedTags);
    setValue("tags", updatedTags.join(","));
  };

  return (
    <div className="space-y-6.5">
      <h2 className="text-2xl font-medium">Additional Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-xl font-medium mb-2.5">Tags</label>
          <div className="flex flex-wrap gap-2 my-2.5">
            {existingTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center bg-[#f5f5f5] text-primary px-3 py-1 rounded-full text-sm"
              >
                {tag}
                <X
                  size={16}
                  className="ml-1 cursor-pointer"
                  onClick={() => removeTag(tag)}
                />
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="e.g. smartphone, android, 5G (separate with commas or press Enter)"
            value={newTagInput}
            onChange={(e) => setNewTagInput(e.target.value)}
            onKeyDown={addTag}
            className="w-full px-2.5 md:px-5 py-2.5 min-h-13 text-sm md:text-base border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <input type="hidden" {...register("tags")} />
          <p className="mt-2.5 text-text-secondary text-sm md:text-base">
            Tags help buyers find your product when searching
          </p>
        </div>

        <div>
          <label className="block text-xl font-medium mb-2.5">SEO Title</label>
          <input
            type="text"
            placeholder="Custom titles for search engines"
            value={seoTitleValue}
            onChange={(e) => setValue("seoTitle", e.target.value)}
            className="w-full px-2.5 md:px-5 py-2.5 min-h-13 text-sm md:text-base border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-xl font-medium mb-2.5">
            SEO Description
          </label>
          <textarea
            placeholder="Custom description for search engines"
            rows={3}
            value={seoDescriptionValue}
            onChange={(e) => setValue("seoDescription", e.target.value)}
            className="w-full min-h-[160px] px-2.5 md:px-5 py-2.5 text-sm md:text-base border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformationForm;
