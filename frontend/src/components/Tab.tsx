import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type TabOption = {
  value: string;
  label: string;
};

type TabProps = {
  options: TabOption[];
  value: string;
  onValueChange: (value: string) => void;
};

const Tab = ({ options, value, onValueChange }: TabProps) => {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList className={cn("w-full !p-1.5 !h-15 border border-border-primary bg-[#eff3f6] rounded-lg")}>
        {options.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className={cn(
              "w-full text-sm md:text-lg !px-5 !py-2.5 !h-12 transition-all data-[state=active]:shadow-none",
              value === option.value
                ? "bg-white text-text-primary font-medium border border-border-primary rounded-lg"
                : "text-text-secondary font-normal border-0 rounded-none"
            )}
          >
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default Tab;
