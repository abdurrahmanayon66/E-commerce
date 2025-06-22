"use client";
import React from "react";
import { Package, Heart, Truck, Gift, LucideIcon } from "lucide-react";
import CustomerOverviewCard from "../CustomerOverviewCard";
import ActivityCard from "../ActivityCard";
import {
  useCustomerStats,
  useGetCustomerActivities,
  useGetCustomerProfile,
} from "@/hooks/customerHooks";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

type CardData = {
  title: string;
  value: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
};

const formatCustomDate = (timestamp: number) => {
  const date = dayjs(timestamp);
  if (date.isToday()) {
    return `Today, ${date.format("h:mm A")}`;
  } else if (date.isYesterday()) {
    return `Yesterday, ${date.format("h:mm A")}`;
  } else {
    return date.format("MMM D, h:mm A");
  }
};

const CustomerOverview = () => {
  const statsQuery = useCustomerStats();
  const profileQuery = useGetCustomerProfile();
  const activityQuery = useGetCustomerActivities();

  const { data: stats, isLoading: statsLoading } = statsQuery;
  const { data: customerData } = profileQuery;
  const { data: activities, isLoading: activityLoading, isError: activityError } = activityQuery;

  const cardData: CardData[] = [
    {
      title: "Total Orders",
      value: statsLoading ? "..." : String(stats?.totalOrders ?? 0),
      icon: Package,
      iconBgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Wishlist Items",
      value: statsLoading ? "..." : String(stats?.totalWishlistItems ?? 0),
      icon: Heart,
      iconBgColor: "bg-pink-50",
      iconColor: "text-pink-600",
    },
    {
      title: "Pending Deliveries",
      value: statsLoading ? "..." : String(stats?.pendingOrders ?? 0),
      icon: Truck,
      iconBgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Active Coupons",
      value: "5",
      icon: Gift,
      iconBgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  const latestUpdate = Math.max(
    statsQuery.dataUpdatedAt,
    profileQuery.dataUpdatedAt,
    activityQuery.dataUpdatedAt
  );

  const formattedUpdateTime = formatCustomDate(latestUpdate);

  return (
    <div>
      <div>
        <h1 className="text-5xl font-semibold mb-5">
          Hi, {customerData?.firstName} 👋
        </h1>
        <h3 className="text-base text-right text-text-secondary mb-5">
          Last updated: {formattedUpdateTime}
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2.5 gap-y-2.5">
        {cardData.map((card, index) => (
          <CustomerOverviewCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            iconBgColor={card.iconBgColor}
            iconColor={card.iconColor}
          />
        ))}
      </div>

      {activityLoading ? (
        <p className="text-text-secondary text-sm">Loading recent activity...</p>
      ) : activityError ? (
        <p className="text-red-500 text-sm">Failed to load recent activities.</p>
      ) : (
        <div className="lg:mt-10 md:mt-5 mt-2.5">
          <ActivityCard activities={activities?.activities ?? []} />
        </div>
      )}
    </div>
  );
};

export default CustomerOverview;
