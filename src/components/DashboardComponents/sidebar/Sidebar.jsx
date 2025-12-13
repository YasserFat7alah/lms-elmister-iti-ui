"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useLogoutApiMutation } from "@/redux/api/endPoints/usersApiSlice";
import { IoMdNotificationsOutline } from "react-icons/io";

import {
  LayoutDashboard, User, BookOpen, Award, Heart,
  FileQuestion, ShoppingBag, MessageSquare, LifeBuoy,
  Settings, LogOut, X, Users, Megaphone,
  FileText, ClipboardCheck, Wallet, CreditCard, FileBarChart,
  Baby, Mail, Info
} from "lucide-react";
import Image from "next/image";

const ROLE_LINKS = {
  student: [
    { label: "Dashboard", href: "/dashboard/student/my-learning", icon: LayoutDashboard },
    { label: "Update Profile", href: "/dashboard/student/profile", icon: User },
    { label: "Courses Schedule", href: "/dashboard/student/schedule", icon: BookOpen },
    { label: "live-sessions", href: "/dashboard/student/live-sessions", icon: Award },
    { label: "Assignments", href: "/dashboard/student/assignments", icon: FileText },
    { label: "Study Material", href: "/dashboard/student/materials", icon: FileQuestion },
    { label: "Subscription History", href: "/dashboard/student/orders", icon: ShoppingBag },
  ],

  teacher: [
    { label: "Dashboard", href: "/dashboard/teacher/analytics", icon: LayoutDashboard },
    { label: "Profile", href: "/dashboard/teacher/profile", icon: User },
    { label: "Courses", href: "/dashboard/teacher/courses", icon: BookOpen },
    { label: "create Course", href: "/dashboard/teacher/createCourse", icon: Wallet },
    { label: "student Schedule", href: "/dashboard/teacher/schedule", icon: Megaphone },
    { label: "Groups", href: "/dashboard/teacher/groups", icon: FileText },
    { label: "Students", href: "/dashboard/teacher/students", icon: Users },
    { label: "Quiz", href: "/dashboard/teacher/quizzes", icon: FileQuestion },
    { label: "Quiz Results", href: "/dashboard/teacher/quiz-results", icon: ClipboardCheck },
    { label: "Payout", href: "/dashboard/teacher/payout", icon: CreditCard },
    { label: "Messages", href: "/dashboard/teacher/messages", icon: MessageSquare },
  ],

  parent: [
    { label: "Overview", href: "/dashboard/parent/overview", icon: LayoutDashboard },
    { label: "Profile", href: "/dashboard/parent/profile", icon: User },
    { label: "My Children", href: "/dashboard/parent/children", icon: Baby, exact: true },
    { label: "My Children schedule", href: "/dashboard/parent/schedule", icon: Baby, exact: true },
    { label: "Teachers", href: "/dashboard/parent/teachers", icon: Users },
    { label: "Payments", href: "/dashboard/parent/payments", icon: CreditCard },
    { label: "Messages", href: "/dashboard/parent/messages", icon: MessageSquare },
    { label: "Notifications", href: "/dashboard/parent/notifications", icon: IoMdNotificationsOutline }
  ],

  admin: [
    {
      group: "Dashboard",
      items: [
        { label: "Anayltics", href: "/dashboard/admin/analytics", icon: LayoutDashboard },
      ],
    },
    {
      group: "Management",
      items: [
        { label: "Users", href: "/dashboard/admin/users", icon: Users },
        { label: "Courses", href: "/dashboard/admin/courses", icon: BookOpen },
        { label: "Subscriptions", href: "/dashboard/admin/subscriptions", icon: Wallet },
      ],
    },
    {
      group: "Support",
      items: [
        { label: "Tickets", href: "/dashboard/admin/tickets", icon: MessageSquare },
        { label: "Newsletter", href: "/dashboard/admin/newsletter", icon: Mail },
      ],
    },
    {
      group: "Financial",
      items: [
        { label: "Payouts", href: "/dashboard/admin/payouts", icon: Wallet },
        { label: "Invoices", href: "/dashboard/admin/invoices", icon: FileText },
      ],
    },
  ],
};

