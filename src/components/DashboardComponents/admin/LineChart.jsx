"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const Linechart = () => {

    const data = [
    { day: "Mon", newEnrollments: 20, activeUsers: 150 },
    { day: "Tue", newEnrollments: 25, activeUsers: 160 },
    { day: "Wed", newEnrollments: 18, activeUsers: 155 },
    { day: "Thu", newEnrollments: 30, activeUsers: 170 },
    { day: "Fri", newEnrollments: 22, activeUsers: 165 },
    { day: "Sat", newEnrollments: 15, activeUsers: 140 },
    { day: "Sun", newEnrollments: 10, activeUsers: 130 },
  ];

  return (
    <div className="w-full p-4">
      <div className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Weekly Activity</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Students activity and new enrollments this week
          </p>
        </div>
        <button className="text-sm text-blue-600 underline">View Report</button>
      </div>

      <div>
        <h2 className="text-3xl font-bold">
          {data.reduce((acc, item) => acc + item.newEnrollments, 0)}
        </h2>
        <p className="text-sm text-red-500 mb-4">▼ 2.1% vs last week</p>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="newEnrollments"
                name="New Enrollments"
                stroke="#392b80"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="activeUsers"
                name="Active Users"
                stroke="#FF0055"
                strokeWidth={3}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Linechart;
