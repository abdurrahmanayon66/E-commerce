"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  getNotificationPreferences,
  saveNotificationPreferences,
  NotificationPreferences as NotificationPrefsType,
} from "../store/notificationStore";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Toggle = ({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors ${
      enabled ? "bg-button-primary" : "bg-border-primary"
    }`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
        enabled ? "translate-x-5.5" : "translate-x-0.5"
      }`}
    />
  </button>
);

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState<NotificationPrefsType>({
    orderUpdates: true,
    promotions: true,
    newsletter: true,
    wishlistUpdates: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const initialPrefsRef = useRef<NotificationPrefsType | null>(null);

  useEffect(() => {
    const prefs = getNotificationPreferences();
    setPreferences(prefs);
    initialPrefsRef.current = prefs;
  }, []);

  const togglePreference = (key: keyof NotificationPrefsType) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaving(true);
    saveNotificationPreferences(preferences);

    setTimeout(() => {
      setIsSaving(false);
      initialPrefsRef.current = preferences;
      toast.success("Notification preferences saved!");
    }, 2000);
  };

  const hasChanges =
    JSON.stringify(preferences) !== JSON.stringify(initialPrefsRef.current);

  return (
    <div className="bg-white rounded-lg border border-border-primary p-6.5 w-full">
      <h2 className="text-2xl font-medium text-text-primary mb-1">
        Notification Preferences
      </h2>
      <p className="text-base font-normal text-text-secondary mb-5">
        Manage how you receive notifications.
      </p>

      <div className="mb-10">
        {(
          [
            ["Order Updates", "orderUpdates"],
            ["Promotions and deals", "promotions"],
            ["Newsletter", "newsletter"],
            ["Wishlist updates", "wishlistUpdates"],
          ] as [string, keyof NotificationPrefsType][]
        ).map(([label, key]) => (
          <div
            key={key}
            className="flex items-center justify-between h-18 border-b border-border-primary"
          >
            <span className="text-base font-medium text-text-primary">
              {label}
            </span>
            <Toggle
              enabled={preferences[key]}
              onChange={() => togglePreference(key)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving || !hasChanges}
          className="flex items-center min-h-13 text-base justify-center rounded-sm border font-medium text-white bg-button-primary gap-x-1.5 px-5 py-2.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <Loader2 className="animate-spin h-4 w-4" />
              Saving...
            </>
          ) : (
            "Save Preferences"
          )}
        </button>
      </div>
    </div>
  );
};

export default NotificationPreferences;
