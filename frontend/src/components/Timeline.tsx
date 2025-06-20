import { Check } from "lucide-react";

type TimelineStep = {
  label: string;
  value: string;
  done: boolean;
};

const timelineData: TimelineStep[] = [
  { label: "Order Placed", value: "May 15, 2025", done: true },
  { label: "Payment Confirmed", value: "May 15, 2025", done: true },
  { label: "Processed", value: "Waiting for processing", done: false },
  { label: "Shipped", value: "Not shipped yet", done: false },
  { label: "Delivered", value: "Waiting for delivery", done: false },
];

export default function Timeline() {
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
