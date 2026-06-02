import React from 'react';
import { Card } from "@heroui/react";

export const StatCard = ({ title, value, icon: Icon, iconBg = "bg-neutral-800" }) => {
  return (
    <Card className="border border-neutral-800 bg-[#121212] text-white p-4 shadow-md min-h-[140px] flex flex-col justify-between items-start">
      {/* Icon Section */}
      <div className={`p-2.5 rounded-xl flex items-center justify-center text-neutral-300 ${iconBg}`}>
        {Icon && <Icon size={20} className="w-5 h-5" />}
      </div>
      
      {/* Text / Stats Content Section */}
      <Card.Content className="p-0 mt-4 space-y-1 w-full">
        <p className="text-xs font-medium text-neutral-400 tracking-wide">
          {title}
        </p>
        <h3 className="text-2xl font-bold tracking-tight text-neutral-100">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h3>
      </Card.Content>
    </Card>
  );
};