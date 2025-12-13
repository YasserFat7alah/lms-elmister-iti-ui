"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { TrendingUp, Users, BookOpen } from "lucide-react";

const AcademicLineChart = ({ data = [] }) => {

  const totalStudents = data.reduce((acc, item) => acc + (item.students || 0), 0);
  const totalCourses = data.reduce((acc, item) => acc + (item.courses || 0), 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-xl shadow-2xl border border-gray-100">
          <p className="text-sm font-semibold text-gray-800 mb-2">{payload[0].payload.name}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600">{entry.name}:</span>
              <span className="font-semibold text-gray-900">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-none border-0 bg-transparent h-full">

      <div className="flex items-center justify-between mb-4 pl-4 pr-2">
        <span className="text-sm font-semibold text-gray-600">
          Courses & Students Overview
        </span>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-xs text-gray-500">New Students: <span className="font-bold text-gray-800">{totalStudents}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span className="text-xs text-gray-500">New Courses: <span className="font-bold text-gray-800">{totalCourses}</span></span>
          </div>
        </div>
      </div>

      <CardContent className="p-0">

        {/* Chart */}
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCourses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                tickLine={false}
                axisLine={false}
                style={{ fontSize: "10px", fontWeight: "500" }}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#9ca3af"
                tickLine={false}
                axisLine={false}
                style={{ fontSize: "10px", fontWeight: "500" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                iconType="circle"
                verticalAlign="top"
                height={36}
                formatter={(value) => <span className="text-xs font-medium text-gray-600 ml-1">{value}</span>}
              />
              <Line
                type="monotone"
                dataKey="students"
                name="Students"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
                fill="url(#colorStudents)"
              />
              <Line
                type="monotone"
                dataKey="courses"
                name="Courses"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
                fill="url(#colorCourses)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicLineChart;