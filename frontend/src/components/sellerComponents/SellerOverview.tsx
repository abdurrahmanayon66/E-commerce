"use client";
import React, { useEffect, useState } from "react";
import SalesAnalyticsCard from "../SalesAnalyticsCard";
import OrderStatus from "../OrderStatus";
import { AlertCircle } from "lucide-react";
import RevenueChart from "../RevenueChart";
import Link from "next/link";
import { useOrderStatusCounts } from "@/hooks/orderHooks";
import useAuthCheck from "@/hooks/useAuthCheck";
import { useRouter } from "next/navigation";

const SellerOverview = () => {
  const { data, isLoading, error } = useOrderStatusCounts();
  const router = useRouter();

  const renderOrderStatus = () => {
    if (isLoading) {
      return (
        <div className="col-span-4 text-sm text-muted-foreground">
          Loading order statuses...
        </div>
      );
    }

    if (error) {
      return (
        <div className="col-span-4 text-sm text-red-500">
          Failed to load order statuses.
        </div>
      );
    }

    return (
      <>
        <OrderStatus status="pending" count={data?.pending || 0} />
        <OrderStatus status="shipped" count={data?.shipped || 0} />
        <OrderStatus status="delivered" count={data?.delivered || 0} />
        <OrderStatus status="cancelled" count={data?.cancelled || 0} />
      </>
    );
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold mb-2">Welcome back, John Doe!</h1>
        <p className="text-lg text-text-primary">
          You've made{" "}
          <span className="text-text-primary text-lg font-bold">$2,450</span>{" "}
          today.
        </p>
      </div>

      <div className="flex flex-wrap md:grid md:grid-cols-3 gap-x-2.5 gap-y-2.5 md:gap-x-5 mt-5">
        <SalesAnalyticsCard
          title="Sales Today"
          currentValue={2450}
          previousValue={2000}
          period="today"
        />
        <SalesAnalyticsCard
          title="Sales This Week"
          currentValue={120}
          previousValue={100}
          period="today"
        />
        <SalesAnalyticsCard
          title="Sales This Month"
          currentValue={10}
          previousValue={8}
          period="today"
        />
      </div>

      <div className="bg-background-primary my-2.5 md:my-10 px-3 py-5 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold mb-2.5">Order Status</h2>
        <div className="grid md:grid-rows-1 md:grid-cols-4 grid-rows-2 grid-cols-2 gap-x-4 gap-y-4 md:gap-x-5">{renderOrderStatus()}</div>
      </div>

      <div className="my-2.5 md:my-10">
        <RevenueChart />
      </div>

      <div className="bg-warning-secondary border justify-between border-[#FCCF9C] pl-2.5 pr-2.5 rounded-lg md:pl-10.5 md:pr-4 py-4 mb-6 md:flex items-center gap-3">
        <div className="flex gap-x-2.5">
          <AlertCircle className="text-[#C77414] w-6 h-6" />
          <div>
            <span className="text-[#C77414]">
              You have 2 products running low.{" "}
            </span>
            <span className="text-[#C77414]">
              Restock now.
            </span>
          </div>
        </div>
      <div className="flex justify-end md:block mt-2.5 md:mt-0">
          <Link href="/seller/products">
          <button className="rounded-lg text-sm lg:text-base hover:cursor-pointer border lg:min-w-31 lg:min-h-10 flex justify-center font-medium items-center border-warning-border text-warning-primary px-4 py-2 bg-white">
            View Products
          </button>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default SellerOverview;
