"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, LogOut, LayoutDashboard, Search, User } from "lucide-react";
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
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
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
    { label: "Contact us", href: "/contact" },
    { label: "About us", href: "/about" },
  ];

  const btnCommon =
    "inline-flex items-center gap-2 px-4 h-10 rounded-full text-sm font-medium transition-transform transform will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FFB0C0]";

  const btnPrimary = `${btnCommon} bg-gradient-to-r from-[#FF4667] to-[#FF0055] text-white shadow-md hover:scale-[1.02]`;
  const btnSecondary = `${btnCommon} bg-[#E7E7E7] text-gray-800 hover:brightness-95`;
  const btnGhost = `${btnCommon} bg-white text-gray-700 border border-transparent hover:bg-gray-50`;

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm" style={{ ["--header-height"]: "5rem" }}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between min-h-[80px]">
          <div className="flex-shrink-0 flex items-center gap-5">
            <Link href="/" className="flex items-center gap-2 group">
              <Image src={logo} alt="El-Mister Logo" width={48} height={48} className="h-12 w-auto" />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[15px] font-medium transition-colors ${isActive ? "text-[#FF0055]" : "text-gray-600 hover:text-[#FF0055]"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button aria-label="Search" className={btnGhost}>
              <Search size={16} />
              <span className="sr-only">Search</span>
            </button>

            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className={btnGhost} aria-label="User menu" type="button">
                      <Avatar className="h-6 w-6">
                        {user?.avatar?.url ? <AvatarImage src={user.avatar.url} alt={user.name} /> : <AvatarFallback className="bg-[#FF0055] text-white font-bold">{getInitials(user.name)}</AvatarFallback>}
                      </Avatar>
                      <span className="hidden md:inline">{user.name.split(" ")[0]}</span>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                      <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                      <User className="mr-2 h-4 w-4" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <p className={btnSecondary}>
                    <FiLogIn size={14} />
                    Sign in
                  </p>
                </Link>

                <Link href="/signup">
                  <p className={btnPrimary}>
                    <FiUserPlus size={14} />
                    Register
                  </p>
                </Link>

                <Link href="/becomeAnInstrcutor">
                  <p className={btnPrimary}>Become a teacher</p>
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF0055] rounded"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden fixed inset-x-0 z-50 overflow-auto shadow-lg bg-white transition-transform duration-200"
            style={{ top: "var(--header-height)", maxHeight: "calc(100vh - var(--header-height))" }}
          >
            <div className="py-4 px-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="block py-3 px-4 text-base font-medium text-gray-700 hover:text-[#FF0055] rounded">
                  {item.label}
                </Link>
              ))}

              <div className="border-t pt-4 flex flex-col gap-3 px-1">
                <button onClick={() => { setIsOpen(false); router.push("/becomeAnInstrcutor"); }} className={btnPrimary + " w-full justify-center"}>
                  Become a teacher
                </button>

                {!user && (
                  <>
                    <button onClick={() => { setIsOpen(false); router.push("/login"); }} className={btnSecondary + " w-full justify-center"}>
                      Sign In
                    </button>
                    <button onClick={() => { setIsOpen(false); router.push("/signup"); }} className={btnPrimary + " w-full justify-center"}>
                      Register
                    </button>
                  </>
                )}
                {user && (
                  <button onClick={() => { setIsOpen(false); handleLogout(); }} className={btnGhost + " w-full justify-center"}>
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
