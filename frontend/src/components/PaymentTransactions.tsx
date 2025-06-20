import React from "react";
import { Download } from "lucide-react";

export default function PaymentTransactions() {
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
        <div className="border border-border-primary rounded-lg p-5">
          <div className="flex justify-between items-stretch">
            <div className="flex-1 space-y-2.5">
              <div>
                <h3 className="text-base font-medium text-text-primary mb-1">
                  Wireless Noise-Cancelling Headphones
                </h3>
                <p className="text-base text-text-secondary">
                  Transaction ID: TXN-4532219
                </p>
              </div>
              <div>
                <div className="font-medium text-base text-text-primary">
                  $249.99
                </div>
                <div className="text-sm text-text-secondary">May 26, 2025</div>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <span className="px-3 py-1 bg-success-secondary text-success-primary text-sm font-medium rounded-full">
                Paid
              </span>
              <div className="h-full flex items-end">
                <button className="flex items-center md:min-h-13 gap-x-2.5 justify-center text-base font-medium text-text-primary border border-border-primary px-3 py-1.5 rounded-sm cursor-pointer">
                  <Download className="w-6 h-6" />
                  <span className="hidden md:block">Download Receipt</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-border-primary rounded-lg p-5">
          <div className="flex justify-between items-stretch">
            <div className="flex-1 space-y-2.5">
              <div>
                <h3 className="text-base font-medium text-text-primary mb-1">
                  Wireless Noise-Cancelling Headphones
                </h3>
                <p className="text-base text-text-secondary">
                  Transaction ID: TXN-4532219
                </p>
              </div>
              <div>
                <div className="font-medium text-base text-text-primary">
                  $249.99
                </div>
                <div className="text-sm text-text-secondary">May 26, 2025</div>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <span className="px-3 py-1 bg-warning-secondary text-warning-primary text-sm font-medium rounded-full">
                Pending
              </span>
              <div className="h-full flex items-end">
                <button className="flex items-center md:min-h-13 gap-x-2.5 justify-center text-base font-medium text-text-secondary border border-border-primary px-3 py-1.5 rounded-sm cursor-not-allowed opacity-50">
                  <Download className="w-6 h-6" />
                  <span className="hidden md:block">Download Receipt</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-border-primary rounded-lg p-5">
          <div className="flex justify-between items-stretch">
            <div className="flex-1 space-y-2.5">
              <div>
                <h3 className="text-base font-medium text-text-primary mb-1">
                  Wireless Noise-Cancelling Headphones
                </h3>
                <p className="text-base text-text-secondary">
                  Transaction ID: TXN-4532219
                </p>
              </div>
              <div>
                <div className="font-medium text-base text-text-primary">
                  $249.99
                </div>
                <div className="text-sm text-text-secondary">May 26, 2025</div>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <span className="px-3 py-1 bg-danger-secondary text-danger-primary text-sm font-medium rounded-full">
                Failed
              </span>
              <div className="h-full flex items-end">
                <button className="flex items-center md:min-h-13 gap-x-2.5 justify-center text-base font-medium text-text-dark-grey border border-border-primary px-3 py-1.5 rounded-sm cursor-not-allowed opacity-50">
                  <Download className="w-6 h-6" />
                  <span className="hidden md:block">Download Receipt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
