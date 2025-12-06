"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function StatsChart() {

    const data = [
        { name: "Admins", value: 12, lastWeek: 10 },
        { name: "Teachers", value: 54, lastWeek: 47 },
        { name: "Parents", value: 130, lastWeek: 120 },
        { name: "Students", value: 420, lastWeek: 400 },
        { name: "Courses", value: 90, lastWeek: 85 },
        { name: "Active Courses", value: 70, lastWeek: 60 },
        { name: "Archived Courses", value: 20, lastWeek: 25 },
    ];

  return (
    <div className="w-full p-4 md:border-r">
      <div className="mb-7 ">
        <div className="text-lg font-semibold">System Statistics</div>
        <p className="text-sm text-muted-foreground">Last 7 days vs Last Week</p>
      </div>

      <div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                name="This Week"
                fill="#392b80" // Indigo
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="lastWeek"
                name="Last Week"
                fill="#FF0055" // Gray
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
