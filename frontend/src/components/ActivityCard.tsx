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
import { formatActivityDate } from '@/lib/dateHelper';
import { toTitleCase } from '@/lib/titleFormatHelper';

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
