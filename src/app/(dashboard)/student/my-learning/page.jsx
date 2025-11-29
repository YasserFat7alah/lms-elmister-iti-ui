"use client";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useLogoutApiMutation } from "@/redux/api/endPoints/usersApiSlice"; // لو عندك API logout

export default function StudentDashboard() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutApi] = useLogoutApiMutation(); // اختياري لو الباك اند محتاج logout

  const handleLogout = async () => {
    try {
        await logoutApi().unwrap(); // بلغ الباك اند
    } catch (e) {
        console.log("Logout error", e);
    }
    dispatch(logout()); // نظف الفرونت
    router.push("/login");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">🎓 My Learning Dashboard</h1>
      <p>Welcome back, <span className="font-semibold text-primary">{userInfo?.user?.name}</span>!</p>
      
      <div className="p-6 border rounded-lg bg-white shadow-sm">
        <h3 className="text-lg font-medium">Enrolled Courses</h3>
        <p className="text-muted-foreground mt-2">No courses yet. Start learning today!</p>
      </div>

      <Button variant="destructive" onClick={handleLogout}>
        Temporary Logout
      </Button>
    </div>
  );
}