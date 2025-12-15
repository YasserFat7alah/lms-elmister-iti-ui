"use client"
import React from 'react'
import UsersTabs from "@/components/DashboardComponents/admin/users/UserTabs";
import HeaderAdmin from '@/components/dashboardComponents/admin/HeaderAdmin';
import { useGetAllUsersQuery } from '@/redux/api/endPoints/usersApiSlice';
import UserStateCards from '@/components/DashboardComponents/admin/users/UserStateCards';
import { Spinner } from '@/components/shared/Loader';


import Breadcrumbs from "@/components/shared/Breadcrumbs";

const page = () => {

  const { data, isLoading, isError } = useGetAllUsersQuery({ limit: 1000 });

  //  Access the data from API response
  const users = data?.data?.users?.data?.users || [];

  // Filter users by role
  const parents = users.filter((u) => u.role === "parent");
  const teachers = users.filter((u) => u.role === "teacher");
  const students = users.filter((u) => u.role === "student");
  const admins = users.filter((u) => u.role === "admin");

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard/admin" },
    { label: "User Management" }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-4 space-y-6">
      <Breadcrumbs items={breadcrumbItems} className="w-fit" />
      <HeaderAdmin title=" User Management" description="Manage all platform users and their roles" />
      <UserStateCards users={users} parents={parents} teachers={teachers} students={students} admins={admins} />
      <UsersTabs users={users} parents={parents} teachers={teachers} students={students} admins={admins} />
    </div>
  )
}

export default page