"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice"; 
import { useLogoutApiMutation } from "@/redux/api/endPoints/usersApiSlice"; 

import { 
  LayoutDashboard, User, BookOpen, Award, Heart, Star, 
  FileQuestion, ShoppingBag, MessageSquare, LifeBuoy, 
  Settings, LogOut, X, GraduationCap, Users, Megaphone, 
  FileText, ClipboardCheck, Wallet, CreditCard, FileBarChart,
  Baby
} from "lucide-react"; 
import Image from "next/image";
import logo from "@/assets/images/logo.png";

const Sidebar = ({ open, setOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApi] = useLogoutApiMutation();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null; 

  const role = userInfo?.user?.role || "student";

const roleLinks = {
    student: [
      { label: "Dashboard", href: "/dashboard/student/my-learning", icon: LayoutDashboard },
      { label: "Update Profile", href: "/dashboard/student/profile", icon: User },
      { label: "Enrolled Courses", href: "/dashboard/student/courses", icon: BookOpen },
      { label: "Assignments", href: "/dashboard/student/assignments", icon: FileText }, // عدلتها عشان تكون متسقة
      { label: "My Quiz Attempts", href: "/dashboard/student/quizzes", icon: FileQuestion },
      { label: "Wishlist", href: "/dashboard/student/wishlist", icon: Heart },
      { label: "My Certificates", href: "/dashboard/student/certificates", icon: Award },
      { label: "Subscription History", href: "/dashboard/student/orders", icon: ShoppingBag },
    ],

    teacher: [
      { label: "Dashboard", href: "/dashboard/teacher/analytics", icon: LayoutDashboard },
      { label: "Profile", href: "/dashboard/teacher/profile", icon: User },
      { label: "Courses", href: "/dashboard/teacher/courses", icon: BookOpen },
      { label: "Announcements", href: "/dashboard/teacher/announcements", icon: Megaphone },
      { label: "Assignments", href: "/dashboard/teacher/assignments", icon: FileText },
      { label: "Students", href: "/dashboard/teacher/students", icon: Users },
      { label: "Quiz", href: "/dashboard/teacher/quizzes", icon: FileQuestion },
      { label: "Quiz Results", href: "/dashboard/teacher/quiz-results", icon: ClipboardCheck },
      { label: "Earnings", href: "/dashboard/teacher/earnings", icon: Wallet },
      { label: "Payout", href: "/dashboard/teacher/payout", icon: CreditCard },
      { label: "Messages", href: "/dashboard/teacher/messages", icon: MessageSquare },
      { label: "Support Tickets", href: "/dashboard/teacher/support", icon: LifeBuoy },
    ],

    parent: [
      { label: "Overview", href: "/dashboard/parent", icon: LayoutDashboard },
      { label: "My Children", href: "/dashboard/parent/children", icon: Baby }, 
      { label: "Progress Reports", href: "/dashboard/parent/reports", icon: FileBarChart },
      { label: "Teachers", href: "/dashboard/parent/teachers", icon: Users },
      { label: "Payments", href: "/dashboard/parent/payments", icon: CreditCard },
      { label: "Messages", href: "/dashboard/parent/messages", icon: MessageSquare },
    ],

    admin: [
      { label: "Dashboard", href: "/dashboard/admin/dashboard", icon: LayoutDashboard },
      { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
      { label: "Manage Courses", href: "/dashboard/admin/courses", icon: BookOpen },
      { label: "Financials", href: "/dashboard/admin/finance", icon: Wallet },
      { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ],
  };
  const links = roleLinks[role] || roleLinks["student"];

  const handleLogout = async () => {
    try { await logoutApi().unwrap(); } catch (err) {}
    dispatch(logout());
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar Container */}
      <aside
<<<<<<< HEAD
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 
          transform transition-transform duration-300 ease-in-out flex flex-col
=======
        className={`fixed top-10  left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
>>>>>>> origin/phase2/coursespublic
          lg:static lg:translate-x-0 
          ${open ? "translate-x-0 shadow-2xl" : "-translate-x-full"} 
        `}
      >
        {/* Header / Logo Area */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-gray-100 shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src={logo} 
              alt="El-Mister Logo" 
              className="h-10 w-auto"
              priority
            />
          </Link>
          <button 
            onClick={() => setOpen(false)} 
            className="lg:hidden text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div> 

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-none hover:scrollbar-thin scrollbar-thumb-gray-200">
            
            {/* Main Menu */}
            <div className="mb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
                  Main Menu
                </h3>
                <nav className="space-y-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setOpen(false)} // Close sidebar on mobile when clicking link
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                    ${isActive 
                                        ? "bg-[#FF0055]/10 text-[#FF0055]" 
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }
                                `}
                            >
                                <Icon size={19} className={isActive ? "text-[#FF0055]" : "text-gray-400 group-hover:text-gray-600"} />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Settings & Logout Section */}
            <div className="pt-4 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
                  System
                </h3>
                <nav className="space-y-1">
                    <Link
                        href="/settings"
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                           ${pathname === '/settings' 
                             ? "bg-[#FF0055]/10 text-[#FF0055]" 
                             : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                           }
                        `}
                    >
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-[#FF0055] transition-colors group mt-1"
                    >
                        <LogOut size={19} className="text-gray-400 group-hover:text-[#FF0055] transition-colors" />
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