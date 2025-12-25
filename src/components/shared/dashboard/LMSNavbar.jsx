"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  Menu, LogOut, LayoutDashboard, Search, User, AlertTriangle
} from "lucide-react";
import { logout } from "@/redux/slices/authSlice";
import { useLogoutApiMutation } from "@/redux/api/endPoints/usersApiSlice";
import NotificationDropdown from "@/components/DashboardComponents/Topbar/Notification/Dropdown";

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
import Link from "next/link";

const LMSNavbar = ({ setSidebarOpen }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [hasTeacherProfile, setHasTeacherProfile] = useState(null); // null = loading
  const router = useRouter();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutApiMutation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const user = isMounted ? userInfo?.user : null;

  // Check if teacher has created their profile via API
  useEffect(() => {
    const checkProfile = async () => {
      if (!user || user.role !== 'teacher' || !userInfo?.accessToken) {
        setHasTeacherProfile(true); // Not a teacher or no token
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/teacher/profile/exists`,
          {
            headers: {
              'Authorization': `Bearer ${userInfo.accessToken}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setHasTeacherProfile(data.data?.exists || false);
        } else {
          setHasTeacherProfile(true); // On error, don't show banner
        }
      } catch (error) {
        console.error('Error checking teacher profile:', error);
        setHasTeacherProfile(true); // On error, don't show banner
      }
    };

    if (isMounted) {
      checkProfile();
    }
  }, [isMounted, user, userInfo?.accessToken]);

  const isProfileIncomplete = user && user.role === "teacher" && hasTeacherProfile === false;

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

  if (!isMounted || !user) return <div className="h-16 bg-white border-b border-gray-200 animate-pulse"></div>;

  return (
    <>
      {/* Warning Banner for Incomplete Teacher Profile */}
      {isProfileIncomplete && (
        <div className="sticky top-0 z-40 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-3 flex-1">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">
                Please complete your profile to access all dashboard features.
              </p>
            </div>
            <Link
              href="/completeProfile"
              className="ml-4 px-4 py-1.5 bg-white text-orange-600 rounded-md text-sm font-semibold hover:bg-orange-50 transition-colors whitespace-nowrap"
            >
              Complete Profile
            </Link>
          </div>
        </div>
      )}

      <header className={`sticky ${isProfileIncomplete ? 'top-[57px]' : 'top-0'} z-30 w-full bg-white border-b border-gray-200 h-16`}>
        <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4 flex-1">
            {setSidebarOpen && (
              <button
                onClick={() => setSidebarOpen(prev => !prev)}
                className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Menu size={24} />
              </button>
            )}

            <div className="hidden md:flex items-center w-full max-w-md relative">
              <Search className="absolute left-3 text-gray-400" size={18} />
              <Input
                placeholder="Search courses, students..."
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-full h-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">

            <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <Search size={20} />
            </button>

            <NotificationDropdown />

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
                        {user?.role || ''}
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(`/dashboard/${user?.role}`)} className="cursor-pointer">
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/users/${user?.username}`)} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" /> Public Profile
                </DropdownMenuItem>              <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
}

export default LMSNavbar;
