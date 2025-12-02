"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Menu, X, LogOut, LayoutDashboard, Search, ShoppingCart, User 
} from "lucide-react";
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
      window.location.href = '/login'; 
    }
  }; 

  const getInitials = (name) => name ? name.substring(0, 1).toUpperCase() : "U";

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "teachers", href: "/teachers" }, 
    { label: "BecomeAnInstrcutor", href: "/becomeAnInstrcutor" }, // review

    { label: "Blog", href: "/blog" },
    { label: "Contact us", href: "/contact" },
    { label: "About us", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm h-20 flex items-center">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">

  <Image 
    src={logo} 
    alt="El-Mister Logo" 
    className="h-12 w-auto"
  />


            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[15px] font-medium text-gray-600 transition-colors hover:text-[#FF0055]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5">
            
            <button className="text-gray-500 hover:text-gray-900 transition-colors">
                <Search size={20} />
            </button>

            {/* <Link href="/cart" className="relative text-gray-500 hover:text-gray-900 transition-colors">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-[#10D876] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                    1
                </span>
            </Link> */}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-10 w-10 cursor-pointer border border-gray-100 shadow-sm">
                    <AvatarImage src={user.avatar?.url} alt={user.name} />
                    <AvatarFallback className="bg-[#FF0055] text-white font-bold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
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

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-600"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-t shadow-lg py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-base font-medium text-gray-700 hover:text-[#FF0055]"
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t pt-4 flex flex-col gap-3">
                 {!user && (
                    <>
                        <Button variant="outline" onClick={() => router.push('/login')} className="w-full">Sign In</Button>
                        <Button className="w-full bg-[#FF0055]" onClick={() => router.push('/signup')}>Register</Button>
                    </>
                 )}
                 {user && (
                    <Button variant="destructive" onClick={handleLogout} className="w-full">Logout</Button>
                 )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 