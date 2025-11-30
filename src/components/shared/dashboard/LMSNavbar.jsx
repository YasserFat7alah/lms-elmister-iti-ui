"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { 
  Menu, X, LogOut, LayoutDashboard, Search, ShoppingCart, User, Lock 
} from "lucide-react";
import { apiSlice } from "@/redux/api/apiSlice";
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
import logo from "@/assets/images/logo.png";

const LMSNavbar = ({ setSidebarOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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


    const [isClient, setIsClient] = useState(false);

    // ____________FOR HYDRATION ERROR______________
    useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient) return null;
    // ___________________________________


    try {
      await logoutApiCall().unwrap().catch((err) => console.warn("Logout failed", err));
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
    { label: "Instructors", href: "/instructors" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm h-20 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          
          <div className="flex items-center gap-2">
             {setSidebarOpen && (
                <button 
                  onClick={() => setSidebarOpen(prev => !prev)}
                  className="lg:hidden p-2 text-gray-600 mr-2"
                >
                  <Menu size={24} />
                </button>
             )}

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
                className="text-[15px] font-semibold text-gray-600 transition-colors hover:text-[#FF0055]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            
            <button className="hidden md:block text-gray-500 hover:text-gray-900 transition-colors">
                <Search size={22} strokeWidth={2} />
            </button>


            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-10 w-10 cursor-pointer border border-gray-100 shadow-sm transition-transform hover:scale-105">
                    <AvatarImage src={user.avatar?.url} alt={user.name} />
                    <AvatarFallback className="bg-[#FF0055] text-white font-bold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-56 mt-2" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/login">
                   <Button variant="ghost" className="font-semibold text-gray-700 hover:text-[#FF0055] hover:bg-transparent px-2">
                     <Lock size={16} className="mr-2" /> Sign In
                   </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-[#FF0055] hover:bg-pink-600 text-white rounded-full px-7 h-11 font-bold shadow-md shadow-pink-200 transition-all hover:shadow-lg">
                    Register
                  </Button>
                </Link>
              </div>
            )}

          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-t border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-2 rounded-lg text-base font-semibold text-gray-600 hover:bg-pink-50 hover:text-[#FF0055]"
              >
                {item.label}
              </Link>
            ))}
            
            {!user && (
                <div className="border-t pt-4 mt-2 flex flex-col gap-3">
                    <Button variant="outline" onClick={() => router.push('/login')} className="w-full h-11 rounded-full border-gray-300">
                        <Lock size={16} className="mr-2" /> Sign In
                    </Button>
                    <Button className="w-full bg-[#FF0055] h-11 rounded-full font-bold" onClick={() => router.push('/signup')}>
                        Register
                    </Button>
                </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default LMSNavbar;