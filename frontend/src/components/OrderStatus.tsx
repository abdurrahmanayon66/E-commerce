import React from "react";

interface OrderStatusProps {
  status: "pending" | "shipped" | "delivered" | "cancelled";
  count: number;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ status, count }) => {
  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "bg-[#F89118]";
      case "shipped":
        return "bg-info-primary";
      case "delivered":
        return "bg-success-primary";
      case "cancelled":
        return "bg-danger-primary";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="flex items-start border border-border-primary p-2.5 rounded-lg">
      <div className="flex flex-col gap-y-2.5">
        <div className="flex items-center gap-x-2.5">
          <span className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
          <span className="text-base font-normal text-text-primary">
            {getStatusText()}
          </span>
        </div>
        <span className="text-xl font-semibold text-text-primary ml-6.5">
          {count}
        </span>
      </div>
    </div>
  );
};

export default OrderStatus;
