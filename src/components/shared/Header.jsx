"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard, 
  User, 
  ChevronDown 
} from "lucide-react";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

import { apiSlice } from "@/redux/slices/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useLogoutApiMutation } from "@/redux/slices/usersApiSlice";

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

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const user = userInfo?.user; 
  const [logoutApiCall] = useLogoutApiMutation();

const handleLogout = async () => {
  try {
    await logoutApiCall().unwrap().catch((err) => console.warn("Server logout failed", err));
    
  } finally {
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());
     window.location.href = '/login'; 
  }
}; 
  const getInitials = (name) => name ? name.substring(0, 2).toUpperCase() : "U";

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Teachers", href: "/join-teacher" },
    { label: "Pages", href: "/Pages" },
    { label: "Blog", href: "/blog" },
    { label: "Contact us", href: "/Contactus" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
            <img src="/logo.svg" alt="LMS Logo" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-black transition-colors hover:text-[#FF4667]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              // حالة المسجل (Logged In)
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-auto gap-2 rounded-full pl-2 pr-4 hover:bg-muted">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar?.url} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-sm">
                        <span className="font-semibold">{user.name}</span>
                    </div>
                    <ChevronDown size={14} className="text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      <span className="mt-1 inline-flex w-fit items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary uppercase">
                        {user.role}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                <Button variant="ghost" className="rounded-full bg-[#E7E7E7] hover:bg-[#D9D9D9] text-gray-800 text-xs flex items-center gap-1">
                    <FiLogIn size={14} />
                           Sign in
                </Button>
                </Link>

                <Link href="/signup">
                 <Button className="rounded-full bg-[#FF4667] hover:bg-[#FF2855] text-white text-xs flex items-center gap-1">
                       <FiUserPlus size={14} />
                           Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:bg-muted"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Content */}
        {isOpen && (
          <div className="md:hidden border-t py-4 animate-in slide-in-from-top-5">
            <div className="flex flex-col space-y-3 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 border-t pt-4 px-2">
              {user ? (
                <div className="space-y-3">
                    <div className="flex items-center gap-3 px-3">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                {getInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/dashboard')}>
                            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                        </Button>
                        <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                        </Button>
                    </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}