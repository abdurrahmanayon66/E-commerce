import React from 'react';

interface SalesAnalyticsCardProps {
  title: string;
  currentValue: number;
  previousValue: number;
  period: string;
  currency?: string;
}

const SalesAnalyticsCard: React.FC<SalesAnalyticsCardProps> = ({
  title,
  currentValue,
  previousValue,
  period,
  currency = '$'
}) => {
  const calculatePercentageChange = () => {
    if (previousValue === 0) return 0;
    return ((currentValue - previousValue) / previousValue) * 100;
  };

  const percentageChange = calculatePercentageChange();
  const isPositive = percentageChange >= 0;

  const formatCurrency = (value: number) => {
    return `${currency}${value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="bg-white flex rounded-lg border border-border-primary p-2.5 md:p-5 h-full shadow-xs">
      <div className="flex flex-col gap-y-1">
        <p className="text-sm text-text-secondary font-medium">
          {title}
        </p>
        
        <h3 className="text-xl md:text-2xl font-bold text-text-primary font-roboto">
         ${currentValue.toLocaleString()} 
        </h3>

        <div className={`text-sm font-medium ${
          isPositive ? 'text-[#0ACC58]' : 'text-button-primary'
        }`}>
          {isPositive ? '+' : '-'}{Math.abs(percentageChange).toFixed(1)}% from {period}
        </div>
      </div>
    </div>
  );
};

export default SalesAnalyticsCard; 