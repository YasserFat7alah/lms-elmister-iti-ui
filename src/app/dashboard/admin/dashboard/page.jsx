"use client";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import BarChartOverview from "@/components/dashboardComponents/admin/BarChartOverview";
import CircleChart from "@/components/dashboardComponents/admin/CircleChart";
// import BubbleRating from "@/components/dashboardComponents/admin/BubbleRating";
// import MostOrdered from "@/components/dashboardComponents/admin/MostOrdered";
import Linechart from "@/components/dashboardComponents/admin/LineChart";
import DashboardState from "@/components/dashboardComponents/admin/DashboardState";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-red-600"> Admin Control Panel</h1>
      <DashboardState/>
      <div className="flex flex-col md:flex-row border-b">
        <BarChartOverview/>
        <CircleChart/>
      </div>
      <div>
        {/* <BubbleRating/> */}
        {/* <MostOrdered/> */}
        <Linechart/>
      </div>
      {/* <p>System Overview and User Management.</p> */}
      
      {/* <div className="p-10 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-400">
        Admin Stats & Charts will go here
      </div> */}

      {/* <Button variant="destructive" onClick={() => { dispatch(logout()); router.push("/login"); }}>
        Logout
      </Button> */}
    </div>
  );
}