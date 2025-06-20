import React from 'react';
import { CheckCircle, Heart, Truck, Star, Gift } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'order_delivered' | 'wishlist_added' | 'order_shipped' | 'review_posted' | 'coupon_applied';
  title: string;
  description: string;
  timestamp: string;
}

interface ActivityCardProps {
  activities: ActivityItem[];
  className?: string;
}

const getActivityIcon = (type: ActivityItem['type']) => {
  const iconProps = { className: "w-5 h-5" };
  
  switch (type) {
    case 'order_delivered':
      return <CheckCircle {...iconProps} className="w-5 h-5 text-green-600" />;
    case 'wishlist_added':
      return <Heart {...iconProps} className="w-5 h-5 text-pink-500" />;
    case 'order_shipped':
      return <Truck {...iconProps} className="w-5 h-5 text-blue-500" />;
    case 'review_posted':
      return <Star {...iconProps} className="w-5 h-5 text-yellow-500" />;
    case 'coupon_applied':
      return <Gift {...iconProps} className="w-5 h-5 text-purple-400" />;
    default:
      return <CheckCircle {...iconProps} className="w-5 h-5 text-text-secondary" />;
  }
};

const ActivityCard: React.FC<ActivityCardProps> = ({ activities, className = "" }) => {
  return (
    <div className={`bg-white rounded-md border border-border-primary p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-text-primary mb-4">Recent Activity</h2>
      
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-x-2.5 p-3">
            <div className="flex-shrink-0 mt-0.5">
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-text-primary">
                  {activity.title}
                </h3>
                <span className="text-sm text-text-secondary whitespace-nowrap ml-4">
                  {activity.timestamp}
                </span>
              </div>
              <p className="text-sm text-text-secondary mt-2.5">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;