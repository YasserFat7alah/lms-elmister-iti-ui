import ChildFeatures from '@/components/DashboardComponents/parent/mychildComponent/ChildFeatures'
import RecentNotification from '@/components/DashboardComponents/parent/mychildComponent/RecentNotification'
import MyChildren from '@/components/DashboardComponents/parent/MyChildren'
import React from 'react'

const page = () => {
  return (
    <div>
      <ChildFeatures />
      <MyChildren />
      <RecentNotification />
    </div>
  )
}

export default page