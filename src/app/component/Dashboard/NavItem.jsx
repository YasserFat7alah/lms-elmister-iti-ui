"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Book, User } from "lucide-react";

const NavItem = ({collapsed}) => {
  const pathname = usePathname();

  const mainLinks = [
    { name: "Home", path: "/dashboard", icon: <House/> },
    { name: "Courses", path: "/courses", icon: <Book/> },
    { name: "Students", path: "/students", icon: <User/> },
  ];

  return (
    <nav className="flex flex-col gap-2">

      {mainLinks.map((link) => {
        return (
          <Link
            href={link.path}
            key={link.name}
            className={`flex items-center ${collapsed && 'justify-center'} gap-3 p-2 rounded-md transition-colors
              ${pathname === link.path ?  "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-600 hover:text-blue-800 hover:bg-gray-100"}
            `}
          >
            <div className={`w-5 h-5`}>{link.icon}</div>
            <span className={`${collapsed && 'lg:hidden'} ${!collapsed && 'inline'}`}>
              {link.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavItem;