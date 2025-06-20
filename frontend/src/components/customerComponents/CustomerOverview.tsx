"use client";
import React from "react";
import { Package, Heart, Truck, Gift, LucideIcon } from "lucide-react";
import CustomerOverviewCard from "../CustomerOverviewCard";
import ActivityCard from "../ActivityCard";
import { useCustomerStats, useGetCustomerProfile } from "@/hooks/customerHooks";

type Activity = {
  id: string;
  type: "order_delivered" | "wishlist_added" | "order_shipped" | "review_posted" | "coupon_applied";
  title: string;
  description: string;
  timestamp: string;
};

type CardData = {
  title: string;
  value: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
};

const CustomerOverview = () => {
  const { data: stats, isLoading } = useCustomerStats();
   const { data: customerData, isLoading: customerLoading, error: customerError } = useGetCustomerProfile();

  const cardData: CardData[] = [
    {
      title: "Total Orders",
      value: isLoading ? "..." : String(stats?.totalOrders ?? 0),
      icon: Package,
      iconBgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Wishlist Items",
      value: isLoading ? "..." : String(stats?.totalWishlistItems ?? 0),
      icon: Heart,
      iconBgColor: "bg-pink-50",
      iconColor: "text-pink-600",
    },
    {
      title: "Pending Deliveries",
      value: isLoading ? "..." : String(stats?.pendingOrders ?? 0),
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

  const sampleActivities: Activity[] = [
    {
      id: "1",
      type: "order_delivered",
      title: "Order Delivered",
      description: "Your order #ORD-7895 has been delivered",
      timestamp: "Today, 9:45 AM",
    },
    {
      id: "2",
      type: "wishlist_added",
      title: "Added to Wishlist",
      description: "You added 'Wireless Headphones' to your wishlist",
      timestamp: "Yesterday, 4:30 PM",
    },
    {
      id: "3",
      type: "order_shipped",
      title: "Order Shipped",
      description: "Your order #ORD-7891 has been shipped",
      timestamp: "Yesterday, 11:20 AM",
    },
    {
      id: "4",
      type: "review_posted",
      title: "Review Posted",
      description: "You posted a review for 'Smart Watch'",
      timestamp: "May 20, 2023",
    },
    {
      id: "5",
      type: "coupon_applied",
      title: "Coupon Applied",
      description: "You used coupon 'SUMMER20' on your purchase",
      timestamp: "May 18, 2023",
    },
  ];

  return (
    <div>
      <div>
        <h1 className="text-5xl font-semibold mb-5">Hi, {customerData?.firstName}{" "}👋</h1>
        <h3 className="text-base text-right text-text-secondary mb-5">
          Last updated: Today, 10:30 AM
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

      <div className="lg:mt-10 md:mt-5 mt-2.5">
        <ActivityCard activities={sampleActivities} />
      </div>
    </div>
  );
};

export default CustomerOverview;
