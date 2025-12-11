import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const TotalCard = ({ title, value, change, icon, iconBg, lightBg }) => {
  return (
    <Card className="relative overflow-hidden group hover:shadow-sm transition-all duration-300 border border-gray-100 hover:border-gray-200 bg-white">
      {/* Subtle gradient background overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300"
        style={{ background: lightBg }}
      />

      <div className="relative p-5 flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mb-2 group-hover:scale-105 transition-transform duration-300">
            {value}
          </h2>

          {change && (
            <div className="flex items-center gap-1.5 bg-linear-to-r from-green-50 to-emerald-50 px-2.5 py-1 rounded-full w-fit border border-green-100">
              <TrendingUp className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs font-semibold text-green-600">
                {change} vs last week
              </span>
            </div>
          )}
        </div>

        <div className="relative">
          {/* Glow effect behind icon */}
          <div
            className="absolute inset-0 rounded-2xl  group-hover:opacity-60 transition-opacity duration-300"
            style={{ background: lightBg }}
          />

          {/* Icon container */}
          <div
            className="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
            style={{ background: iconBg }}
          >
            {icon}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
        style={{ background: iconBg }}
      />
    </Card>
  );
};

export default TotalCard;