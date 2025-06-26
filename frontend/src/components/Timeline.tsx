import { OrderDetailsResponse } from "@/types/ordertypes";
import { Check } from "lucide-react";

type TimelineStep = {
  label: string;
  value: string;
  done: boolean;
};

type TimelineProps = {
  order: OrderDetailsResponse;
};

export default function Timeline({ order }: TimelineProps) {
  const createdDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const updatedDate = new Date(order.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const isPaid = order.paymentStatus === "paid";
  const isShipped = order.orderStatus === "shipped";
  const isDelivered = order.orderStatus === "delivered";

  const timelineData: TimelineStep[] = [
    {
      label: "Order Placed",
      value: createdDate,
      done: true,
    },
    {
      label: "Payment Confirmed",
      value: isPaid ? updatedDate : "Waiting for payment",
      done: isPaid,
    },
    {
      label: "Processed",
      value: !["pending", "cancelled"].includes(order.orderStatus)
        ? updatedDate
        : "Waiting for processing",
      done: !["pending", "cancelled"].includes(order.orderStatus),
    },
    {
      label: "Shipped",
      value: isShipped || isDelivered ? updatedDate : "Not shipped yet",
      done: isShipped || isDelivered,
    },
    {
      label: "Delivered",
      value: isDelivered ? updatedDate : "Waiting for delivery",
      done: isDelivered,
    },
  ];

  return (
    <div className="bg-white px-3 py-5 lg:px-5 border border-border-primary rounded-lg w-full md:max-w-xs">
      <div className="text-2xl font-semibold mb-5">Timeline</div>

      <div className="relative">
        {timelineData.map((item, idx) => (
          <div key={idx} className="relative flex items-center pb-7 last:pb-0">
            {idx !== timelineData.length - 1 && (
              <div className="absolute left-[11px] top-8 w-[2px] h-12 bg-[#D1D5DB]"></div>
            )}
            <div className="relative z-10 mr-4 -mt-5">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border-[2.5px] ${
                  item.done
                    ? "border-custom-blue text-custom-blue"
                    : "border-[#D1D5DB] text-[#D1D5DB]"
                } bg-white`}
              >
                <Check className="w-[9px] h-[9px]" strokeWidth={4} />
              </div>
            </div>

            <div className="flex-1">
              <div className="text-xl font-medium text-text-primary">
                {item.label}
              </div>
              <div className="text-base text-text-secondary">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
