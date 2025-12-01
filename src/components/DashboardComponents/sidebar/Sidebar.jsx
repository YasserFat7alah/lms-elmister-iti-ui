"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice"; 
import { useLogoutApiMutation } from "@/redux/api/endPoints/usersApiSlice"; 
// import Image from "next/image";
// import logo from "@/assets/images/logo.png";

import { 
  LayoutDashboard, User, BookOpen, Award, Heart, Star, 
  FileQuestion, ShoppingBag, MessageSquare, LifeBuoy, 
  Settings, LogOut, X, GraduationCap, Users, Megaphone, 
  FileText, ClipboardCheck, Wallet, CreditCard, FileBarChart,
  Baby
} from "lucide-react"; 

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
      { label: "Dashboard", href: "/student/my-learning", icon: LayoutDashboard },
      { label: "Update Profile", href: "/student/profile", icon: User },
      { label: "Enrolled Courses", href: "/student/courses", icon: BookOpen },
      { label: "Assignments", href: "/teacher/assignments", icon: FileText },
      { label: "My Quiz Attempts", href: "/student/quizzes", icon: FileQuestion },
      { label: "Wishlist", href: "/student/wishlist", icon: Heart },
      { label: "My Certificates", href: "/student/certificates", icon: Award },
      { label: "subscription History", href: "/student/orders", icon: ShoppingBag },
    ],

    teacher: [
      { label: "Dashboard", href: "/teacher/analytics", icon: LayoutDashboard },
      { label: "Profile", href: "/teacher/profile", icon: User },
      { label: "Courses", href: "/teacher/courses", icon: BookOpen },
      { label: "Announcements", href: "/teacher/announcements", icon: Megaphone },
      { label: "Assignments", href: "/teacher/assignments", icon: FileText },
      { label: "Students", href: "/teacher/students", icon: Users },
      { label: "Quiz", href: "/teacher/quizzes", icon: FileQuestion },
      { label: "Quiz Results", href: "/teacher/quiz-results", icon: ClipboardCheck },
      { label: "Earnings", href: "/teacher/earnings", icon: Wallet },
      { label: "Payout", href: "/teacher/payout", icon: CreditCard },
      { label: "Messages", href: "/teacher/messages", icon: MessageSquare },
      { label: "Support Tickets", href: "/teacher/support", icon: LifeBuoy },
    ],

    parent: [
      { label: "Overview", href: "/parent", icon: LayoutDashboard },
      { label: "My Children", href: "/parent/children", icon: Baby }, 
      { label: "Progress Reports", href: "/parent/reports", icon: FileBarChart },
      { label: "Teachers", href: "/parent/teachers", icon: Users },
      { label: "Payments", href: "/parent/payments", icon: CreditCard },
      { label: "Messages", href: "/parent/messages", icon: MessageSquare },
    ],

    admin: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Manage Users", href: "/admin/users", icon: Users },
      { label: "Manage Courses", href: "/admin/courses", icon: BookOpen },
      { label: "Financials", href: "/admin/finance", icon: Wallet },
      { label: "Settings", href: "/admin/settings", icon: Settings },
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
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed top-10  left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
          lg:static lg:translate-x-0 
          ${open ? "translate-x-0 w-64 shadow-2xl bg-red-200" : "-translate-x-full lg:w-[260px]"} 
        `}
      >
        <div className="flex h-1 items-center px-6 border-b border-gray-100">
             <button onClick={() => setOpen(false)} className="ml-auto lg:hidden text-gray-400">
               <X size={24} />
             </button>
        </div> 

        <div className="h-[calc(100vh-80px)] overflow-y-scroll px-4 py-14 scrollbar-hide">
            
            <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">Main Menu</h3>
                <nav className="space-y-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
                                    ${isActive 
                                        ? "bg-red-50 text-[#FF0055]" 
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

            <div className="pt-4 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">Settings</h3>
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