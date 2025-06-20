"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import NotificationPreferences from "./NotificationPreferences";
import { useGetCustomerProfile, useUpdateCustomer } from "@/hooks/customerHooks";
import toast from "react-hot-toast";

interface PersonalInfoFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
}

const PersonalInfo = () => {
  const { data: customerData, isLoading, error } = useGetCustomerProfile();
  const { mutate: updateCustomer, isPending: isUpdating } = useUpdateCustomer();

  const [formData, setFormData] = useState<PersonalInfoFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
  });

  const [originalData, setOriginalData] = useState<PersonalInfoFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (customerData) {
      const initialData: PersonalInfoFormData = {
        firstName: customerData.firstName || "",
        lastName: customerData.lastName || "",
        email: customerData.email || "",
        phone: customerData.phone || "",
        bio: customerData.bio || "",
      };
      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [customerData]);

  const handleInputChange = (field: keyof PersonalInfoFormData, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    setHasChanges(JSON.stringify(updated) !== JSON.stringify(originalData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomer(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
        setOriginalData(formData);
        setIsEditMode(false);
        setHasChanges(false);
      },
      onError: (error) => {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      },
    });
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditMode(false);
    setHasChanges(false);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-border-primary p-6 w-full">
        <p>Loading profile data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-border-primary p-6 w-full">
        <p>Error loading profile: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-border-primary p-6 w-full">
        <h2 className="text-2xl font-medium text-text-primary mb-1">Personal Information</h2>
        <p className="text-text-secondary text-base mb-6.5">
          Update your personal details.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              First name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="w-full px-2.5 py-2.5 min-h-13 border border-border-primary rounded-md focus:outline-none placeholder-text-secondary text-xl font-normal"
              placeholder="Enter first name"
              readOnly={!isEditMode}
              required
            />
          </div>
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              Last name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="w-full px-2.5 py-2.5 min-h-13 border border-border-primary rounded-md focus:outline-none placeholder-text-secondary text-xl font-normal"
              placeholder="Enter last name"
              readOnly={!isEditMode}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-2.5 py-2.5 min-h-13 border border-border-primary rounded-md focus:outline-none placeholder-text-secondary text-xl font-normal"
              placeholder="Enter email"
              readOnly={!isEditMode}
              required
            />
          </div>
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full px-2.5 py-2.5 min-h-13 border border-border-primary rounded-md focus:outline-none placeholder-text-secondary text-xl font-normal"
              placeholder="Enter phone number"
              readOnly={!isEditMode}
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-xl font-medium text-text-primary mb-2.5">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            placeholder="Tell us about yourself"
            rows={4}
            className="w-full p-4 min-h-40 border border-border-primary rounded-md focus:outline-none resize-none placeholder-text-secondary text-base font-normal"
            readOnly={!isEditMode}
          />
        </div>

        <div className="flex justify-between text-base">
          <button
            type="button"
            onClick={handleCancel}
            className={`flex items-center min-h-13 justify-center rounded-sm border font-medium border-border-primary text-text-primary gap-x-1.5 px-5 py-2.5 cursor-pointer ${isEditMode ? "" : "invisible"}`}
          >
            <X className="w-6 h-6" />
            Cancel
          </button>

          <button
            type={isEditMode ? "submit" : "button"}
            onClick={() => !isEditMode && setIsEditMode(true)}
            className="flex items-center min-h-13 justify-center rounded-sm border font-medium text-white bg-button-primary gap-x-1.5 px-5 py-2.5 cursor-pointer"
            disabled={isEditMode && (!hasChanges || isUpdating)}
          >
            {isEditMode ? (isUpdating ? "Saving..." : "Save Changes") : "Edit Informattion"}
          </button>
        </div>
      </form>

      <div className="my-14">
        <NotificationPreferences />
      </div>
    </>
  );
};

export default PersonalInfo;
