"use client";
import { useEffect } from "react";
import { useOrderFilterStore } from "@/store/orderProductFilterStore";
import OrderProductSearchBar from "./OrderProductSearchBar";
import OrdersTable from "./OrdersTable";
import { useGetAllOrders } from "@/hooks/orderHooks";

const MyOrders = () => {
  const { data, isLoading, isError } = useGetAllOrders();
  const { search, status, resetFilters } = useOrderFilterStore();

  useEffect(() => {
    resetFilters();
  }, [resetFilters]);

  const filteredOrders = data?.orders?.filter((order) => {
    const matchesSearch = search
      ? order.orderId?.toLowerCase().includes(search.toLowerCase()) ||
        order.customerName?.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchesStatus = status ? order.status === status : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="mb-10 space-y-1">
        <h1 className="text-3xl font-semibold text-text-primary">My Orders</h1>
        <h3 className="text-base text-text-secondary">
          View and manage your order history.
        </h3>
      </div>

      <div className="mb-10">
        <OrderProductSearchBar type="customer" />
      </div>

      {isLoading ? (
        <div>Loading orders...</div>
      ) : isError ? (
        <div>Error loading orders</div>
      ) : filteredOrders?.length ? (
        <OrdersTable userType="customer" orders={filteredOrders} />
      ) : (
        <div>No orders found</div>
      )}
    </div>
  );
};

export default MyOrders;
