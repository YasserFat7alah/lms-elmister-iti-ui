"use client";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { Shield, } from "lucide-react";
import Linechart from "@/components/dashboardComponents/admin/overviewComponents/LineChart";
import DashboardState from "@/components/dashboardComponents/admin/overviewComponents/DashboardState";
import HeaderAdmin from "@/components/dashboardComponents/admin/HeaderAdmin";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();

   return (
    <div className="space-y-6 p-6 min-h-screen">
      
      {/* Header Section */}
      <HeaderAdmin title="Admin Control Panel" description=" Manage and monitor your platform"/>
      {/* Dashboard State Section */}
      <DashboardState />

      {/* Line Chart Section */}
      <Linechart />
    </div>
  );
}

{/* <p>System Overview and User Management.</p> */}

{/* <div className="p-10 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-400">
  Admin Stats & Charts will go here
</div> */}

{/* <Button variant="destructive" onClick={() => { dispatch(logout()); router.push("/login"); }}>
  Logout
</Button> */}