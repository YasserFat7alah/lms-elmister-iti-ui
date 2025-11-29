"use client";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-red-600">🛡️ Admin Control Panel</h1>
      <p>System Overview and User Management.</p>
      
      <div className="p-10 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-400">
        Admin Stats & Charts will go here
      </div>

      <Button variant="destructive" onClick={() => { dispatch(logout()); router.push("/login"); }}>
        Logout
      </Button>
    </div>
  );
}