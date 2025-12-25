"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import DashboardBanner from "@/components/shared/dashboard/DashboardBanner";
import { MdWavingHand } from "react-icons/md";
import ChildCard from "@/components/DashboardComponents/parent/ChildCard";
import UpcomingSessionsCard from "@/components/DashboardComponents/parent/UpcomingSessions";
import RecentlyAlerts from "@/components/DashboardComponents/parent/RecentlyAlerts";
import { useGetChildrenQuery, useGetSubscriptionsQuery } from "@/redux/api/endPoints/childrenApiSlice";
import { FullPageLoader } from "@/components/shared/Loader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { Users, CreditCard, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, bgColor, iconColor }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${bgColor} opacity-10 -mr-16 -mt-16 transition-transform group-hover:scale-150`}></div>
    <div className="relative z-10 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wider">{title}</p>
        <h3 className="text-4xl font-extrabold text-gray-800">{value}</h3>
      </div>
      <div className={`p-4 rounded-2xl ${bgColor} ${iconColor} bg-opacity-20`}>
        <Icon className="w-8 h-8" />
      </div>
    </div>
  </div>
);

const Page = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: childrenData, isLoading: isLoadingChildren, isError, error } = useGetChildrenQuery();
  const { data: subscriptionData, isLoading: isLoadingSubs } = useGetSubscriptionsQuery();

  if (isLoadingChildren || isLoadingSubs) {
    return <FullPageLoader message="Loading dashboard..." />;
  }

  // transformResponse extracts the data field, so childrenData is the array directly
  const children = Array.isArray(childrenData) ? childrenData : childrenData?.data || [];

  // Calculate stats
  const childrenCount = children.length;
  // Calculate total active subscriptions
  const activeSubscriptions = subscriptionData?.children?.reduce((acc, child) => {
    const activeCount = child.enrolledCourses?.filter(course =>
      course.status === 'active' || course.cancelAtPeriodEnd
    ).length || 0;
    return acc + activeCount;
  }, 0) || 0;

  const monthlyRequirement = subscriptionData?.children?.reduce((acc, child) => {
    const childTotal = child.enrolledCourses?.reduce((sum, course) => {
      if (course.status === 'active') {
        return sum + (course.price || 0);
      }
      return sum;
    }, 0) || 0;
    return acc + childTotal;
  }, 0) || 0;

  return (
    <div className="space-y-10 p-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-gradient-to-r from-white to-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-extrabold text-[#392b80] flex items-center gap-3">
            Welcome, {userInfo?.user?.name}
            <span className="text-yellow-400 animate-pulse text-4xl"><MdWavingHand /></span>
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Here's what is happening with your children today.</p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-sm font-bold text-[#392b80] bg-[#392b80]/5 px-5 py-2.5 rounded-full inline-block">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard
          title="Total Children"
          value={childrenCount}
          icon={Users}
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Active Subscriptions"
          value={activeSubscriptions}
          icon={CreditCard}
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Monthly Requirement"
          value={`$${monthlyRequirement}`}
          icon={DollarSign}
          bgColor="bg-pink-100"
          iconColor="text-pink-600"
        />
      </div>

      {/* Children Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#392b80] flex items-center gap-2">
            Your Children
          </h2>
          {children.length === 0 && (
            <Link href="/dashboard/parent/children/add-child">
              <Button variant="outline" className="border-[#392b80] text-[#392b80] hover:bg-[#392b80] hover:text-white transition-colors">
                + Add Child
              </Button>
            </Link>
          )}
        </div>

        {isError ? (
          <Alert variant="destructive">
            <AlertDescription>
              {error?.data?.message || "Failed to load children. Please try again."}
            </AlertDescription>
          </Alert>
        ) : children.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Children Added Yet</h3>
            <p className="text-gray-500 mb-6">Start your journey with us by adding your first child.</p>
            <Link href="/dashboard/parent/children/add-child">
              <Button className="bg-[#392b80] hover:bg-[#2a2060] text-lg px-8 py-6 rounded-xl shadow-lg shadow-[#392b80]/20">
                Add Your First Child
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {children.map((student) => (
              <ChildCard key={student._id} student={student} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Grid: Upcoming Sessions & Alerts */}
      <div className="grid gap-8 md:grid-cols-2">
        <UpcomingSessionsCard />
        <RecentlyAlerts />
      </div>
    </div>
  )
}

export default Page