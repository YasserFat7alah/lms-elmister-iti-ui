import React from 'react'
import UsersTabs from "@/components/dashboardComponents/admin/users/UserTabs";


const page = () => {
  return (
    <div className="p-6">
       <div className="">
        <h1 className="text-2xl font-bold text-[#FF0055]">
          User Management
        </h1>
        <p className="text-[#392b80] text-sm mt-1">
          Manage all platform users and their roles
        </p>
      </div>
      <UsersTabs  />
    </div>
  )
}

export default page