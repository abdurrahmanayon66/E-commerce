import React, { useState } from "react";

const Toggle = ({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
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
  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    wishlistUpdates: true,
  });

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-lg border border-border-primary p-6.5 w-full">
      <h2 className="text-2xl font-medium text-text-primary mb-1">
        Notification Preferences
      </h2>
      <p className="text-base font-normal text-text-secondary mb-5">
        Manage how you receive notifications.
      </p>

      <div className="mb-10">
        <div className="flex items-center justify-between h-18 border-b border-border-primary">
          <span className="text-base font-medium text-text-primary">
            Order Updates
          </span>
          <Toggle
            enabled={preferences.orderUpdates}
            onChange={() => togglePreference("orderUpdates")}
          />
        </div>

        <div className="flex items-center justify-between h-18 border-b border-border-primary">
          <span className="text-base font-medium text-text-primary">
            Promotions and deals
          </span>
          <Toggle
            enabled={preferences.promotions}
            onChange={() => togglePreference("promotions")}
          />
        </div>

        <div className="flex items-center justify-between h-18 border-b border-border-primary">
          <span className="text-base font-medium text-text-primary">
            Newsletter
          </span>
          <Toggle
            enabled={preferences.newsletter}
            onChange={() => togglePreference("newsletter")}
          />
        </div>

        <div className="flex items-center justify-between h-18 border-b border-border-primary">
          <span className="text-base font-medium text-text-primary">
            Wishlist updates
          </span>
          <Toggle
            enabled={preferences.wishlistUpdates}
            onChange={() => togglePreference("wishlistUpdates")}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center min-h-13 text-base justify-center rounded-sm border font-medium text-white bg-button-primary gap-x-1.5 px-5 py-2.5 cursor-pointer">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationPreferences;
