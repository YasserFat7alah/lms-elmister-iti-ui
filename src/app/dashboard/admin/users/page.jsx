import React from 'react'
import UsersTabs from "@/components/dashboardComponents/admin/users/UserTabs";
import HeaderAdmin from '@/components/dashboardComponents/admin/HeaderAdmin';


const page = () => {
  return (
    <div className="p-3">
      <HeaderAdmin title=" User Management" description="Manage all platform users and their roles"/>
      <UsersTabs  />
    </div>
  )
}

export default page