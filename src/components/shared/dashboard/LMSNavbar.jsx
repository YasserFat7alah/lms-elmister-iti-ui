"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { 
  Menu, LogOut, LayoutDashboard, Search, User, Bell, Settings 
} from "lucide-react";
import { logout } from "@/redux/slices/authSlice";
import { useLogoutApiMutation } from "@/redux/api/endPoints/usersApiSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const LMSNavbar = ({ setSidebarOpen }) => {
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
      await logoutApiCall().unwrap();
    } catch (err) {
      console.warn("Logout failed", err);
    } finally {
      dispatch(logout());
      router.replace('/login'); 
    }
  }; 

  const getInitials = (name) => name ? name.substring(0, 2).toUpperCase() : "U";

  // لو مفيش يوزر (حالة نادرة في الداشبورد)، ميرجعش حاجة لحد ما يحمل
  if (!isMounted) return <div className="h-16 bg-white border-b border-gray-200"></div>;

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
        
        {/* Left Section: Sidebar Toggle & Search */}
        <div className="flex items-center gap-4 flex-1">
          {setSidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(prev => !prev)}
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Menu size={24} />
            </button>
          )}

          {/* Global Search Bar - Hidden on mobile, visible on desktop */}
          <div className="hidden md:flex items-center w-full max-w-md relative">
            <Search className="absolute left-3 text-gray-400" size={18} />
            <Input 
              placeholder="Search courses, students..." 
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-full h-10"
            />
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Mobile Search Icon */}
          <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <Search size={20} />
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[#FF0055] rounded-full border border-white"></span>
          </button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-9 w-9 border border-gray-200 transition-transform hover:scale-105">
                  <AvatarImage src={user?.avatar?.url} alt={user?.name} className="object-cover" />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent className="w-60 mt-2" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none truncate">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground truncate">{user?.email}</p>
                  <div className="pt-1">
                     <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-bold">
                        {user?.role || 'Student'}
                     </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push(user?.role === 'teacher' ? '/teacher/analytics' : '/student/my-learning')} className="cursor-pointer">
                <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(user?.role === 'teacher' ? '/teacher/profile' : '/student/profile')} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" /> My Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default LMSNavbar;