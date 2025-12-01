"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, User, BookOpen, Award, Heart, Star, 
  FileQuestion, ShoppingBag, MessageSquare, LifeBuoy, 
  Settings, LogOut, X, GraduationCap, Users, Megaphone, 
  FileText, ClipboardCheck, Wallet, CreditCard, FileBarChart,
  Baby, Certificates
} from "lucide-react"; 

const TeacherSidebar = ({ open, setOpen }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  const teacherLinks = [
    { label: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
    { label: "My Profile", href: "/teacher/profile", icon: User },
    { label: "Courses", href: "/teacher/courses", icon: BookOpen },
    { label: "Announcements", href: "/teacher/announcements", icon: Megaphone },
    { label: "Assignments", href: "/teacher/assignments", icon: FileText },
    { label: "Students", href: "/teacher/students", icon: Users },
    { label: "Quiz", href: "/teacher/quiz", icon: FileQuestion },
    { label: "Quiz Results", href: "/teacher/quiz-results", icon: ClipboardCheck },
    { label: "Certificates", href: "/teacher/certificates", icon: Award },
    { label: "Earnings", href: "/teacher/earnings", icon: Wallet },
    { label: "Payout", href: "/teacher/payout", icon: CreditCard },
    { label: "Statements", href: "/teacher/statements", icon: FileBarChart },
    { label: "Messages", href: "/teacher/messages", icon: MessageSquare },
    { label: "Support Tickets", href: "/teacher/support-tickets", icon: LifeBuoy },
  ];

  const handleLogout = async () => {
    // Add your logout logic here
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
        className={`fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
          lg:static lg:translate-x-0 
          ${open ? "translate-x-0 w-64 shadow-2xl" : "-translate-x-full lg:w-64"} 
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              EA
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">Eugene Andre</p>
              <p className="text-xs text-gray-600">Instructor</p>
            </div>
          </div>
          <button 
            onClick={() => setOpen(false)} 
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto px-4 py-6 scrollbar-hide">
          
          {/* Main Menu */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
              Main Menu
            </h3>
            <nav className="space-y-1">
              {teacherLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
                      ${isActive 
                          ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    <span className="truncate">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Account Settings */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
              Account Settings
            </h3>
            <nav className="space-y-1">
              <Link
                href="/teachers/settings"
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
                  ${pathname === '/teachers/settings' 
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <Settings size={18} className="flex-shrink-0" />
                <span>Settings</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut size={18} className="flex-shrink-0" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="px-3">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">DreamsLMS</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Platform designed to help organizations, educators, and learners manage, 
                deliver, and track learning activities.
              </p>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};

export default TeacherSidebar;