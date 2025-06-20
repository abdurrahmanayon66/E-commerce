"use client";
import React, { useState, useEffect } from "react";
import OrdersTable from "../OrdersTable";
import OrderProductSearchBar from "../OrderProductSearchBar";
import Tab from "../Tab";
import { useGetAllSellerOrders } from "@/hooks/orderHooks";
import { useOrderFilterStore } from "@/store/orderProductFilterStore";
import { Order } from "@/types/ordertypes";

const Orders = () => {
  const { data, isLoading, isError } = useGetAllSellerOrders();
  const { search, resetFilters } = useOrderFilterStore();
  const [tabValue, setTabValue] = useState<string>("all");

  const tabOptions = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "shipped", label: "Shipped" },
    { value: "cancelled", label: "Cancelled" },
  ];

  useEffect(() => {
    resetFilters();
  }, [resetFilters]);

  const orders = data || [];

  const filteredOrders = orders.filter((order: Order) => {

    const matchesTab = tabValue === "all" || order.status === tabValue;
    
    const matchesSearch = search
      ? order.orderId?.toLowerCase().includes(search.toLowerCase()) ||
        order.customerName?.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchesTab && matchesSearch;
  });

  return (
    <div className="lg:space-y-6 space-y-2.5">
      <div>
        <h1 className="text-3xl font-semibold">Orders</h1>
      </div>

      <div>
        <OrderProductSearchBar type="order" />
      </div>

      <div>
        <Tab
          options={tabOptions}
          value={tabValue}
          onValueChange={setTabValue}
        />
      </div>

      {isLoading ? (
        <div>Loading orders...</div>
      ) : isError ? (
        <div>Error loading orders</div>
      ) : filteredOrders?.length ? (
        <OrdersTable userType="seller" orders={filteredOrders} />
      ) : (
        <div>No orders found</div>
      )}
    </div>
  );
};

export default Orders;