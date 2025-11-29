"use client";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function ParentDashboard() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold"> Parents Portal</h1>
      <p>Tracking progress for: <span className="font-semibold">{userInfo?.user?.name}</span>'s children.</p>
      
      <div className="p-6 border rounded-lg bg-yellow-50">
        <h3 className="text-lg font-medium">Children Performance</h3>
        <p className="text-sm mt-2">Connect your children accounts to see updates.</p>
      </div>

      <Button variant="destructive" onClick={() => { dispatch(logout()); router.push("/login"); }}>
        Logout
      </Button>
    </div>
  );
}