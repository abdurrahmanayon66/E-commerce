import React from "react";
import { formatActivityDate } from "@/lib/dateHelper";
import { Notification } from "@/types/notificationTypes"; 
import { toTitleCase } from "@/lib/titleFormatHelper";

interface NotificationContainerProps {
  notifications: Notification[];
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({ notifications }) => {

  return (
    <div className="w-md bg-white border border-border-primary shadow-md rounded-md p-4 z-50">
      <h3 className="text-base font-semibold text-text-primary mb-3">Notifications</h3>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`p-3 border border-border-primary rounded-md ${
                notification.isNew ? "bg-info-secondary border-info-primary" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-text-primary line-clamp-1">
                  {toTitleCase(notification?.activityType)}
                </span>
                <span className="text-xs text-text-secondary whitespace-nowrap">
                  {formatActivityDate(notification.createdAt)}
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                {notification.activityStatus}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center text-sm text-gray-500">
            No notifications found.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationContainer;
