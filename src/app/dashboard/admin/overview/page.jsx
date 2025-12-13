"use client";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { Shield, } from "lucide-react";
import Linechart from "@/components/DashboardComponents/admin/overviewComponents/LineChart";
import DashboardState from "@/components/DashboardComponents/admin/overviewComponents/DashboardState";
import HeaderAdmin from "@/components/DashboardComponents/admin/HeaderAdmin";

import { useGetDashboardStatsQuery } from "@/redux/api/endPoints/adminApiSlice";
import { Spinner } from "@/components/shared/Loader";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data, isLoading, isError, error } = useGetDashboardStatsQuery();
  const stats = data?.data;

  if (isLoading) return <div className="flex justify-center items-center min-h-screen"><Spinner size={48} /></div>;
  if (isError) return <div className="p-6 text-red-500">Error loading dashboard: {error?.data?.message || error?.error || "Unknown error"}</div>;

  return (
    <div className="space-y-6 p-6 min-h-screen">

      {/* Header Section */}
      <HeaderAdmin title="Admin Control Panel" description=" Manage and monitor your platform" />
      {/* Dashboard State Section */}
      <DashboardState stats={stats} />

      {/* Line Chart Section */}
      <Linechart data={stats?.timeSeries} />
    </div>
  );
}

{/* <p>System Overview and User Management.</p> */ }

{/* <div className="p-10 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-400">
  Admin Stats & Charts will go here
</div> */}

{/* <Button variant="destructive" onClick={() => { dispatch(logout()); router.push("/login"); }}>
  Logout
</Button> */}