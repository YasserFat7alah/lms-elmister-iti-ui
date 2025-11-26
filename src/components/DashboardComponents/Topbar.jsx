"use client"
import React from 'react'
import Dropdown from './Notification/Dropdown'
import { MenuIcon } from 'lucide-react'
import AvatarMenu from './AvatarMenu'


const Topbar = ({setOpen}) => {
  return (
    <div className="flex items-center justify-between bg-white px-4 h-14 shadow">
      
      {/* left side */}
      <button onClick={() => setOpen(true)} className="lg:invisible">
        <MenuIcon className="w-6 h-6 text-gray-700" />
      </button>

      {/* right side */}
      <div className="flex items-center gap-4">
        <Dropdown />

        <AvatarMenu/>
      </div>
    </div>
  )
}

export default Topbar;