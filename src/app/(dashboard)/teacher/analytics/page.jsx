"use client";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function TeacherAnalytics() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold"> Teacher Analytics</h1>
      <p>Welcome, Professor <span className="font-semibold text-primary">{userInfo?.user?.name}</span>.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-blue-50 border-blue-100 border rounded-lg">
            <h3 className="font-bold text-blue-700">Total Students</h3>
            <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-6 bg-green-50 border-green-100 border rounded-lg">
            <h3 className="font-bold text-green-700">Active Courses</h3>
            <p className="text-3xl font-bold">0</p>
        </div>
      </div>

      <Button variant="destructive" onClick={() => { dispatch(logout()); router.push("/login"); }}>
        Temporary Logout
      </Button>
    </div>
  );
}