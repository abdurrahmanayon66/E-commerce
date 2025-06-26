
export type NotificationPreferences = {
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
  wishlistUpdates: boolean;
};

const STORAGE_KEY = "notificationPreferences";

const defaultPreferences: NotificationPreferences = {
  orderUpdates: true,
  promotions: true,
  newsletter: true,
  wishlistUpdates: true,
};


export const getNotificationPreferences = (): NotificationPreferences => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultPreferences;
  } catch {
    return defaultPreferences;
  }
};


export const saveNotificationPreferences = (prefs: NotificationPreferences): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.error("Failed to save notification preferences", e);
  }
};
