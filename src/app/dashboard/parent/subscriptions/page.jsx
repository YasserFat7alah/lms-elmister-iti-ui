"use client";
import ActiveSubscriptions from '@/components/DashboardComponents/parent/mychildComponent/ActiveSubscriptions';
import BackBtn from '@/components/DashboardComponents/parent/mychildComponent/BackBtn';
import { useGetSubscriptionsQuery } from '@/redux/api/endPoints/childrenApiSlice';
import React from 'react'

const page = () => {

  const { data: subscriptionsData, isLoading, isError } = useGetSubscriptionsQuery();

  const totalMonthlyFee = subscriptionsData?.data?.totalMonthlyFee || 0;
  const totalSubscriptions = subscriptionsData?.data?.totalSubscriptions || 0;
  const childrenSubscriptions = subscriptionsData?.data?.children || [];

  return (
    <div className="space-y-4">
      <BackBtn />
      {/* ____________BANNER___________ */}
      <div className="bg-white border  rounded-2xl p-8  shadow-lg">
        <p className="font-medium opacity-90">Total Monthly Fee</p>
        <h2 className="text-4xl font-semibold mt-2 text-[#FF0055]">
          {isLoading ? (
            <span className="animate-pulse bg-gray-200 h-10 w-32 inline-block rounded"></span>
          ) : (
            totalMonthlyFee.toLocaleString()
          )}
          <sub className="font-medium ml-1">USD</sub>
        </h2>
        <p className="mt-3 opacity-90 text-gray-600">
          {isLoading ? "Loading..." : `${totalSubscriptions} active subscriptions`}
        </p>
      </div>
      {/* ______________________________ */}
      <ActiveSubscriptions
        data={childrenSubscriptions}
        isLoading={isLoading}
      />
      {isError && (
        <div className="text-center text-red-500 mt-4">
          Failed to load subscriptions. Please try refreshing.
        </div>
      )}
    </div>
  )
}

export default page