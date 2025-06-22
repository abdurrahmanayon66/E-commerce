"use client";
import React from "react";
import { Download } from "lucide-react";
import { useGetPaymentTransactions } from "@/hooks/orderHooks";

export default function PaymentTransactions() {
  const { data, isLoading, isError } = useGetPaymentTransactions();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="w-full p-6.5 bg-white rounded-lg border border-border-primary">
      <div className="mb-6.5">
        <h2 className="text-2xl font-medium text-text-primary mb-2">
          Payment Transactions
        </h2>
        <p className="text-base text-text-secondary">
          Track your payments and download receipts. All transactions are
          securely processed via XYZ gateway.
        </p>
      </div>

      <div className="space-y-2.5">
        {data?.payments
          .slice() 
          .reverse() 
          .map((payment) => (
            <div
              key={payment._id}
              className="border border-border-primary rounded-lg p-5"
            >
              <div className="flex justify-between items-stretch">
                <div className="flex-1 space-y-2.5">
                  <div>
                    <h3 className="text-base font-medium text-text-primary mb-1">
                      {payment.productTitle || "Untitled Product"}
                    </h3>
                    <p className="text-base text-text-secondary">
                      Transaction ID: {payment?.transactionId || "N/A"}
                    </p>
                  </div>
                  <div>
                    <div className="font-medium text-base text-text-primary">
                      ${payment.price?.toFixed(2) || "0.00"}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {new Date(payment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      payment?.paymentStatus === "paid"
                        ? "bg-success-secondary text-success-primary"
                        : payment?.paymentStatus === "pending"
                        ? "bg-warning-secondary text-warning-primary"
                        : "bg-danger-secondary text-danger-primary"
                    }`}
                  >
                    {payment?.paymentStatus}
                  </span>

                  <div className="h-full flex items-end">
                    {payment?.paymentStatus === "paid" ? (
                      <button className="flex items-center md:min-h-13 gap-x-2.5 justify-center text-base font-medium text-text-primary border border-border-primary px-3 py-1.5 rounded-sm cursor-pointer">
                        <Download className="w-6 h-6" />
                        <span className="hidden md:block">Download Receipt</span>
                      </button>
                    ) : (
                      <button className="flex items-center md:min-h-13 gap-x-2.5 justify-center text-base font-medium text-text-secondary border border-border-primary px-3 py-1.5 rounded-sm cursor-not-allowed opacity-50">
                        <Download className="w-6 h-6" />
                        <span className="hidden md:block">Download Receipt</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
