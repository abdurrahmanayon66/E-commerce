import React from "react";
import { useFormContext } from "react-hook-form";
import { Banknote, LockKeyhole } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface PaymentMethodProps {
  selectedPayment: string;
  setSelectedPayment: (value: string) => void;
}

export default function PaymentMethod({
  selectedPayment,
  setSelectedPayment,
}: PaymentMethodProps) {
  const { setValue } = useFormContext();

  const handleSelectGateway = () => {
    setSelectedPayment("gateway");
    setValue("paymentMethod", "gateway");
  };

  const handleSelectCOD = () => {
    setSelectedPayment("cod");
    setValue("paymentMethod", "cod");
  };

  return (
    <div className="bg-white border border-border-primary p-6.5 rounded-sm">
      <h2 className="text-2xl font-medium text-text-primary mb-6.5">
        Payment Method
      </h2>
      <div>
        <div className="border border-button-primary p-5 bg-[#FCE9EC] rounded-sm">
          <div className="flex items-start gap-x-2.5">
            <LockKeyhole className="text-text-primary w-6 h-6" />
            <div className="flex-1 gap-y-1.5">
              <p className="text-xl font-medium text-text-primary">
                You will be redirected to XYZ gateway, to complete your
                transaction.
              </p>
              <p className="text-base text-text-secondary">
                XYZ gateway supports all major payment methods including
                credit/debit cards, mobile banking, and digital wallets.
              </p>
            </div>
          </div>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-x-2.5">
            <Checkbox
              checked={selectedPayment === "gateway"}
              onCheckedChange={() => handleSelectGateway()}
              className="border-text-primary w-[15px] h-[15px] border-2 rounded-[3px] shadow-none data-[state=checked]:border-custom-blue data-[state=checked]:bg-white data-[state=checked]:text-custom-blue [&_svg]:!w-2.5 [&_svg]:!h-2.5 [&_svg]:!stroke-5"
            />
            <p className="text-base text-text-primary">
              I understand I will complete my payment via a secure external
              gateway (SSLCommerz).
            </p>
          </div>
        </div>

        <div
          className="border border-border-primary p-5 rounded-sm cursor-pointer"
          onClick={handleSelectCOD}
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-x-2.5 items-center">
              <Checkbox
                checked={selectedPayment === "cod"}
                onCheckedChange={() => handleSelectCOD()}
                className="border-text-secondary border-2 rounded-full w-5 h-5 shadow-none data-[state=checked]:border-custom-blue data-[state=checked]:bg-white data-[state=checked]:text-custom-blue [&_svg]:!w-2.5 [&_svg]:!h-2.5 [&_svg]:!stroke-5"
              />
              <p className="font-medium text-xl text-text-primary">
                Cash On Delivery
              </p>
            </div>

            <div className="border px-3 py-0.5 border-border-primary rounded-sm">
              <Banknote className="text-green-600 w-6 h-6" />
            </div>
          </div>
          <p className="text-base text-text-secondary mt-2.5">
            Payment collected upon delivery
          </p>
        </div>
      </div>
    </div>
  );
}