"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const CircleChart = () => {

    const data = [
        { name: "Teachers", value: 40, color: "#6366f1" }, 
        { name: "Students", value: 32, color: "#FF0055" }, 
        { name: "Parents", value: 28, color: "#392b80" },  
      ];

    return (
        <div className="w-full p-4 bg-transparent pl-8">
          <div>
            <CardTitle className="text-lg font-semibold">System Members</CardTitle>
            <p className="text-sm text-muted-foreground">Distribution Overview</p>
          </div>
    
          <div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
    
                  <Tooltip
                    content={({ payload }) => {
                      if (!payload || !payload.length) return null;
                      const item = payload[0];
                      return (
                        <div className="bg-white text-black p-2 rounded-lg shadow-lg border">
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs">{item.value}% of members</p>
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
    
            {/* Legend */}
            <div className="flex items-center justify-center gap-8 mt-6">
              {data.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <p className="text-sm">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    
}

export default CircleChart