import React from 'react';
import {
  CheckCircle,
  Heart,
  Truck,
  Star,
  Gift,
  ShoppingCart,
  XCircle,
  HeartOff,
} from 'lucide-react';
import { Activity } from '@/types/activityTypes'; 

interface ActivityCardProps {
  activities: Activity[];
  className?: string;
}

const getActivityIcon = (type: Activity['activityStatus']) => {
  const iconProps = { className: "w-5 h-5" };

  switch (type) {
    case 'order delivered':
      return <CheckCircle {...iconProps} className="text-green-600" />;
    case 'added to wishlist':
      return <Heart {...iconProps} className="text-pink-500" />;
    case 'removed from wishlist':
      return <HeartOff {...iconProps} className="text-pink-500" />;
    case 'order shipped':
      return <Truck {...iconProps} className="text-blue-500" />;
    case 'review posted':
      return <Star {...iconProps} className="text-yellow-500" />;
    case 'coupon applied':
      return <Gift {...iconProps} className="text-purple-400" />;
    case 'order added':
      return <ShoppingCart {...iconProps} className="text-blue-500" />;
    case 'order cancelled':
      return <XCircle {...iconProps} className="text-red-500" />;
    default:
      return <CheckCircle {...iconProps} className="text-yellow-500" />;
  }
};

const ActivityCard: React.FC<ActivityCardProps> = ({ activities, className = "" }) => {
  console.log("Activities:", activities);
  const toTitleCase = (str: string) => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const formatActivityDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  if (isToday) {
    return `Today, ${date.toLocaleTimeString([], timeOptions)}`;
  }

  if (isYesterday) {
    return `Yesterday, ${date.toLocaleTimeString([], timeOptions)}`;
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleDateString(undefined, dateOptions); 
};

  return (
    <div className={`bg-white rounded-md border border-border-primary p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-text-primary mb-4">Recent Activity</h2>

      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity._id} className="flex items-start gap-x-2.5 p-3">
            <div className="flex-shrink-0 mt-0.5">
              {getActivityIcon(activity.activityType)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-text-primary">
                  {toTitleCase(activity?.activityType)}
                </h3>
                <span className="text-sm text-text-secondary whitespace-nowrap ml-4">
                 {formatActivityDate(activity?.createdAt)}

                </span>
              </div>
              <p className="text-sm text-text-secondary mt-2.5">
                {activity?.activityStatus}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
