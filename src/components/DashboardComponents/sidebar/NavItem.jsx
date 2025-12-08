"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHeart, FaStar, FaClipboardCheck, FaShoppingCart, FaUsers, FaComments, FaTicketAlt } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { TiUser } from "react-icons/ti";
import { FaGraduationCap } from "react-icons/fa6";
import { PiCertificateBold } from "react-icons/pi";



const NavItem = () => {
  const pathname = usePathname();

  const mainLinks = [
    { title: "Dashboard", icon: <TbLayoutDashboardFilled />, href: "/dashboard" },
    { title: "My Profile", icon: <TiUser />, href: "/profile" },
    { title: "Enrolled Courses", icon: <FaGraduationCap />, href: "/courses" },
    { title: "My Certificates", icon: <PiCertificateBold />, href: "/certificates" },
    { title: "Wishlist", icon: <FaHeart />, href: "/wishlist" },
    { title: "Reviews", icon: <FaStar />, href: "/reviews" },
    { title: "My Quiz Attempts", icon: <FaClipboardCheck />, href: "/quiz-attempts" },
    { title: "Order History", icon: <FaShoppingCart />, href: "/orders" },
    { title: "Referrals", icon: <FaUsers />, href: "/referrals" },
    { title: "Messages", icon: <FaComments />, href: "/messages" },
    { title: "Support Tickets", icon: <FaTicketAlt />, href: "/support" },
  ];

  return (
    <nav className="flex flex-col gap-2">
    {mainLinks.map((link) => {


      return (
        <Link
          href={link.href}
          key={link.title}
          className={`flex items-center gap-2 mb-1 px-2 py-1 rounded-md transition 
            ${pathname === link.href ? "text-pink-600 font-semibold" : "text-gray-500 hover:text-gray-900"}
          `}
        >
          {/* ICON */}
          <span className={`${pathname === link.href ? "text-pink-600" : "text-gray-700"}`}>
            {link.icon}
          </span>

          {/* TITLE */}
          <span>{link.title}</span>
        </Link>
      );
    })}
  </nav>
  );
};

export default NavItem;