const Sidebar = ({ open, setOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApi] = useLogoutApiMutation();

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Strict Role Check
  const role = userInfo?.user?.role?.toLowerCase();
  const pathSegments = pathname?.split('/') || [];
  const urlRole = pathSegments[2]?.toLowerCase();
  const validRoles = ['admin', 'student', 'teacher', 'parent'];

  // Determine if we need to wait (Loading OR Mismatch)
  // Determine if we need to wait (Loading OR Mismatch)
  const isMismatch = urlRole && validRoles.includes(urlRole) && role && role !== urlRole;
  const isLoading = !isMounted || !userInfo || !role || isMismatch;

  const { links, isAdmin } = useMemo(() => {
    return {
      links: ROLE_LINKS[role] || [],
      isAdmin: role === "admin"
    };
  }, [role]);

  if (isLoading) {
    return (
      <aside className="hidden lg:flex fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex-col">
        {/* Skeleton Header */}
        <div className="h-20 border-b border-gray-100 flex items-center px-6">
          <div className="h-8 w-32 bg-gray-100 rounded animate-pulse" />
        </div>
        {/* Skeleton Links */}
        <div className="p-6 space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-3">
              <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
              <div className="h-10 bg-gray-50 rounded-lg animate-pulse" />
              <div className="h-10 bg-gray-50 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      </aside>
    );
  }

  const handleLogout = async () => {
    try { await logoutApi().unwrap(); } catch (err) { }
    dispatch(logout());
    router.push("/login");
  };

  const renderLink = (link) => {
    const Icon = link.icon;
    const isActive = link.exact
      ? pathname === link.href
      : (pathname === link.href || pathname.startsWith(`${link.href}/`));

    return (
      <Link
        key={link.label}
        href={link.href}
        onClick={() => setOpen(false)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
          ${isActive
            ? "bg-[#FF0055]/10 text-[#FF0055]"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }
        `}
      >
        <Icon size={19} className={isActive ? "text-[#FF0055]" : "text-gray-400 group-hover:text-gray-600"} />
        <p>{link.label}</p>
      </Link>
    );
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 
          transform transition-transform duration-300 ease-in-out flex flex-col
          lg:static lg:translate-x-0 
          ${open ? "translate-x-0 shadow-2xl" : "-translate-x-full"} 
        `}
      >
        <div className="flex h-20 items-center justify-between px-6 border-b border-gray-100 shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="El-Mister Logo"
              width={40}
              height={40}
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

        <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-none hover:scrollbar-thin scrollbar-thumb-gray-200">

          {isAdmin ? (
            <div className="space-y-6">
              {links.map((group, index) => (
                <div key={index}>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">
                    {group.group}
                  </h3>
                  <nav className="space-y-1">
                    {group.items.map((link) => renderLink(link))}
                  </nav>
                  {index < links.length - 1 && (
                    <div className="h-px bg-gray-100 my-4" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
                Main Menu
              </h3>
              <nav className="space-y-1">
                {links.map((link) => renderLink(link))}
              </nav>
            </div>
          )}

          <div className="pt-4 border-t border-gray-100 mt-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
              System
            </h3>
            <nav className="space-y-1">

              {/* Support Tickets Link - Visible for non-admins */}
              {!isAdmin && role && (
                <Link
                  href={`/dashboard/${role}/support`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${pathname?.includes(`/dashboard/${role}/support`)
                      ? "bg-[#FF0055]/10 text-[#FF0055]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <Info size={19} className={pathname?.includes(`/dashboard/${role}/support`) ? "text-[#FF0055]" : "text-gray-400"} />
                  <span>Support Center</span>
                </Link>
              )}

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
                <Settings size={19} className={pathname === '/settings' ? "text-[#FF0055]" : "text-gray-400"} />
                <span>Settings</span>
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