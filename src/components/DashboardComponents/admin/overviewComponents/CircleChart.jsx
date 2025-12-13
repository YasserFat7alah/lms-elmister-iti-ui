"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const CircleChart = ({ data, title = "System Members", subTitle = "Distribution Overview" }) => {
  const total = data?.reduce((acc, curr) => acc + curr.value, 0) || 1;

  return (
    <div className="w-full p-2 bg-transparent pl-4">
      <div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{subTitle}</p>
      </div>

      <div>
        <div className="h-52 w-full">
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
                  const percent = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
                  return (
                    <div className="bg-white text-black p-2 rounded-lg shadow-lg border">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs">{item.value} ({percent}%)</p>
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