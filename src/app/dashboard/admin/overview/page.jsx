"use client";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { Shield, } from "lucide-react";
import Linechart from "@/components/dashboardComponents/admin/overviewComponents/LineChart";
import DashboardState from "@/components/dashboardComponents/admin/overviewComponents/DashboardState";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();

   return (
    <div className="space-y-6 p-6 min-h-screen">
      {/* Header Section */}
      <div className="text-[#FF0055] rounded-2xl p-8 bg-white  border">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 b  rounded-xl">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl  font-bold ">
              Admin Control Panel
            </h1>
            <p className=" text-sm mt-1 text-[#392b80] font-semibold">
              Manage and monitor your platform
            </p>
          </div>
        </div>
      </div>

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