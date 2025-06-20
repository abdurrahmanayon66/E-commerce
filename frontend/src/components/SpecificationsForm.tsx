"use client";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type SpecificationsFormProps = {
  initialData?: {
    brand?: string;
    model?: string;
    storage?: string;
    ram?: string;
    color?: string;
    conditions?: string[];
    features?: string[];
  };
};

const SpecificationsForm = ({ initialData }: SpecificationsFormProps) => {
  const {
    register,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useFormContext();

  const [selectedBrand, setSelectedBrand] = useState(initialData?.brand || "");
  const [selectedModel, setSelectedModel] = useState(initialData?.model || "");
  const [selectedStorage, setSelectedStorage] = useState(initialData?.storage || "");
  const [selectedRAM, setSelectedRAM] = useState(initialData?.ram || "");
  const [selectedColor, setSelectedColor] = useState(initialData?.color || "");
  const [selectedConditions, setSelectedConditions] = useState<string[]>(initialData?.conditions || []);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(initialData?.features || []);

  const [conditions, setConditions] = useState<string[]>([
    "New",
    "Like New",
    "Good",
    "Fair",
    "Poor",
  ]);
  const [features, setFeatures] = useState<string[]>([
    "Water Resistant",
    "Bluetooth",
    "Wi‑Fi",
    "GPS",
    "Touch Screen",
  ]);

  const [showConditionInput, setShowConditionInput] = useState(false);
  const [showFeatureInput, setShowFeatureInput] = useState(false);
  const [newCondition, setNewCondition] = useState("");
  const [newFeature, setNewFeature] = useState("");

  const isInitialized = useRef(false);

  useEffect(() => {
    if (initialData && !isInitialized.current) {
      reset({
        brand: initialData.brand || "",
        model: initialData.model || "",
        storage: initialData.storage || "",
        ram: initialData.ram || "",
        color: initialData.color || "",
        conditions: initialData.conditions || [],
        features: initialData.features || [],
      });

      setSelectedBrand(initialData.brand || "");
      setSelectedModel(initialData.model || "");
      setSelectedStorage(initialData.storage || "");
      setSelectedRAM(initialData.ram || "");
      setSelectedColor(initialData.color || "");
      setSelectedConditions(initialData.conditions || []);
      setSelectedFeatures(initialData.features || []);

      isInitialized.current = true;
    }
  }, [initialData, reset]);

  const toggleCondition = (condition: string) => {
    const newConditions = selectedConditions.includes(condition)
      ? selectedConditions.filter((c) => c !== condition)
      : [...selectedConditions, condition];
    
    setSelectedConditions(newConditions);
    setValue("conditions", newConditions);
  };

  const toggleFeature = (feature: string) => {
    const newFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter((f) => f !== feature)
      : [...selectedFeatures, feature];
    
    setSelectedFeatures(newFeatures);
    setValue("features", newFeatures);
  };

  const addCondition = () => {
    if (newCondition.trim()) {
      const newCond = newCondition.trim();
      setConditions([...conditions, newCond]);
      setSelectedConditions([...selectedConditions, newCond]);
      setValue("conditions", [...selectedConditions, newCond]);
      setNewCondition("");
      setShowConditionInput(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      const newFeat = newFeature.trim();
      setFeatures([...features, newFeat]);
      setSelectedFeatures([...selectedFeatures, newFeat]);
      setValue("features", [...selectedFeatures, newFeat]);
      setNewFeature("");
      setShowFeatureInput(false);
    }
  };

  const cancelCondition = () => {
    setNewCondition("");
    setShowConditionInput(false);
  };

  const cancelFeature = () => {
    setNewFeature("");
    setShowFeatureInput(false);
  };

  const handleSelectChange = (field: string, value: string) => {
    setValue(field, value);
    switch (field) {
      case "brand":
        setSelectedBrand(value);
        break;
      case "model":
        setSelectedModel(value);
        break;
      case "storage":
        setSelectedStorage(value);
        break;
      case "ram":
        setSelectedRAM(value);
        break;
      case "color":
        setSelectedColor(value);
        break;
    }
  };

  return (
    <div className="space-y-6.5 bg-background-primary p-2.5 md:p-6 rounded-lg border border-border-primary">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-medium">Specifications</h2>
        <button
          onClick={() => setShowConditionInput(true)}
          className="flex items-center gap-x-1.5 text-sm md:text-base text-custom-blue hover:cursor-pointer transition-colors"
        >
          <Plus className="w-6 h-6" />
          Add another specification
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block font-medium text-xl mb-2.5">
            Brand <span className="text-danger-primary">*</span>
          </label>
          <Select 
            value={selectedBrand}
            onValueChange={(value) => handleSelectChange("brand", value)}
            defaultValue={initialData?.brand}
          >
            <SelectTrigger
              className={`w-full min-h-13 px-2.5 md:px-5 py-2.5 text-sm md:text-base rounded-md border-border-primary focus:ring-0 [&>svg]:w-6 [&>svg]:h-6 ${
                selectedBrand ? "text-text-primary" : "text-text-secondary"
              }`}
            >
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent className="bg-white border-border-primary text-base">
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="samsung">Samsung</SelectItem>
              <SelectItem value="sony">Sony</SelectItem>
              <SelectItem value="lg">LG</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-rows-1 md:grid-cols-2 grid-rows-2 gap-4">
          <div>
            <label className="block font-medium text-xl mb-2.5">
              Model <span className="text-danger-primary">*</span>
            </label>
            <Select 
              value={selectedModel}
              onValueChange={(value) => handleSelectChange("model", value)}
              defaultValue={initialData?.model}
            >
              <SelectTrigger
                className={`w-full min-h-13 px-2.5 md:px-5 py-2.5 rounded-md border-border-primary focus:ring-0 text-sm md:text-base [&>svg]:w-6 [&>svg]:h-6 ${
                  selectedModel ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent className="bg-white border-border-primary text-sm md:text-base">
                <SelectItem value="iphone14">iPhone 14</SelectItem>
                <SelectItem value="iphone13">iPhone 13</SelectItem>
                <SelectItem value="iphone12">iPhone 12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block font-medium text-xl mb-2.5">
              Storage <span className="text-danger-primary">*</span>
            </label>
            <Select 
              value={selectedStorage}
              onValueChange={(value) => handleSelectChange("storage", value)}
              defaultValue={initialData?.storage}
            >
              <SelectTrigger
                className={`w-full min-h-13 px-2.5 md:px-5 py-2.5 rounded-md border-border-primary focus:ring-0 text-sm md:text-base [&>svg]:w-6 [&>svg]:h-6 ${
                  selectedStorage ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                <SelectValue placeholder="Select storage" />
              </SelectTrigger>
              <SelectContent className="bg-white border-border-primary text-sm md:text-base">
                <SelectItem value="64">64GB</SelectItem>
                <SelectItem value="128">128GB</SelectItem>
                <SelectItem value="256">256GB</SelectItem>
                <SelectItem value="512">512GB</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-rows-1 md:grid-cols-2 grid-rows-2 gap-4">
          <div>
            <label className="block font-medium text-xl mb-2.5">
              RAM <span className="text-danger-primary">*</span>
            </label>
            <Select 
              value={selectedRAM}
              onValueChange={(value) => handleSelectChange("ram", value)}
              defaultValue={initialData?.ram}
            >
              <SelectTrigger
                className={`w-full min-h-13 px-2.5 md:px-5 py-2.5 rounded-md border-border-primary focus:ring-0 text-sm md:text-base [&>svg]:w-6 [&>svg]:h-6 ${
                  selectedRAM ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                <SelectValue placeholder="Select RAM" />
              </SelectTrigger>
              <SelectContent className="bg-white border-border-primary text-sm md:text-base">
                <SelectItem value="4">4GB</SelectItem>
                <SelectItem value="6">6GB</SelectItem>
                <SelectItem value="8">8GB</SelectItem>
                <SelectItem value="12">12GB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block font-medium text-xl mb-2.5">
              Color <span className="text-danger-primary">*</span>
            </label>
            <Select 
              value={selectedColor}
              onValueChange={(value) => handleSelectChange("color", value)}
              defaultValue={initialData?.color}
            >
              <SelectTrigger
                className={`w-full min-h-13 px-2.5 md:px-5 py-2.5 rounded-md border-border-primary focus:ring-0 text-sm md:text-base [&>svg]:w-6 [&>svg]:h-6 ${
                  selectedColor ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent className="bg-white border-border-primary text-sm md:text-base">
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-rows-1 md:grid-cols-2 grid-rows-2 gap-x-8 gap-y-2.5">
          <div>
            <label className="block font-medium text-xl mb-5">
              Condition <span className="text-danger-primary">*</span>
            </label>
            <div className="space-y-4">
              {conditions.map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition}
                    checked={selectedConditions.includes(condition)}
                    onCheckedChange={() => toggleCondition(condition)}
                    className="rounded-full border-text-primary border-2 data-[state=checked]:border-blue-500 data-[state=checked]:bg-white data-[state=checked]:text-blue-500 [&_svg]:!w-2 [&_svg]:!h-2 [&_svg]:!stroke-5"
                  />
                  <label htmlFor={condition} className="text-sm md:text-base">
                    {condition}
                  </label>
                </div>
              ))}
              {!showConditionInput ? (
                <button
                  onClick={() => setShowConditionInput(true)}
                  className="flex items-center gap-1 mt-3 text-sm md:text-base text-blue-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add new condition
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    placeholder="Enter new condition"
                    className="w-48 min-h-13 px-3 py-1.5 border text-sm md:text-base border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    autoFocus
                  />
                  <button
                    onClick={addCondition}
                    className="px-3 py-1.5 text-sm md:text-base text-primary hover:text-primary/80 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={cancelCondition}
                    className="px-3 py-1.5 text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block font-medium text-xl mb-5">
              Features <span className="text-danger-primary">*</span>
            </label>
            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature}
                    checked={selectedFeatures.includes(feature)}
                    onCheckedChange={() => toggleFeature(feature)}
                    className="rounded-full border-text-primary border-2 data-[state=checked]:border-blue-500 data-[state=checked]:bg-white data-[state=checked]:text-blue-500 [&_svg]:!w-2 [&_svg]:!h-2 [&_svg]:!stroke-5"
                  />
                  <label htmlFor={feature} className="text-sm md:text-base">
                    {feature}
                  </label>
                </div>
              ))}
              {!showFeatureInput ? (
                <button
                  onClick={() => setShowFeatureInput(true)}
                  className="flex items-center mt-3 gap-1 text-sm md:text-base text-blue-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add new feature
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Enter new feature"
                    className="w-48 min-h-13 px-3 py-1.5 text-sm md:text-base border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    autoFocus
                  />
                  <button
                    onClick={addFeature}
                    className="px-3 py-1.5 text-sm md:text-base text-primary hover:text-primary/80 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={cancelFeature}
                    className="px-3 py-1.5 text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificationsForm;