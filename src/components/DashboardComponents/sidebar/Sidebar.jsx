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
  Baby, Mail
} from "lucide-react"; 
import Image from "next/image";
import logo from "@/assets/images/logo.png";

const ROLE_LINKS = {
    student: [
      { label: "Dashboard", href: "/dashboard/student/my-learning", icon: LayoutDashboard },
      { label: "Update Profile", href: "/dashboard/student/profile", icon: User },
      { label: "Courses Schedule", href: "/dashboard/student/courses", icon: BookOpen },
      { label: "live-sessions", href: "/dashboard/student/live-sessions", icon: Award },
      { label: "Assignments", href: "/dashboard/student/assignments", icon: FileText }, 
      { label: "Study Material", href: "/dashboard/student/materials", icon: FileQuestion },
      { label: "Subscription History", href: "/dashboard/student/orders", icon: ShoppingBag },
    ],

    teacher: [
      { label: "Dashboard", href: "/dashboard/teacher/analytics", icon: LayoutDashboard },
      { label: "Profile", href: "/dashboard/teacher/profile", icon: User },
      { label: "Courses", href: "/dashboard/teacher/courses", icon: BookOpen },
      { label: "student Schedule", href: "/dashboard/teacher/schedule", icon: Megaphone },
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
      { label: "Overview", href: "/dashboard/parent/overview", icon: LayoutDashboard },
      { label: "Profile", href: "/dashboard/parent/profile", icon: User },
      { label: "My Children", href: "/dashboard/parent/children", icon: Baby, exact: true }, 
      { label: "Teachers", href: "/dashboard/parent/teachers", icon: Users },
      { label: "Payments", href: "/dashboard/parent/payments", icon: CreditCard },
      { label: "Messages", href: "/dashboard/parent/messages", icon: MessageSquare },
      { label: "Notifications", href: "/dashboard/parent/notifications", icon: IoMdNotificationsOutline }
    ],

    admin: [
      {
        group: "Dashboard",
        items: [
          { label: "Overview", href: "/dashboard/admin/overview", icon: LayoutDashboard },
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

  const { links, isAdmin } = useMemo(() => {
     const role = userInfo?.user?.role || "student";
     return {
       links: ROLE_LINKS[role] || ROLE_LINKS["student"],
       isAdmin: role === "admin"
     };
  }, [userInfo]); 

  const handleLogout = async () => {
    try { await logoutApi().unwrap(); } catch (err) {}
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
        <span>{link.label}</span>
      </Link>
    );
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
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

        <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-none hover:scrollbar-thin scrollbar-thumb-gray-200">
            
          {isAdmin ? (
            // Admin grouped layout
            <div className="space-y-6">
              {links.map((group, index) => (
                <div key={group.group}>
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
            // Regular layout for other roles
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