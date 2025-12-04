"use client";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import DashboardBanner from "@/components/shared/dashboard/DashboardBanner";
import { MdWavingHand } from "react-icons/md";
import { children } from "@/data/parentData";
import ChildCard from "@/components/dashboardComponents/parent/ChildCard";
import UpcomingSessionsCard from "@/components/dashboardComponents/parent/UpcomingSessions";
import RecentlyAlerts from "@/components/dashboardComponents/parent/RecentlyAlerts";

const page = () => {

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="space-y-4">
      {/* _______WELCOME USER ________ */}
      <p className="flex items-center gap-2 mb-1">
        Welcome 
        <span className="font-semibold">{userInfo?.user?.name}</span> 
        <span className="text-yellow-400"><MdWavingHand/></span> 
      </p>
      <p className="text-sm text-gray-500 ">Here's overview of your children progress.</p>
      
      
      {/* _______BANNER FOR USER INFO___________ */}
      <DashboardBanner />

      {/* ___________MAIN CONTENT__________ */}

      {/* OVERVIEW CARDS */}
      <div className="grid gap-4 md:grid-cols-2 ">
        {children.map(student => (
          <ChildCard key={student.id} student={student} />
        ))}
      </div>

      {/* UPCOMING SESSIONS & RECENTLY ALERTS*/}
      <div className="grid gap-4 md:grid-cols-2">
          <UpcomingSessionsCard />
          <RecentlyAlerts/>
      </div>

      {/* <h1 className="text-2xl font-bold"> Parents Portal</h1>
      <div className="p-6 border rounded-lg bg-yellow-50">
        <h3 className="text-lg font-medium">Children Performance</h3>
      </div> */}

      {/* <Button variant="destructive" onClick={() => { dispatch(logout()); router.push("/login"); }}>
        Logout
      </Button> */}
    </div>
  )
}

export default page