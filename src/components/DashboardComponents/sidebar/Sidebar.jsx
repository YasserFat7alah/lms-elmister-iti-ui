"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice"; 
import { useLogoutApiMutation } from "@/redux/api/endPoints/usersApiSlice"; 

// استيراد أيقونات مشابهة للصورة من Lucide
import { 
  LayoutDashboard, User, BookOpen, Award, Heart, Star, 
  FileQuestion, ShoppingBag, Share2, MessageSquare, 
  LifeBuoy, Settings, LogOut, X, GraduationCap 
} from "lucide-react"; 

const Sidebar = ({ open, setOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApi] = useLogoutApiMutation();

  // --- Hydration Fix ---
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null; 
  // ---------------------

  const role = userInfo?.user?.role || "student";

  // تعريف القوائم (حاولت أحط نفس ترتيب الصورة)
  const commonLinks = [
     { label: "Dashboard", href: "/student/my-learning", icon: LayoutDashboard }, // أو المسار حسب الرول
     { label: "My Profile", href: "/student/profile", icon: User },
     { label: "Enrolled Courses", href: "/student/courses", icon: BookOpen },
     { label: "My Certificates", href: "/student/certificates", icon: Award },
     { label: "Wishlist", href: "/student/wishlist", icon: Heart },
     { label: "Reviews", href: "/student/reviews", icon: Star },
     { label: "My Quiz Attempts", href: "/student/quizzes", icon: FileQuestion },
     { label: "Order History", href: "/student/orders", icon: ShoppingBag },
  ];

  // ممكن تغير اللينكات دي حسب الرول لو حابب، بس دي اللي في الصورة
  const links = commonLinks; 

  const handleLogout = async () => {
    try { await logoutApi().unwrap(); } catch (err) {}
    dispatch(logout());
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
          lg:static lg:translate-x-0 
          ${open ? "translate-x-0 w-64 shadow-2xl" : "-translate-x-full lg:w-[260px]"} 
        `}
      >
        {/* Header / Logo */}
        <div className="flex h-20 items-center px-6 border-b border-gray-100">
             <GraduationCap className="text-[#FF0055] w-8 h-8 mr-2" />
             <span className="font-bold text-xl text-gray-800">El-Mister</span>
             <button onClick={() => setOpen(false)} className="ml-auto lg:hidden text-gray-400">
               <X size={24} />
             </button>
        </div>

        {/* Scrollable Content */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto px-4 py-6">
            
            {/* --- Main Menu Section --- */}
            <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-800 mb-4 px-3">Main Menu</h3>
                <nav className="space-y-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
                                    ${isActive 
                                        ? "bg-red-50 text-[#FF0055]" // اللون الأحمر النشط زي الصورة
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    }
                                `}
                            >
                                <Icon size={18} />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* --- Account Settings Section --- */}
            <div>
                <h3 className="text-sm font-bold text-gray-800 mb-4 px-3">Account Settings</h3>
                <nav className="space-y-1">
                    <Link
                        href="/settings"
                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    >
                        <Settings size={18} />
                        <span>Settings</span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-[#FF0055] transition-colors"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </nav>
            </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;