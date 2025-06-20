import { OrderDetailsResponse } from "@/types/ordertypes";
import Image from "next/image";
import React from "react";

const ProductDetailsCard = ({
  order,
  orderId,
}: {
  order: OrderDetailsResponse;
  orderId: string;
}) => {
  return (
    <div className="flex gap-x-5 border bg-white border-border-primary rounded-md p-5 w-max max-w-full">
      <div className="md:max-w-29.5 md:max-h-29.5 max-w-11.5 max-h-11.5 rounded-sm overflow-hidden">
        <Image
          src={
            order?.product?.firstImageBase64
              ? `data:image/jpeg;base64,${order.product.firstImageBase64}`
              : "https://via.placeholder.com/200"
          }
          alt={order?.product?.title}
          width={118}
          height={118}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center mb-7 justify-between gap-x-10">
          <h2 className="text-xl font-medium">{order?.product?.title}</h2>
          <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-success-secondary text-success-primary">
            {order?.product?.stockStatus}
          </span>
        </div>
        <div className="flex gap-x-4 lg:gap-x-10">
          {[
            { label: "Order ID", value: orderId },
            {
              label: "Date",
              value: new Date(order?.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }),
            },
            { label: "Quantity", value: order?.product?.quantity },
            { label: "Condition", value: order?.product?.condition },
          ].map((item) => (
            <div className="flex flex-col gap-y-1.5" key={item.label}>
              <span className="text-text-secondary text-base">
                {item.label}
              </span>
              <span className="text-text-primary text-lg lg:text-xl">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
