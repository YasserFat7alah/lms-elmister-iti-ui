import React from 'react'
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';


const TotalCard = ({ title, value, change, icon, iconBg }) => {
    return (
        <Card className="p-4 shadow-sm rounded-xl flex items-center justify-between">
          <div>
            <h3 className="text-sm text-gray-500">{title}</h3>
    
            <h2 className="text-3xl font-bold mt-1">{value}</h2>
    
            {change && (
              <p className="text-sm text-green-600 mt-1">
                ↑ {change} vs last week
              </p>
            )}
          </div>
    
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ backgroundColor: iconBg }}
          >
            {icon}
          </div>
        </Card>
    );
}

export default TotalCard