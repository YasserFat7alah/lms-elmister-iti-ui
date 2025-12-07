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
import { TrendingDown, TrendingUp, Users, UserPlus } from "lucide-react";

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

  const totalEnrollments = data.reduce((acc, item) => acc + item.newEnrollments, 0);
  const avgActiveUsers = Math.round(data.reduce((acc, item) => acc + item.activeUsers, 0) / data.length);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-xl shadow-2xl border border-gray-100">
          <p className="text-sm font-semibold text-gray-800 mb-2">{payload[0].payload.day}</p>
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
    <Card className="shadow-xl rounded-2xl bg-gradient-to-br from-white to-gray-50/50 border border-gray-100/50 overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-[#FF0055]/5 to-indigo-500/5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Weekly Activity
              <span className="text-lg">📊</span>
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Student activity and new enrollments this week
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-[#FF0055]/10 to-[#FF0055]/5 p-4 rounded-xl border border-[#FF0055]/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-[#FF0055]/20 rounded-lg">
                <UserPlus className="w-4 h-4 text-[#FF0055]" />
              </div>
              <p className="text-xs font-medium text-gray-600">New Enrollments</p>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{totalEnrollments}</h3>
            <div className="flex items-center gap-1 mt-2">
              <TrendingDown className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-500">2.1% vs last week</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 p-4 rounded-xl border border-indigo-500/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Users className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-xs font-medium text-gray-600">Avg Active Users</p>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{avgActiveUsers}</h3>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-500">5.3% vs last week</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-80 bg-white rounded-xl p-4 border border-gray-100">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorEnrollments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF0055" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#FF0055" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorActiveUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e5e7eb" 
                vertical={false}
              />
              <XAxis
                dataKey="day"
                stroke="#9ca3af"
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
                style={{ fontSize: "12px", fontWeight: "500" }}
              />
              <YAxis
                stroke="#9ca3af"
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
                style={{ fontSize: "12px", fontWeight: "500" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: "20px" }}
                iconType="circle"
                formatter={(value) => <span className="text-sm font-medium text-gray-700">{value}</span>}
              />
              <Line
                type="monotone"
                dataKey="newEnrollments"
                name="New Enrollments"
                stroke="#FF0055"
                strokeWidth={3}
                dot={{ 
                  r: 5, 
                  fill: "#FF0055", 
                  strokeWidth: 2, 
                  stroke: "#fff" 
                }}
                activeDot={{ 
                  r: 7, 
                  fill: "#FF0055",
                  strokeWidth: 3,
                  stroke: "#fff"
                }}
                fill="url(#colorEnrollments)"
              />
              <Line
                type="monotone"
                dataKey="activeUsers"
                name="Active Users"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ 
                  r: 5, 
                  fill: "#6366f1", 
                  strokeWidth: 2, 
                  stroke: "#fff" 
                }}
                activeDot={{ 
                  r: 7, 
                  fill: "#6366f1",
                  strokeWidth: 3,
                  stroke: "#fff"
                }}
                fill="url(#colorActiveUsers)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default Linechart;