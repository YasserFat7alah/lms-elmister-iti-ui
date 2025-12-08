'use client';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Settings, User } from "lucide-react";


const AvatarMenu = () => {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-32 md:w-40 mt-1 bg-white">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" /> Settings
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={() => authStore.logout()}> */}
        <DropdownMenuItem >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
      
  </DropdownMenu>
  )
}

export default AvatarMenu