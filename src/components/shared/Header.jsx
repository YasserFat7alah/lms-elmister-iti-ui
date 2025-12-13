"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, LogOut, LayoutDashboard, Search, User, ChevronDown } from "lucide-react";
import { apiSlice } from "@/redux/api/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useLogoutApiMutation } from "@/redux/api/endPoints/usersApiSlice";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutApiMutation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const user = isMounted ? userInfo?.user : null;

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap().catch((err) => console.warn("Server logout failed", err));
    } finally {
      dispatch(logout());
      dispatch(apiSlice.util.resetApiState());
      window.location.href = "/login";
    }
  };

  const getInitials = (name) => (name ? name.substring(0, 1).toUpperCase() : "U");

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "teachers", href: "/teachers" },
    { label: "Blog", href: "/blog" },
  ];

  const supportItems = [
    { label: "Contact us", href: "/contact" },
    { label: "About us", href: "/about" },
    { label: "FAQ", href: "/faqs" },
    { label: "Privacy & Policies", href: "/privacy" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-200" style={{ ["--header-height"]: "4.5rem" }}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-[4.5rem]">

          {/* LOGO */}
          <div className="shrink-0 flex items-center gap-5">
            <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95">
              <Image src="/logo.svg" alt="El-Mister Logo" width={40} height={40} className="h-10 w-auto" />
            </Link>
          </div>

          {/* DESKTOP NAV LINKS (Centered-ish) */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-10 shrink-0">
            {navItems.filter(item => item.label !== "Blog").map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[14px] xl:text-[15px] font-medium transition-all duration-200 relative py-1 whitespace-nowrap
                    ${isActive
                      ? "text-[#FF0055] font-semibold"
                      : "text-gray-600 hover:text-[#FF0055]"
                    }
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#FF0055] after:scale-x-0 after:origin-right after:transition-transform after:duration-300
                    ${isActive ? "after:scale-x-100 after:origin-left" : "hover:after:scale-x-100 hover:after:origin-left"}
                  `}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Support Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`text-[14px] xl:text-[15px] font-medium transition-all duration-200 relative py-1 flex items-center gap-1
                  text-gray-600 hover:text-[#FF0055]
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#FF0055] after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left
                `}>
                  Support <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2" align="start">
                {supportItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="cursor-pointer">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">

            {/* SEARCH BAR (Desktop) */}
            <div className="hidden lg:flex relative w-full lg:max-w-[140px] xl:max-w-[260px] transition-all duration-300 focus-within:max-w-[300px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#FF0055] focus:border-[#FF0055] text-sm transition-all shadow-sm hover:bg-white truncate"
              />
            </div>

            {/* SEARCH ICON (Mobile) */}
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>

            {/* MOBILE SEARCH OVERLAY */}
            <div
              className={`absolute inset-0 bg-white z-50 flex items-center px-4 transition-all duration-300 ease-in-out ${isMobileSearchOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
                }`}
            >
              <div className="relative w-full flex items-center gap-2">
                <Search className="h-5 w-5 text-gray-400 absolute left-3" />
                <input
                  type="text"
                  placeholder="Search..."
                  // Auto-focus when opened logic can be handled via ref or simple autoFocus if re-rendered
                  autoFocus
                  className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#FF0055]"
                />
                <button onClick={() => setIsMobileSearchOpen(false)} className="p-2 text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* AUTH / PROFILE */}
            {user ? (
              <div className="flex items-center gap-3">
                {/* Profile Dropdown (Visible on ALL screens) */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#FF0055]" aria-label="User menu">
                      <Avatar className="h-9 w-9 border-2 border-white shadow-sm ring-1 ring-gray-100">
                        {user?.avatar?.url ? (
                          <AvatarImage src={user.avatar.url} alt={user.name} />
                        ) : (
                          <AvatarFallback className="bg-gradient-to-br from-[#FF4667] to-[#FF0055] text-white font-bold text-xs">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      {/* Name hidden on mobile, visible on desktop if desired, or just avatar */}
                      <span className="hidden md:block text-sm font-semibold text-gray-700 max-w-[100px] truncate">
                        {user.name.split(" ")[0]}
                      </span>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/dashboard")} className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4 text-gray-500" /> Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4 text-gray-500" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              // AUTH BUTTONS (Desktop) - Hidden on Mobile to save space
              <div className="hidden lg:flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" className="rounded-full text-gray-600 hover:text-[#FF0055] hover:bg-red-50 font-semibold">
                    Sign in
                  </Button>
                </Link>

                <Link href="/signup">
                  <Button className="rounded-full bg-[#FF0055] hover:bg-[#D90045] text-white shadow-md shadow-pink-200 px-6 font-bold transition-all hover:shadow-lg hover:-translate-y-0.5">
                    Register
                  </Button>
                </Link>

                {/* 'Become a teacher' can just be a link or distinct button */}
                {/* Keeping it simple for now or adding if space permits */}
              </div>
            )}

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden fixed inset-x-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl z-50 overflow-y-auto"
            style={{ top: "4.5rem", maxHeight: "calc(100vh - 4.5rem)" }}
          >
            <div className="p-4 flex flex-col gap-2">
              {navItems.filter(item => item.label !== "Blog").map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 px-4 text-base font-medium rounded-xl transition-colors
                      ${isActive ? "bg-red-50 text-[#FF0055]" : "text-gray-700 hover:bg-gray-50"}
                    `}
                  >
                    {item.label}
                  </Link>
                )
              })}

              {/* Support Section in Mobile */}
              <div className="py-2">
                <p className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">Support</p>
                {supportItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-8 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-100 my-2 pt-4 flex flex-col gap-3">
                {/* Mobile Auth Buttons if not logged in */}
                {!user && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => { setIsOpen(false); router.push("/login"); }} className="flex items-center justify-center gap-2 py-3 rounded-full border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
                        <FiLogIn size={18} /> Sign In
                      </button>
                      <button onClick={() => { setIsOpen(false); router.push("/signup"); }} className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#FF0055] text-white font-bold shadow-md hover:bg-[#D90045] transition-all">
                        <FiUserPlus size={18} /> Register
                      </button>
                    </div>
                    <button onClick={() => { setIsOpen(false); router.push("/becomeAnInstrcutor"); }} className="w-full py-3 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors mt-2">
                      Become a teacher
                    </button>
                  </>
                )}
                {/* If logged in, we already show profile in top bar, but maybe Dashboard links here too? */}
                {user && (
                  <div className="flex flex-col gap-2">
                    <button onClick={() => { setIsOpen(false); router.push("/dashboard"); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium text-left">
                      <LayoutDashboard size={20} /> Go to Dashboard
                    </button>
                    <button onClick={() => { setIsOpen(false); handleLogout(); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium text-left">
                      <LogOut size={20} /> Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
